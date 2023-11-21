import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const pages = ["Lens", "Market", "MyGuides", "CREATEAGUIDE","CreateAListing"];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElLens,setanchorElLens]=React.useState(null);
  const [Profile,setProfile]=React.useState();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // function changeColor(event) {
  //   console.log(event);
  //   event.target.style.color = "Red";
  // }
  function handler() {
    handleCloseNavMenu();
  }

  function SignUpHandler(){

  }

  //  FOR PRESERVED COLORS
  // const [isClicked, setisClicked] = React.useState(["False", "False", "False"]);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2a2b2d", zIndex: "1" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            HOME
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    backgroundColor: "#2a2b2d",
                    "&:hover": { backgroundColor: "black" },
                  }}
                >
                  <Typography textAlign="center">
                    <Link
                      to={`/${page}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handler}
                sx={{ my: 2, color: "red", display: "block" }}
              >
                <Link
                  to={`/${page}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
          {/* {
            Profile ? (
              <div>user profile</div>
            ):(
              <div>
              <Link to="/Login">
              <Button variant="contained">Login</Button>
              </Link>
              
              <Link to="/SignUp">
              <Button variant="contained" sx={{ ml: "8px" }} onClick={SignUpHandler}>
                   Sign Up
              </Button>
              </Link>
              
              </div>
            )
          } */}
          <ConnectButton/>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
