import jwt from 'jsonwebtoken';
import tokenModel from '../models/token/index.js';

const authMiddleware = (req, res, next) => {

    let token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({message: "Unauthorized"})
    }
    token = token.replace("Bearer ", "")

    const checkToken = tokenModel.findOne({
        where: {token}
    })

    if(!checkToken){
        return res.status(401).json({message: "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        console.log(decoded, "Decoded");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized"})
    }
}

export default authMiddleware;