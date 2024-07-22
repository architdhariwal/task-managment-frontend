import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton, 
  Typography, 
  Menu, 
  MenuItem,
  useMediaQuery,
  useTheme
} from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from "../redux/actions/authActions";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    handleCloseMenu();
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <RouterLink to="/" style={{ color: "white", textDecoration: "none", display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <AssignmentIcon fontSize="large" />
          <Typography variant="h6" component="div" sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
            Task Manager
          </Typography>
        </RouterLink>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleOpenMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              {isAuthenticated ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <>
                  <MenuItem component={RouterLink} to="/login" onClick={handleCloseMenu}>Login</MenuItem>
                  <MenuItem component={RouterLink} to="/signup" onClick={handleCloseMenu}>Signup</MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  sx={{ mr: 1 }} 
                  component={RouterLink} 
                  to="/login"
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/signup"
                >
                  Signup
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;