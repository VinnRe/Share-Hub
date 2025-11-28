import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router'

const LayoutNavBar = () => {
  return (
    <>
        <NavBar />
        <main>
            <Outlet />
        </main>
    </>
  )
}

export default LayoutNavBar
