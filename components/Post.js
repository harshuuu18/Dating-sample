import React from 'react'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material'
import {useEffect,useState} from 'react'


function Post({name,content,time,likes,userId,_id,LikePost,UnlikePost}) {
    console.log(_id)
    const [Content,setContent] = useState("")
    
    useEffect(()=>{
        
        if(content){

            setContent(content)
        }
    },[])

    if(!name || !content || !time || !likes){
        return "null";
    }

    
    
    
    return (
        <div className="Post" >
            <div className="PostUserDetails" >
                <img src="/user512.png" width="30px" />
                <span>@{name}</span>
            </div>
            
            <div className="PostContent" >
                <pre>
                {Content}
                </pre>
            </div>
            <span><h6>2 min Ago</h6></span>
            <div className="PostActions" >
                <Button id="PostMsgBtn" >
                    Talk with Him {"  "} <img src="/msg512.png" width="20px" />
                </Button>
                <IconButton id="PostLikeBtn" onClick={()=> {
                    if(likes.includes(userId)){
                        return UnlikePost({postId:_id,userId})
                    }else{
                        return LikePost({postId:_id,userId})

                    }
                    }} >
                    <img src={likes.includes(userId)?"/heart.svg":"heart512.png"} width="20px" />
                </IconButton>
                <h6>{likes.length}</h6>
            </div>
        </div>
    )
}

export default Post
