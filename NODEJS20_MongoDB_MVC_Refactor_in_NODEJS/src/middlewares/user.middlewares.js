import fs from 'fs'

function logRequestResponse(filename) {
    return (req, res, next) => {
        fs.appendFile(filename, `${Date.now()}: ${req.method} ${req.path}\n`, (error, data) => {
            if (error) throw error;
            next();
        })
    }
}

export { logRequestResponse }