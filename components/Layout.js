import TopNav from './TopNav';
import BottomNav from './BottomNav';
import Home from './Home';
import { useEffect, useState } from 'react';


export default function Layout({children}) {
    const [user,setUser] = useState("")

    useEffect(()=>{
        if (typeof window !== "undefined") {
            var User = JSON.parse(localStorage.getItem('user'))
            if(User){
                setUser(User)
            }
        }
    },[])
    
    
        return(
            <>
                {
                    user?
                    <>
                    <TopNav />
                    <div className="TopNavClone"></div>
                    </>
                    :
                    ""
                }
                {children}
                
                {
                    user?
                    <>
                    <br /><br /><br />
                    <BottomNav />
                    </>
                    :
                    ""
                }
                
            </>
        )
    
    
};
