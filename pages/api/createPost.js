import Post from '../../data/post.json'
import fs from 'fs'


export default async function (req,res) {
    const {text,name, _id,time} = req.body
    const id = await Date.now() + _id
    const data = {
        name,
        content:text,
        postedBy:_id,
        time,
        _id:id,
        likes:[]
    }
    Post.push(data)
    fs.writeFileSync("./data/post.json",JSON.stringify(Post))
    res.status(200).json({message:"posted successfully"})

};
