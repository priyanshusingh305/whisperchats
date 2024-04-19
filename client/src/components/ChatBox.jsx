import MessageCard from "./MessageCard";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function ChatBox({ messages, username }) {
  return (
    <ScrollArea
      className="md:h-[60vh] h-[70vh] rounded-md border p-4 shadow-inner bg-white"
      type="scroll"
    >
      <div className="p-2">
        {messages.map((message) => {
          return (
            <MessageCard
              message={message}
              username={username}
              key={message.id}
            />
          );
        })}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
