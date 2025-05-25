
// src/components/quiz/QuizLeaderboard.tsx
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const QuizLeaderboard = () => {
  const mockData = [
    { name: "Akulnaij", score: 10 },
    { name: "Giocatore2", score: 9 },
    { name: "Giocatore3", score: 8 },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Leaderboard</Typography>
      <Paper>
        <List>
          {mockData.map((entry, index) => (
            <ListItem key={index}>
              <ListItemText primary={`#${index + 1} - ${entry.name}`} secondary={`Punti: ${entry.score}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default QuizLeaderboard;