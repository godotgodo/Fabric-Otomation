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
const apiUrl = process.env.REACT_APP_API_URL;

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
const giveAdminModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 300,
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
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [newEmployeeTcno, setNewEmployeeTcno] = useState('');
  const [newEmployeePhoneno, setNewEmployeePhoneno] = useState('');
  const [newEmployeeSalary, setNewEmployeeSalary] = useState('');
  const [newEmployeeDateOfStart, setNewEmployeeDateOfStart] = useState('');
  const [password, setPassword] = useState('');
  const [employeeGiveAdminModal,setEmployeeGiveAdminModal]=useState({});
  const [giveAdminModalOpen,setGiveAdminModalOpen]=useState(false);
  const [editedEmployeeData, setEditedEmployeeData] = useState({
    name: '',
    email: '',
    tc_no: '',
    phone_number: '',
    salary: 0,
  })

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

  const postNewEmployee = () => {
    const newEmployeeInfo = {
      name: newEmployeeName,
      email: newEmployeeEmail,
      tc_no: newEmployeeTcno,
      phone_number: newEmployeePhoneno,
      salary: newEmployeeSalary,
      date_of_start: newEmployeeDateOfStart
    }
    fetch(`${apiUrl}/api/employees/store`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(newEmployeeInfo)
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error('Bir sorun oluştu lütfen girdiğiniz verileri kontrol ettikten sonra tekrar deneyiniz.');
      }
    })
      .then(data => {
        getEmployees();
        snackbarControl(data.name, " eklendi");
      })
      .catch(err => {
        snackbarControl(err.message, " ");
      });
  }

  const deleteEmployee = (employee) => {
    fetch(`${apiUrl}/api/employees/${employee.employee_id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error('Bir sorun oluştu lütfen girdiğiniz verileri kontrol ettikten sonra tekrar deneyiniz.');
      }
    })
      .then(data => {
        getEmployees();
        snackbarControl(" ", "Silindi");
      })
      .catch(err => {
        snackbarControl(err.message, " ");
      });
  }

  const postRegister = (employee) => {
    console.log(password);
    console.log(employee.employee_id)
    fetch(`${apiUrl}/api/admins/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorizaton': `Bearer ${authToken}`
      },
      body: JSON.stringify({ employee_id: employee.employee_id, password: password })
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error('Bir sorun oluştu lütfen girdiğiniz verileri kontrol ettikten sonra tekrar deneyiniz.');
      }
    })
      .then(data => {
        getEmployees();
        snackbarControl(data.employee.name, " e admin rolü verildi");
      })
      .catch(err => {
        snackbarControl(err.message, " ");
      });
  }

  const putEmployee = () => {
    console.log(editedEmployeeData);
    console.log(editModalData.employee_id)
    fetch(`${apiUrl}/api/employees/${editModalData.employee_id}/update`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(editedEmployeeData)
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error('Bir sorun oluştu lütfen girdiğiniz verileri kontrol ettikten sonra tekrar deneyiniz.');
      }
    })
      .then(data => {
        getEmployees();
        snackbarControl(data.name, " güncellendi");
      })
      .catch(err => {
        snackbarControl(err.message, " ");
      });
  }

  const handleEditModalOpen = (row) => {
    setEditModalOpen(true);
    setEditModalData(row);
    console.log(row);
    setEditedEmployeeData({
      name: row.name,
      email: row.email,
      tc_no: row.tc_no,
      phone_number: row.phone_number,
      salary: row.salary
    })
  };

  const handleEditModalClose = () => setEditModalOpen(false);
  const handleAddModalClose = () => setAddModalOpen(false);

  const handleDelete = (employee) => {
    deleteEmployee(employee);
  }

  const handleGiveAdmin = (employee) => {
    setEmployeeGiveAdminModal(employee);
    setGiveAdminModalOpen(true);
  }

  const handleEdit = () => {
    putEmployee();
  }

  const handleAdd = () => {
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
              <TableCell align="right">{employee.date_of_start.split(" ")[0]}</TableCell>
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
                <Chip variant='soft' color='info' onClick={() => handleGiveAdmin(employee)} className="relative" >
                  Give Admin
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
            <h3 className='text-2xl font-light ml-4 mt-6'>Edit Employee</h3>
            <div className='mt-4 ml-10'>
              <div>
                <span>Name</span>
                <input type="text" defaultValue={editedEmployeeData.name} onChange={(e) => setEditedEmployeeData({ ...editedEmployeeData, name: e.target.value })} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>Email</span>
                <input type="text" defaultValue={editedEmployeeData.email} onChange={(e) => setEditedEmployeeData({ ...editedEmployeeData, email: e.target.value })} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>T.C no</span>
                <input type="text" defaultValue={editedEmployeeData.tc_no} onChange={(e) => setEditedEmployeeData({ ...editedEmployeeData, tc_no: e.target.value })} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>Phone no</span>
                <input type="text" defaultValue={editedEmployeeData.phone_number} onChange={(e) => setEditedEmployeeData({ ...editedEmployeeData, phone_number: e.target.value })} className='bg-slate-100 w-[8.5rem] p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>Salary</span>
                <input type="text" defaultValue={editedEmployeeData.salary} onChange={(e) => setEditedEmployeeData({ ...editedEmployeeData, salary: e.target.value })} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
            </div>
            {editModalData.name} ile ilgili bilgiler.
            <button className='absolute bottom-8 right-16 bg-blue-300 px-4 py-2 rounded-full' onClick={() => { handleEdit() }}>
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
                <input type="text" onChange={(e) => setNewEmployeeName(e.target.value)} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>Email</span>
                <input type="text" onChange={(e) => setNewEmployeeEmail(e.target.value)} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>T.C no</span>
                <input type="text" onChange={(e) => setNewEmployeeTcno(e.target.value)} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>Phone no</span>
                <input type="text" onChange={(e) => setNewEmployeePhoneno(e.target.value)} className='bg-slate-100 w-[8.5rem] p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>Salary</span>
                <input type="text" onChange={(e) => setNewEmployeeSalary(e.target.value)} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
              <div>
                <span>Date of start</span>
                <input type="text" onChange={(e) => setNewEmployeeDateOfStart(e.target.value)} className='bg-slate-100 w-40 p-4 shadow-md rounded-md ml-2 mb-4' />
              </div>
            </div>
            <button className='absolute bottom-8 right-16 bg-green-500 px-4 py-2 rounded-full' onClick={() => { handleAdd() }}>
              Ekle
            </button>
          </Box>
        </Fade>
      </Modal>

      <Modal
                  open={giveAdminModalOpen}
                  onClose={()=>setGiveAdminModalOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={giveAdminModal}>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password_register" id={`password_register_${employeeGiveAdminModal.employee_id}`} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <button className='w-full mt-4 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onClick={()=>postRegister(employeeGiveAdminModal)}>
                    Give Admin Permission
                  </button>
                  </Box>
                </Modal>

    </TableContainer>
  );
}