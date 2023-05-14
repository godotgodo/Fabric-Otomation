import React from 'react'
import { useNavigate } from 'react-router'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function HomePage() {
  const navigate=useNavigate();

  return (
    <div className='w-full h-full min-h-screen bg-slate-100 flex flex-col justify-center'>
      <h3 className='text-9xl'>Factory Home Page</h3>
      <p className='mt-8 text-2xl ml-8'>"Factory Automation" Application Written with PHP Laravel REST API and Single Page React.js.</p>
      <button onClick={()=>navigate('/login')} className='text-3xl text-white bg-slate-600 rounded-md shadow-md inline ml-auto mr-8 p-4 hover:scale-105'>Factory Otomation<span><ArrowForwardIosIcon/></span></button>
    </div>
  )
}

export default HomePage