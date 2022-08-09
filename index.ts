import express from "express";
import fs from "fs";
import cors = require("cors");
import path = require("path");

const jsonParser = express.json();
const app = express();
app.use(cors());
const filePath = "data.json";
const PORT = process.env.PORT || 5000;
const corsReq = cors();

type TUserType = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  date?: string;
  message?: string;
};

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
    const data = fs.readFileSync(filePath, "utf-8");
    const users: TUserType[] = JSON.parse(data);
    users.push(user);
    const content = JSON.stringify(users);

    fs.writeFileSync(filePath, content);
    res.status(200).send(JSON.stringify(succes));
  } catch (err) {
    res
      .status(400)
      .send(JSON.stringify({ error: `Произошла ошибка отправки ${err}` }));
  }
});

app.use(express.static(path.resolve(__dirname, "./build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Start server port ${PORT} on http://localhost:${PORT}`);
});
