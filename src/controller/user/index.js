import authModel from "../../models/auth/index.js";
import { compare, hash } from 'bcrypt';
import jwt from "jsonwebtoken";


const userController = {
    signUp: async (req, res) => {
        try {
            const payload = req.body;

            const user = await authModel.findOne({
                where: {
                    email: payload.email
                }
            })
            if(user){
                return res.status(400).json({message: "Email already exists"})
            }
            const hpassword = await hash(payload.password, 10)
            const newUser = await authModel.create({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: hpassword
            })
            res.json({message: "User Created", newUser})
        } catch (error) {
            res.status(500).json(error)
        }
    },
    signIn: async (req, res) => {
        try {
            const payload = req.body;

            const user = await authModel.findOne({
                where: {
                    email: payload.email
                }
            })

            if(!user) {
                return res.status(400).json({message: "Invalid Credentials"})
            }

            const comPasswords = await compare(
                payload.password, 
                user.password
            )

            if(!comPasswords){
                return res.status(400).json({message: "Invalid Credentials"})
            }

            const data = {
                id: user.id,
                firstName: user.firstName,
                email: user.email
            }

            const token = jwt.sign(data, process.env.JWT_SECRETKEY, {
                expiresIn: "1h"
            })

            res.json({message: "User", data, token})
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default userController;