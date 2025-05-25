import { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

interface QuizData {
  fen: string;
  bestMove: string;
  hint?: string;
}

const QuizDaily = () => {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [game, setGame] = useState(new Chess());
  const [isLoading, setIsLoading] = useState(true);
  const [userMove, setUserMove] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | ''>('');

  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoading(true);
      const dailyQuiz: QuizData = {
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4',
        bestMove: 'f3g5',
        hint: 'Attacca rapidamente il pedone e5'
      };
      setQuiz(dailyQuiz);
      const g = new Chess(dailyQuiz.fen);
      setGame(g);
      setIsLoading(false);
    };

    fetchQuiz();
  }, []);

  const handleMove = (sourceSquare: string, targetSquare: string) => {
    const move = game.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });
    if (!move) return false;

    const moveStr = `${sourceSquare}${targetSquare}`;
    setUserMove(moveStr);
    setResult(moveStr === quiz?.bestMove ? 'correct' : 'wrong');
    return true;
  };

  const resetQuiz = () => {
    if (!quiz) return;
    const g = new Chess(quiz.fen);
    setGame(g);
    setUserMove('');
    setResult('');
  };

  if (isLoading || !quiz) {
    return (
      <Box textAlign="center" py={4}>
        <CircularProgress />
        <Typography>Caricamento del quiz giornaliero...</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>Quiz Giornaliero</Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Risolvi il quiz per ottenere punti in classifica!
      </Typography>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
        <Box sx={{ width: { xs: '100%', md: '50%' }, mb: { xs: 2, md: 0 } }}>
          <Chessboard
            position={game.fen()}
            onPieceDrop={(s, t) => handleMove(s, t)}
            boardWidth={320}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '45%' } }}>
          {quiz.hint && <Typography variant="body2">Suggerimento: {quiz.hint}</Typography>}
          {result === 'correct' && <Typography color="success.main" mt={2}>Mossa corretta! ✔️</Typography>}
          {result === 'wrong' && <Typography color="error.main" mt={2}>Mossa errata ❌</Typography>}
          <Button variant="outlined" onClick={resetQuiz} sx={{ mt: 2 }}>Riprova</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default QuizDaily;
