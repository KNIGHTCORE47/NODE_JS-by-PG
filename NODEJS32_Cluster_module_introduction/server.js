import express from 'express'
import cluster from 'cluster'
import os from 'os'
import process from 'process'



//NOTE - CPU threads 2 methods
// const availableCPUs = os.availableParallelism();
const availableCPUs = os.cpus().length

if (cluster.isPrimary) {
    // Fork workers.
    for (let i = 0; i < availableCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

} else {
    const app = express();
    const PORT = process.env.PORT || 8000;

    app.get("/", (req, res) => {
        try {
            return res.status(200).json({ message: `Hellow World!! ${process.pid}` })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: "Something went wrong" })
        }
    })

    app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
}
