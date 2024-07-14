const express = require('express')
const app = express()
const cors = require('cors')
const port = 9999

app.use(cors())
app.use(express.json())
app.post('/api/upload_id', (req, res) => {
    const id = req.body.stu_id;
    console.log(`req for check id: ${id}`);
    res.send({ "status": "ok" });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
