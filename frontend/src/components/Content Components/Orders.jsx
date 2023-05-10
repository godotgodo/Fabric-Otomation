import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from 'react';
const apiUrl=process.env.REACT_APP_API_URL;

// ordersin modal,snackbar vs içindeki componentlerin hepsi direkt burada yazıldı


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function BasicTable({ authToken }) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [machines, setMachines] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [addDescription, setAddDescription] = useState('');

  const getOrders = () => {
    fetch(`${apiUrl}/api/orders`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => response.json()).then(data => setOrdersData(data)).catch(err => console.log(err))
  }
  const getMachines = () => {
    fetch(`${apiUrl}/api/machines`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    }).then(response => response.json()).then(data => {
      setMachines(data);
      console.log(data)
    }).catch(err => console.log(err))
  }
  const getEmployees = () => {
    fetch(`${apiUrl}/api/employees`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    }).then(response => response.json()).then(data => {
      setEmployees(data);
      console.log(data)
    }).catch(err => console.log(err))
  }
  const orderCompleted_Put = (order) => {
    fetch(`${apiUrl}/api/orders/${order.order_id}/end`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err))
  }
  const deleteOrder = (order) => {
    fetch(`${apiUrl}/api/orders/${order.order_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err))
  }
  const postOrder = () => {
    const orderInfo = {
      order_description: addDescription,
      machine_id: selectedMachine,
      employee_id: selectedEmployee
    }

    fetch(`${apiUrl}/api/orders/store`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(orderInfo)
    }).then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err));
  }


  const handleAddModalClose = () => setAddModalOpen(false);

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
    getMachines();
    getEmployees();
  }

  const handleDelete = (order) => {
    deleteOrder(order);
    }

  const handleAdd = () => {
    postOrder();
  }

  const checkBoxChanged = (order, e) => {
    console.log(order);
    e.target.checked = true;
    e.target.disabled = true;
    setSnackBarOpen(true);
    setTimeout(() => {
      setSnackBarOpen(false);
    }, 3000);
    orderCompleted_Put(order);
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    let text = order.order_id + ' idli emir ' + today + ' tarihinde tamamlandı';
    setSnackBarText(text);

  }

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <TableContainer component={Paper}>
      <div className='flex justify-between items-center'>
        <h1 className='py-4 px-8 text-3xl'>Orders</h1>
        <button className='ml-auto mr-24' onClick={() => { handleAddModalOpen() }}><AddCircleIcon className='!text-5xl' color='success' /></button>
      </div>

      <Table sx={{ minWidth: 1100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Complete</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Starting Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Machine Name</TableCell>
            <TableCell align="right">Employee Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersData.map((order) => (
            <TableRow
              key={order.order_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover={true}
            >
              <TableCell className='!p-0'>
                <FormControlLabel labelPlacement='top' control={<Checkbox onChange={(e) => { checkBoxChanged(order, e) }} />} checked={order.end_date ? true : false} label="" />
              </TableCell>
              <TableCell component="th" scope="row">
                {order.order_description}
              </TableCell>
              <TableCell align="right">{order.starting_date}</TableCell>
              <TableCell align="right">{order.end_date ? order.end_date : '-'}</TableCell>
              <TableCell align="right">{order.machine.machine_name}</TableCell>
              <TableCell align="right">{order.employee.name}</TableCell>
              <TableCell align='left'>
                <Chip
                  variant="soft"
                  color="danger"
                  endDecorator={<ChipDelete onDelete={() => { handleDelete(order); }} />}
                >
                  Delete
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
            <h3 className='text-4xl font-light'>Add order</h3>
            <div className='ml-8 mt-8'>
              <div>
                <span className='text-2xl mr-8'>Select Machine</span>
                <select name="add_machine_selecting" id="add_machine_selecting" onChange={(e) => setSelectedMachine(e.target.value)} className='bg-slate-200 w-24 h-8 rounded-md shadow-md'>
                  {
                    machines.map(machine => <option value={machine.machine_id} key={machine.machine_id}>{machine.machine_name}</option>)
                  }
                </select>
              </div>
              <div className='mt-6'>
                <span className='text-2xl  mr-5'>Select Employee</span>
                <select name="add_employee_selecting" id="add_employee_selecting" onChange={(e) => setSelectedEmployee(e.target.value)} className='bg-slate-200 w-24 h-8 rounded-md shadow-md'>
                  {
                    employees.map(employee => <option value={employee.employee_id} key={employee.employee_id}>{employee.name}</option>)
                  }
                </select>
              </div>
              <div className='mt-6 w-full'>
                <textarea name="add_description" id="add_description" cols="60" rows="7" onChange={(e) => setAddDescription(e.target.value)} className='bg-slate-100 border-none p-4 rounded-xl shadow-xl'></textarea>
              </div>

            </div>
            <button className='absolute bottom-8 right-16 bg-green-500 px-4 py-2 rounded-full' onClick={() => { handleAdd() }}>
              Ekle
            </button>
          </Box>
        </Fade>
      </Modal>

    </TableContainer >
  );
}