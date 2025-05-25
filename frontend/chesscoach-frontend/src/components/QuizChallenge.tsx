// src/pages/QuizChallenge.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const TOTAL_QUIZZES = 10;

const QuizChallenge = ({ onComplete }: { onComplete?: () => void }) => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [fen, setFen] = useState('');
  const [solution, setSolution] = useState('');
  const [game, setGame] = useState(new Chess());
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  const fetchQuiz = async () => {
    setLoading(true);
    // Simulated quiz fetch
    const dummyFens = [
      { fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1', solution: 'e7e5' },
      { fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3', solution: 'd2d4' },
      // add more quizzes...
    ];

    const current = dummyFens[quizIndex % dummyFens.length];
    const newGame = new Chess(current.fen);
    setFen(current.fen);
    setSolution(current.solution);
    setGame(newGame);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuiz();
    if (!intervalId) {
      const id = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    }
    return () => {
      if (intervalId !== null) 
        clearInterval(intervalId);
    };
  }, [quizIndex]);

  const handleMove = (sourceSquare: string, targetSquare: string) => {
    const move = game.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });
    if (!move) {
      setFeedback('Mossa non valida.');
      return false;
    }
    if (`${sourceSquare}${targetSquare}` === solution) {
      setFeedback('Corretto!');
      setTimeout(() => {
        if (quizIndex + 1 === TOTAL_QUIZZES) {
          if (intervalId) clearInterval(intervalId);
          onComplete?.();
        } else {
          setFeedback('');
          setQuizIndex((prev) => prev + 1);
        }
      }, 1000);
    } else {
      setFeedback('Mossa errata.');
    }
    return true;
  };

  return (
    <Box p={2}>
      <Typography variant="h5">Sfida a Tempo</Typography>
      <Typography variant="body2" color="textSecondary">
        Quiz {quizIndex + 1} di {TOTAL_QUIZZES} | Tempo: {timer}s
      </Typography>
      <Box mt={2} display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        <Box mx="auto">
          {loading ? (
            <CircularProgress />
          ) : (
            <Chessboard
              position={fen}
              onPieceDrop={(s, t) => handleMove(s, t)}
              boardWidth={320}
            />
          )}
        </Box>
        <Paper elevation={3} sx={{ p: 2, flex: 1 }}>
          <Typography variant="subtitle1">Feedback:</Typography>
          <Typography variant="body1" color="primary">
            {feedback}
          </Typography>
        </Paper>
      </Box>
      {quizIndex + 1 === TOTAL_QUIZZES && (
        <Box mt={4} textAlign="center">
          <Typography variant="h6" color="success.main">
            Sfida completata in {timer} secondi!
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setQuizIndex(0)}>
            Riprova
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default QuizChallenge;
