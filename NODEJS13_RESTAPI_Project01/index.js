import express from 'express'
import users from './MOCK_DATA.json' assert { type: 'json' }

const app = express();
const PORT = 3000;

//Routes - single
app.get("/users", (req, res) => {
    return res.send(
        `
    <ul>
    ${users.map(items => `<li>${items.first_name}</li >`).join("")}
    </ul>
    `
    );
})  //will throw HTML

app.get("/api/users", (req, res) => {
    return res.json(users);
})  //will throw json data


// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id)
//     const user = users.find(element => element.id === id)
//     return res.json(user);
// })



app.post("/api/users", (req, res) => {
    //TODO: Create user
    return res.send("Status Pending...")
})



// app.patch("/api/users/:id", (req, res) => {
//     //TODO: Edit the user with id
//     return res.json({ status: "pending..." })
// })

// app.delete("/api/users/:id", (req, res) => {
//     //TODO: Delete the user with id
//     return res.json({ status: "pending..." })
// })



//Routes - merged(grouping)
app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id)
        const user = users.find(element => element.id === id)
        return res.json(user);
    })
    .patch((req, res) => {
        //TODO: Edit the user with id
        return res.json({ status: "pending..." })
    })
    .delete((req, res) => {
        //TODO: Delete the user with id
        return res.json({ status: "pending..." })
    })


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
