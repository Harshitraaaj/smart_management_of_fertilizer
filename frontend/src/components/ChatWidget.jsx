import { useState, useRef, useEffect } from "react";
import ChatBot from "./ChatBot";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: {
        answer: ["Welcome! How can I help you?"],
        explanation: [],
        example: [],
      },
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null); // For auto-scroll

  // Auto-scroll when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/groq-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      let botMessage;

      if (data?.reply) {
        botMessage = { role: "bot", text: data.reply };
      } else if (data?.answer || data?.explanation || data?.example) {
        botMessage = { role: "bot", content: data };
      } else {
        botMessage = {
          role: "bot",
          content: {
            answer: ["Sorry, something went wrong."],
            explanation: [],
            example: [],
          },
        };
      }

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white flex items-center justify-center shadow-lg rounded-full z-50 focus:outline-none"
      >
        <ChatBot size={60} />
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden z-50">
          <div className="bg-emerald-600 text-white px-4 py-2 font-semibold">
            Chat Support
          </div>

          {/* Chat messages */}
          <div
            className="flex-1 p-2 overflow-auto flex flex-col gap-2"
            ref={chatContainerRef} // Attach ref for auto-scroll
          >
            {messages.map((msg, idx) =>
              msg.role === "bot" ? (
                msg.text ? (
                  <div
                    key={idx}
                    className="bg-gray-100 text-gray-800 self-start px-3 py-2 rounded-md text-sm"
                  >
                    {msg.text}
                  </div>
                ) : (
                  <div
                    key={idx}
                    className="bg-gray-100 text-gray-800 self-start px-3 py-2 rounded-md text-sm flex flex-col gap-2"
                  >
                    {msg.content.answer?.length > 0 && (
                      <ul className="list-disc list-inside ml-4">
                        {msg.content.answer.map((pt, i) => (
                          <ul key={i}>{pt}</ul>
                        ))}
                      </ul>
                    )}
                    {msg.content.explanation?.length > 0 && (
                      <div>
                        <strong>Explanation:</strong>
                        <ul className="list-disc list-inside ml-4">
                          {msg.content.explanation.map((pt, i) => (
                            <ul key={i}>{pt}</ul>
                          ))}
                        </ul>
                      </div>
                    )}
                    {msg.content.example?.length > 0 && (
                      <div>
                        <strong>Example:</strong>
                        <ul className="list-disc list-inside ml-4">
                          {msg.content.example.map((pt, i) => (
                            <ul key={i}>{pt}</ul>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <div
                  key={idx}
                  className="bg-emerald-600 text-white self-end px-3 py-2 rounded-md text-sm"
                >
                  {msg.text}
                </div>
              )
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="text-gray-500 text-sm animate-pulse">
                Bot is typing...
              </div>
            )}
          </div>

          <div className="p-2 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              placeholder="Type a message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              onClick={sendMessage}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
