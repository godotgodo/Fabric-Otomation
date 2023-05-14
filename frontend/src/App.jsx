import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPanelPage from './pages/AdminPanelPage';

function App() {
  const apiUrl=process.env.REACT_APP_API_URL;
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='login' element={<LoginPage />}/>
      <Route path='admin' element={<AdminPanelPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
