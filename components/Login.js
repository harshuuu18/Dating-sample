import { Button } from '@mui/material'
import React, { useState } from 'react'
import {url} from '../helpers/config.json'
import validator from 'validator'
import { useRouter } from 'next/router'

function Login() {
    const [login1,setLogin1] = useState({})
    const [login2,setLogin2] = useState({transform:'translateX(500px)', opacity:0})
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [otp,setOtp] = useState(0)
    const [verify,setVerify] = useState({img:'',status:"Please Check your Mail",valid:""})
    const router = useRouter()
    

    const SendMail = async()=>{

        var GeneratedOTP = await Math.floor(100000 + Math.random() * 900000)

        setOtp(GeneratedOTP)

        console.log("Generated OTP: " + GeneratedOTP)

        if(!email || !name) return console.log("Please enter all fields")
        if(!validator.isEmail(email)) return console.log("Please enter valid mail")

        setLogin1({
            transform:'translateX(-200px)',
            opacity:0
        })
        setLogin2({
            transform:'translateX(0px)',
            opacity:1
        })

        try{
            const response = await fetch('api/mail',{
                method:"post",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email,otp:GeneratedOTP})
            })
            
            const data = await response.json()
            console.log(data)
            
        }catch(err){
            console.log(err)
            
        }
        
            
        // <input type="file" id="fileProfile2" name="fileProfile2"  accept="image/png,image/jpeg">
    }
    const RsendMail = ()=>{
        
        setLogin1({
            transform:'translateX(0px)',
            opacity:1
        })
        setLogin2({
            transform:'translateX(500px)', opacity:0
        })
    }
    const ValidateOtp = async(e)=>{
        var userOtp = e.target.value
        
        if(userOtp == otp) {
            console.log("right otp")
            e.target.disabled = true
            e.target.style.color = "gray"
            setVerify({img:'/img/check.png',status:"OTP Verified",valid:"valid-button"})
            try{
                const response = await fetch('api/login',{
                    method:"post",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({name,email})
                })
                const data = await response.json()
                localStorage.setItem('user',JSON.stringify(data.user))
                setTimeout(()=>{
                router.push('/').then(r=>router.reload())
                
            },3000)
                
                
            }catch(err){
                console.log(err)
            }

        }else if(userOtp !== otp){
            setVerify({img:'/img/decline.png',status:"OTP not Matched",valid:""})
        }

    }
    return (
        <>
        <img src="/star.svg" id="StarSvg" className="svgClass" />
        <img src="/star.svg" id="StarSvg1" className="svgClass" />
        <img src="/star.svg" id="StarSvg2" className="svgClass" />
        <img src="/star.svg" id="StarSvg3" className="svgClass" />
        <img src="/star.svg" id="StarSvg4" className="svgClass" />
        <img src="/star.svg" id="StarSvg4" className="svgClass" />
            <div className="login-div">
                <form onSubmit={(e)=>e.preventDefault()} style={login1} >
                    <div className="login-heading">
                        <h2>Login</h2>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="input-div">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)} autoFocus />
                    </div>
                    <div className="input-div">
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} /> 
                    </div>
                    <br/>
                    <div className="input-div">
                        <Button id="AddPostBtn" onClick={()=>{SendMail()}} >Login</Button>
                    </div>
                    
                </form>

                <form style={login2} onSubmit={(e)=>e.preventDefault()} >
                <div className="login-heading">
                    <h2>Enter the OTP sent on Your Email</h2>
                </div>
                <br />
                <br />
                <br />

                <div className="otp-input">
                    <input type="number" placeholder="- - - -"  onChange={(e)=>{ValidateOtp(e)}}  />
                </div>
                <div className="show-otp-status">
                    
                    <img src={verify.img} alt="" />  {verify.status}
                </div>
                <br/>
                <p onClick={()=>RsendMail()} >Change Email</p>
                <div className="input-div">
                    <Button className={verify.valid} id="AddPostBtn" >Login</Button>                    
                </div>
                
            </form>
            </div>    

            
        </>

        
    )
}

export default Login
