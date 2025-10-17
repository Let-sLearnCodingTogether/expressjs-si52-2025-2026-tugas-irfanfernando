import express from "express";
import * as itemController from "../controllers/itemController.js";
import * as authController from "../controllers/authController.js";
import { authMiddleware,setLoggedInUser, clearLoggedInUser } from "../middlewares/authMiddleware.js";

const api = express.Router();

//Auth
api.post("/register", authController.register);

api.post("/login", async (req, res) =>{
    const originalJson = res.json;
    res.json = function (data){
        if(res.statusCode  == 200 && data.data) setLoggedInUser(data.data);
        return originalJson.call(this,data)
    };
    await authController.login(req, res)
});

api.post("/logout", (req, res)=>{
    clearLoggedInUser();
    res.status(200).json({message :"Logout Berhasil", data: null})
})

api.get("/profile", authMiddleware, authController.profile);

//CRUD untuk item
api.get("/item", itemController.listItem);
api.post("/item", itemController.createNewItem);
api.put("/item/:id", itemController.updateItem);
api.delete("/item/:id", itemController.deleteItem);

export default api;