import React from 'react'
import Navbar from '../components/Navbar'
import VerticalTabs from '../components/VerticalTabs'
import Footer from '../components/Footer'

function AdminPanelPage() {
  let authToken=localStorage.getItem('authToken');
  
  return (
    <div>
        <Navbar authToken={authToken}/>
        <VerticalTabs authToken={authToken}/>
        <Footer authToken={authToken}/>
    </div>
  )
}

export default AdminPanelPage