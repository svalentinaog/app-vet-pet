import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const ChatContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  paddingBottom: "5rem",
  height: "100dvh",
  backgroundColor: "var(--primary-color)",
});

export const ChatInnerContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "1rem",
});

export const ScrollableContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  height: "100%",
  width: "100dvw",
  alignItems: "center",
  overflowY: "scroll",
});

export const MessageContainer = styled(Box)<{ isFirst: boolean }>(
  ({ isFirst }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    width: "100%",
    paddingTop: isFirst ? "5rem" : "0",
    "@media (min-width: 768px)": {
      width: "500px",
      paddingLeft: "0",
      paddingRight: "0",
    },
  })
);

export const IconContainer = styled(Box)({
  width: "24px",
  height: "24px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  color: "var(--secondary-color)",
});

export const MessageContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});

export const MarkdownContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  color: "var(--light-color)",
});

export const LoadingMessage = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
  padding: "0 1rem",
  width: "100%",
  "@media (min-width: 768px)": {
    width: "500px",
    padding: "0",
  },
});

export const LoadingIcon = styled(Box)({
  width: "24px",
  height: "24px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  color: "var (--subprimary-color) !important",
});

export const LoadingText = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  color: "var (--subprimary-color)",
});

export const WelcomeMessage = styled(Box)({
  height: "350px",
  padding: "5rem 1rem 0",
  width: "100%",
  "@media (min-width: 768px)": {
    width: "500px",
    paddingLeft: "0",
    paddingRight: "0",
  },
});

export const WelcomeIcons = styled(Box)({
  color: "var(--secondary-color)",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});

export const MessageBox = styled(Box)({
  fontFamily: "var(--font-raleway) !important",
  border: "1px solid var(--subprimary-color)",
  borderRadius: "0.5rem",
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  fontSize: "0.875rem",
  color: "var(--light-color)",
  fontWeight: "normal",
});

export const ChatForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  alignItems: "center",
  position: "relative",
});

export const InputContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: "calc(100vw - 32px)",
  backgroundColor: "var(--subprimary-color)",
  borderRadius: "100px",
  padding: "0.5rem 1rem",
  "@media (min-width: 768px)": {
    width: "500px",
  },
});

export const ChatInput = styled("input")({
  width: "100%",
  backgroundColor: "transparent",
  color: "var(--light-color)",
  border: "none",
  outline: "none",
  "::placeholder": {
    color: "var(--light-color)",
  },
});

export const SendContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "var(--light-color)",
  cursor: "default",
});
