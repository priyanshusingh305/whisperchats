import MessageCard from "./message-card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
type Props = {
	messages: {
		id: string;
		message: string;
		time: string;
	};
	username: string;
};
type Message = {
	id: string;
	message: string;
	time: string;
	username: string;
};
export default function ChatBox<Props extends { messages: Message[]; username: string }>({
	messages,
	username,
}: Props) {
	return (
		<ScrollArea
			className="md:h-[80vh] h-[70vh] rounded-md border p-4 shadow-inner bg-gray-50 dark:bg-[#000000] "
			type="scroll"
		>
			<div className="p-2">
				{messages.length === 0 && <h3 className="text-center">No messages yet</h3>}
				{messages.map((message: Message) => {
					return <MessageCard message={message} username={username} key={message.id} />;
				})}
			</div>
			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
}
