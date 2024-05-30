import React, { useState } from 'react';
import { Slider, Typography, Box } from '@mui/material';

const MySlider = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box width={300} mx="auto" mt={5}>
      <Typography id="slider-label" gutterBottom>
        Bewertung: {value}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="slider-label"
        step={1}
        marks
        min={0}
        max={5}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default MySlider;