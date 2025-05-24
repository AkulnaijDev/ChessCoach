// src/pages/Settings.tsx
import { useSettings } from '../context/SettingsContext';
import { Box, Switch, Typography, FormControlLabel } from '@mui/material';

const Settings = () => {
  const { showSnow, toggleSnow } = useSettings();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Impostazioni
      </Typography>
      <FormControlLabel
        control={<Switch checked={showSnow} onChange={toggleSnow} />}
        label="Effetto scacchi cadenti"
      />
    </Box>
  );
};

export default Settings;
