'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import  DeleteIcon  from '@mui/icons-material/Delete';
import { Button, IconButton, Stack } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: 'rgb(34,46,77)',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: 'rgb(34,46,77)',
    color: theme.palette.common.white,
  },
  'td, th': {
    border: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  'td, th': {
    border: 0,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  ':hover': {
    backgroundColor: 'rgb(117,100,226)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgb(117,100,226)',
    '&:hover': {
      backgroundColor: 'rgb(117,100,226)',
    },
  },
}));

function createData(name, quantities) {
  return { name, quantities };
}

export default function CustomizedTables({filteredPantryItems, removeItem, addItem}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = [];
  filteredPantryItems.forEach((pantryItem) => {
    const newData = createData(pantryItem.name, pantryItem.quantity);
    rows.push(newData);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{width: '100%', overflow: 'hidden'}}>
      <TableContainer>
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>NAME</StyledTableCell>
              <StyledTableCell align="right">QUANTITY</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <StyledTableRow 
                key={row.name} 
                sx={{cursor: 'pointer'}}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name.charAt(0).toUpperCase() + row.name.slice(1)}
                </StyledTableCell>
                <StyledTableCell align="right">{row.quantities}</StyledTableCell>
                <StyledTableCell align="right" >
                  <Stack direction={'row'} spacing={2} justifyContent={'end'}>
                    <Button onClick={() => {addItem(row.name)}} sx={{backgroundColor: 'rgb(117,100,226)', color: 'white', ":hover, :active": {backgroundColor: 'rgba(117,100,226,0.8)'}}}>Add</Button>
                    <Button onClick={() => {removeItem(row.name)}} sx={{backgroundColor: 'rgb(255,100,26)', color: 'white', ":hover, :active": {backgroundColor: 'rgba(255,100,26,0.8)'}}}>Remove</Button>
                    
                    {/* <IconButton onClick={() => {removeItem(row.name);}}>
                      <DeleteIcon sx={{color:'red'}} />
                    </IconButton> */}
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{backgroundColor: '#FFEFDD'}}
      />
      </TableContainer>
    </Paper>
  );
}
