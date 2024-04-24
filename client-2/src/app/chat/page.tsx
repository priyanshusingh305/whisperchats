import ChatBox from "@/components/chat-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Chat() {
  return (
    <div className="md:h-screen h-[100vh]  flex gap-2 flex-col justify-center ">
      <ChatBox messages={[]} username={"da"} />
      <div className="flex justify-center flex-row gap-2 z-10" >
        <Input placeholder="Type your message here..." />
        <Button>mic</Button>
        <Button>Send</Button>
      </div>
    </div>
  );
}
/*
"use client";
import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import { Button } from "./ui/button";
import { IconMicrophone } from "./IconMicrophone";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useRecordVoice } from "@/hooks/useRecordVoice";

const ChatPage = ({ socket, username, room }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const { startRecording, stopRecording, text } = useRecordVoice();

  useEffect(() => {
    setMessageInput(text);
  }, [text]);

  useEffect(() => {
    if (socket) {
      socket.emit("join-room", room);

      socket.on("receive-message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off("receive-message");
      };
    }
  }, [socket, room]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageInput == "") {
      return;
    }
    const makeId = () => {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };
    const messageData = {
      message: messageInput,
      username: username,
      time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`,
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
      <h1 className="text-center font-bold text-2xl my-2 uppercase">{`${room} Chat Room`}</h1>

      <ChatBox messages={messages} username={username} />
      <form className="flex gap-2 md:gap-4 justify-between " onSubmit={handleSubmit}>
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
              isRecording && "bg-red-700 text-white px-3 py-2 rounded-md hover:bg-red-700"
            }`}
          >
            <IconMicrophone className="font-bold text-2xl" />
          </Button>
        </div>
        <Button type="submit" className=" font-bold px-3 py-2 bg-gray-500 text-white rounded-md">
          <PaperPlaneIcon />
        </Button>
      </form>
    </div>
  );
};

export default ChatPage;
*/
