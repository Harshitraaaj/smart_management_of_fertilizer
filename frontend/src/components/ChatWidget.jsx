import { useState } from "react";

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
        // Plain text reply (for greetings, casual talk)
        botMessage = { role: "bot", text: data.reply };
      } else if (data?.answer || data?.explanation || data?.example) {
        // Structured response
        const botContent = {
          answer: data.answer || [],
          explanation: data.explanation || [],
          example: data.example || [],
        };
        botMessage = { role: "bot", content: botContent };
      } else if (typeof data === "string") {
        // Fallback for plain string
        botMessage = { role: "bot", text: data };
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
      const botMessage = {
        role: "bot",
        content: {
          answer: ["Sorry, something went wrong. Try again."],
          explanation: [],
          example: [],
        },
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-700 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M12 8l6 8H6z" />
        </svg>
      </button>

      {/* Chat box */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="bg-emerald-600 text-white px-4 py-2 font-semibold">
            Chat Support
          </div>

          <div className="flex-1 p-2 overflow-auto flex flex-col gap-2">
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
                    className="bg-gray-100 text-gray-800 self-start px-3 py-2 rounded-md text-sm flex flex-col gap-1"
                  >
                    {msg.content.answer?.length > 0 && (
                      <div>
                        <strong></strong>
                        <ul className="list-disc list-inside ml-4">
                          {msg.content.answer.map((pt, i) => (
                            <ul key={i}>{pt}</ul>
                          ))}
                        </ul>
                      </div>
                    )}
                    {msg.content.explanation?.length > 0 && (
                      <div className="mt-1">
                        <strong>Explanation:</strong>
                        <ul className="list-disc list-inside ml-4">
                          {msg.content.explanation.map((pt, i) => (
                            <ul key={i}>{pt}</ul>
                          ))}
                        </ul>
                      </div>
                    )}
                    {msg.content.example?.length > 0 && (
                      <div className="mt-1">
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

            {loading && (
              <div className="text-gray-500 text-sm animate-pulse">
                Typing...
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
