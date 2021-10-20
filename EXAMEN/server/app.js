const cookieParser = require('cookie-parser');
const { tryLogin } = require("./database");
const { Usuario } = require("./models");
const express = require("express");
const { join } = require("path");

const root = __dirname;
const cliente = "../cliente";
const app = express();
const port = 8080;

app.listen(port, () => console.log(`Started on port ${port}`));
app.use(express.static(cliente));
app.use(express.json());
app.use(cookieParser());

app.get("/login", (req, res) => {
    const user = req && req.cookies && req.cookies.user;
    if (user) {
        res.sendFile(join(root, cliente, "app.html"));
    } else {
        res.sendFile(join(root, cliente, "login.html"));
    } 
})

app.post("/api/login", async (req, res) => {
    console.log(req.body);
    const { user } = req.body;
    const errors = validate(user);

    if (errors && errors.length) {
        res.send(errors);
    }

    // const dbUser = await tryLogin(user.email, user.password);
    const dbUser = new Usuario(0, user.email, user.password);
    if (!dbUser) {
        res.send({ message: "user doesn't exist", action: "login" })
    } else {
        res.cookie("user", dbUser, { httpOnly: true })
            .send({ message: "success", action: "login" });
    }

})

app.get("/app", (req, res) => {
    console.log(req.cookies);
    const user = req && req.cookies && req.cookies.user;
    if (!user) {
        res.sendFile(join(root, cliente, "login.html"));
    } else {
        res.sendFile(join(root, cliente, "app.html"));
    }
})

app.get("*", (req, res) => {
    if (req.is("application/json")) {
        res.send({ message: "Not found", url: req.originalUrl });
    } else {
        res.sendFile(join(root, cliente, "404.html"));
    }
    
})

function validate(user) {
    const errors = [];
    if (!user) {
        errors.push({ message: "No user received" })
    }

    if (!user.email) {
        errors.push({ message: "No email received" })
    }

    if (!user.password) {
        errors.push({ message: "No password received" })
    }

    return errors;
}