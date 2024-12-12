"use client";

import { BotIcon, UserIcon } from "@/components/icons";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Markdown } from "@/components/markdown";
import {
  SendContent,
  ChatContainer,
  ChatInnerContainer,
  IconContainer,
  InputContainer,
  LoadingIcon,
  LoadingMessage,
  LoadingText,
  MarkdownContainer,
  MessageBox,
  MessageContainer,
  MessageContent,
  ScrollableContainer,
  WelcomeIcons,
  WelcomeMessage,
  ChatInput,
  ChatForm,
} from "@/styles/mui";
import SendIcon from "@mui/icons-material/Send";
import EmergencyIcon from "@mui/icons-material/Emergency";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

export default function ChatBot() {
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat({
      onError: () =>
        toast.error(
          "Tu tarifa ha sido limitada, ¡inténtalo de nuevo más tarde!"
        ),
    });

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ChatContainer>
      <ChatInnerContainer>
        {messages.length > 0 ? (
          <ScrollableContainer>
            {messages.map((message, index) => (
              <MessageContainer key={message.id} isFirst={index === 0}>
                <IconContainer>
                  {message.role === "assistant" ? <BotIcon /> : <UserIcon />}
                </IconContainer>
                <MessageContent>
                  <MarkdownContainer>
                    <Markdown>{message.content}</Markdown>
                  </MarkdownContainer>
                </MessageContent>
              </MessageContainer>
            ))}
            {isLoading &&
              messages[messages.length - 1].role !== "assistant" && (
                <LoadingMessage>
                  <LoadingIcon>
                    <BotIcon />
                  </LoadingIcon>
                  <LoadingText>
                    <Typography variant="body1">hmm...</Typography>
                  </LoadingText>
                </LoadingMessage>
              )}
            <Box ref={messagesEndRef} />
          </ScrollableContainer>
        ) : (
          <WelcomeMessage>
            <MessageBox>
              <WelcomeIcons>
                <EmergencyIcon />
              </WelcomeIcons>
              <Typography
                variant="body1"
                sx={{ fontFamily: "var(--font-poppins)" }}
              >
                ¡Bienvenid@ al chat de mascotas!
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: "var(--font-poppins)" }}
              >
                ¿Tienes alguna pregunta sobre tu peludo amigo? <br /> Aunque
                podemos ofrecerte información general, te recomendamos visitar a
                tu veterinario de confianza para una atención personalizada.
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: "var(--font-poppins)" }}
              >
                ¡Empecemos! 🐶🐱
              </Typography>
            </MessageBox>
          </WelcomeMessage>
        )}
        <ChatForm onSubmit={handleSubmit}>
          <InputContainer>
            <ChatInput
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder="Envía tu mensaje...🐈‍⬛"
            />
            <SendContent>
              <SendIcon />
            </SendContent>
          </InputContainer>
        </ChatForm>
      </ChatInnerContainer>
    </ChatContainer>
  );
}
