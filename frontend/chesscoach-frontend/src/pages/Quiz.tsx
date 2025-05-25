import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Grid, Typography, Paper } from '@mui/material';
import QuizDaily from '../components/QuizDaily';
import QuizChallenge from '../components/QuizChallenge';
import QuizLeaderboard from '../components/QuizLeaderboard';

const Quiz = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: any, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Quiz Giornaliero" />
        <Tab label="Sfida a Tempo" />
        <Tab label="Classifica Globale" />
      </Tabs>

      {tabIndex === 0 && <QuizDaily />}
      {tabIndex === 1 && <QuizChallenge />}
      {tabIndex === 2 && <QuizLeaderboard />}
    </Box>
  );
};

export default Quiz;