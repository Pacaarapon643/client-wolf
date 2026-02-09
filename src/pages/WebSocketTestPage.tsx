import { useEffect, useState, useRef } from "react";
import { Meteors } from "../components/ui/meteors";

const WebSocketTestPage = () => {
    // WebSocket states
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto scroll to bottom when new message arrives
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // 1️⃣ สร้างการเชื่อมต่อ WebSocket
        const ws = new WebSocket("ws://localhost:5000/api/v1/auths/ws/test");
        

        // 2️⃣ เมื่อเชื่อมต่อสำเร็จ
        ws.onopen = () => {
            console.log("✅ WebSocket Connected!");
            setIsConnected(true);
            setMessages(prev => [...prev, "🟢 System: Connected to WebSocket server"]);
        };

        // 3️⃣ เมื่อได้รับข้อความจาก server
        ws.onmessage = (event) => {
            console.log("📩 Received from server:", event.data);
            setMessages(prev => [...prev, `📨 Server: ${event.data}`]);
        };

        // 4️⃣ เมื่อเกิด error
        ws.onerror = (error) => {
            console.error("❌ WebSocket Error:", error);
            setMessages(prev => [...prev, "🔴 System: WebSocket error occurred"]);
        };

        // 5️⃣ เมื่อการเชื่อมต่อปิด
        ws.onclose = (event) => {
            console.log("🔌 WebSocket Disconnected", event.code, event.reason);
            setIsConnected(false);
            setMessages(prev => [...prev, "🔴 System: Disconnected from WebSocket server"]);
        };

        // เก็บ WebSocket instance ไว้ใน ref
        wsRef.current = ws;

        // 6️⃣ Cleanup: ปิดการเชื่อมต่อเมื่อออกจากหน้า
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []); // Empty dependency = ทำครั้งเดียวตอน mount

    // ฟังก์ชันส่งข้อความไป server
    const sendMessage = () => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            if (inputMessage.trim()) {
                console.log("📤 Sending:", inputMessage);
                wsRef.current.send(inputMessage);
                setMessages(prev => [...prev, `💬 You: ${inputMessage}`]);
                setInputMessage("");
            }
        } else {
            console.error("WebSocket is not connected!");
            setMessages(prev => [...prev, "⚠️ System: Cannot send - not connected"]);
        }
    };

    // Clear messages
    const clearMessages = () => {
        setMessages([]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex flex-col items-center pt-24">
            <Meteors />

            {/* Header */}
            <div className="relative z-10 flex flex-col items-center mb-8">
                <div className="text-6xl mb-4">
                    🔌
                </div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                    WebSocket Test
                </h1>
                <p className="text-slate-400 text-sm mt-2">
                    Real-time Communication Testing
                </p>
            </div>

            {/* Connection Status */}
            <div className="relative z-10 mb-6 flex items-center gap-3 bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-xl px-6 py-3">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className={`font-bold ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                </span>
                {isConnected && (
                    <span className="text-slate-400 text-sm">ws://localhost:8080/ws/test</span>
                )}
            </div>

            {/* Chat Container */}
            <div className="relative z-10 w-full max-w-4xl bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border-b border-white/10 px-6 py-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-white text-xl font-bold">Chat Console</h2>
                        <p className="text-slate-400 text-xs">Messages: {messages.length}</p>
                    </div>
                    <button
                        onClick={clearMessages}
                        className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-400 rounded-lg text-sm font-medium transition-all"
                    >
                        Clear
                    </button>
                </div>

                {/* Messages Display */}
                <div className="bg-black/30 p-6 h-96 overflow-y-auto">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-slate-500 text-lg">📭 No messages yet</p>
                            <p className="text-slate-600 text-sm mt-2">Send a message to test the connection</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {messages.map((msg, idx) => {
                                const isSystem = msg.startsWith('🟢') || msg.startsWith('🔴') || msg.startsWith('⚠️');
                                const isServer = msg.startsWith('📨');
                                const isYou = msg.startsWith('💬');

                                return (
                                    <div
                                        key={idx}
                                        className={`p-3 rounded-lg ${isSystem ? 'bg-blue-500/10 border-l-4 border-blue-500' :
                                            isServer ? 'bg-purple-500/10 border-l-4 border-purple-500' :
                                                isYou ? 'bg-green-500/10 border-l-4 border-green-500' :
                                                    'bg-slate-700/30'
                                            }`}
                                    >
                                        <p className={`text-sm font-mono ${isSystem ? 'text-blue-300' :
                                            isServer ? 'text-purple-300' :
                                                isYou ? 'text-green-300' :
                                                    'text-white'
                                            }`}>
                                            {msg}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {new Date().toLocaleTimeString()}
                                        </p>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="bg-slate-900/50 border-t border-white/10 p-6">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder={isConnected ? "Type a message..." : "Connect to server first..."}
                            className="flex-1 bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-slate-500"
                            disabled={!isConnected}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!isConnected || !inputMessage.trim()}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform shadow-lg shadow-purple-500/20"
                        >
                            Send 📤
                        </button>
                    </div>

                    {/* Tips */}
                    <div className="mt-4 flex items-start gap-2 text-xs text-slate-400">
                        <span>💡</span>
                        <div>
                            <p><strong>Tip:</strong> Press Enter to send message</p>
                            <p className="mt-1">The server will echo your message back to you</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Panel */}
            <div className="relative z-10 mt-8 w-full max-w-4xl grid grid-cols-3 gap-4 mb-12">
                <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-slate-400 text-sm">Connection State</p>
                    <p className="text-white text-2xl font-bold mt-2">
                        {wsRef.current?.readyState === 0 ? 'CONNECTING' :
                            wsRef.current?.readyState === 1 ? 'OPEN' :
                                wsRef.current?.readyState === 2 ? 'CLOSING' :
                                    wsRef.current?.readyState === 3 ? 'CLOSED' : 'UNKNOWN'}
                    </p>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-slate-400 text-sm">Messages Sent/Received</p>
                    <p className="text-white text-2xl font-bold mt-2">{messages.length}</p>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-slate-400 text-sm">Protocol</p>
                    <p className="text-white text-2xl font-bold mt-2">WebSocket</p>
                </div>
            </div>
        </div>
    );
};

export default WebSocketTestPage;
