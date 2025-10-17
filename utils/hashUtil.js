import bcrypt from "bcrypt";

export const hash =(password) =>{
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

export const compare = (plainPassword, hashedPassword)=> {
    return bcrypt.compareSync(plainPassword,hashedPassword);
};