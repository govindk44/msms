import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Headers/Header'

export default function PostLoginLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
