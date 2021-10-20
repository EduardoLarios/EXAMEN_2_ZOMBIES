const express = require("express");
const path = require('path');
const cors = require("cors");
const fs = require("fs");

const port = 8080;

var corsOptions = {
    origin: '*'
}

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(__dirname + "/public"));

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get("/", (req, res) => {
    const file = path.join(__dirname, "./public/index.html");
    res.status(200).sendFile(file);
})

app.get("/test", (req, res) => res.status(200).json({ message: "Hola" }))

app.post("/forma", (req, res) => {
    const { transaction } = req.body;
    if (transaction) {
        console.log(transaction);

        const data = `${JSON.stringify(transaction)}\n`;

        fs.appendFile("submits", data, (err) => {
            if (err) {
                res.status(202).send({
                    status: "could not store entry",
                    error: err.message,
                    data: transaction
                })

                const filepath = path.join(__dirname, "submits");
                console.log(`Could not write to filepath ${filepath}`);
                console.log(`Error: ${err.message}`);
            }
        });

        res.status(201).send({
            status: "success",
            data: transaction
        })
    } else {
        res.status(400).send({
            error: "Payment form is invalid",
            data: req.body
        })
    }

})

app.get("*", (req, res) => {
    if (req.is("application/json")) {
        res.status(404).send({
            route: req.originalUrl,
            method: req.method,
            error: "Route does not exist"
        })
    } else {
        res.status(404).sendFile(path.join(__dirname, "404.html"));
    }
})