import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const App = () => {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  type MessageType = "birthday" | "holiday" | "thanks" | "default" | "";

  const [messageType, setMessageType] = useState<MessageType>("");

  useEffect(() => {
    if (messageType === "birthday") {
      setTitle(`Happy Birthday ${recipient} 🎉`);
    } else if (messageType === "holiday") {
      setTitle(`Happy Holidays ${recipient} 🎉`);
    } else if (messageType === "thanks") {
      setTitle(`Thank You ${recipient}`);
    } else {
      setTitle("");
    }
  }, [messageType, recipient]);

  // Theme colors based on messageType
  const themes: Record<Exclude<MessageType, "">, {
    bg: string;
    border: string;
    card: string;
    title: string;
  }> = {
    birthday: {
      bg: "bg-gradient-to-br from-pink-200 via-yellow-100 to-pink-300",
      border: "border-pink-300",
      card: "bg-gradient-to-br from-yellow-100 via-pink-100 to-yellow-200 border-pink-200",
      title: "text-pink-600",
    },
    holiday: {
      bg: "bg-gradient-to-br from-blue-200 via-cyan-100 to-blue-300",
      border: "border-blue-300",
      card: "bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-200 border-blue-200",
      title: "text-blue-700",
    },
    thanks: {
      bg: "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300",
      border: "border-gray-300",
      card: "bg-gradient-to-br from-gray-100 via-white to-gray-200 border-gray-200",
      title: "text-gray-700",
    },
    default: {
      bg: "bg-gradient-to-br from-pink-200 via-yellow-100 to-pink-300",
      border: "border-pink-300",
      card: "bg-gradient-to-br from-yellow-100 via-pink-100 to-yellow-200 border-pink-200",
      title: "text-pink-600",
    },
  };


  const theme = themes[messageType || "default"];
  return (
    <div className={`min-h-screen ${theme.bg} flex items-center justify-center p-4`}>
      <motion.div
        className={`bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border-4 ${theme.border}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Title */}
        <motion.h1
          key={title}
          className={`text-3xl font-extrabold ${theme.title} text-center mb-6`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {title || "✨ Title of Message ✨"}
        </motion.h1>

        {/* Message Type Selector */}
        <select
          value={messageType}
          onChange={(e) => setMessageType(e.target.value)}
          className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="">Choose a Message Type</option>
          <option value="birthday">Birthday</option>
          <option value="holiday">Holiday</option>
          <option value="thanks">Thank You</option>
        </select>

        {/* Recipient Input */}
        <input
          type="text"
          placeholder="Recipient's name..."
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        {/* Message Input */}
        <textarea
          placeholder="Type your heartfelt message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 mb-6 min-h-[80px]"
        />

        {/* Preview Card */}
        <h2 className="text-xl font-semibold text-black mb-2">Your Card</h2>
        <motion.div
          className={`${theme.card} p-6 rounded-xl shadow-inner border text-center`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`text-2xl font-bold ${theme.title} mb-2`}>
            {recipient || "Dear Friend"}
          </h2>
          <p className="text-lg text-gray-700 italic">
            {message || "Wishing you a day filled with love, laughter, and cake! 🎂"}
          </p>
          <div className="mt-4 text-3xl">🎈🎉🎁</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default App;
