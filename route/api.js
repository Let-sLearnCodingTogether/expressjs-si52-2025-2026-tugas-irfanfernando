import express from "express";
import * as itemController from "../controllers/itemController.js";

const api = express.Router();

api.get("/item", itemController.listItem);
api.post("/item", itemController.createNewItem);
api.put("/item/:id", itemController.updateItem);
api.delete("/item/:id", itemController.deleteItem);

export default api;