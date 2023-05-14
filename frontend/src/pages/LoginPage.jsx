import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Snackbar from '@mui/material/Snackbar';
const apiUrl = process.env.REACT_APP_API_URL;

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarText, setSnackBarText] = useState('');

    const snackbarControl = (value, info) => {
        setSnackBarOpen(true);
        setTimeout(() => {
            setSnackBarOpen(false);
        }, 3000);
        let text = value + ` ${info}`;
        setSnackBarText(text);
    }

    if (localStorage.getItem('authToken')) {
        const authToken = localStorage.getItem('authToken');
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
                    throw new Error('Unauth');
                }
            })
                .then(data => {
                    snackbarControl(" ", " ");
                    navigate('/admin');
                })
                .catch(err => {
                });
        }
        getEmployees();
    }

    const loginPost = (email, password) => {
        const userInfo = {
            email: email,
            password: password
        }

        fetch(`${apiUrl}/api/admins/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error('Bir sorun oluştu, lütfen girdiğiniz verileri kontrol ediniz.');
            }
        })
            .then(data => {
                snackbarControl(data.admin.name, " giriş yaptı.");
                localStorage.setItem('authToken', data.token);
                navigate('/admin');
            })
            .catch(err => {
                snackbarControl(err.message, " ");
            });
    }

    const handleLoginClick = () => {
        if (email) {
            loginPost(email, password);
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
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Şifre</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <button onClick={handleLoginClick} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Giriş yap</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={3000}
                message={snackBarText}
            />

        </div>
    )
}

export default LoginPage