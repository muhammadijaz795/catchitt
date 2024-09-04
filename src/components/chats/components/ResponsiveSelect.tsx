import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function ControlledRadioButtonsGroup() {
  const [value, setValue] = React.useState('Friends');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons"
        value={value}
        onChange={handleChange}
        style={{marginTop:'15px',}}
      >
        <FormControlLabel
          value="Friends"
          control={<Radio style={{ color: value === 'Friends' ? 'rgb(255, 59, 92)' : '' }} />}
          label="Friends"
        />
        <FormControlLabel
          value="No one"
          control={<Radio style={{ color: value === 'No one' ? 'rgb(255, 59, 92)' : '' }} />}
          label={<div style={{ width: 'max-content' }}>No one</div>}
        />
      </RadioGroup>
    </FormControl>
  );
}