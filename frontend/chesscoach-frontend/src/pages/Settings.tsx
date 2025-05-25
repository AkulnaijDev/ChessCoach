// src/pages/Settings.tsx
import { useSettings } from '../context/SettingsContext';
import { Box, Switch, Typography, FormControlLabel } from '@mui/material';
import UserProfileSection from '../components/UserProfileSection';

const Settings = () => {
  const { showSnow, toggleSnow } = useSettings();

  return (
    <Box sx={{ paddingLeft:'0px',  paddingRight:'0px', px: 2, py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Impostazioni
      </Typography>

      <UserProfileSection />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <FormControlLabel
          control={<Switch checked={showSnow} onChange={toggleSnow} />}
          label="Effetto neve"
        />
      </Box>
    </Box>
  );
};

export default Settings;
