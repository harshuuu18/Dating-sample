import Head from 'next/head'
import Image from 'next/image'
import TopNav from '../components/TopNav'
import BottomNav from '../components/BottomNav'
import Post from '../components/Post'
import Authroute from '../helpers/AuthRoute'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'



function Home() {
  const router = useRouter()
  const [user,setUser] = useState("")
  const [posts,setPosts] = useState([])
  const [liked,setLiked] = useState(false)
  useEffect(()=>{
    fetch('/api/posts').then((r)=>r.json().then(d=>setPosts(d))).catch(err=>console.log(err))
    
    const User = JSON.parse(localStorage.getItem('user'))
    if(!User){
      return router.push("/home")
    }
    setUser(User)
    setLiked(false)
  },[liked])
  
  const LikePost = ({postId,userId}) => {
    console.log(postId,userId)
    fetch('/api/likePost',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({postId,userId})
    }).then(r=>r.json().then(d=>{
      setLiked(true)
      
      console.log(d)
    })).catch(err=>console.log(err))
};
const UnlikePost = ({postId,userId}) => {
  console.log(postId,userId)
  fetch('/api/unlikePost',{
      method:"post",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({postId,userId})
  }).then(r=>r.json().then(d=>{
    setLiked(true)
    
    console.log("Unliked",d)
  })).catch(err=>console.log(err))
};
  

  return (
    <>
      <div id="PostDiv" >

        {
          posts.map(({content,name,postedBy,time,_id,likes})=>{
            
            return <Post content={content} name={name} time={time} likes={likes} userId={user._id}  _id={_id} key={_id} LikePost={({postId,userId})=>LikePost({postId,userId})} UnlikePost={({postId,userId})=>UnlikePost({postId,userId})} />
          })
        }

      </div>
    </>
  )
}
export default Authroute(Home)