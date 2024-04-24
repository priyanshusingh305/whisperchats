"use client";

import { useState } from "react";
import { io } from "socket.io-client";
import ChatInput from "../../components/chat-input";
import { Input } from "@/components/ui/input";


const socket = io(process.env.NEXT_PUBLIC_API_URL || "", {});

const Chat = () => {
  const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [chatActive, setChatActive] = useState(false);
	return (
		<>
			{chatActive ? (
				<ChatInput socket={socket} username={username} room={room} />
			) : (
				<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
					<form
						className="my-8"
						onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
							if (username !== "" && room !== "") {
								event.preventDefault();
								setChatActive(true);
							}
						}}
					>
						<div className="flex flex-col space-y-4">
							<Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
							<Input placeholder="Room" onChange={(e) => setRoom(e.target.value)} />
							<button
								className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
								type="submit"
							>
								<span className="text-neutral-700 dark:text-neutral-300 text-sm">start Chatting</span>
								<BottomGradient />
							</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default Chat;

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};
