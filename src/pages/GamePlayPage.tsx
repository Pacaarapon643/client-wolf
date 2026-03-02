import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import VotingTimer from "../components/effect/VotingTimer";
import { useParams, useSearchParams, useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { GetGamePlayer, GetRole } from "../api/game";
import { GetRoomById, } from "../api/room";
import type { ChatMessage, GameEvent, GetGamePlayerResponse } from "../types/game";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import CardNight from "@/components/effect/CardNight";
import CardDay from "@/components/effect/CardDay";



const GamePlayPage = () => {
    const navigate = useNavigate();
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
    const [messageInput, setMessageInput] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const [showCardNight, setShowCardNight] = useState<boolean>(false)
    const [showCardDay, setShowCardDay] = useState<boolean>(false)
    const [time, setTime] = useState<number>(0);
    const [vote, setVote] = useState<boolean>(false)
    const chatEndRef = useRef<HTMLDivElement>(null)
    const { room_id } = useParams()
    const [searchParams] = useSearchParams();
    const max_room = Number(searchParams.get('max_room'));
    const game_id = String(searchParams.get('game_id'))
    const [player, setPlayer] = useState<GetGamePlayerResponse | null>(null)
    const { user } = useAuth()
    const [role, setRole] = useState<string | null>(null)
    const wsRef = useRef<WebSocket | null>(null);
    const [phase, setPhase] = useState<string>("wait")
    const [night, setNight] = useState<boolean>(false)
    const [day, setDay] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<string>("")
    const [index, setIndex] = useState<string>("")
    const [eventLog, setEventLog] = useState<GameEvent[]>([])
    const [seerResult, setSeerResult] = useState<string | null>(null)
    const [gameOver, setGameOver] = useState<{ winner: string; message: string } | null>(null)
    const [isDead, setIsDead] = useState<boolean>(false)
    const eventEndRef = useRef<HTMLDivElement>(null)

    const stateRef = useRef({ phase, night, day, vote, role, status, index });
    useEffect(() => {
        stateRef.current = { phase, night, day, vote, role, status, index };
    }, [phase, night, day, vote, role, status, index]);


    const getRole = async () => {
        try {
            const res = await GetRole(room_id ?? "", user?.id ?? "")
            setRole(res.data)
        } catch (error: unknown) {
            alert(String(error))
        }
    }

    const getGamePlayer = async () => {
        try {
            const res = await GetGamePlayer(game_id, role ?? "")
            console.log(res);
            setPlayer(res)

            // เช็คว่าตัวเราตายหรือยัง
            if (res.data) {
                const me = res.data.find(p => p.user_id === user?.id)
                if (me && me.is_dead) {
                    setIsDead(true)
                }
            }
        } catch (error: unknown) {
            alert(String(error))
        }
    }

    const getStatusRoom = async () => {
        try {
            const res = await GetRoomById(room_id ?? "")
            console.log(res);
            setStatus(res.data.room_status)
        } catch (error: unknown) {
            alert(String(error))
        }
    }

    const handleStartGame = () => {
        if (!wsRef.current) return
        const chatData = {
            type: "start_game",
            room_id: room_id
        }
        wsRef.current.send(JSON.stringify(chatData))
    }

    // Effect 1: fetch role
    useEffect(() => {
        if (!user || !room_id || role) return;
        getRole();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, room_id]);

    // Effect 2: WebSocket
    useEffect(() => {
        if (!user || !room_id || !role) {
            return
        }

        getGamePlayer()
        getStatusRoom()

        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
        const ws = new WebSocket(`${protocol}//${window.location.host}/api/games/ws-game`)
        wsRef.current = ws

        ws.onopen = () => {
            console.log("✅ WebSocket game connected")
            const joinMessage = {
                type: "join",
                room_id: room_id,
                user_id: user?.id,
                username: user?.username,
                game_id: game_id
            }
            ws.send(JSON.stringify(joinMessage));
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log(data);

            if (data.type === "load_game") {
                getGamePlayer()
            }

            if (data.type === "status_room") {
                getStatusRoom()
            }

            if (data.type === "chat") {
                setChatMessages(prev => [...prev, {
                    sender: data.sender,
                    content: data.content,
                    timestamp: data.timestamp
                }])
            }

            // แชทหมาป่า
            if (data.type === "wolf_chat") {
                setChatMessages(prev => [...prev, {
                    sender: `🐺 ${data.sender}`,
                    content: data.content,
                    timestamp: data.timestamp
                }])
            }

            // แชทคนตาย
            if (data.type === "dead_chat") {
                setChatMessages(prev => [...prev, {
                    sender: `👻 ${data.sender}`,
                    content: data.content,
                    timestamp: data.timestamp
                }])
            }

            if (data.type === "start_game") {
                handleStartGame()
            }

            // Event log (จาก server ทำ summary ตรง ไม่ซ้ำแล้ว)
            if (data.type === "game_event") {
                setEventLog(prev => [...prev, {
                    type: data.type,
                    event_type: data.event_type,
                    message: data.message,
                    night_count: data.night_count
                }])
            }

            // Seer result
            if (data.type === "seer_result") {
                setSeerResult(data.content)
                setTimeout(() => setSeerResult(null), 5000)
            }

            // Player died notification - เช็คว่าเราตายไหม
            if (data.type === "player_died") {
                getGamePlayer() // reload เพื่อเช็ค is_dead ของเรา
            }

            // Game over
            if (data.type === "game_over") {
                setGameOver({
                    winner: data.winner,
                    message: data.message
                })
            }

            if (data.type === "sync_time") {
                const prevPhase = stateRef.current.phase
                const phaseChanged = prevPhase !== data.phase

                if (data.phase === "night") {
                    setNight(true)
                    setDay(false)
                    setVote(false)
                    setPhase(data.phase)
                    setTime(data.remaining)
                    if (phaseChanged) setSelectedId("")
                    if (data.remaining === 30) {
                        setShowCardNight(true)
                    } else if (data.remaining <= 28) {
                        setShowCardNight(false)
                    }
                }
                if (data.phase === "day") {
                    setNight(false)
                    setVote(false)
                    setPhase(data.phase)
                    setDay(true)
                    setTime(data.remaining)
                    if (phaseChanged) setSelectedId("")
                    if (data.remaining === 60) {
                        setShowCardDay(true)
                    } else if (data.remaining <= 58) {
                        setShowCardDay(false)
                    }
                }
                if (data.phase === "vote") {
                    setNight(false)
                    setVote(true)
                    setDay(false)
                    setPhase(data.phase)
                    setTime(data.remaining)
                    if (phaseChanged) setSelectedId("")
                }
                if (data.phase === "ready_to_start") {
                    setNight(false)
                    setVote(false)
                    setDay(false)
                    setPhase(data.phase)
                    setTime(data.remaining)
                }
            }
        }

        return () => {
            ws.close()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, room_id, role]);


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chatMessages])

    useEffect(() => {
        eventEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [eventLog])


    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!messageInput.trim() || !wsRef.current) return

        // ถ้าตาย → ส่งแชทคนตาย
        if (isDead) {
            const chatData = {
                type: "dead_chat",
                content: messageInput,
                sender: user?.username,
                room_id: room_id
            }
            wsRef.current.send(JSON.stringify(chatData))
        }
        // ถ้าเป็นหมาป่าและตอนกลางคืน → ส่งแชทหมาป่า
        else if (role === "werewolf" && night) {
            const chatData = {
                type: "wolf_chat",
                content: messageInput,
                sender: user?.username,
                room_id: room_id
            }
            wsRef.current.send(JSON.stringify(chatData))
        } else {
            const chatData = {
                type: "chat",
                content: messageInput,
                sender: user?.username,
                room_id: room_id
            }
            wsRef.current.send(JSON.stringify(chatData))
        }

        setMessageInput("")
    }

    // คลิกผู้เล่น → ส่ง vote ทันที (ไม่ต้องกดปุ่มยืนยัน)
    const handleSelectedId = (user_id: string, slotIndex: string) => {
        // toggle — ถ้ากดคนซ้ำ จะยกเลิก
        if (selectedId === user_id) {
            setSelectedId("")
            setIndex("")
            if (wsRef.current) {
                wsRef.current.send(JSON.stringify({ type: "cancel_vote", room_id: room_id }))
            }
            return
        }

        setSelectedId(user_id)
        setIndex(slotIndex)

        // Seer ตรวจสอบทันทีเมื่อเลือก
        if (role === "seer" && night && wsRef.current) {
            wsRef.current.send(JSON.stringify({ type: "seer_check", content: user_id, room_id: room_id }))
        }

        // Guard ปกป้องทันทีเมื่อเลือก
        if (role === "guard" && night && wsRef.current) {
            wsRef.current.send(JSON.stringify({ type: "guard_protect", content: slotIndex, room_id: room_id }))
        }

        // โหวตทันทีเมื่อเลือก (สำหรับ werewolf ตอนกลางคืน หรือทุกคนตอน vote)
        if (wsRef.current && (vote || (night && role === "werewolf"))) {
            wsRef.current.send(JSON.stringify({ type: "vote", content: slotIndex, room_id: room_id }))
        }
    }

    // ข้ามโหวต — เคลียร์สถานะการเลือก
    const handleSkipVote = () => {
        if (!wsRef.current) return
        wsRef.current.send(JSON.stringify({ type: "cancel_vote", room_id: room_id }))
        setSelectedId("")
        setIndex("")
    }

    const handleDisabled = (user_id: string, is_werewolf: boolean, is_dead: boolean): boolean => {
        // ถ้าตัวเราตายแล้ว ห้ามทำอะไรทั้งหมด
        if (isDead) return true

        // ถ้าเป้าหมายตาย
        if (is_dead) return true

        // หมาป่าเลือกฆ่าตอนกลางคืน (ไม่ใช่หมาป่าด้วยกัน + ไม่ใช่ตัวเอง)
        if (!is_werewolf && role === "werewolf" && user_id !== user?.id && night) return false

        // Seer ตรวจตอนกลางคืน
        if (role === "seer" && night && user_id !== user?.id) return false

        // Guard ปกป้อง (รวมตัวเอง)
        if (role === "guard" && night) return false

        // ช่วงโหวต ทุกคนเลือกได้ (ยกเว้นตัวเอง)
        if (vote && user_id !== user?.id) return false

        return true
    }

    const getEventIcon = (eventType: string) => {
        switch (eventType) {
            case "death": case "dead": return "💀";
            case "saved": return "🛡️";
            case "night": return "🌙";
            case "execute": return "⚖️";
            case "tie": return "🤝";
            default: return "📢";
        }
    }

    const getEventColor = (eventType: string) => {
        switch (eventType) {
            case "death": case "dead": return "text-red-400";
            case "saved": return "text-green-400";
            case "night": return "text-purple-400";
            case "execute": return "text-orange-400";
            case "tie": return "text-yellow-400";
            default: return "text-blue-400";
        }
    }

    // ข้อความ placeholder สำหรับ input ตามสถานะ
    const getChatPlaceholder = (): string => {
        if (isDead) return "👻 แชทกับวิญญาณ..."
        if (night && role === "werewolf") return "🐺 แชทกับหมาป่า..."
        if (night) return "ไม่สามารถแชทได้ในตอนกลางคืน"
        return "ส่งข้อความถึงทุกคน..."
    }

    const isChatDisabled = (): boolean => {
        if (isDead) return false // คนตายแชทกับคนตายได้
        if (night && role !== "werewolf") return true // คนมีชีวิตที่ไม่ใช่หมาป่า ห้ามแชทตอนกลางคืน
        return false
    }


    return (
        <div className="hidden sm:block min-h-screen bg-[#020617] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-black relative overflow-hidden h-screen font-kanit">
            <ShootingStars />
            <StarsBackground />

            {/* Game Over Overlay */}
            <AnimatePresence>
                {gameOver && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ type: "spring", damping: 12, stiffness: 200 }}
                            className="text-center p-12 rounded-3xl border border-white/20 bg-gradient-to-br from-slate-900/90 to-purple-950/90 backdrop-blur-xl shadow-2xl max-w-lg"
                        >
                            <div className="text-8xl mb-6">
                                {gameOver.winner === "werewolf" ? "🐺" : "🎉"}
                            </div>
                            <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                                {gameOver.winner === "werewolf" ? "หมาป่าชนะ!" : "ชาวบ้านชนะ!"}
                            </h1>
                            <p className="text-white/70 text-lg mb-8">{gameOver.message}</p>
                            <div className="flex gap-4 justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate(`/room/${room_id}`, {
                                        state: {
                                            room_id: room_id,
                                            room_name: room_id,
                                            max_room: max_room,
                                        }
                                    })}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30"
                                >
                                    🔄 เล่นอีกครั้ง
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate("/lobby")}
                                    className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-500/30"
                                >
                                    🚪 ออกจากห้อง
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Death Card Overlay — แสดงเมื่อตัวเราตาย */}
            <AnimatePresence>
                {isDead && !gameOver && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 z-[80] bg-gradient-to-r from-red-950/90 to-gray-950/90 backdrop-blur-xl border border-red-500/30 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-red-500/20"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-4xl">💀</span>
                            <div>
                                <p className="text-lg font-bold text-red-400">คุณได้เสียชีวิตแล้ว</p>
                                <p className="text-sm text-white/50">คุณสามารถแชทกับคนที่ตายแล้วได้เท่านั้น</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Seer Result Toast */}
            <AnimatePresence>
                {seerResult && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -50, x: "-50%" }}
                        className="fixed top-24 left-1/2 z-[90] bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-xl border border-purple-400/30 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-purple-500/30"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">🔮</span>
                            <div>
                                <p className="text-sm text-purple-300">ผลการตรวจสอบ</p>
                                <p className="text-lg font-bold">{seerResult}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ส่วน Grid */}
            <div className="relative z-10 grid grid-cols-3 grid-cols-[auto_1fr_auto] h-full pt-[80px] gap-6 px-6 pb-6">

                {/* คอลัมน์ที่ 1: ห้องแชท */}
                <div className="flex flex-col h-[90vh] w-[18vw]">
                    <div className="rounded-t-2xl border border-white/10 border-b-0 bg-blue-950/20 backdrop-blur-xl p-4 shadow-lg shadow-blue-500/5">
                        <p className="text-white text-lg font-bold flex items-center gap-2">
                            <span className="text-xl animate-bounce">💬</span>
                            <span className="bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                                {isDead ? "👻 แชทวิญญาณ" : night && role === "werewolf" ? " แชทหมาป่า" : "ห้องแชท"}
                            </span>
                        </p>
                    </div>

                    <ScrollArea className="flex-1 border border-white/10 bg-blue-950/10 backdrop-blur-xl">
                        <div className="p-4 space-y-4">
                            {chatMessages.map((msg, index) => {
                                const isMe = msg.sender === user?.username || msg.sender === `🐺 ${user?.username}` || msg.sender === `👻 ${user?.username}`;
                                const isWolfChat = msg.sender.startsWith("🐺");
                                const isDeadChat = msg.sender.startsWith("👻");

                                return (
                                    <div key={index} className={`flex w-full mb-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-3 max-w-[75%] rounded-2xl
                                            ${isMe
                                                ? isWolfChat ? 'bg-red-800/80 text-white rounded-tr-none'
                                                    : isDeadChat ? 'bg-gray-800/80 text-white/60 rounded-tr-none'
                                                        : 'bg-blue-600 text-white rounded-tr-none'
                                                : isWolfChat ? 'bg-red-900/50 text-white rounded-tl-none border border-red-500/30'
                                                    : isDeadChat ? 'bg-gray-900/50 text-white/50 rounded-tl-none border border-gray-500/30'
                                                        : 'bg-white/10 text-white rounded-tl-none'
                                            }`}>
                                            {!isMe && <div className={`text-[10px] mb-1 ${isWolfChat ? 'text-red-400' : isDeadChat ? 'text-gray-400' : 'text-blue-400'}`}>{msg.sender}</div>}
                                            <div className="text-sm break-words">{msg.content}</div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={chatEndRef} />
                        </div>
                    </ScrollArea>

                    <div className="rounded-b-2xl border border-white/10 border-t-0 bg-blue-950/20 backdrop-blur-xl p-3">
                        <div className="relative group">
                            <form onSubmit={handleSendMessage}>
                                <input
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    type="text"
                                    placeholder={getChatPlaceholder()}
                                    disabled={isChatDisabled()}
                                    className="w-full bg-black/40 hover:bg-black/60 border border-white/10 focus:border-blue-500/50 text-white placeholder:text-white/20 px-4 py-3 rounded-xl focus:outline-none transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                />
                                <button type="submit" disabled={isChatDisabled()} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-cyan-300 hover:scale-110 transition-all disabled:opacity-30">
                                    🚀
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* คอลัมน์ที่ 2: พื้นที่หลักของเกม */}
                <div className="flex flex-col">
                    <div className="h-full border border-white/10 rounded-3xl bg-blue-950/5 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden relative group flex-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 opacity-40"></div>
                        <div className="absolute inset-0 border-[2px] border-white/5 rounded-3xl pointer-events-none"></div>
                        <div className="grid grid-cols-3 gap-10 p-4 h-[80vh]">
                            {player?.data?.map((item, index) => (
                                (item.is_join ? <motion.button
                                    key={index}
                                    whileTap={{ scale: 0.9 }}
                                    disabled={handleDisabled(item.user_id, item.is_werewolf, item.is_dead)}
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => handleSelectedId(item.user_id, index.toString())}
                                    className={`w-full h-full rounded-3xl backdrop-blur-xl shadow-2xl shadow-black/40 transition-all
                                        ${selectedId === item.user_id ? "border-4 border-red-500 shadow-red-500/30" : ""}
                                        ${item.is_dead ? "opacity-50 grayscale" : ""}`}
                                >
                                    <div className="relative w-full h-full">
                                        <img
                                            src={`/${item.img}`}
                                            alt="รูปคน"
                                            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                                            <p className={`text-center font-medium ${item.is_werewolf ? "text-yellow-500 text-md" : "text-white text-sm"}`}>
                                                {item.user_name || `Player ${index + 1}`}
                                            </p>
                                        </div>
                                        {item.is_dead && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
                                                <span className="text-5xl">💀</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.button> : <motion.button
                                    key={index}
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="w-full h-full rounded-2xl bg-white/5"
                                >
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <p className="text-white text-sm font-medium">รอผู้เล่น...</p>
                                    </div>
                                </motion.button>)
                            ))}
                        </div>
                    </div>

                    {/* แถบข้างล่าง — role info + ปุ่มข้าม (ไม่มีปุ่มยืนยันโหวตแล้ว) */}
                    {status == "start" ? (<div className="h-[100px] border border-white/10 flex justify-between items-center p-4">
                        <div className="flex gap-2">
                            <div className="w-[50px] h-[50px] rounded-xl">
                                <div className="text-2xl w-full h-full flex items-center justify-center">
                                    {role === "seer" && <img src="/seer.png" alt="seer" className="w-full h-full object-cover" />}
                                    {role === "werewolf" && <img src="/werewolf.png" alt="werewolf" className="w-full h-full object-cover" />}
                                    {role === "villager" && <img src="/villager.png" alt="villager" className="w-full h-full object-cover" />}
                                    {role === "guard" && <img src="/guard.png" alt="guard" className="w-full h-full object-cover" />}
                                </div>
                            </div>
                            <div className="text-xl text-white flex flex-col">
                                <p>คุณคือ: {role === "seer" && "ผู้สังเกต" || role === "werewolf" && "หมาป่า" || role === "villager" && "ชาวบ้าน" || role === "guard" && "ยาม"}</p>
                                <p className="text-sm text-white/50">{role === "seer" && "คุณสามารถมองเห็นบทบาทของผู้เล่นหนึ่งในคืนนี้" || role === "werewolf" && "คุณสามารถโหวตฆ่าผู้เล่นหนึ่งในตอนกลางคืน" || role === "villager" && "คุณเป็นแค่คนธรรมดา" || role === "guard" && "คุณสามารถป้องกันผู้เล่นหนึ่งในตอนกลางคืนหรือป้องกันตัวเองได้"}</p>
                            </div>
                        </div>

                        {/* ปุ่มข้ามเท่านั้น — การโหวตใช้การคลิกผู้เล่นโดยตรง */}
                        <div className="flex gap-4">
                            {(vote || (night && role === "werewolf")) && !isDead && (
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={handleSkipVote}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0px 0px 12px rgba(215, 209, 221, 0.6)"
                                    }}
                                    whileTap={{ scale: 0.95, opacity: 0.8 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="bg-white/10 text-white p-3 rounded-xl border border-white/10"
                                >
                                    ⏭️ ข้ามการโหวต
                                </motion.button>
                            )}
                        </div>

                    </div>) : (
                        <div className="h-[100px] flex justify-center items-center p-4">
                            <p className="text-white text-xl">จะสุ่ม role เมื่อเกมเริ่มขึ้น...</p>
                        </div>
                    )}
                </div>


                {/* คอลัมน์ที่ 3: Timer + Event Log */}
                <div className="flex flex-col h-[90vh] w-[25vh] gap-4">
                    {/* Timer Section */}
                    <div className="border border-white/10 rounded-3xl bg-blue-950/5 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-cyan-500/10 opacity-40"></div>
                        <div className="absolute inset-0 border-[2px] border-white/5 rounded-3xl pointer-events-none"></div>
                        {night && role === "villager" && (
                            <VotingTimer initialSeconds={time} phase={phase}>
                                <div className="text-center">
                                    <h3 className="text-white text-xl font-semibold mb-1">หมาป่ากำลังล่า...</h3>
                                    <p className="text-white/40 text-sm">ขอให้โชคดีในคืนนี้</p>
                                </div>
                            </VotingTimer>
                        )}
                        {night && role === "werewolf" && (
                            <VotingTimer initialSeconds={time} phase={phase}>
                                <div className="text-center">
                                    <h3 className="text-white text-xl font-semibold mb-1">ได้เวลาออกล่ายามค่ำคืน</h3>
                                    <p className="text-white/40 text-sm">เลือกเหยื่อของคุณ</p>
                                </div>
                            </VotingTimer>
                        )}
                        {night && role === "seer" && (
                            <VotingTimer initialSeconds={time} phase={phase}>
                                <div className="text-center">
                                    <h3 className="text-white text-xl font-semibold mb-1">ดวงตาวิเศษได้ตื่นขึ้นแล้ว</h3>
                                    <p className="text-white/40 text-sm">เลือกคนที่คุณสงสัย</p>
                                </div>
                            </VotingTimer>
                        )}
                        {night && role === "guard" && (
                            <VotingTimer initialSeconds={time} phase={phase}>
                                <div className="text-center">
                                    <h3 className="text-white text-xl font-semibold mb-1">พลังผู้พิทักษ์ได้ตื่นขึ้นแล้ว</h3>
                                    <p className="text-white/40 text-sm">เลือกคนที่คุณจะปกป้อง</p>
                                </div>
                            </VotingTimer>
                        )}
                        {day && !vote && (
                            <VotingTimer initialSeconds={time} phase={phase}>
                                <div className="text-center">
                                    <h3 className="text-white text-xl font-semibold mb-1">เริ่มการประชุม</h3>
                                    <p className="text-white/40 text-sm">พุดคุยเพื่อหาหลักฐาน</p>
                                </div>
                            </VotingTimer>
                        )}
                        {vote && (
                            <VotingTimer initialSeconds={time} phase={phase}>
                                <div className="text-center">
                                    <h3 className="text-white text-xl font-semibold mb-1">เริ่มการโหวต</h3>
                                    <p className="text-white/40 text-sm">คลิกผู้เล่นเพื่อโหวต หรือกดข้าม</p>
                                </div>
                            </VotingTimer>
                        )}
                        {phase === "wait" && (
                            <div className="text-center h-full w-full flex flex-col items-center justify-center p-6">
                                <h3 className="text-white text-xl font-semibold mb-1">รอผู้เล่นเชื่อมต่อ</h3>
                                <p className="text-white/40 text-sm">รอผู้เล่นครบ {max_room} คน</p>
                            </div>
                        )}
                        {phase === "ready_to_start" && (
                            <VotingTimer initialSeconds={time} phase={phase}>
                                <div className="text-center">
                                    <h3 className="text-white text-xl font-semibold mb-1">เกมกำลังเริ่มใน</h3>
                                </div>
                            </VotingTimer>
                        )}
                    </div>

                    {/* Event Log Section */}
                    <div className="flex-1 border border-white/10 rounded-3xl bg-blue-950/5 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden relative flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-pink-500/5 opacity-40"></div>
                        <div className="p-4 border-b border-white/10 relative z-10">
                            <p className="text-white text-sm font-bold flex items-center gap-2">
                                <span>📜</span>
                                <span className="bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">เหตุการณ์</span>
                            </p>
                        </div>
                        <ScrollArea className="flex-1 relative z-10">
                            <div className="p-3 space-y-2">
                                {eventLog.length === 0 && (
                                    <p className="text-white/20 text-xs text-center py-4">ยังไม่มีเหตุการณ์</p>
                                )}
                                {eventLog.map((evt, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-start gap-2 p-2 rounded-lg bg-white/5 border border-white/5"
                                    >
                                        <span className="text-sm shrink-0">{getEventIcon(evt.event_type)}</span>
                                        <p className={`text-xs leading-relaxed ${getEventColor(evt.event_type)}`}>
                                            {evt.message}
                                        </p>
                                    </motion.div>
                                ))}
                                <div ref={eventEndRef} />
                            </div>
                        </ScrollArea>
                    </div>
                </div>

                <AnimatePresence>
                    {showCardNight && (
                        <div key="night-container">
                            <CardNight />
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showCardDay && (
                        <div key="day-container">
                            <CardDay />
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default GamePlayPage;
