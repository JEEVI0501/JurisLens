import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import GaugeChart from "react-gauge-chart";
import { caseRelevance as apiCaseRelevance} from '../API_layer/features';
const Lens = () => {
  const [scenario, setScenario] = useState('');
  const [ipcSections, setIpcSections] = useState('');
  const [relevance, setRelevance] = useState('');
  // const [bailability, setBailability] = useState('');

  const handleScenarioChange = (event) => {
    setScenario(event.target.value);
  };

  const handleIpcSectionChange = (event) => {
    setIpcSections(event.target.value);
  };

  // const handleBailabilityChange = (event) => {
  //   setBailability(event.target.value);
  // };
  const caseRelevance = () => {
    apiCaseRelevance(scenario,ipcSections)
    .then(response =>{
      console.log(response)
      setRelevance(response)
    });
    console.log("Scenario:", scenario);
    console.log("IPC Sections:", ipcSections);

  };

  return (
    <div style={{ marginTop: '150px', position: 'relative',marginRight:'200px',marginLeft:'200px' }}>
      <TextField
        id="scenario"
        label="Scenario Description"
        variant="outlined"
        value={scenario}
        onChange={handleScenarioChange}
        multiline
        rows={4}
        fullWidth
        style={{ marginBottom: '20px' }}
      />

      <TextField
        id="ipc_sections"
        label="IPC SECTIONS"
        variant="outlined"
        value={ipcSections}
        onChange={handleIpcSectionChange}
        multiline
        rows={4}
        fullWidth
        style={{ marginBottom: '20px' }}
      />

      {/* <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel id="bailability-label">Bailability</InputLabel>
        <Select
          labelId="bailability-label"
          id="bailability"
          value={bailability}
          onChange={handleBailabilityChange}
          label="Bailability"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="yes">Bailable</MenuItem>
          <MenuItem value="no">Non Bailable</MenuItem>
        </Select>
      </FormControl> */}
      <Button variant="contained" color="primary" onClick={caseRelevance}>
        Check Relevance
      </Button>
       <div style={{ width: '700px', height: '700px', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        <GaugeChart
          id="gauge-chart3"
          nrOfLevels={3}
          colors={["red", "orange", "green"]}
          arcWidth={0.28}
          percent={relevance}
          textColor={'grey'}
          width={200}
        />
      </div>
    </div>
  );
};

export default Lens;
