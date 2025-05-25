// components/UserProfileSection.tsx
import { Box, Typography, Avatar, TextField, Button, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function UserProfileSection() {
    const theme = useTheme();
     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Box
        elevation={3}
        sx={{
          p: 4,
          width: isMobile ? '80%' : '100%',
          maxWidth: 600,
          borderRadius: 2,
              backgroundColor: theme.palette.custom.darkBackgroundMenu,
        color: theme.palette.getContrastText(theme.palette.custom.darkBackgroundMenu)
        }}
      >
        <Typography variant="h5" gutterBottom>Profilo Utente</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar sx={{ width: 80, height: 80 }}>U</Avatar>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined">Cambia Foto</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Nome utente" fullWidth defaultValue="Akulnaij" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Località" fullWidth defaultValue="Bologna" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Livello" fullWidth value="24" disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Punteggio Elo" fullWidth value="1360" disabled />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>Salva modifiche</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
