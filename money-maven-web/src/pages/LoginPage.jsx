import React from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'


function LoginPage() {
  return (
    <div className="p-5">  
      <LoginForm />
    <Link to='/income'>Income</Link>
    <div></div>
    
    </div>
    
  )
}

export default LoginPage