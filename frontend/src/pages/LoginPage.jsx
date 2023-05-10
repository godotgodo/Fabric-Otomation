import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const apiUrl=process.env.REACT_APP_API_URL;

function LoginPage() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    

    const loginPost=(email,password)=>{
        const userInfo={
            email:email,
            password:password
        }

        fetch(`${apiUrl}/api/admins/login`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify(userInfo)
        }).then(response=>response.json()).then(data=>{
            localStorage.setItem('authToken',data.token);
            navigate('/admin');
        }).catch(error=>console.log(error))
    }

    const handleLoginClick=()=>{
        if (email) {
            loginPost(email,password);
        }
    }
  return (
    <div>
      <section className="bg-gray-50">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Hesabınıza Giriş Yapın.
              </h1>
              <div className="space-y-4 md:space-y-6">
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                      <input type="email" onChange={(e)=>setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Şifre</label>
                      <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <button onClick={handleLoginClick} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Giriş yap</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Hesabınız yok mu? <a href="signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Kayıt ol</a>
                  </p>
              </div>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default LoginPage