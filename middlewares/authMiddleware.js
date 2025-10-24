import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const JWT_SECRET = "rahasia_jwt";

export const authMiddleware = async (req, res, next)=> {
    try{
        const header = req.headers["authorization"];

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Token tidak ditemukan",
                data : null,
            })
        }

        const token = header.split("")[1];
        const decoded = jwt.verify(token,JWT_SECRET);
        const user = await UserModel.findById(decoded.id).select("-password");

        if(!user){
            return res.status(401).json({
                message: " User tidak ditemukan",
                data : null,
            });
        }

        req.user = user;
        next();
    } catch (error){
        res.status(401).json({
            message: " Token kadaluwarsa",
            data : null
        })
    }
}