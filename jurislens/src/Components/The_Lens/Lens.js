import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const Lens = () => {
  const [scenario, setScenario] = useState('');
  const [judgmentDescription, setJudgmentDescription] = useState('');
  const [bailability, setBailability] = useState('');

  const handleScenarioChange = (event) => {
    setScenario(event.target.value);
  };

  const handleJudgmentDescriptionChange = (event) => {
    setJudgmentDescription(event.target.value);
  };

  const handleBailabilityChange = (event) => {
    setBailability(event.target.value);
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
        id="judgment-description"
        label="Judgment Description"
        variant="outlined"
        value={judgmentDescription}
        onChange={handleJudgmentDescriptionChange}
        multiline
        rows={4}
        fullWidth
        style={{ marginBottom: '20px' }}
      />

      <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px' }}>
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
          <MenuItem value="Bailable">Bailable</MenuItem>
          <MenuItem value="Non-Bailable">Non-Bailable</MenuItem>
        </Select>
      </FormControl>

    </div>
  );
};

export default Lens;
