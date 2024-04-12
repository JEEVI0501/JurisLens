import React, { forwardRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { lookupIpc as apiLookUpIpc} from '../API_layer/features';

const IPCLookUp = () => {
  const [expanded, setExpanded] = useState(null);
  const [query,setquery] = useState(null);
  const [ipcData, setIpcData] = useState([]);
  const [table_Ipc,setTable_Ipc] = useState([]);

    const columns = [
    
    { title: 'Bail', field: 'bail' },
    { title: 'Offence', field: 'offence' },
    { title: 'Punishment', field: 'punishment' },
    { title: 'Cognizance', field: 'cognizance' },
  ];

  const handleRectangleClick = (id) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
    }
  };

const lookupIpc = () => {
  console.log("q", query);
  
  if (query != null) {
    apiLookUpIpc(query)
      .then(response => {
        console.log(response);
        const responseArray = Object.values(response);

        const formattedResponse = responseArray.map((item, index) => ({
          id: index + 1,
          title: `IPC section ${item[0]}`,
          description: item[1],

        }));

        console.log(formattedResponse);
        setIpcData(formattedResponse);
          const tabdata = responseArray.map((item, index) => ({
          id: index + 1,
          bail: item[3],
          offence: item[4],
          punishment: item[5],
          cognizance: item[6] ,

        }));
        setTable_Ipc(tabdata);
      })
      .catch(error => {
        console.error("Error occurred:", error);
      });
      
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
        onChange={(event) => {
         const { value } = event.target;
          setquery(value);
          setIpcData([])
          setTable_Ipc([])}}
      />

        <IconButton type="submit" aria-label="search" onClick={lookupIpc}>
          <SearchIcon sx={{color:'#4e6c8d'}}/>
        </IconButton>
      </div>
    <div style={{ marginTop: '40px', position: 'relative' ,marginRight:'200px',marginLeft:'200px'}}>
      {ipcData.map(rectangle => (
  <div key={rectangle.id} style={{ marginBottom: '20px', backgroundColor: '#B1B66B', padding: '30px', borderRadius: '10px'}}>
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
              {table_Ipc
                .filter(row => row.id === rectangle.id)
                .map(row => (
                  <tr key={row.id}>
                    {columns.map(column => (
                      <td key={column.field} style={{ border: '1px solid black', padding: '8px',textAlign:'center' }}>{row[column.field]}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
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


