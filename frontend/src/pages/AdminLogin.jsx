import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AdminDataContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ adminData, setAdminData ] = useState({})

  const { admin, setAdmin } = useContext(AdminDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    const adminData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admins/login`, adminData)

    if (response.status === 200) {
      const data = response.data
      setAdmin(data.admin)
      localStorage.setItem('token', data.token)
      navigate('/admin-home')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <img className='w-16 ml-8' src='/log.png' alt="GrameenGo Logo" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center'>New here? <Link to='/admin-signup' className='text-blue-600'>Register as Admin</Link></p>
      </div>
      <div>
        <Link
          to='/captain-login'
          className='bg-[#1015b4] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Delivery Man</Link>
        <Link
          to='/login'
          className='bg-[#1015b4] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default AdminLogin