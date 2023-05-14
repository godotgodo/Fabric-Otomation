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
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicTable({ authToken }) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [productionLinesData, setProductionLinesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [newLineName, setNewLineName] = useState('');
  const [editProductLineProduct, setEditProductLineProduct] = useState('');
  const [editProductLineName, setEditProductLineName] = useState('');

  useEffect(() => {
    getProductionLines();
  }, [])

  const putProductionLine = (productionLine) => {
    const productionLineInfo = {
      line_name: editProductLineName,
      product_id: editProductLineProduct
    }

    fetch(`${apiUrl}/api/productionlines/${productionLine.line_id}/update`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(productionLineInfo)
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error('Bir sorun oluştu lütfen girdiğiniz verileri kontrol ettikten sonra tekrar deneyiniz.');
      }
    })
    .then(data => {
      getProductionLines();
      snackbarControl(data.line_name, " güncellendi.");
    })
    .catch(err => {
      snackbarControl(err.message," ");
    });
  }

  const putLineEnd = (productionLine) => {
    fetch(`${apiUrl}/api/productionlines/${productionLine.line_id}/end`, {
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
      getProductionLines()
      snackbarControl(data.line_name, " sonlandırıldı.");
    })
    .catch(err => {
      snackbarControl(err.message," ");
    });
  }

  const postNewLine = () => {
    const newLineInfo = {
      line_name: newLineName,
      product_id: selectedProduct
    }
    fetch(`${apiUrl}/api/productionlines/store`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(newLineInfo)
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error('Bir sorun oluştu lütfen girdiğiniz verileri kontrol ettikten sonra tekrar deneyiniz.');
      }
    })
    .then(data => {
      getProductionLines();
      snackbarControl(data.line_name, " eklendi");
    })
    .catch(err => {
      snackbarControl(err.message," ");
    });
  }

  const getProducts = () => {
    fetch(`${apiUrl}/api/products`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => response.json()).then(data => {
      setProductsData(data);
      console.log(data);
    }).catch(err => console.log(err))
  }

  const deleteProductionLine = (productionLine) => {
    fetch(`${apiUrl}/api/productionlines/${productionLine.line_id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`
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
      getProductionLines();
      snackbarControl(" ","Silindi");
    })
    .catch(err => {
      snackbarControl(err.message," ");
    });
  }

  const getProductionLines = () => {
    fetch(`${apiUrl}/api/productionlines`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => response.json()).then(data => {
      console.log(data);
      setProductionLinesData(data);
    }).catch(err => console.log(err))
  }
  
  const snackbarControl = (value, info) => {
    setSnackBarOpen(true);
    setTimeout(() => {
      setSnackBarOpen(false);
    }, 3000);
    let text = value + ` ${info}`;
    setSnackBarText(text);
  }

  const handleEditModalOpen = (productionLine) => {
    setEditModalOpen(true);
    console.log(productionLine);
    setEditProductLineName(productionLine.line_name);
    setEditProductLineProduct(productionLine.product.product_id);
    setEditModalData(productionLine);
    getProducts();
  };
  const handleEditModalClose = () => setEditModalOpen(false);
  const handleAddModalClose = () => setAddModalOpen(false);
  const handleAddModalOpen = () => {
    getProducts();
    setAddModalOpen(true);
  }
  const handleDelete = (productionLine) => {
    deleteProductionLine(productionLine);
  }
  const handleLineEnd = (productionLine) => {
    putLineEnd(productionLine);
    snackbarControl(productionLine.line_name, '  isimli üretim hattı şimdi tamamlandı.')
  }
  const handleEdit = (productionLine) => {
    putProductionLine(productionLine);
  }
  const handleAdd = () => {
    postNewLine();
  }

  return (
    <TableContainer component={Paper}>
      <div className='flex justify-between items-center'>
        <h1 className='py-4 px-8 text-3xl'>Üretim Hatları</h1>
        <button className='ml-auto mr-24' onClick={() => { handleAddModalOpen() }}><AddCircleIcon className='!text-5xl' color='success' /></button>
      </div>

      <Table sx={{ minWidth: 1100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Line name</TableCell>
            <TableCell align="right">Starting date</TableCell>
            <TableCell align="right">End date</TableCell>
            <TableCell align="right">Machines</TableCell>
            <TableCell align="right">Product name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productionLinesData.map((productionLine) => (
            <TableRow
              key={productionLine.line_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover={true}
            >
              <TableCell component="th" scope="row">
                {productionLine.line_name}
              </TableCell>
              <TableCell align="right">{productionLine.starting_date}</TableCell>
              <TableCell align="right">{productionLine.end_date}</TableCell>
              <TableCell align="right">
                  {productionLine.machines.length>0 ? <select>{productionLine.machines.map(machine => <option key={machine.machine_id}>{machine.machine_name}</option>)}</select> :'-'}
              </TableCell>
              <TableCell align="right">{productionLine.product?.name ? productionLine.product.name: '-'}</TableCell>
              <TableCell align='left'>
                <Chip
                  variant="soft"
                  color="danger"
                  endDecorator={<ChipDelete onDelete={() => { handleDelete(productionLine); }} />}
                >
                  Delete
                </Chip>
                <Chip variant='soft' color='primary' onClick={() => handleEditModalOpen(productionLine)} className="relative" >
                  Edit
                  <EditIcon fontSize='small' className='' />
                </Chip>
                <Chip variant="soft" color="info">
                  <button onClick={() => { handleLineEnd(productionLine) }}>Tamamla</button>
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
            <h3 className='text-2xl font-light '>Edit Production Line</h3>
            <div>
              <div>
                <span>Line Name</span>
                <input type="text" defaultValue={editModalData.line_name} className='ml-4 w-32 p-4 bg-slate-100 rounded-md shadow-md' onChange={(e) => setEditProductLineName(e.target.value)} />
              </div>
              <div className='mt-6'>
                <span>Product</span>
                <select defaultValue={editModalData.product?.product_id} onChange={(e) => setEditProductLineProduct(e.target.value)} className='w-32 p-4 bg-slate-100 ml-4 rounded-md shadow-md' name='edit_production_line' id='edit_production_line' >
                  {productsData?.map((product) => <option value={product.product_id} key={product.product_id}>{product.name}</option>)}
                </select>
              </div>
            </div>
            {editModalData.line_id} line idile ilgili bilgiler.
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
            <h3 className='text-2xl font-light ml-4'>Add Product Line</h3>
            <div className='ml-8 mt-8'>
              <div>
                <span className='mr-4'>Line name</span>
                <input type="text" name="line_name" id="line_name" onChange={(e) => setNewLineName(e.target.value)} placeholder='line name...' className='w-40 p-4 bg-slate-100 rounded-md shadow-md' />
              </div>
              <div>
                <span>Select Product</span>
                <select name="products" id="products" onChange={(e) => setSelectedProduct(e.target.value)} className='w-32 mt-8 bg-slate-100 p-4 rounded-md shadow-md ml-4'>
                  {productsData.map(product => <option value={product.product_id} key={product.product_id}>{product.name}</option>)}
                </select>
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