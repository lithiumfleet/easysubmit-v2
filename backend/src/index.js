const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer');
const moment = require('moment');
const {sqlDB} = require('../dist/database');

let db;
(async () => {
    db = await sqlDB.init("./DBFiles/server.db");
    await db.readTableFromFile("./DBFiles/namelist.json", "namelist");
    await db.readTableFromFile("./DBFiles/tasklist.json", "tasklist");
    console.log("init database");
})();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const createLog = (req, res, next) => {
  res.on("finish", function() {
    console.log(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
    console.log(`all data: ${JSON.stringify(req.body)}`);
  });
  next();
};
app.use(createLog);

const idValidator = async (req, res, next) => {
    if (req.path === '/submit') return next();
    const id = req.body.stuid;
    if (await db.checkID(id)) {
        next();
    } else {
        res.status(403).send({msg:"invalid stuid"});
        console.log(`id is not in stuidlist: ${id}`);
    }
}
app.use(idValidator);

app.post('/checkid', (req, res) => {
    const id = req.body.stuid;
    res.send({"result": true}); // the middleware 'idValidator' checked.
    console.log(`req for check id: ${id}`);
});

app.post('/checktasklist', async (req, res) => {
    const id = req.body.stuid;
    const msg = await db.getTask(id);
    res.send(msg);
    console.log(`id: ${id} => ${JSON.stringify(msg)}`);
});


const upload = multer({ dest: './upload/'});

app.post('/submit', upload.single('file'), (req, res) => {
    const { stuid, taskid } = req.body;
    const file = req.file;

    // // test server decay
    // function blockSleep(ms) {
    //     const end = Date.now() + ms;
    //     while (Date.now() < end) {
    //     }
    // }

    // blockSleep(2000);
    if (!file) {
        return res.send({ status:"emptyfile", message:"上传文件为空"});
    }
    db.addRecord(stuid, taskid, file.originalname);
    console.log('Student ID:', stuid);
    console.log('Task ID:', taskid);
    console.log('Uploaded File:', file);

    res.send({ status:"ok", message:"文件上传成功" });
});


app.post('/checkhistory', async (req, res) => {
    const { stuid } = req.body;
    console.log(`${stuid} Query for history`);
    const hist = await db.getRecord(stuid);
    res.send(hist);
});

const port = 9999;

app.listen(port, () => {
    moment.locale('zh-cn');
    console.log(`${moment().format('MMMDo hh:mm:ss')} Example app listening on port ${port}`)
});
