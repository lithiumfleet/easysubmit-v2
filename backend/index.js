const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer');
const port = 9999

app.use(cors())
app.use(express.json())
const createLog = (req, res, next) => {
  res.on("finish", function() {
    console.log(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
  });
  next();
};
app.use(createLog);

app.post('/api/upload_id', (req, res) => {
    const id = req.body.stu_id;
    console.log(`req for check id: ${id}`);
    res.send({ "status": "ok" });
})

const stuidlist = ["123","234","345"];

app.post('/checkid', (req, res) => {
    const id = req.body.stuid;
    const msg = {"result": stuidlist.includes(id)};
    res.send(msg);
    console.log(`req for check id: ${id} => ${JSON.stringify(msg)}`);
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

    // You can add additional logic here to handle the form data and the uploaded file

    res.send({ status: true });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
