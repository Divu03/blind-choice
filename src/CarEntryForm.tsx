import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { 
  TextField, Button, Checkbox, FormControlLabel, 
  Typography, Paper, Box, Snackbar, Alert 
} from '@mui/material';
import Grid from '@mui/material/Grid'; 
import styled from 'styled-components';
import { type Car } from './types';

const FormContainer = styled(Paper)`
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
`;

const INITIAL_STATE: Car = {
  identity: { make: '', model: '', trim: '', year: 2025, image_url: '' },
  specs: { 
    price_base: 0, body_style: '', engine_type: '', 
    zero_to_sixty: 0, mpg_combined: 0, cargo_space: 0
  },
  features: { heated_seats: false, apple_carplay: false, autopilot: false, sunroof: false },
  blind_description: ''
};

const CarEntryForm = () => {
  const [formData, setFormData] = useState<Car>(INITIAL_STATE);
  const [status, setStatus] = useState<{ open: boolean; message: string; type: 'success' | 'error' }>({ 
    open: false, message: '', type: 'success' 
  });

  const handleIdentityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      identity: { ...formData.identity, [e.target.name]: e.target.value }
    });
  };

  const handleSpecChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      specs: { ...formData.specs, [e.target.name]: value }
    });
  };

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      features: { ...formData.features, [e.target.name]: e.target.checked }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "cars"), {
        ...formData,
        createdAt: new Date()
      });
      setStatus({ open: true, message: 'Car added successfully!', type: 'success' });
      setFormData(INITIAL_STATE); 
    } catch (error: any) {
      setStatus({ open: true, message: 'Error: ' + error.message, type: 'error' });
    }
  };

  return (
    <FormContainer elevation={3}>
      <Typography variant="h4" gutterBottom>Blind Choice: Admin Portal</Typography>
      
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" sx={{ mt: 2, color: 'primary.main' }}>1. Identity (Hidden)</Typography>
        
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField fullWidth label="Make" name="make" value={formData.identity.make} onChange={handleIdentityChange} required />
          </Grid>
          <Grid size={6}>
            <TextField fullWidth label="Model" name="model" value={formData.identity.model} onChange={handleIdentityChange} required />
          </Grid>
          <Grid size={6}>
            <TextField fullWidth label="Year" type="number" name="year" value={formData.identity.year} onChange={handleIdentityChange} />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 2, color: 'primary.main' }}>2. Specs (Numbers)</Typography>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField fullWidth label="Base Price ($)" type="number" name="price_base" value={formData.specs.price_base || ''} onChange={handleSpecChange} required />
          </Grid>
          <Grid size={6}>
            <TextField fullWidth label="0-60 Time (sec)" type="number" name="zero_to_sixty" value={formData.specs.zero_to_sixty || ''} onChange={handleSpecChange} />
          </Grid>
          <Grid size={6}>
            <TextField fullWidth label="MPG" type="number" name="mpg_combined" value={formData.specs.mpg_combined || ''} onChange={handleSpecChange} />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 2, color: 'primary.main' }}>3. Features</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControlLabel control={<Checkbox checked={formData.features.heated_seats} name="heated_seats" onChange={handleFeatureChange} />} label="Heated Seats" />
          <FormControlLabel control={<Checkbox checked={formData.features.apple_carplay} name="apple_carplay" onChange={handleFeatureChange} />} label="Apple CarPlay" />
          <FormControlLabel control={<Checkbox checked={formData.features.autopilot} name="autopilot" onChange={handleFeatureChange} />} label="Autopilot" />
        </Box>

        <Box mt={2}>
            <TextField 
            fullWidth 
            multiline 
            rows={3} 
            name="blind_description" 
            label="Blind Pitch" 
            value={formData.blind_description}
            onChange={(e) => setFormData({...formData, blind_description: e.target.value})}
            />
        </Box>

        <Box mt={4}>
          <Button type="submit" variant="contained" size="large" fullWidth>Add Car to DB</Button>
        </Box>
      </form>

      <Snackbar open={status.open} autoHideDuration={6000} onClose={() => setStatus({...status, open: false})}>
        <Alert severity={status.type}>{status.message}</Alert>
      </Snackbar>
    </FormContainer>
  );
};

export default CarEntryForm;