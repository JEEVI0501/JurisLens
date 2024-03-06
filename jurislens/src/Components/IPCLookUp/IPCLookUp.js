import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const IPCLookUp = () => {
  const [expanded, setExpanded] = useState(null);

  const rectanglesData = [
    { id: 1, title: 'IPC section 140', description: 'Wearing garb or carrying token used by soldier, sailor or airman' },
    { id: 2, title: 'IPC section 141', description: 'Wearing garb or carrying token used by soldier, sailor or airman' },
    { id: 3, title: 'IPC section 142', description: 'Wearing garb or carrying token used by soldier, sailor or airman' },
  ];

    const columns = [
    { title: 'Offence', field: 'offence' },
    { title: 'Punishment', field: 'punishment' },
    { title: 'Cognizance', field: 'cognizance' },
    { title: 'Bail', field: 'bail' },
    { title: 'Tribable', field: 'tribable' },
  ];

    const data = [
    {
      id:1,
      offence: 'Offence 1',
      punishment: 'Punishment 1',
      cognizance: 'Cognizance 1',
      bail: 'Bail 1',
      tribable: 'Tribable 1',
    },
    {
      id:2,
      offence: 'Offence 2',
      punishment: 'Punishment 2',
      cognizance: 'Cognizance 2',
      bail: 'Bail 2',
      tribable: 'Tribable 2',
    },
    {
      id:3,
      offence: 'Offence 3',
      punishment: 'Punishment 3',
      cognizance: 'Cognizance 3',
      bail: 'Bail 3',
      tribable: 'Tribable 3',
    },
  ];

  const handleRectangleClick = (id) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  };

  return (
    <div style={{ marginTop: '100px', position: 'relative' ,}}>
      <div style={{ marginTop: '80px', position: 'relative', textAlign: 'center' }}>
        <TextField
          id="search-bar"
          variant="outlined"
          placeholder="Search..."
          size="small"
          style={{ width: '400px' }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon sx={{color:'#4e6c8d'}}/>
        </IconButton>
      </div>
    <div style={{ marginTop: '40px', position: 'relative' ,marginRight:'200px',marginLeft:'200px'}}>
      {rectanglesData.map(rectangle => (
  <div key={rectangle.id} style={{ marginBottom: '20px', backgroundColor: '#B1B66B', padding: '10px', borderRadius: '10px' }}>
    <div style={{ cursor: 'pointer' }} onClick={() => handleRectangleClick(rectangle.id)}>
      <h3>{rectangle.title}</h3>
      {expanded === rectangle.id && (
        <div>
          <p>{rectangle.description}</p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {columns.map(column => (
                  <th key={column.field} style={{ border: '1px solid black', padding: '8px' }}>{column.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data
                .filter(row => row.id === rectangle.id)
                .map(row => (
                  <tr key={row.id}>
                    {columns.map(column => (
                      <td key={column.field} style={{ border: '1px solid black', padding: '8px' }}>{row[column.field]}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
          <Button sx={{marginTop:'15px'}}>Simple Explanation</Button>
        </div>
      )}
    </div>
  </div>
))}
</div>
    </div>
  );
};

export default IPCLookUp;

