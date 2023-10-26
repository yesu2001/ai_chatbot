import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { red } from "@mui/material/colors";
import Chat from "./Chat";
import { useAuth } from "../context/AuthContext";
import { sendChatRequest } from "./helpers/api";

const staticChats = [
  {
    role: "user",
    content: "Hello, can you tell me the weather forecast for today?",
  },
  {
    role: "assistant",
    content:
      "Sure! I can help you with that. Please provide me with your location.",
  },
  { role: "user", content: "I'm in New York City." },
  {
    role: "assistant",
    content:
      "Great! I'll get the weather information for New York City for you.",
  },
  {
    role: "assistant",
    content:
      "The weather in New York City today is partly cloudy with a high of 72°F and a low of 55°F.",
  },
  { role: "user", content: "Thank you for the information!" },
  {
    role: "assistant",
    content:
      "You're welcome! If you have any more questions, feel free to ask.",
  },
  { role: "user", content: "What's the traffic like on my way to work?" },
  {
    role: "assistant",
    content:
      "To provide accurate traffic information, I'll need your starting and ending locations and the time you plan to leave for work.",
  },
  {
    role: "user",
    content:
      "I'm commuting from Brooklyn to Manhattan, and I'll leave at 8:00 AM.",
  },
  {
    role: "assistant",
    content:
      "Got it. I'll check the traffic conditions for your route and time.",
  },
  {
    role: "assistant",
    content:
      "The traffic from Brooklyn to Manhattan at 8:00 AM is expected to be heavy. You might want to consider alternative routes or leave a bit earlier.",
  },
  { role: "user", content: "Thanks for the heads up!" },
  { role: "assistant", content: "You're welcome. Have a safe commute!" },
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chats = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    console.log(content);
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    console.log(newMessage);
    setChatMessages((prevState) => [...prevState, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: { md: 0.2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 600,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a chatbot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            ASk question , etc, avoid sharing personal information.
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: { md: 0.8, xs: 1, sm: 1 },
        }}
      >
        <Typography sx={{ mx: "auto", color: "white", mb: 2 }}>
          Model - GPT 3.5
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat) => (
            <Chat content={chat.content} role={chat.role} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
            marginTop: 5,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <Typography>Send</Typography>
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chats;
