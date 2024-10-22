import React from 'react'
import Layout from './layouts/Layout.jsx'
import { Link } from 'react-router-dom';
import "./index.css"

const Pagenotfound = () => {
  return (
    <Layout>
     <div className='pnf'>
      <h1 className='font-size'>404</h1>
      <h2> Page not found !</h2>
      <Link to='/' className='back rounded-2 '>
           Go Back
      </Link>
      </div>
    </Layout>
  )
}

export default Pagenotfound;
