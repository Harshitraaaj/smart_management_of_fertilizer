import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import ChatBot from "./ChatBot";


export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Welcome! How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);

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
      const botMessage = {
        role: "bot",
        text: data.reply || "Sorry, something went wrong.",
      };

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
        <div className="fixed bottom-24 right-6 w-96 h-[32rem] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden z-50">
          <div className="bg-emerald-600 text-white px-4 py-3 font-semibold flex items-center justify-between">
            <span>Chat Support</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Chat messages */}
          <div
            className="flex-1 p-3 overflow-auto flex flex-col gap-3"
            ref={chatContainerRef}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-4 py-2 rounded-lg text-sm ${
                  msg.role === "bot"
                    ? "bg-gray-100 text-gray-800 self-start max-w-[90%]"
                    : "bg-emerald-600 text-white self-end max-w-[85%]"
                }`}
              >
                {msg.role === "bot" ? (
                  <div className="markdown-content">
                    <ReactMarkdown
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1
                            className="text-lg font-bold mb-2 mt-3"
                            {...props}
                          />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2
                            className="text-base font-bold mb-2 mt-3"
                            {...props}
                          />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="text-sm font-bold mb-1 mt-2"
                            {...props}
                          />
                        ),
                        h4: ({ node, ...props }) => (
                          <h4
                            className="text-sm font-semibold mb-1 mt-2"
                            {...props}
                          />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="mb-2 leading-relaxed" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc list-inside mb-2 ml-2 space-y-1"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="list-decimal list-inside mb-2 ml-2 space-y-1"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="leading-relaxed" {...props} />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong className="font-semibold" {...props} />
                        ),
                        em: ({ node, ...props }) => (
                          <em className="italic" {...props} />
                        ),
                        code: ({ node, inline, ...props }) =>
                          inline ? (
                            <code
                              className="bg-gray-200 px-1 rounded text-xs"
                              {...props}
                            />
                          ) : (
                            <code
                              className="block bg-gray-200 p-2 rounded text-xs my-2 overflow-x-auto"
                              {...props}
                            />
                          ),
                        table: ({ node, ...props }) => (
                          <table
                            className="w-full border-collapse mb-2"
                            {...props}
                          />
                        ),
                        thead: ({ node, ...props }) => (
                          <thead className="bg-gray-200" {...props} />
                        ),
                        th: ({ node, ...props }) => (
                          <th
                            className="border border-gray-300 px-2 py-1 text-left text-xs font-semibold"
                            {...props}
                          />
                        ),
                        td: ({ node, ...props }) => (
                          <td
                            className="border border-gray-300 px-2 py-1 text-xs"
                            {...props}
                          />
                        ),
                        hr: ({ node, ...props }) => (
                          <hr className="my-2 border-gray-300" {...props} />
                        ),
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
                <span>Bot is typing...</span>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              placeholder="Type a message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && sendMessage()
              }
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}