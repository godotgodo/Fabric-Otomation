import React from 'react'
import Navbar from '../components/Navbar'
import VerticalTabs from '../components/VerticalTabs'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router'
const apiUrl=process.env.REACT_APP_API_URL;

function AdminPanelPage() {
  let authToken=localStorage.getItem('authToken');
  const navigate=useNavigate();

  const getEmployees = () => {
    fetch(`${apiUrl}/api/employees`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error(response.statusText);
      }
    })
      .then(data => {
        console.log("oturumdasınız");
      })
      .catch(err => {
        navigate('/');
      });
  }

  getEmployees();

  return (
    <div>
        <Navbar authToken={authToken}/>
        <VerticalTabs authToken={authToken}/>
        <Footer authToken={authToken}/>
    </div>
  )
}

export default AdminPanelPage