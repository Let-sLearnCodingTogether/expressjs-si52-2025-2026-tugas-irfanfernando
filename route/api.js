import express from "express";
import * as itemController from "../controllers/itemController.js";
import * as authController from "../controllers/authController.js";
import  {authMiddleware} from "../middlewares/authMiddleware.js";

const api = express.Router();

//Auth
api.post("/register", authController.register);

api.post("/login", authController.login);


api.get("/profile", authMiddleware, authController.profile);

//CRUD untuk item
api.get("/item", itemController.listItem);
api.post("/item", itemController.createNewItem);
api.put("/item/:id", itemController.updateItem);
api.delete("/item/:id", itemController.deleteItem);

export default api;