import { useState, useEffect, FormEvent } from "react";
import { Socket } from "socket.io-client";
import ChatBox from "./chat-box";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

interface Message {
  id: string;
  message: string;
  time: string;
  username: string;
}

export default function ChatInput({ socket, username, room }: { socket: Socket; username: string; room: string }) {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    console.log(messageInput);
  }, [messageInput]);

  useEffect(() => {
    if (socket) {
      socket.emit("join-room", room);

      socket.on("receive-message", (message: Message) => {
        setMessages((prevMessages: Message[]) => [...prevMessages, message]);
      });

      return () => {
        socket.off("receive-message");
      };
    }
  }, [socket, room]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageInput === "") {
      return;
    }

    const makeId = () => {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    const messageData: Message = {
      message: messageInput,
      username: username,
      time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
      id: makeId(),
    };

    socket.emit("send-message", messageData);
    setMessageInput("");
  };

  return (
    <div className="md:h-screen h-[100vh] flex gap-2 flex-col justify-center">
      <ChatBox messages={messages} username={username} />
      <form className="flex justify-center flex-row gap-2 z-10" onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <Input
          placeholder="Type your message here..."
          type="text"
          onChange={(e) => {
            setMessageInput(e.target.value);
          }}
        />
        <Button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-4 h-4"
          >
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />

          </svg>
        </Button>
        <Button type="submit">
          <PaperPlaneIcon />
        </Button>
      </form>
    </div>
  );
}
