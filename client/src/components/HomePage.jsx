"use client";
import io from "socket.io-client";
import { useState } from "react";
import ChatPage from "./ChatPage";
import { Button } from "./ui/button";

const socket = io.connect(process.env.NEXT_PUBLIC_API_URL);

const HomePage = () => {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [chatActive, setChatActive] = useState(false);
	return (
		<>
			<div className="h-screen w-screen md:w-auto md:h-auto flex justify-center items-center bg-gray-100">
				{chatActive ? (
					<ChatPage socket={socket} username={username} room={room} />
				) : (
					<div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
						<form
							className="flex flex-col gap-1"
							onSubmit={() => {
								!username == "" && !room == "" && setChatActive(true);
							}}
						>
							<input
								type="text"
								name=""
								id=""
								value={username}
								onChange={(e) => {
									setUsername(e.target.value);
								}}
								required
								className="text-center px-3 py-2 outline-none border-2 rounded-md"
								placeholder="Username"
							/>
							<input
								type="text"
								name=""
								id=""
								value={room}
								onChange={(e) => {
									setRoom(e.target.value);
								}}
								required
								className="text-center px-3 py-2 outline-none border-2 rounded-md"
								placeholder="Room"
							/>
							<Button type="submit" className="bg-gray-500 text-white px-3 py-2 rounded-md">
								Start Chat
							</Button>
						</form>
					</div>
				)}
			</div>
		</>
	);
};

export default HomePage;
