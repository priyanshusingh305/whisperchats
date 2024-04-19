"use client";
import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import { Button } from "./ui/button";
import { IconMicrophone } from "./IconMicrophone";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useRecordVoice } from "@/hooks/useRecordVoice";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const ChatPage = ({ socket, username }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const { startRecording, stopRecording, text } = useRecordVoice();

  useEffect(() => {
    setMessageInput(text);
  }, [text]);

  useEffect(() => {
    socket.on("receive-message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageInput == "") {
      return (
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
      );
    }
    const makeId = () => {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    };
    const messageData = {
      message: messageInput,
      username: username,
      time: `${new Date(Date.now()).getHours()}:${new Date(
        Date.now()
      ).getMinutes()}`,
      id: makeId(),
    };

    socket.emit("send-message", messageData);
    setMessageInput("");
  };

  const handleStartRecording = () => {
    startRecording();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    stopRecording();
    setIsRecording(false);
  };

  return (
    <div className="rounded-md p-2 w-full md:w-[80vw] lg:w-[40vw]">
      <h1 className="text-center font-bold text-2xl my-2 uppercase">
        {username}'s Chat Room
      </h1>

      <ChatBox messages={messages} username={username} />
      <form
        className="flex gap-2 md:gap-4 justify-between "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter message"
          value={messageInput}
          onChange={(e) => {
            setMessageInput(e.target.value);
          }}
          className="w-full px-3 py-2  border-2 outline-none rounded-md"
        />
        <div className="flex flex-col justify-center items-center">
          <Button
            onMouseDown={handleStartRecording}
            onMouseUp={handleStopRecording}
            onTouchStart={handleStartRecording}
            onTouchEnd={handleStopRecording}
            className={`border-none bg-transparent w-10 p-3 rounded-full hover:bg-gray-500 ${
              isRecording &&
              "bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-700"
            }`}
          >
            <IconMicrophone className="font-bold text-2xl" />
          </Button>
        </div>
        <Button
          type="submit"
          className=" font-bold px-3 py-2 bg-gray-500 text-white rounded-md"
        >
          <PaperPlaneIcon />
        </Button>
      </form>
    </div>
  );
};

export default ChatPage;
