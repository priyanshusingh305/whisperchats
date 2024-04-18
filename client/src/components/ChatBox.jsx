import MessageCard from "./MessageCard";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function ChatBox({ messages, username }) {
  return (
    <ScrollArea
      className="md:h-[60vh] h-[80vh] rounded-md border p-4 "
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
