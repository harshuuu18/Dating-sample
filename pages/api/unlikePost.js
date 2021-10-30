import Post from '../../data/post.json'
import fs from 'fs'

export default async function (req,res) {
    const {userId, postId} = req.body
    

    try{
        
        const FindIndex = await Post.findIndex(f=>f._id == postId)

        if(FindIndex >= 0){
            const FindUser = Post[FindIndex].likes.find(u=>u == userId)
            if(!FindUser){
                return res.json({error:"already Unliked"})
            }
            const likeIndex = Post[FindIndex].likes.indexOf(userId)
            Post[FindIndex].likes.splice(likeIndex,1)
            fs.writeFileSync("./data/post.json",JSON.stringify(Post))
            res.json({message:"updated"})
        }else{
            console.log("not found");
        }
    }catch(err){
        console.log(err)
    }
};
