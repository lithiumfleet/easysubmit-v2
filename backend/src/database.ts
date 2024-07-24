import sqlite3 from "sqlite3";
import { promises as fs } from "fs";
import { open, Database } from 'sqlite'
import moment from "moment";

type SubmitRecord = {
  stuid?: string,
  taskid: string,
  taskname: string,
  time?: string,
  filename: string,
  coveredfile?: string
}

type StudentInfo = {
  stuid: string,
  name: string
}

type TaskInfo = {
  taskid: string,
  name: string,
  deadline: string,
  info: string,
  status?: string,
  allowextent: string[],
}
// now in database:
//
// taskid: string,
// name: string,
// deadline: string,
// info: string,
//  THERE IS NO status field,
// allowextent: string, comma sep
// isactive: boolean, 0/1

interface serverDB {
  checkID(stuid: string): Promise<boolean>;

  addRecord(stuid: string, taskid: string, filename: string): Promise<void>;
  getRecord(stuid: string, taskid?: string): Promise<SubmitRecord[]>;

  getTask(taskid?: string): Promise<TaskInfo[] | TaskInfo>;

  findNotSubmit(taskid: string): Promise<StudentInfo[]>;
  readTableFromFile(path: string, tableName: string): Promise<void>;
}

export class sqlDB implements serverDB {
  dbFilePath: string;
  db: Database;

  private constructor(dbFilePath: string, db: Database) {
    this.dbFilePath = dbFilePath;
    this.db = db;
  }

  static async init(dbFilePath: string): Promise<sqlDB> {
    const db = await open({
      filename: dbFilePath,
      driver: sqlite3.Database,
    });
    return new sqlDB(dbFilePath, db);
  }

  async closeDB(): Promise<void> {
    await this.db.close();
  }

  async checkID(stuid: string): Promise<boolean> {
    const searchID = "SELECT * FROM namelist WHERE stuid=?;";
    const res = await this.db.get(searchID, stuid)
    if (res && res.stuid === stuid) return true;
    else return false;
  }

  async getRecord(stuid: string): Promise<SubmitRecord[]>;
  async getRecord(stuid: string, taskid: string): Promise<SubmitRecord | undefined>;
  async getRecord(stuid: string, taskid?: string): Promise<SubmitRecord | undefined | SubmitRecord[]> {
    if (taskid) {
      const res = await this.db.get("SELECT * FROM record WHERE stuid=? AND taskid=? ORDER BY time DESC;", [stuid, taskid]);
      return res;
    } else {
      const res = await this.db.all("SELECT * FROM record WHERE stuid=?;", stuid);
      return res;
    }
  }

  async addRecord(stuid: string, taskid: string, currentFileName: string): Promise<void> {
    const time = moment().toISOString();
    const lastRecord = await this.getRecord(stuid, taskid);
    if (lastRecord !== undefined) {
      const { taskname, filename } = lastRecord;
      await this.db.run("INSERT INTO record VALUES (?, ?, ?, ?, ?, ?);", [stuid, taskid, taskname, time, currentFileName, filename]);
    } else {
      const taskname: string = await this.getTaskName(taskid);
      await this.db.run("INSERT INTO record VALUES (?, ?, ?, ?, ?, ?);", [stuid, taskid, taskname, time, currentFileName, ""]);
    }
    console.log(`insert record for ${stuid} with ${taskid}`);
  }

  private async getTaskName(taskid: string): Promise<string> {
    const res = await this.db.get("SELECT name FROM tasklist WHERE taskid=?;", taskid);
    if (res === undefined) throw new Error("taskid ${} not exists");
    return res.name;
  }

  async getTask(stuid: string): Promise<TaskInfo[]> {
    const activeTasks = await this.db.all("SELECT * from tasklist WHERE isactive=1;");
    if (activeTasks.length === 0) throw new Error("no active task in tasklist");
    let res: TaskInfo[] = [];
    for (const task of activeTasks) {
      const { taskid, name, deadline, info, allowextent } = task;
      const record = await this.getRecord(stuid, taskid);
      const status: string = record === undefined ? "unfinished" : "finished";
      const listallowextent: string[] = allowextent.split(',');
      res.push({ taskid, name, deadline, info, allowextent: listallowextent, status });
    }
    return res;
  }

  async findNotSubmit(taskid: string): Promise<StudentInfo[]> {
    const checkSubmit = "SELECT N.* \
      FROM namelist N \
      LEFT JOIN record R ON N.stuid=R.stuid AND R.taskid=? \
      WHERE R.stuid IS NULL;"
    const res = await this.db.all(checkSubmit, taskid);
    return res;
  }

  async readTableFromFile(path: string, tableName: "tasklist" | "namelist"): Promise<void> {
    try {
      const data = await fs.readFile(path, 'utf-8');

      await this.db.run(`DELETE FROM ${tableName};`);
      console.log(`clear ${tableName}`);

      const jsondata = JSON.parse(data);
      if (tableName === "tasklist") {
        for (const task of jsondata) {
          const { taskid, name, deadline, info, allowextent, isactive } = task;
          await this.db.run("INSERT INTO tasklist VALUES(?,?,?,?,?,?)", [taskid, name, deadline, info, allowextent, isactive]);
        }
      }
      if (tableName === "namelist") {
        for (const info of jsondata) {
          const { stuid, name } = info;
          await this.db.run("INSERT INTO namelist VALUES(?,?)", [stuid, name]);
        }
      }
      console.log(`sync tasklist from ${path}`);

    } catch (err) {
      throw new Error("read aync error!");
    }
  }
}

// // test
// (async () => {
//   const mydb = await sqlDB.init();

//   await mydb.readTableFromFile("/DBFiles/namelist.json", "namelist");

//   await mydb.closeDB()
//     .then(() => { console.log("fin") });
// })();
