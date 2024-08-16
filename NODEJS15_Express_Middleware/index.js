import express from 'express'
import users from './MOCK_DATA.json' assert { type: 'json' }
import fs from 'fs'

const app = express();
const PORT = 3000;

//Middleware
app.use(express.urlencoded({ extended: false }))    //NOTE - inbuilt native middleware

// app.use((req, res, next) => {
// console.log("From middleware01");

// })

app.use((req, res, next) => {
    console.log("From middleware02");
    //DB query
    //obtain credit card info 
    req.creditCard = "145"
    next();
})

// app.use((req, res, next) => {
//     return res.json({ message: "From middleware03" })
// })

// app.use("/api/users", (req, res, next) => {
// return res.end("Hello")
// })

app.use((req, res, next) => {
    console.log("From middleware03");

    fs.appendFile("./logFile.txt", `${Date.now()}: ${req.method} ${req.path}\n`, (error) => {
        if (error) throw error;
        next();
    })
})


//Rotes
app.get("/users", (req, res) => {
    return res.send(
        `
    <ul>
    ${users.map(items => `<li>${items.first_name}</li >`).join("")}
    </ul>
    `
    );
})

app.get("/api/users", (req, res) => {
    console.log("credit card nummber is", req.creditCard);
    return res.json(users);
})

app.post("/api/users", (req, res) => {
    const newUser = req.body;
    // console.log(newUser);   //NOTE - Return undefined cause express does not know what typpe data is this or how to handle it, so here we have to use middlewares

    users.push({ id: users.length + 1, ...newUser })
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
        return res.json({ status: "OK" })
    })
})



app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id)
        const user = users.find(element => element.id === id)
        return res.json(user);
    })
    .patch((req, res) => {
        const editedUser = req.body
        const id = Number(req.params.id)
        const userParams = users.find(element => element.id === id)

        if (!userParams) return res.status(404).json({ error: "User not found" });

        users[users.indexOf(userParams)] = { ...userParams, ...editedUser }

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {

            if (error) return res.status(500).json({ error: "Failed to update user" });

            return res.json({ status: "200 OK" })
        })
    })
    .delete((req, res) => {
        const id = Number(req.params.id)
        const userIndex = users.findIndex(element => element.id === id)
        console.log(userIndex);


        if (userIndex != -1) {
            users.splice(userIndex, 1)  //Start index, nth index
            fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
                if (error) return res.status(500).json({ error: "Failed to delete user" });

                return res.json({ status: "200 OK" })
            })
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    })




app.listen(PORT, () => console.log(`Local: http://localhost:${PORT}`))
