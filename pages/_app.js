import '../styles/globals.css'
import Layout from '../components/Layout'
import Login from '../components/Login'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps,user }) {
  

  return (
    <Layout>
        <Component {...pageProps} />
        {/* <Login /> */}
    </Layout>
  )
}

export default MyApp
