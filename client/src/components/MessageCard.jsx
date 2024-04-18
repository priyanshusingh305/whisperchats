export default function MessageCard({ message, username }) {
  return (
    <div
      key={message.id}
      className={`flex rounded-md shadow-md my-5 w-fit ${
        username === message.username && "ml-auto"
      }`}
    >
      <div className="bg-gray-500 flex justify-center items-center rounded-l-md">
        <h3 className="font-bold text-lg px-2 text-white">
          {message.username.charAt(0).toUpperCase()}
        </h3>
      </div>
      <div className="px-2 bg-white rounded-md">
        <span className="text-sm">{message.username}</span>
        <p className="font-bold">{message.message}</p>
        <span className="text-xs text-right">{message.time}</span>
      </div>
    </div>
  );
}
