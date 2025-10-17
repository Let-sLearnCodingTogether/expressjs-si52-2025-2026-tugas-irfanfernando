let loggedInUser = null;

export const setLoggedInUser =(user) =>{
    loggedInUser = user;
}

export const clearLoggedInUser =()=>{
    loggedInUser= null;
}

export const authMiddleware = (req, res, next)=>{
    if(!loggedInUser){
        return res.status(401).json({
            message : "Akses ditolak, Login terlebih dahulu !",
            data : null,
        });
    }
    req.user = loggedInUser;
    next();
    
};

