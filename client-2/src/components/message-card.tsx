export default function MessageCard({ message, username }: { message: { id: string; message: string; username:string; time: string }, username: string }) {
	return (
		<div
			key={message.id}
			className={`flex rounded-md shadow-md my-5 w-fit ${username === message.username && "ml-auto"}`}
		>
			<div className="bg-gray-500 flex justify-center items-center rounded-l-md">
				<h3 className="font-bold text-lg px-2 ">{message.username.charAt(0).toUpperCase()}</h3>
			</div>
			<div className="px-2 bg-zinc-50 dark:bg-zinc-900 rounded-md">
				<span className="text-sm">{message.username}</span>
				<p className="font-bold">{message.message}</p>
				<span className="text-xs text-right">{message.time}</span>
			</div>
		</div>
	);
}
