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
// editte input:texttekiler hiç değişmezse stateteki değer boş olduğu için hata veriyor şu anda placeholder koyuldu

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
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
  const [machinesData, setMachinesData] = useState([]);
  const [newMachineName, setNewMachineName] = useState('');
  const [newMachineLine, setNewMachineLine] = useState('');
  const [productionLinesData, setProductionLinesData] = useState([]);
  const [editMachineLine, setEditMachineLine] = useState('');
  const [editMachineName, setEditMachineName] = useState('');

  const putMachine=(machine)=>{
    const updatedMachineInfo={
      machine_name:editMachineName,
      line_id:editMachineLine
    }
    fetch(`${apiUrl}/api/machines/${machine.machine_id}/update`,{
      method:'PUT',
      headers:{
       'Accept':'application/json',
       'Content-type':'application/json',
       'Authorization':`Bearer ${authToken}` 
      },
      body:JSON.stringify(updatedMachineInfo)
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error('Bir sorun oluştu lütfen girdiğiniz verileri kontrol ettikten sonra tekrar deneyiniz.');
      }
    })
    .then(data => {
      getMachines();
      snackbarControl(data.machine_name, " güncellendi.");
    })
    .catch(err => {
      snackbarControl(err.message," ");
    });
  }

  const getMachines = () => {
    fetch(`${apiUrl}/api/machines`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => response.json()).then(data => {
      console.log(data)
      setMachinesData(data)
    }).catch(err => console.log(err))
  }

  const getProductionLines = () => {
    fetch(`${apiUrl}/api/productionlines`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => response.json()).then(data => {
      setProductionLinesData(data);
    }).catch(err => console.log(err))
  }

  const postNewMachine = () => {
    const newMachineInfo = {
      machine_name: newMachineName,
      line_id: newMachineLine
    }

    console.log(newMachineInfo);

    fetch(`${apiUrl}/api/machines/store`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(newMachineInfo)
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error('Bir sorun oluştu lütfen girdiğiniz verileri kontrol ettikten sonra tekrar deneyiniz.');
      }
    })
    .then(data => {
      getMachines();
      snackbarControl(data.machine_name, " eklendi");
    })
    .catch(err => {
      snackbarControl(err.message," ");
    });
  }

  const deleteMachine = (machine) => {
    fetch(`${apiUrl}/api/machines/${machine.machine_id}`, {
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
      getMachines();
      snackbarControl(" ", " Silindi");
    })
    .catch(err => {
      snackbarControl(err.message," ");
    });
  }

  const putMaintenanceDone = (machine) => {
    fetch(`${apiUrl}/api/machines/${machine.machine_id}/maintenance`, {
      method: 'PUT',
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
      getMachines();
      snackbarControl(" ", "Bakımı yapıldı.");
    })
    .catch(err => {
      snackbarControl(err.message," ");
    });
  }

  const handleEditModalOpen = (machine) => {
    setEditModalOpen(true);
    setEditMachineName(machine.machine_name);
    setEditMachineLine(machine.line_id);
    setEditModalData(machine);
    getProductionLines();
  };

  const handleEditModalClose = () => setEditModalOpen(false);
  const handleAddModalClose = () => setAddModalOpen(false);

  const handleDelete = (machine) => {
    deleteMachine(machine);
  }

  const handleEdit = (machine) => {
    putMachine(machine);
  }

  const handleAdd = () => {
    postNewMachine();
  }

  const handleMaintenanceDone = (machine) => {
    putMaintenanceDone(machine);
  }

  useEffect(() => {
    getMachines();
  }, [])

  const snackbarControl = (value, info) => {
    setSnackBarOpen(true);
    setTimeout(() => {
      setSnackBarOpen(false);
    }, 3000);
    let text = value + ` ${info}`;
    setSnackBarText(text);
  }

  return (
    <TableContainer component={Paper}>
      <div className='flex justify-between items-center'>
        <h1 className='py-4 px-8 text-3xl'>Makineler</h1>
        <button className='ml-auto mr-24' onClick={() => { setAddModalOpen(true); getProductionLines(); }}><AddCircleIcon className='!text-5xl' color='success' /></button>
      </div>

      <Table sx={{ minWidth: 1100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Machine Name</TableCell>
            <TableCell align="right">Maintenance Date</TableCell>
            <TableCell align="right">Production Line</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {machinesData.map((machine) => (
            <TableRow
              key={machine.machine_name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover={true}
            >
              <TableCell component="th" scope="row">
                {machine.machine_name}
              </TableCell>
              <TableCell align="right">{machine.maintenance_date}</TableCell>
              <TableCell align="right">{machine.production_line?.line_name ? machine.production_line.line_name:'- '}</TableCell>
              <TableCell align='left'>
                <Chip
                  variant="soft"
                  color="danger"
                  endDecorator={<ChipDelete onDelete={() => { handleDelete(machine); }} />}
                >
                  Delete
                </Chip>
                <Chip variant='soft' color='primary' onClick={() => handleEditModalOpen(machine)} className="relative" >
                  Edit
                  <EditIcon fontSize='small' className='' />
                </Chip>
                <Chip variant='soft' color='info'><button onClick={() => handleMaintenanceDone(machine)} >Maintenance Done</button></Chip>
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
            <h3 className='text-2xl font-light'>Edit Machine</h3>
            <div className='mt-2 ml-6'>
              <div>
                <span >Machine Name</span>
                <input className='w-40 p-4 shadow-md rounded-md bg-slate-100 ml-2' type="text" defaultValue={editModalData.machine_name} onChange={(e)=>setEditMachineName(e.target.value)} />
              </div>
              <div>
                <span>Production Line</span>
                <select name="edit_machine_line" id="edit_machine_line" className='w-40 p-4 bg-slate-100 rounded-md shadow-md ml-4 mt-2' defaultValue={editModalData.line_id} onChange={(e) => setEditMachineLine(e.target.value)}>
                  {productionLinesData.map((productionLine) => <option value={productionLine.line_id} key={productionLine.line_id}>{productionLine.line_name}</option>)}
                </select>
              </div>
            </div>
            {editModalData.machine_name} ile ilgili bilgiler.
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
            <h3 className='mt-4 ml-4 font-light text-2xl'>Add Machine</h3>
            <div className='mt-4 ml-8'>
              <div>
                <span>Machine Name</span>
                <input type="text" placeholder='machine name...' className='w-40 p-4 bg-slate-100 rounded-md shadow-md ml-4' onChange={(e) => setNewMachineName(e.target.value)} />
              </div>
              <div className='mt-4'>
                <span>Production Lines</span>
                <select className='w-40 p-4 ml-2 shadow-md rounded-md bg-slate-100' name="production_lines" id="production_lines" onChange={(e) => setNewMachineLine(e.target.value)}>
                  {productionLinesData.map(productionLine => <option value={productionLine.line_id} key={productionLine.line_id} >{productionLine.line_name}</option>)}
                </select>
              </div>
            </div>
            <button className='absolute bottom-8 right-16 bg-green-500 px-4 py-2 rounded-full' onClick={() => { handleAdd(); }}>
              Ekle
            </button>
          </Box>
        </Fade>
      </Modal>

    </TableContainer>
  );
}