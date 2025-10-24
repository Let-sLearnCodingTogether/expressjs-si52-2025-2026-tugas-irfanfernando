import UserModel from "../models/userModel.js";
import {hash, compare} from "../utils/hashUtil.js";
import jwt from "jsonwebtoken";

//registrasi
export const register = async (req, res) => {
    try{
        const request = req.body;

        if(!request.username || !request.email || !request.password){
            return res.status(400).json({
                message:"Semua kolom wajib diisi",
                data:null,
            });
        }

        const existingUser = await UserModel.findOne({ email: request.email});
        if (existingUser){
            return res.status(400).json({
                message:"Email sudah terdaftar",
                data: null,
            });
        }

        const hashedPassword=hash(request.password);

        const newUser = await UserModel.create({
            username: request.username,
            email: request.email,
            password: hashedPassword
        });

        res.status(201).json({
            message:"Registrasi Berhasil",
            data:{
                username: newUser.username,
                email: newUser.email
            }
        });

    }catch(error){
        res.status(500).json({
            message:error.message,
            data:null
        })
    }
}


//login
export const login = async (req,res) =>{
    try{
        const request = req.body;

        const user= await UserModel.findOne({email:request.email});

        if(!user) {
            return res.status(401).json({
                message:"Email atau password salah",
                data: null
            });

        }
        const isPasswordMatch = compare(request.password, user.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                message : "Email atau password salah",
                data : null
            })
        }

        const token = jwt.sign(
            {id : user._id, email: user.email},
            JWT_SECRET, {expiresIn : "1h"}
        )

        res.status(200).json({
            message:"Login berhasil",
            data:{
                username: user.username,
                email: user.email,
                token: "TOKEN_PLACEHOLDER"
            }
        })
    } catch (error){
        res.status(500).json({
            message: error.message,
            data: null
        })
    }
}

//Profil
export const profile = (req, res)=>{
    res.status(200).json({
        message: "Data pengguna yang sedang login",
        data: req.user,
    });
};

