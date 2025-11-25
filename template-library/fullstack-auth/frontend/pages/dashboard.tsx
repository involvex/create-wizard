/** @format */

import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        window.location.href = '/' // Redirect to login if no token
        return
      }

      try {
        // In a real app, you'd have a backend endpoint to verify the token
        // For this template, we'll just assume the token is valid if it exists
        setMessage('Welcome to your dashboard! You are logged in.')
      } catch (error) {
        console.error('Token verification failed:', error)
        localStorage.removeItem('token')
        window.location.href = '/'
      }
    }

    verifyToken()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#333' }}>Dashboard</h1>
      <p style={{ textAlign: 'center', color: '#555' }}>{message}</p>
      <button
        onClick={handleLogout}
        style={{
          display: 'block',
          margin: '20px auto',
          padding: '10px 15px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  )
}
