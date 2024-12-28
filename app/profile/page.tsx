"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Box, Container } from "@mui/system";
import { CardMedia, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import GoBackBtn from "@/components/GoBackBtn";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: "var(--light-round)",
        padding: 10,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <GoBackBtn />
        <Box
          sx={{
            height: "25vh",
            background: "var(--primary-color)",
            borderRadius: 4,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateX(20%)",
              width: 150,
              height: 150,
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <CardMedia
              component="img"
              image="/assets/user-icon.png"
              alt="Profile Picture"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                background: "var(--light-color)",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            height: "25vh",

            background: "white",
            border: "1px solid var(--primary-color)",
            borderRadius: 4,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            gap: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <PersonIcon sx={{ color: "var(--text-color)" }} />
            <Typography variant="h6" sx={{ color: "var(--text-color)" }}>
              {user.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <EmailIcon sx={{ color: "var(--text-color)" }} />
            <Typography variant="h6" sx={{ color: "var(--text-color)" }}>
              {user.email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <PhoneIcon sx={{ color: "var(--text-color)" }} />
            <Typography variant="h6" sx={{ color: "var(--text-color)" }}>
              {user.phone}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
