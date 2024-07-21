const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer');
const moment = require('moment');
const port = 9999

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

const stuidlist = ["123","234","345"];
const idValidator = (req, res, next) => {
    if (req.path === '/submit') return next();
    const id = req.body.stuid;
    if (stuidlist.includes(id)) {
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

app.post('/checktasklist', (req, res) => {
    const id = req.body.stuid;
    const msg = [
        {taskid:"41",name:"数处大作业",deadline:"2024-03-20T10:47:38+08:00",info:"写完就行",status:"finished",allowextent:["zip"]},
        {taskid:"34",name:"电磁波",deadline:"2024-07-20T06:22:39+08:00",info:"第一章作业",status:"unfinished",allowextent:["code"]},
        {taskid:"36",name:"图像处理",deadline:"2024-07-20T06:27:38+08:00",info:"两张图",status:"unfinished",allowextent:["word","pdf"]}
    ]
    res.send(msg);
    console.log(`id: ${id} => ${JSON.stringify(msg)}`);
});


const upload = multer({ dest: './upload/'});

app.post('/submit', upload.single('file'), (req, res) => {
    const { stuid, taskid } = req.body;
    const file = req.file;

    // test server decay
    function blockSleep(ms) {
        const end = Date.now() + ms;
        while (Date.now() < end) {
        }
    }

    blockSleep(2000);
    if (!file) {
        return res.send({ status:"emptyfile", message:"上传文件为空"});
    }

    console.log('Student ID:', stuid);
    console.log('Task ID:', taskid);
    console.log('Uploaded File:', file);

    res.send({ status:"ok", message:"文件上传成功" });
});


app.post('/checkhistory', (req, res) => {
    const { stuid } = req.body;
    console.log(`${stuid} Query for history`);
    const hist = [ 
        {taskid:"41",taskname:"数处大作业",time:"2024-03-20T10:47:38+08:00",filename:"adsf.doc",coveredfile:"aaaa.docx"},
        {taskid:"25",taskname:"数电",time:"2024-07-20T06:27:38+08:00",filename:"123.png",coveredfile:""},
        {taskid:"23",taskname:"数字图像处理",time:"2024-02-10T01:47:38+08:00",filename:"1423.png",coveredfile:"5345435.jpg"},
        {taskid:"7",taskname:"雷达实践",time:"2024-07-20T06:22:39+08:00",filename:"dasfhdshfadd.doc",coveredfile:"ash4qr.docx"},
        {taskid:"123",taskname:"雷达大作业",time:"2024-07-20T09:27:39+08:00",filename:"dsagfgfdd.doc",coveredfile:"asqrh4qr.docx"},
        {taskid:"12",taskname:"电磁场",time:"2024-07-20T06:07:39+08:00",filename:"dasfhdfdd.doc",coveredfile:"asdfdso.docx"}
    ]
    res.send(hist);
});

app.listen(port, () => {
    moment.locale('zh-cn');
    console.log(`${moment().format('MMMDo hh:mm:ss')} Example app listening on port ${port}`)
})
