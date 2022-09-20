const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const studentArray = require('./InitialData');
const req = require('express/lib/request');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
let mapId = new Map();
for (let i = 1; i < 8; i++) {
    mapId.set(i);
}
app.get('/api/student', async (req, res) => {
    res.status(200).send(studentArray);
})
app.get('/api/student/:id', async (req, res) => {
    for (let i = 0; i < studentArray.length; i++) {
        if (studentArray[i].id == req.params.id) {
            res.status(200).send(studentArray[i])
            break;
        }
        else if (i == studentArray.length - 1) {
            res.status(404).send({ error: "invalid id" });
        }
    }
})
app.post('/api/student', async (req, res) => {
    if (typeof (req.body.name) === 'string' && (parseInt(req.body.currentClass) + 0) == req.body.currentClass && typeof (req.body.division) === 'string') {
        let idNum = studentArray.length + 1;
        while (mapId.has(idNum)) {
            idNum++
        }
        mapId.set(idNum);
        let student = {
            id: idNum,
            name: req.body.name,
            currentClass: parseInt(req.body.currentClass),
            division: req.body.division
        }
        studentArray.push(student);
        res.status(200).send({ id: idNum });
    }
    else {
        res.status(400).send({ error: "Invalid input" })
    }
})
app.put('/api/student/:id', async (req, res) => {
    for (let i = 0; i < studentArray.length; i++) {
        if (studentArray[i].id == req.params.id) {
            console.log("identified the id")
            if (typeof (req.body.name) === 'string' || (parseInt(req.body.currentClass) + 0) == req.body.currentClass || typeof (req.body.division) === 'string') {
                console.log("found some suitable updations")
                if (typeof (req.body.name) === 'string') {
                    studentArray[i].name = req.body.name;
                }
                else if (typeof (req.body.name) === undefined) {

                }
                else {
                    res.status(400).send({ error: "Invalid name" });
                    break;
                }

                if ((parseInt(req.body.currentClass) + 0) == req.body.currentClass) {
                    studentArray[i].currentClass = parseInt(req.body.currentClass);
                }
                else if (typeof (req.body.currentClass) === undefined) {

                }
                else {
                    res.status(400).send({ error: "Invalid currentClass" });
                    break;
                }

                if (typeof (req.body.division) === 'string') {
                    studentArray[i].division = req.body.division;
                }
                else if (typeof (req.body.division) === undefined) {

                }
                else {
                    res.status(400).send({ error: "Invalid division" });
                    break;
                }
                res.status(200).send({ message: `id ${req.params.id} updated successfully` })
            }
        }
        else if (i == studentArray.length - 1) {
            res.status(400).send({ error: "Invalid id" });
        }
    }
})
app.delete('/api/student/:id', async (req, res) => {
    for (let i = 0; i < studentArray.length; i++) {
        if (studentArray[i].id == req.params.id) {
            studentArray.splice(i, 1);
            res.status(200).send({ message: "deleted successfully" })
        }
        else if (i == studentArray.length - 1) {
            res.status(404).send({ error: "Invalid id" });
        }
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   