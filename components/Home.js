import React from 'react'
import Link from 'next/link'
import { Button } from '@mui/material'

function Home() {
    return (
        <div id="root">
        <div className="home-one">
            <code>Dating</code>
        </div>
        <div className="home-two">
            <h1>Matched <code>Dating</code> Online</h1>
        </div>
        <div className="home-three">
            <img src="https://cdn-icons-png.flaticon.com/512/4360/4360033.png" width="250px" />
        </div>
        <div className="home-four">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis dignissimos eaque illo soluta 
            </p>
        </div>
        <div className="home-five">
            <Link href="/login">
            <a>
                <Button id="HomeBtn" >Countinue</Button>
            </a>
            </Link>
        </div>
        </div>
    )
}

export default Home