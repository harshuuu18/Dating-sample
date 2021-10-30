import User from '../../data/user.json'
import jwt from 'jsonwebtoken'
import {jwtSecret} from '../../helpers/config.json'
import fs from 'fs'

export default async function (req,res) {
    const {name,email} = req.body

    if(!name || !email) return res.status(422).json({error:"Please provide all details"})

    const sendToken = (User_Id,UserDetails)=>{
        const token = jwt.sign({_id:User_Id},jwtSecret)
        const {name,email,_id,gender,age,profile} = UserDetails
        res.json({user:{_id,name,email,token,gender,age,profile}})
    }

    try{
        const FindUser = await User.find((f)=>f.email===email)
        const _id = await Date.now() + name
        if(!FindUser){
            const data = await {
                name,email,_id
            }
            User.push(data)
            fs.writeFileSync("./data/user.json",JSON.stringify(User))
            sendToken(_id,data)
        }else{
            sendToken(FindUser._id,FindUser)
        }
    }catch(err){
        console.log(err)
    }

};
