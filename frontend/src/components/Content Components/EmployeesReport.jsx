import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useEffect } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;



function EmployeesReport({ authToken }) {
  const [employeesData, setEmployeesData] = useState([]);

  const completedJobsStatus=(completedJobs)=>{
    if (completedJobs.length<=2) {
      return "Bad"
    }
    else if(completedJobs.length>=5){
      return "Good"
    }
    else{
      return "Normal"
    }
  }

  const statusColor=(completedJobs)=>{
    if (completedJobsStatus(completedJobs)==='Bad') {
      return 'bg-red-500 text-white'
    }
    else if (completedJobsStatus(completedJobs)==='Good') {
      return 'bg-blue-500 text-white'
    }
    else if (completedJobsStatus(completedJobs)==='Normal') {
      return 'bg-yellow-500 text-white'
    }
  }

  const getEmployees = () => {
    return fetch(`${apiUrl}/api/employees`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }).then(response => response.json()).then(data => {
      setEmployeesData(data);
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    getEmployees();
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Completed Jobs</TableCell>
            <TableCell align="right">Performance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeesData.map((employee) => (
            <TableRow
              key={employee.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {employee.name}
              </TableCell>
              <TableCell align="right">
                <select name="completedJobs" id="completedJobs">
                  {employee.completedJobs.map(completedJob => <option key={completedJob.order_id} value={completedJob.order_id}>{completedJob.order_description}</option>)}
                </select>
              </TableCell>
              <TableCell align="right" >
                <span className={`shadow-md rounded-md p-4 ${statusColor(employee.completedJobs)}`} >
                {completedJobsStatus(employee.completedJobs)}
                </span>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  )
}

export default EmployeesReport