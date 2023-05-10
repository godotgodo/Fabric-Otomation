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
// editte input:texttekiler hiç değişmezse stateteki değer boş olduğu için hata veriyor

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
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
  const [productsData, setProductsData] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [editProductName, setEditProductName] = useState('');
  const [editProductDescription, setEditProductDescription] = useState('');

  const snackbarControl = (value,info) => {
    setSnackBarOpen(true);
    setTimeout(() => {
      setSnackBarOpen(false);
    }, 3000);
    let text = value + ` ${info}`;
    setSnackBarText(text);
  }

  const getProducts=()=>{
    fetch(`${apiUrl}/api/products`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => response.json()).then(data => {
      setProductsData(data);
    }).catch(err => console.log(err))
  }
  const handleEditModalOpen = (row) => {
    setEditModalOpen(true);
    setEditModalData(row);
  };

  const postNewProduct = () => {
    const newPostInfo = {
      name: newProductName,
      description: newProductDescription
    }
    fetch(`${apiUrl}/api/products/store`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(newPostInfo)
    }).then(response => response.json()).then(data => {
      snackbarControl(data.product_id,' idli product eklendi');
    }).catch(err => console.log(err))
  }
  const putEditProduct = (product_id) => {
    const updatedProduct = {
      name: editProductName,
      description: editProductDescription
    }

    fetch(`${apiUrl}/api/products/${product_id}/update`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(updatedProduct)
    }).then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err))
  }
  const deleteProduct=(product_id)=>{
    fetch(`${apiUrl}/api/products/${product_id}`,{
      method:'DELETE',
      headers:{
        'Accept':'application/json',
        'Authorization':`Bearer ${authToken}`
      }
    }).then(response=>console.log(response)).then(data=>console.log(data)).catch(err=>console.log(err))
  }


  const handleAddNewProduct = () => {
    postNewProduct();
  }
  const handleEditModalClose = () => setEditModalOpen(false);
  const handleAddModalClose = () => setAddModalOpen(false);

  const handleDelete = (product) => {
    deleteProduct(product.product_id);
    snackbarControl(product.product_id,' idli product silindi.')
  }

  const handleEdit = (oldProduct) => {
    putEditProduct(oldProduct.product_id);
    snackbarControl(oldProduct.product_id,' id li product güncellendi.')
  }

  useEffect(() => {
    getProducts();
  }, [])


  return (
    <TableContainer component={Paper}>
      <div className='flex justify-between items-center'>
        <h1 className='py-4 px-8 text-3xl'>Ürünler</h1>
        <button className='ml-auto mr-24' onClick={() => { setAddModalOpen(true); }}><AddCircleIcon className='!text-5xl' color='success' /></button>
      </div>

      <Table sx={{ minWidth: 1100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsData.map((product) => (
            <TableRow
              key={product.product_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover={true}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.description}</TableCell>
              <TableCell align='left'>
                <Chip
                  variant="soft"
                  color="danger"
                  endDecorator={<ChipDelete onDelete={() => { handleDelete(product); }} />}
                >
                  Delete
                </Chip>
                <Chip variant='soft' color='primary' onClick={() => handleEditModalOpen(product)} className="relative" >
                  Edit
                  <EditIcon fontSize='small' className='' />
                </Chip>
              </TableCell>
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
                    <h3 className='text-2xl font-light'>Edit Product</h3>
                    <div className='ml-8'>
                      <div className='mt-4'>
                        <span className='mr-4'>Name</span>
                        <input className='w-40 p-2 bg-slate-100 rounded-md shadow-md' onChange={(e) => setEditProductName(e.target.value)} type="text" name="edit_product_name" id="edit_product_name" placeholder='name...' defaultValue={product.name} />
                      </div>
                      <div className='mt-8'>
                        <textarea className='p-4 bg-slate-100 rounde-md shadow-md' onChange={(e) => setEditProductDescription(e.target.value)} name="edit_product_description" id="edit_product_description" cols="30" rows="5" placeholder='description...' defaultValue={product.description}></textarea>
                      </div>
                    </div>
                    <button className='absolute bottom-8 right-16 bg-blue-300 px-4 py-2 rounded-full' onClick={() => { handleEdit(product) }}>
                      Kaydet
                    </button>
                  </Box>
                </Fade>
              </Modal>
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
            <h3 className='text-2xl font-light'>Add Product</h3>
            <div className='ml-8 mt-4'>
              <div>
                <span className='mr-4'>Name</span>
                <input type="text" onChange={(e) => { setNewProductName(e.target.value) }} name="add_product_name" id="add_product_name" placeholder='name...' className='p-4 bg-slate-100 rounded-md shadow-md' />
              </div>
              <div className='mt-8'>
                <textarea onChange={(e) => { setNewProductDescription(e.target.value) }} name="add_product_description" id="add_product_name" cols="30" rows="3" placeholder='description...' className='p-4 bg-slate-100 rounded-sm shadow-md'></textarea>
              </div>
            </div>
            <button className='absolute bottom-8 right-16 bg-green-500 px-4 py-2 rounded-full' onClick={() => { handleAddNewProduct() }}>
              Ekle
            </button>
          </Box>
        </Fade>
      </Modal>

    </TableContainer>
  );
}