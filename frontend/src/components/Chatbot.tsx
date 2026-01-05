import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Loader2,
  Minimize2
} from "lucide-react";
import { useSendChatbotMessageMutation } from "@/lib/api";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const Chatbot = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your assistant. I can help you learn about our services, blog posts, portfolio, and team. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [sendChatbotMessage] = useSendChatbotMessageMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);


  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageText = input.trim();
    setInput("");
    setIsTyping(true);

    try {
      // Prepare conversation history (last 10 messages for context)
      const conversationHistory = messages
        .slice(-10)
        .map((msg) => ({
          sender: msg.sender,
          text: msg.text,
        }));

      // Call backend API with Groq
      const result = await sendChatbotMessage({
        message: messageText,
        conversationHistory,
      }).unwrap();

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: result.response,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error: any) {
      // Error handled silently in production
      
      // Fallback error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error?.data?.message || error?.data?.error || "I apologize, but I'm having trouble responding right now. Please try again in a moment or contact us directly at codivrasolutions@gmail.com.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Don't show chatbot on admin routes
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Chatbot Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-23 right-6 sm:bottom-6 sm:right-6 z-50 mb-4 sm:mb-0"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={() => {
                  setIsOpen(true);
                  setIsMinimized(false);
                }}
                aria-label="Open chat assistant"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white shadow-[0_0_30px_rgba(0,217,255,0.5)] hover:shadow-[0_0_50px_rgba(0,217,255,0.7)] transition-all duration-300"
              >
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "600px"
            }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed bottom-23 right-7 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-gradient-to-br from-white/[0.95] to-white/[0.98] backdrop-blur-xl border-2 border-white/20 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4 sm:mb-0"
            style={{ maxHeight: "calc(100vh - 8rem)" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm uppercase tracking-wider">
                    Chat Assistant
                  </h3>
                  <p className="text-white/80 text-xs">Ask me anything!</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  aria-label={isMinimized ? "Expand chat window" : "Minimize chat window"}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat window"
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#0066FF] flex items-center justify-center flex-shrink-0">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white"
                            : "bg-white border-2 border-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.text}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3 justify-start"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#0066FF] flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white border-2 border-gray-200 rounded-2xl px-4 py-3">
                        <Loader2 className="w-5 h-5 text-[#00D9FF] animate-spin" />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t-2 border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 border-2 border-gray-200 rounded-xl focus:border-[#00D9FF] focus:ring-0"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim() || isTyping}
                      aria-label="Send message"
                      className="bg-gradient-to-r from-[#00D9FF] to-[#0066FF] text-white hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Ask about services, blog, portfolio, team, or contact info
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

