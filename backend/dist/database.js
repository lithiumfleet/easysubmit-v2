"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlDB = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const fs_1 = require("fs");
const sqlite_1 = require("sqlite");
const moment_1 = __importDefault(require("moment"));
class sqlDB {
    constructor(dbFilePath, db) {
        this.dbFilePath = dbFilePath;
        this.db = db;
    }
    static init(dbFilePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, sqlite_1.open)({
                filename: dbFilePath,
                driver: sqlite3_1.default.Database,
            });
            return new sqlDB(dbFilePath, db);
        });
    }
    closeDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.close();
        });
    }
    checkID(stuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchID = "SELECT * FROM namelist WHERE stuid=?;";
            const res = yield this.db.get(searchID, stuid);
            if (res && res.stuid === stuid)
                return true;
            else
                return false;
        });
    }
    getRecord(stuid, taskid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (taskid) {
                const res = yield this.db.get("SELECT * FROM record WHERE stuid=? AND taskid=? ORDER BY time DESC;", [stuid, taskid]);
                return res;
            }
            else {
                const res = yield this.db.all("SELECT * FROM record WHERE stuid=?;", stuid);
                return res;
            }
        });
    }
    addRecord(stuid, taskid, currentFileName) {
        return __awaiter(this, void 0, void 0, function* () {
            const time = (0, moment_1.default)().toISOString();
            const lastRecord = yield this.getRecord(stuid, taskid);
            if (lastRecord !== undefined) {
                const { taskname, filename } = lastRecord;
                yield this.db.run("INSERT INTO record VALUES (?, ?, ?, ?, ?, ?);", [stuid, taskid, taskname, time, currentFileName, filename]);
            }
            else {
                const taskname = yield this.getTaskName(taskid);
                yield this.db.run("INSERT INTO record VALUES (?, ?, ?, ?, ?, ?);", [stuid, taskid, taskname, time, currentFileName, ""]);
            }
            console.log(`insert record for ${stuid} with ${taskid}`);
        });
    }
    getTaskName(taskid) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.db.get("SELECT name FROM tasklist WHERE taskid=?;", taskid);
            if (res === undefined)
                throw new Error("taskid ${} not exists");
            return res.name;
        });
    }
    getTask(stuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const activeTasks = yield this.db.all("SELECT * from tasklist WHERE isactive=1;");
            if (activeTasks.length === 0)
                throw new Error("no active task in tasklist");
            let res = [];
            for (const task of activeTasks) {
                const { taskid, name, deadline, info, allowextent } = task;
                const record = yield this.getRecord(stuid, taskid);
                const status = record === undefined ? "unfinished" : "finished";
                const listallowextent = allowextent.split(',');
                res.push({ taskid, name, deadline, info, allowextent: listallowextent, status });
            }
            return res;
        });
    }
    findNotSubmit(taskid) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkSubmit = "SELECT N.* \
      FROM namelist N \
      LEFT JOIN record R ON N.stuid=R.stuid AND R.taskid=? \
      WHERE R.stuid IS NULL;";
            const res = yield this.db.all(checkSubmit, taskid);
            return res;
        });
    }
    readTableFromFile(path, tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.promises.readFile(path, 'utf-8');
                yield this.db.run(`DELETE FROM ${tableName};`);
                console.log(`clear ${tableName}`);
                const jsondata = JSON.parse(data);
                if (tableName === "tasklist") {
                    for (const task of jsondata) {
                        const { taskid, name, deadline, info, allowextent, isactive } = task;
                        yield this.db.run("INSERT INTO tasklist VALUES(?,?,?,?,?,?)", [taskid, name, deadline, info, allowextent, isactive]);
                    }
                }
                if (tableName === "namelist") {
                    for (const info of jsondata) {
                        const { stuid, name } = info;
                        yield this.db.run("INSERT INTO namelist VALUES(?,?)", [stuid, name]);
                    }
                }
                console.log(`sync tasklist from ${path}`);
            }
            catch (err) {
                throw new Error("read aync error!");
            }
        });
    }
}
exports.sqlDB = sqlDB;
// // test
// (async () => {
//   const mydb = await sqlDB.init();
//   await mydb.readTableFromFile("/DBFiles/namelist.json", "namelist");
//   await mydb.closeDB()
//     .then(() => { console.log("fin") });
// })();
