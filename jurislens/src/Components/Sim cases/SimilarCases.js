import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { simCases as apiSimCases } from '../API_layer/features';

const SimilarCases = () => {
  const [query, setQuery] = useState('');
  const [casesData, setCasesData] = useState(null);

  const simCases = () => {
    if (query.trim() !== '') {
      apiSimCases(query)
        .then(response => {
          console.log(response)
          const responseDataArray = JSON.parse(response);
          setCasesData(responseDataArray);
        })
        .catch(error => {
          console.error("Error occurred:", error);
        });
    }
  };

  return (
    <div style={{ marginTop: '100px', position: 'relative' }}>
      <div style={{ marginTop: '80px', position: 'relative', textAlign: 'center' }}>
        <TextField
          id="search-bar"
          variant="outlined"
          placeholder="Search..."
          size="small"
          style={{ width: '400px' }}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />

        <IconButton type="submit" aria-label="search" onClick={simCases}>
          <SearchIcon sx={{ color: '#4e6c8d' }} />
        </IconButton>
      </div>
      <div style={{ marginTop: '40px', position: 'relative', marginRight: '200px', marginLeft: '200px' }}>
        {casesData && (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {Object.keys(casesData[0]).map((key) => (
                    <TableCell key={key}><h3>{key}</h3></TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {casesData.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, index) => (
                      <TableCell key={index}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default SimilarCases;
