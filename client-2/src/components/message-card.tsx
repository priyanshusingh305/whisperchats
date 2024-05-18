export default function MessageCard({
	message,
	username,
}: { message: { id: string; message: string; username: string; time: string }; username: string }) {
	return (
		<div
			key={message.id}
			className={`flex rounded-md shadow-md my-5 w-[40%] ${username === message.username && "ml-auto"}`}
		>
			<div className="bg-gray-500 flex justify-center items-center rounded-l-md">
				<h3 className="font-bold text-lg px-2 ">{message.username.charAt(0).toUpperCase()}</h3>
			</div>
			<div className="px-2 bg-zinc-50 dark:bg-zinc-900 rounded-md h-full ">
				
				<span className="md:text-[0.8em] text-[0.4em] ">{message.username}</span>
				<span className=" flex flex-wrap">
				<span className="font-bold md:max-w-[9vw] max-w-[20vw]  whitespace-pre-line break-words ">{message.message}</span>
				</span>

				<span className="text-xs text-right">{message.time}</span>
			</div>
		</div>
	);
}
