import * as React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import { useEffect } from 'react';
import Charts from './Charts';

const apiUrl = process.env.REACT_APP_API_URL;

function Row({ prodLine ,authToken}) {
  const [open, setOpen] = React.useState(false);
  const [montlyLineData,setMonthlyLineData]=useState([]);

  const getMonthlyLineDatas=()=>{
    fetch(`${apiUrl}/api/dailyproductions/report`,{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json',
        'Authorization':`Bearer ${authToken}`
      },
      body:JSON.stringify({line_id:prodLine.line_id,option:3})
    }).then(response=>response.json()).then(data=>{
      setMonthlyLineData(data);
    }).catch(err=>console.log(err))
  }
  

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              getMonthlyLineDatas();
            }}
          >
            <span>
              Get Chart
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </span>
          </IconButton>
        </TableCell>
        <TableCell>
          {prodLine.line_name}
        </TableCell>
        <TableCell>
          {prodLine.starting_date}
        </TableCell>
        <TableCell>
          {prodLine.product?.name ? prodLine.product.name:' '}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <span className='font-black capitalize'>
            {prodLine.line_name}
            </span>
            <Charts data={montlyLineData}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CollapsibleTable({ authToken }) {
  const [prodLinesData, setProdLinesData] = useState([]);

  const getProductionLines = () => {
    fetch(`${apiUrl}/api/productionlines`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => response.json()).then(data => {
      console.log(data);
      setProdLinesData(data);
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    getProductionLines();
  }, [])
  return (
    <TableContainer sx={{ width: 1200 }} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell >Line Name</TableCell>
            <TableCell >Starting Date</TableCell>
            <TableCell >Product Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prodLinesData.map((prodLine) => (
            <Row prodLine={prodLine} authToken={authToken} key={prodLine.line_id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}