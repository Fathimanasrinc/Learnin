import Card from "@mui/material/Card";
import * as React from 'react';
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Rating from '@mui/material/Rating';
import users from "../../Datas/Users";
import "./ProfileCards.css";

export default function ProfileCards() {
  return (
    <div className="card-grid">
      {users.map((user) => {
        return (
          <Card variant="outlined" sx={{ maxWidth: 360,marginLeft:1 , marginRight:1,minWidth:200,marginBottom:1,marginTop:1 }}>
            <Box sx={{ p: 2 }}>
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Avatar alt="Remy Sharp" src={user.profile.image} />
                <Typography gutterBottom sx={{  fontSize: 16, fontWeight:500 }}>{user.name}
              </Typography>
              
              </Stack>
              <Rating name="read-only" value={user.starCount} readOnly />
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Typography gutterBottom variant="body2">
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="View Profile" size="small" />
                <Chip label="Request" size="small" />
              </Stack>
            </Box>
          </Card>
        );
      })}
    </div>
  );
}
