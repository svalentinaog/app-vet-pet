import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const MainButton = styled(Button)({
  width: "100%",
  color: "white",
  background: "var(--secondary-color)",
  textTransform: "initial",
  borderRadius: "100px",
  padding: 16,
  position: "initial",
  transition: "all 0.3s ease",
  boxShadow: "0px 4px 2px -4px var(--primary-color)",
  "&:hover": {
    boxShadow: "0px 4px 20px var(--primary-color)",
  },
});
