import React from "react";
import { Typography, Container, Paper, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(8, 2),
  background: 'linear-gradient(120deg, #2196F3 30%, #21CBF3 70%)',
  minHeight: '100vh',
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  borderRadius: 0,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 1),
  },
}));

const IconWrapper = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& svg': {
    fontSize: 100,
    [theme.breakpoints.down('md')]: {
      fontSize: 80,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 60,
    },
  },
}));

const QuoteBox = styled('div')(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(4),
  maxWidth: '80%',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontStyle: 'italic',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    maxWidth: '90%',
  },
}));

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledPaper elevation={4}>
      <Container maxWidth="md">
        <IconWrapper>
          <TaskAltIcon color="inherit" />
        </IconWrapper>
        <Typography 
          variant={isSmallScreen ? "h4" : isMediumScreen ? "h3" : "h2"} 
          component="h1" 
          gutterBottom 
          fontWeight="bold"
          sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
        >
          Streamline Your Tasks
        </Typography>
        <Typography 
          variant={isSmallScreen ? "body1" : "h6"} 
          paragraph
          sx={{ mb: { xs: 3, sm: 4, md: 5 } }}
        >
          Boost productivity with our intuitive task management solution.
        </Typography>
        <QuoteBox>
          <Typography variant={isSmallScreen ? "body2" : "body1"}>
            "Just login and manage your tasks. Task management is no longer hectic."
          </Typography>
        </QuoteBox>
      </Container>
    </StyledPaper>
  );
};

export default Home;