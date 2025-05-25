import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Button,
  Grid,
  Slider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const botList = [
  { name: 'Bot 1', elo: 800 },
  { name: 'Bot 2', elo: 1000 },
  { name: 'Bot 3', elo: 1200 },
  { name: 'Bot 4', elo: 1400 },
  { name: 'Bot 5', elo: 1600 },
  { name: 'Bot 6', elo: 1800 },
  { name: 'Bot 7', elo: 2000 },
  { name: 'Bot 8', elo: 2200 },
  { name: 'Bot 9', elo: 2400 },
  { name: 'Bot 10', elo: 2600 },
  { name: 'Custom', elo: 1200 },
];

const Play = () => {
  const [tab, setTab] = useState(0);
  const [showBoard, setShowBoard] = useState(false);
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const [elo, setElo] = useState(1200);
  const [selectedBot, setSelectedBot] = useState<number | null>(null);
  const [game, setGame] = useState(new Chess());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  const handleStart = () => {
    const playerColor = Math.random() < 0.5 ? 'white' : 'black';
    setOrientation(playerColor);
    setGame(new Chess());
    setMoveHistory([]);
    setShowBoard(true);
  };

  const handleMove = (sourceSquare: string, targetSquare: string) => {
    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move) {
      setGame(gameCopy);
      setMoveHistory(prev => [...prev, `${move.san}`]);
      if (gameCopy.isCheckmate()) {
        setWinner(gameCopy.turn() === 'w' ? 'Black' : 'White');
      }
    } else {
      setMoveHistory(prev => [...prev, `Mossa non valida: ${sourceSquare} -> ${targetSquare}`]);
    }
  };

  const handleResign = () => {
    setShowBoard(false);
    setGame(new Chess());
    setMoveHistory([]);
  };

  const handleCloseDialog = () => {
    setWinner(null);
    setShowBoard(false);
    setGame(new Chess());
    setMoveHistory([]);
  };

  return (
    <Box sx={{ p: 3 }}>
      {!showBoard ? (
        <Paper sx={{ p: 3 }}>
          <Tabs value={tab} onChange={(e, val) => setTab(val)} centered>
            <Tab label="Vs Player" />
            <Tab label="Vs Computer" />
          </Tabs>

          {tab === 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Gioca con:</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Button variant="outlined" fullWidth>
                    Amico
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" fullWidth>
                    Avversario Casuale
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          {tab === 1 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Scegli un Bot:</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {botList.map((bot, index) => (
                  <Grid item xs={4} sm={2} key={index}>
                    <Button
                      variant={selectedBot === index ? 'contained' : 'outlined'}
                      fullWidth
                      onClick={() => setSelectedBot(index)}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ mb: 1 }}>{bot.name.charAt(0)}</Avatar>
                        <Typography variant="caption">{bot.name}</Typography>
                      </Box>
                    </Button>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Livello ELO: {elo}</Typography>
                <Slider
                  value={elo}
                  min={800}
                  max={2600}
                  step={100}
                  onChange={(e, val) => setElo(val as number)}
                  valueLabelDisplay="auto"
                  disabled={selectedBot !== 10}
                />
              </Box>
            </Box>
          )}

          <Box sx={{ mt: 4 }}>
            <Button variant="contained" fullWidth onClick={handleStart} disabled={tab === 1 && selectedBot === null}>
              Inizia
            </Button>
          </Box>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Chessboard
              position={game.fen()}
              onPieceDrop={handleMove}
              boardOrientation={orientation}
              boardWidth={Math.min(500, window.innerWidth - 32)}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="error" onClick={handleResign}>
              Abbandona Partita
            </Button>
          </Box>

          <Box sx={{ mt: 2, maxWidth: 500, width: '100%' }}>
            <Paper sx={{ p: 2, maxHeight: 200, overflowY: 'auto' }}>
              <Typography variant="subtitle1">Mosse:</Typography>
              {moveHistory.map((entry, index) => (
                <Typography key={index} variant="body2">
                  {index + 1}. {entry}
                </Typography>
              ))}
            </Paper>
          </Box>

          <Dialog open={!!winner} onClose={handleCloseDialog}>
            <DialogTitle>Fine della partita</DialogTitle>
            <DialogContent>
              <Typography>{winner} ha vinto per scacco matto!</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>OK</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export default Play;
