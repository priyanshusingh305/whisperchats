"use client";
import io from "socket.io-client";
import { useState } from "react";
import ChatPage from "./ChatPage";
import { Button } from "./ui/button";

const socket = io.connect("http://localhost:3001");
const HomePage = () => {
  const [username, setUsername] = useState("");
  const [chatActive, setChatActive] = useState(false);
  return (
    <>
      <div className="h-screen w-screen md:w-auto md:h-auto flex justify-center items-center bg-gray-100">
        {chatActive ? (
          <ChatPage socket={socket} username={username} />
        ) : (
          <div className="w-screen h-screen flex justify-center items-center gap-2">
            <input
              type="text"
              name=""
              id=""
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="text-center px-3 py-2 outline-none border-2 rounded-md"
              placeholder="Enter Username"
            />
            <Button
              type="submit"
              onClick={() => {
                !username == "" && setChatActive(true);
              }}
              className="bg-gray-500 text-white px-3 py-2 rounded-md"
            >
              Start Chat
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
