import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function createpost() {
    const [text,setText] = useState("")
    const [user,setUser] = useState("")
    useEffect(()=>{
        const User = JSON.parse(localStorage.getItem('user'))
        if(User){
            setUser(User)
        }
    },[])

    const SendPost = () =>{
        if(!text) return console.log("no data")
        var d = new Date()
        fetch("/api/createPost",{
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({text,name:user.name,_id:user._id,time:d})
        }).then((r)=>r.json().then((d)=>console.log(d))).catch(err=>console.log(err))
    }

    return (
        <div id="AddPost">
            <textarea placeholder="Type Something you wanna express to everyone" value={text} onChange={(e)=>setText(e.target.value)} >

            </textarea>
            <div>
                <Button id="AddPostBtn" onClick={SendPost} >
                    Post
                </Button>
            </div>
        </div>
    )
};
