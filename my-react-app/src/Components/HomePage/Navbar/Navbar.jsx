import { useState, useEffect, React } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Tooltip from "@mui/material/Tooltip";
import Logo from "../../../assets/LOGO.png";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate("/searchresult", { state: { search } });
    }
  };

  

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor:" #4a5c6a", // dark blue
      }}
    >
      <Toolbar disableGutters>
        <Link to="/Home">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 0,
              marginRight: "20px",
            }}
          >
            <img
              src={Logo}
              alt="App Logo"
              style={{
                height: "100px",
                width: "140px",
                marginBottom: " -20px",
                marginTop: "-10px",
                marginLeft: "-20px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Link>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Tooltip title="Search skills">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
              />
            </Search>
          </Tooltip>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Link to="/profile" className="nav-link">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"  sx={{ marginRight: "20px" }}/>
            </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
