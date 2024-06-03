import authModel from "../../models/auth/index.js";
import { compare, hash } from 'bcrypt';
import jwt from "jsonwebtoken";
import tokenModel from "../../models/token/index.js";


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
            const { email, password} = req.body
            const user = await authModel.findOne({
                where: {
                    email,
                }
            })

            if(!user) {
                return res.status(400).json({message: "Invalid Credentials"})
            }

            const comPasswords = await compare(
                password, 
                user.password
            )

            if(!comPasswords){
                return res.status(400).json({message: "Invalid Credentials"})
            }

            delete user.dataValues.password;

            const data = {
                id: user.id,
                firstName: user.firstName,
                email: user.email
            }

            const token = jwt.sign(user.dataValues, process.env.JWT_SECRETKEY, {
                expiresIn: "1h",
              });

            await tokenModel.create({token})

            res.json({data: user, token})
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default userController;