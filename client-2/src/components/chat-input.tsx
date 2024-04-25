// biome-ignore lint/style/useImportType: <explanation>
import { useState, useEffect, FormEvent } from "react";
// biome-ignore lint/style/useImportType: <explanation>
import { Socket } from "socket.io-client";
import ChatBox from "./chat-box";
import { Input } from "./ui/input";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useWhisper } from '@chengsokdara/use-whisper'


interface Message {
	id: string;
	message: string;
	time: string;
	username: string;
}

export default function ChatInput({ socket, username, room }: { socket: Socket; username: string; room: string }) {
	const [messageInput, setMessageInput] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
		
  } = useWhisper({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, 
		whisperConfig: {
			language: 'en',
    },
  })

	useEffect(() => {
		setMessageInput(transcript.text as string);
	}, [transcript]);


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
			<form
				className="flex justify-center flex-row gap-2 z-10"
				onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
			>
				<Input
					placeholder={speaking ? "Listening..." : (transcribing ? "Transcribing..." : "Type your message here...")}
					type="text"
					value={messageInput}
					onChange={(e) => {
						setMessageInput(e.target.value);
					}}
				/>

				<button
					className={`relative group/btn flex space-x-2 items-center justify-start px-4  text-black rounded-md h-10 font-medium shadow-input  dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] ${recording ? "bg-red-500 dark:bg-red-900 animate-pulse" : "bg-gray-50 dark:bg-zinc-900"}`}
					type="submit"
					onMouseDown={() => startRecording()}
					onTouchStart={() => startRecording()}
					onTouchEnd={() => stopRecording()}
					onMouseUp={() => stopRecording()}
				>
					<span className="text-neutral-700 dark:text-neutral-300 text-sm">
						{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1}
							stroke="currentColor"
							className="w-4 h-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
							/>
						</svg>
					</span>
					<BottomGradient />
				</button>
				<button
					className=" relative group/btn flex space-x-2 items-center justify-start px-4  text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
					type="submit"
				>
					<span className="text-neutral-700 dark:text-neutral-300 text-sm">
						<PaperPlaneIcon />
					</span>
					<BottomGradient />
				</button>
			</form>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};
