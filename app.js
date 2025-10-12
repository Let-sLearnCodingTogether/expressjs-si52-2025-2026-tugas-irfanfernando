import express from "express";
import api from "./route/api.js"
import database from "./config/database.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server berjalan dengan baik");
});

app.use("/api" ,api);

app.listen(3000, () =>{
    database();
    console.log("Aplikasi berjalan di http://localhost:3000");
})