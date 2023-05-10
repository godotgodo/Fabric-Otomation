import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from 'react';
const apiUrl=process.env.REACT_APP_API_URL;

// modal snackbar vs hepsi içinde yazıldı

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicTable({ authToken }) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [employeesData, setEmployeesData] = useState([]);
  const [newEmployeeName,setNewEmployeeName]=useState('');
  const [newEmployeeEmail,setNewEmployeeEmail]=useState('');
  const [newEmployeeTcno,setNewEmployeeTcno]=useState('');
  const [newEmployeePhoneno,setNewEmployeePhoneno]=useState('');
  const [newEmployeeSalary,setNewEmployeeSalary]=useState('');
  const [newEmployeeDateOfStart,setNewEmployeeDateOfStart]=useState('');

  const getEmployees = () => {
    fetch(`${apiUrl}/api/employees`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => response.json()).then(data => {
      setEmployeesData(data);
    }).catch(err => console.log(err))
  }

  const postNewEmployee=()=>{
    const newEmployeeInfo={
      name:newEmployeeName,
      email:newEmployeeEmail,
      tc_no:newEmployeeTcno,
      phone_number:newEmployeePhoneno,
      salary:newEmployeeSalary,
      date_of_start:newEmployeeDateOfStart
    }
    fetch(`${apiUrl}/api/employees/store`,{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json',
        'Authorization':`Bearer ${authToken}`
      },
      body:JSON.stringify(newEmployeeInfo)
    }).then(response=>response.json()).then(data=>{
      console.log(data);
      snackbarControl(data.name,' eklendi.')
    }).catch(err=>console.log(err))
  }

  const deleteEmployee=(employee)=>{
    fetch(`${apiUrl}/api/employees/${employee.employee_id}`,{
      method:'DELETE',
      headers:{
        'Accept':'application/json',
        'Authorization':`Bearer ${authToken}`
      }
    }).then(response=>response.json()).then(data=>{
      snackbarControl(employee.employee_name,' silindi.')
    }).catch(err=>console.log(err))
  }

  const handleEditModalOpen = (row) => {
    setEditModalOpen(true);
    setEditModalData(row);
  };

  const handleEditModalClose = () => setEditModalOpen(false);
  const handleAddModalClose = () => setAddModalOpen(false);

  const handleDelete = (employee) => {
    deleteEmployee(employee);
  }

  const handleEdit = (editModalData) => {
    console.log(editModalData);
    setSnackBarOpen(true);
    setTimeout(() => {
      setSnackBarOpen(false);
    }, 3000);
    let text = editModalData.name + ' güncellendi';
    setSnackBarText(text);
  }

  const handleAdd=()=>{
    postNewEmployee();
  }

  const snackbarControl = (value, info) => {
    setSnackBarOpen(true);
    setTimeout(() => {
      setSnackBarOpen(false);
    }, 3000);
    let text = value + ` ${info}`;
    setSnackBarText(text);
  }

  useEffect(() => {
    getEmployees();
  }, [])

  return (
    <TableContainer component={Paper}>
      <div className='flex justify-between items-center'>
        <h1 className='py-4 px-8 text-3xl'>Personeller</h1>
        <button className='ml-auto mr-24' onClick={() => { setAddModalOpen(true); }}><AddCircleIcon className='!text-5xl' color='success' /></button>
      </div>

      <Table sx={{ minWidth: 1100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">T.C. no</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Phone number</TableCell>
            <TableCell align="right">Date of start</TableCell>
            <TableCell align="right">Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeesData.map((employee) => (
            <TableRow
              key={employee.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover={true}
            >
              <TableCell component="th" scope="row">
                {employee.name}
              </TableCell>
              <TableCell align="right">{employee.tc_no}</TableCell>
              <TableCell align="right">{employee.email}</TableCell>
              <TableCell align="right">{employee.phone_number}</TableCell>
              <TableCell align="right">{employee.date_of_start}</TableCell>
              <TableCell align="right">{employee.salary}</TableCell>
              <TableCell align='left'>
                <Chip
                  variant="soft"
                  color="danger"
                  endDecorator={<ChipDelete onDelete={() => { handleDelete(employee); }} />}
                >
                  Delete
                </Chip>
                <Chip variant='soft' color='primary' onClick={() => handleEditModalOpen(employee)} className="relative" >
                  Edit
                  <EditIcon fontSize='small' className='' />
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        message={snackBarText}
      />

      {/* modal for editing. */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={editModalOpen}
        onClose={handleEditModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={editModalOpen}>
          <Box sx={modalStyle}>
            {editModalData.name} ile ilgili bilgiler.
            <button className='absolute bottom-8 right-16 bg-blue-300 px-4 py-2 rounded-full' onClick={() => { handleEdit(editModalData) }}>
              Kaydet
            </button>
          </Box>
        </Fade>
      </Modal>

      {/* modal for orders adding. */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={addModalOpen}
        onClose={handleAddModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={addModalOpen}>
          <Box sx={modalStyle}>
            <h3 className='text-2xl font-light ml-4 mt-6'>Add Employee</h3>
            <div className='mt-4 ml-10'>
              <div>
                <span>Name</span>
                <input type="text" onChange={(e)=>setNewEmployeeName(e.target.value)} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>Email</span>
                <input type="text" onChange={(e)=>setNewEmployeeEmail(e.target.value)} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>T.C no</span>
                <input type="text" onChange={(e)=>setNewEmployeeTcno(e.target.value)} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>Phone no</span>
                <input type="text" onChange={(e)=>setNewEmployeePhoneno(e.target.value)} className='bg-slate-100 w-[8.5rem] p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>Salary</span>
                <input type="text" onChange={(e)=>setNewEmployeeSalary(e.target.value)} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>Date of start</span>
                <input type="text" onChange={(e)=>setNewEmployeeDateOfStart(e.target.value)} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
            </div>
            <button className='absolute bottom-8 right-16 bg-green-500 px-4 py-2 rounded-full' onClick={() => { handleAdd() }}>
              Ekle
            </button>
          </Box>
        </Fade>
      </Modal>

    </TableContainer>
  );
}