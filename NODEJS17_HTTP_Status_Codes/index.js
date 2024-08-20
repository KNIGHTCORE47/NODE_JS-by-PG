import express from 'express'
import jsonData from './MOCK_DATA.json' assert { type: 'json' }
import fs from 'fs'

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))

app.route("/api/users")
    .get((req, res) => {
        return res.status(200).json(jsonData)
    })
    .post((req, res) => {
        const newUser = req.body
        console.log(newUser);

        if (!(newUser && newUser.first_name && newUser.last_name && newUser.email && newUser.gender && newUser.job_department)) {
            return res.status(400).json({ error: "All fields are required" })
        }

        jsonData.push({ id: jsonData.length + 1, ...newUser })
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(jsonData), (error) => {
            if (error) {
                return res.status(500).json({ error: "Internal server error" })
            }
            return res.status(201).json({ status: "success", message: "New user Added" })
        })

    })



app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id)
        const userParams = jsonData.find(objects => objects.id === id)

        if (!userParams) return res.status(404).json({ error: "Invalid user" })

        return res.status(200).json(userParams)

    })
    .patch((req, res) => {
        const updatedValue = req.body
        const id = Number(req.params.id)
        const userIndex = jsonData.findIndex(obj => obj.id === id)

        if (userIndex === -1) return res.status(404).json({ error: "Invalid user" })

        jsonData[userIndex] = { ...jsonData[userIndex], ...updatedValue }
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(jsonData), (error) => {
            if (error) return res.status(400).json({ error: "Invalid information" })

            console.log(jsonData[userIndex]);

            return res.status(202).json({ message: "User information updated!!" })
        })

    })
    .delete((req, res) => {
        const id = Number(req.params.id)
        const userIndex = jsonData.findIndex(obj => obj.id === id)

        if (!userIndex) return res.status(404).json({ error: "Invalid user" })

        jsonData.splice(userIndex, 1)
        fs.writeFile("./MOCK_DATA.json", Json.stringify(jsonData), (error) => {
            if (error) return res.status(500).json({ error: "Internal server error" })
            return res.status(200).json({ message: "Item deleted successfully" });
        })
    })



app.listen(PORT, () => console.log(`Local: http://localhost:${PORT}`))