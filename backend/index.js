const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer');
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
        {taskid:"41",name:"数处大作业",deadline:"12.4",info:"写完就行",status:"fin",allowextent:"pdf"},
        {taskid:"34",name:"电磁波",deadline:"1.2",info:"第一章作业",status:"unfin",allowextent:"exe"},
        {taskid:"36",name:"图像处理",deadline:"9.3",info:"两张图",status:"unfin",allowextent:"word"}
    ]
    res.send(msg);
    console.log(`id: ${id} => ${JSON.stringify(msg)}`);
});


const upload = multer({ dest: './upload/'});

app.post('/submit', upload.single('file'), (req, res) => {
    const { stuid, taskid } = req.body;
    const file = req.file;

    if (!file) {
        return res.send({status:false});
    }

    console.log('Student ID:', stuid);
    console.log('Task ID:', taskid);
    console.log('Uploaded File:', file);

    res.send({ status: true });
});


app.post('/checkhistory', (req, res) => {
    const { stuid } = req.body;
    console.log(`${stuid} Query for history`);
    const hist = [ 
        {taskid:"41",taskname:"数处大作业",time:"12.3",filename:"adsf.doc",coveredfile:"aaaa.docx"},
        {taskid:"25",taskname:"数电",time:"9.1",filename:"123.png",coveredfile:"555.jpg"}
    ]
    res.send(hist);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
