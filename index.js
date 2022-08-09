"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const cors = require("cors");
const path = require("path");
const jsonParser = express_1.default.json();
const app = (0, express_1.default)();
app.use(cors());
const filePath = "data.json";
const PORT = process.env.PORT || 5000;
const corsReq = cors();
// POST - request---------------------------------------------
app.post("/api/user", corsReq, jsonParser, (req, res) => {
    const error = { error: "Произошла ошибка отправки!" };
    const succes = { succes: "Отправка успешна!" };
    try {
        if (!req.body) {
            return res.status(400).send(JSON.stringify(error));
        }
        const { body: user } = req;
        console.log(user);
        const data = fs_1.default.readFileSync(filePath, "utf-8");
        const users = JSON.parse(data);
        users.push(user);
        const content = JSON.stringify(users);
        fs_1.default.writeFileSync(filePath, content);
        res.status(200).send(JSON.stringify(succes));
    }
    catch (err) {
        res
            .status(400)
            .send(JSON.stringify({ error: `Произошла ошибка отправки ${err}` }));
    }
});
app.use(express_1.default.static(path.resolve(__dirname, "./build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./build/index.html"));
// });
app.listen(PORT, () => {
    console.log(`Start server port ${PORT} on http://localhost:${PORT}`);
});
