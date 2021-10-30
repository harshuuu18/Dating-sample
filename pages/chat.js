import { Button } from "@mui/material";
import { useEffect,useState } from "react";
import AuthRoute from '../helpers/AuthRoute'


function chat() {
    const [users,setUsers] = useState([])

    useEffect(()=>{
        fetch('/api/AllUser').then(r=>r.json().then(d=>{
            setUsers(d)
        })).catch(err=>console.log(err))
    },[])

    const Chat = ({position,message}) =>{
        return (
            <div className="DetailChats">
                <img src="/user512.png" className={position} width="20px" />
                <span className={position} >
                {message}
                </span>
            </div>
        )
    }

    const User = ({image,name,_id})=>{
        return (
            <div className="ChatUsers" onClick={(e)=>UserSelect(e)} >
                <img src="/user512.png" width="30px" />
                <span>{name}</span>
            </div>
    )
    }

    const UserSelect = (e)=>{
        var ParentElem = e.target.parentElement.parentElement
        var ScrollElem = e.target.parentElement
        var ScrollWidth = ParentElem.scrollWidth
        
        ParentElem.scrollLeft = ScrollWidth/2
    }

    return (
        <div className="ChatDiv">
            <div className="ChatAllUserDiv">
                <div className="Chatheading">
                    <h1>Chat</h1>
                </div>
                <br />
                <br />
                <br />
                <br />
                {
                    users.map(({name,email,_id})=>{
                        return <User name={name} />
                    })
                }
                
                
            </div>

            <div className="DetailChatDiv">
                <div className="DetailChatHeading">
                    <div className="DetailChatUser">
                        <img src="/user512.png" width="30px" />                        
                        <span>
                            <h3>Harsh</h3>
                            <p>Online</p>
                        </span>
                    </div>
                </div>

                <div className="DetailChatsDiv">
                    <Chat position="right" message="hi" />
                    <Chat position="left" message="hello" />
                    <Chat position="right" message="how are you brother !" />
                    <Chat position="right" message="hi" />
                    <Chat position="right" message="hi" />
                </div>
        
                <div className="DetailChatFooter">
                    <form className="DetailChatForm" >
                        <input type="text" />
                        <Button id="ChatSendBtn" >Send</Button>
                    </form>
                </div>
            </div>
        </div>
    )
};
export default AuthRoute(chat)