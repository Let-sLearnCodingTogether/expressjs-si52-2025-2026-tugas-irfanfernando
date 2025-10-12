import itemModel from "../models/itemModel.js";

export const listItem = async(req, res) =>  {
    try{
        const data = await itemModel.find();
        res.status(200).json({
            message: "Berhasil mengambil daftar item",
            data: data,
        });
    }catch (error){
        res.status(500).json({
            message: error.message ,
            data : null,
        });
    }
};

export const createNewItem = async (req, res) => {
    try{
        const request = req.body;

        const response = await itemModel.create({
            itemName :request.itemName,
            quantity: request.quantity,
            purchased: request.purchased || false,
        });

        res.status(201).json({
            message :"Barang berhasil ditambahkan ke daftar belanja",
            data : response,
        })

    }catch (error){
        res.status(500).json({
            message:error.message,
            data: null,
        });
    }
};

export const updateItem = async (req, res) =>{
    try{
        const {id} = req.params;
        const request = req.body;

        const response = await itemModel.findByIdAndUpdate(id, request, {new: true});

        res.status(200).json({
            message: "Barang berhasil diperbarui",
            data: response,
        });
    } catch (error){
        res.status(500).json({
            message:error.message,
            data: null,
        });
    }
};

export const deleteItem = async (req, res) =>{
    try{
        const {id } = req.params;
        await itemModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Barang berhasil dihapus dari daftar belanja",
            data: null,
        });
    }catch (error){
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};