import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import VotingTimer from "../components/effect/VotingTimer";
import { useParams, useSearchParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { GetGamePlayer, GetRole } from "../api/game";
import type { GetRoomMemberResponse } from "../types/room";
import { GetRoomMember } from "../api/room";
import type { ChatMessage, GetGamePlayerResponse } from "../types/game";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import CardNight from "@/components/effect/CardNight";
import CardDay from "@/components/effect/CardDay";



const GamePlayPage = () => {
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
    const [messageInput, setMessageInput] = useState<string>("")
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
    const images = [
        "/bg-day.png",
        "/Gemini_Generated_Image_x8sksgx8sksgx8sk.png",
        "/download2026020420328.png"
    ]
    const [night, setNight] = useState<boolean>(false)
    const [day, setDay] = useState<boolean>(false)
    const [indeximg] = useState(0)

    useEffect(() => {
        if (!user) {
            return
        }

        getRole()
        getGamePlayer()

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
            }

            ws.send(JSON.stringify(joinMessage));

        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log(data);

            if (data.type === "chat") {
                setChatMessages(prev => [...prev, {
                    sender: data.sender,
                    content: data.content,
                    timestamp: data.timestamp
                }])
            }

            if (data.type === "start_game") {
                handleStartGame()
            }

            if (data.type === "sync_time") {
                if (data.phase === "night") {
                    setNight(true)

                    setDay(false)
                    setVote(false)
                    setPhase(data.phase)
                    setTime(data.remaining)
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

    }, [user, room_id]);


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chatMessages])

    // นับเวลาเปิดการ์ดกลางคืน
    // useEffect(() => {
    //     let timer: ReturnType<typeof setInterval> | undefined;

    //     if (showCardNight && secondsNight > 0) {
    //         timer = setInterval(() => {
    //             setSecondsNight((prev) => {
    //                 if (prev <= 1) {
    //                     setShowCardNight(false);
    //                     return 0;
    //                 }
    //                 return prev - 1;
    //             });
    //         }, 1000);
    //     }

    //     return () => clearInterval(timer);
    // }, [showCardNight]);

    // นับเวลาเปิดการ์ดกลางวัน
    // useEffect(() => {
    //     let timer: ReturnType<typeof setInterval> | undefined;

    //     if (showCardDay && secondsDay > 0) {
    //         timer = setInterval(() => {
    //             setSecondsDay((prev) => {
    //                 if (prev <= 1) {
    //                     setShowCardDay(false);
    //                     return 0;
    //                 }
    //                 return prev - 1;
    //             });
    //         }, 1000);
    //     }

    //     return () => clearInterval(timer);
    // }, [showCardDay]);

    // นับเวลากลางคืน
    // useEffect(() => {
    //     let timer: ReturnType<typeof setInterval> | undefined;
    //     if (night && timeNight > 0) {
    //         timer = setInterval(() => {
    //             setTimeNight((prev) => {
    //                 if (prev <= 1) {
    //                     setNight(false)
    //                     setDay(true)
    //                     setShowCardDay(true)
    //                     setTimeDay(60)
    //                     setSecondsDay(2) // Reset for next day cycle
    //                     return 0
    //                 }
    //                 return prev - 1
    //             })
    //         }, 1000);
    //     }
    //     return () => clearInterval(timer)
    // }, [night])

    // นับเวลาประชุม
    // useEffect(() => {
    //     let timer: ReturnType<typeof setInterval> | undefined;
    //     if (day && timeDay > 0) {
    //         timer = setInterval(() => {
    //             setTimeDay((prev) => {
    //                 if (prev <= 1) {
    //                     setVote(true)
    //                     setTimeVote(30)
    //                     return 0
    //                 }
    //                 return prev - 1
    //             })
    //         }, 1000);
    //     }
    //     return () => clearInterval(timer)
    // }, [day, vote])

    // นับเวลาโหวต
    // useEffect(() => {
    //     let timer: ReturnType<typeof setInterval> | undefined;
    //     if (vote && timeVote > 0) {
    //         timer = setInterval(() => {
    //             setTimeVote((prev) => {
    //                 if (prev <= 1) {
    //                     setVote(false)
    //                     setDay(false)
    //                     setTimeNight(30)
    //                     setNight(true)
    //                     setShowCardNight(true)
    //                     setSecondsNight(2) // Reset for next day cycle
    //                     return 0
    //                 }
    //                 return prev - 1
    //             })
    //         }, 1000);
    //     }
    //     return () => clearInterval(timer)
    // }, [vote])

    const getRole = async () => {
        try {
            const res = await GetRole(room_id!, user?.id!)

            setRole(res.data)
        } catch (error) {
            alert(error)
        }
    }

    const getGamePlayer = async () => {
        try {
            const res = await GetGamePlayer(game_id)
            setPlayer(res)
        } catch (error) {
            alert(error)
        }
    }

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!messageInput.trim() || !wsRef.current) return
        const chatData = {
            type: "chat",
            content: messageInput,
            sender: user?.username,
            room_id: room_id
        }

        wsRef.current.send(JSON.stringify(chatData))
        setMessageInput("")
    }

    const handleStartGame = () => {
        if (!wsRef.current) return
        const chatData = {
            type: "start_game",
            room_id: room_id
        }

        wsRef.current.send(JSON.stringify(chatData))
    }


    return (
        <div className="hidden sm:block min-h-screen bg-[#020617] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-black relative overflow-hidden h-screen font-kanit">
            {/* Animated Background */}
            <ShootingStars />
            <StarsBackground />

            {/* ส่วน Grid */}
            <div className="relative z-10 grid grid-cols-3 grid-cols-[auto_1fr_auto] h-full pt-[80px] gap-6 px-6 pb-6">

                {/* คอลัมน์ที่ 1: ห้องแชท */}
                <div className="flex flex-col h-[90vh] w-[18vw]">
                    {/* ส่วนหัวแชท */}
                    <div className="rounded-t-2xl border border-white/10 border-b-0 bg-blue-950/20 backdrop-blur-xl p-4 shadow-lg shadow-blue-500/5">
                        <p className="text-white text-lg font-bold flex items-center gap-2">
                            <span className="text-xl animate-bounce">💬</span>
                            <span className="bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">ห้องแชท</span>
                        </p>
                    </div>

                    {/* ส่วนเนื้อหาแชท */}
                    <ScrollArea className="flex-1 border border-white/10 bg-blue-950/10 backdrop-blur-xl">
                        <div className="p-4 space-y-4">

                            {chatMessages.map((msg, index) => {
                                const isMe = msg.sender === user?.username;

                                return (
                                    <div
                                        key={index}
                                        className={`flex w-full mb-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`
                        p-3 max-w-[75%] rounded-2xl
                        ${isMe
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : 'bg-white/10 text-white rounded-tl-none'
                                            }
                    `}>
                                            {!isMe && <div className="text-[10px] text-blue-400 mb-1">{msg.sender}</div>}
                                            <div className="text-sm break-words">{msg.content}</div>
                                            {/* <p className="text-[10px] text-blue-400 mb-1">{msg.timestamp.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}</p> */}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={chatEndRef} />
                        </div>
                    </ScrollArea>

                    {/* ส่วนท้ายแชท (ช่องพิมพ์) */}
                    <div className="rounded-b-2xl border border-white/10 border-t-0 bg-blue-950/20 backdrop-blur-xl p-3">
                        <div className="relative group">
                            <form onSubmit={handleSendMessage}>
                                <input
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    type="text"
                                    placeholder="ส่งข้อความถึงทุกคน..."
                                    className="w-full bg-black/40 hover:bg-black/60 border border-white/10 focus:border-blue-500/50 text-white placeholder:text-white/20 px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                                />
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-cyan-300 hover:scale-110 transition-all">
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
                        <div className="grid grid-cols-3 gap-3 p-4 h-[80vh]">
                            {player?.data?.map((_, index) => (
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.1 }}
                                    className="w-full h-full rounded-2xl bg-blue-950/10 backdrop-blur-xl shadow-2xl shadow-black/40"
                                >
                                    <div className="text-2xl w-full h-full flex items-center justify-center">

                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[100px] border border-white/10 flex justify-between items-center p-4">
                        <div className="flex gap-2">
                            <div className=" w-[50px] h-[50px] rounded-xl">
                                <div className="text-2xl w-full h-full flex items-center justify-center">
                                    {role === "seer" && <img src="/seer.png" alt="seer" className="w-full h-full object-cover" />}
                                    {role === "werewolf" && <img src="/werewolf.png" alt="werewolf" className="w-full h-full object-cover" />}
                                    {role === "villager" && <img src="/villager.png" alt="villager" className="w-full h-full object-cover" />}
                                    {role === "guard" && <img src="/guard.png" alt="guard" className="w-full h-full object-cover" />}
                                </div>
                            </div>
                            <div className="text-xl text-white flex flex-col">
                                <p>คุณคือ: {role === "seer" && "ผู้สังเกต" || role === "werewolf" && "หมาป่า" || role === "villager" && "ชาวบ้าน" || role === "guard" && "ยาม"}</p>
                                <p>{role === "seer" && "คุณสามารถมองเห็นบทบาทของผู้เล่นหนึ่งในคืนนี้" || role === "werewolf" && "คุณสามารถโหวตฆ่าผู้เล่นหนึ่งในตอนกลางคืน" || role === "villager" && "คุณเป็นแค่คนธรรมดา" || role === "guard" && "คุณสามารถป้องกันผู้เล่นหนึ่งในตอนกลางคืนหรือป้องกันตัวเองได้"}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{
                                    scale: 1.05,
                                    // rotate: 2, 
                                    boxShadow: "0px 0px 12px rgba(168, 85, 247, 0.6)"
                                }}
                                whileTap={{ scale: 0.95, opacity: 0.8 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="bg-purple-600 text-white p-3 rounded-xl border border-white/10"
                            >
                                ยืนยันการโหวต
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{
                                    scale: 1.05,
                                    // rotate: 2, 
                                    boxShadow: "0px 0px 12px rgba(215, 209, 221, 0.6)"
                                }}
                                whileTap={{ scale: 0.95, opacity: 0.8 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="bg-white/10 text-white p-3 rounded-xl border border-white/10"
                            >
                                ข้ามการโหวตคืนนี้
                            </motion.button>

                        </div>

                    </div>
                </div>


                {/* คอลัมน์ที่ 3: ข้อมูลผู้เล่น / สถิติ */}
                <div className="full border border-white/10 rounded-3xl bg-blue-950/5 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden relative w-[25vh]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-cyan-500/10 opacity-40"></div>
                    <div className="absolute inset-0 border-[2px] border-white/5 rounded-3xl pointer-events-none"></div>
                    {night && role === "villager" && (
                        <VotingTimer initialSeconds={time} phase={phase}  >
                            <div className="text-center">
                                <h3 className="text-white text-xl font-semibold mb-1">หมาป่ากำลังล่า...</h3>
                                <p className="text-white/40 text-sm">ขอให้โชคดีในคืนนี้</p>
                            </div>
                        </VotingTimer>
                    )}
                    {night && role === "werewolf" && (
                        <VotingTimer initialSeconds={time} phase={phase}  >
                            <div className="text-center">
                                <h3 className="text-white text-xl font-semibold mb-1">ได้เวลาออกล่ายามค่ำคืน</h3>
                                <p className="text-white/40 text-sm">เลือกเหยื่อของคุณ</p>
                            </div>
                        </VotingTimer>
                    )}
                    {night && role === "seer" && (
                        <VotingTimer initialSeconds={time} phase={phase} >
                            <div className="text-center">
                                <h3 className="text-white text-xl font-semibold mb-1">ดวงตาวิเศษได้ตื่นขึ้นแล้ว</h3>
                                <p className="text-white/40 text-sm">เลือกคนที่คุณสงสัย</p>
                            </div>
                        </VotingTimer>
                    )}
                    {night && role === "guard" && (
                        <VotingTimer initialSeconds={time} phase={phase} >
                            <div className="text-center">
                                <h3 className="text-white text-xl font-semibold mb-1">พลังผู้พิทักษ์ได้ตื่นขึ้นแล้ว</h3>
                                <p className="text-white/40 text-sm">เลือกคนที่คุณจะปกป้อง</p>
                            </div>
                        </VotingTimer>
                    )}
                    {day && !vote && (
                        <VotingTimer initialSeconds={time} phase={phase} >
                            <div className="text-center">
                                <h3 className="text-white text-xl font-semibold mb-1">เริ่มการประชุม</h3>
                                <p className="text-white/40 text-sm">พุดคุยเพื่อหาหลักฐาน</p>
                            </div>
                        </VotingTimer>
                    )}
                    {vote && (
                        <VotingTimer initialSeconds={time} phase={phase} >
                            <div className="text-center">
                                <h3 className="text-white text-xl font-semibold mb-1">เริ่มการโหวต</h3>
                                <p className="text-white/40 text-sm">เลือกคนที่คุณสงสัยหรือเลือกที่จะข้ามการโหวต</p>
                            </div>
                        </VotingTimer>
                    )}
                    {phase === "wait" && (
                        <div className="text-center h-full w-full flex flex-col items-center justify-center">
                            <h3 className="text-white text-xl font-semibold mb-1">รอผู้เล่นเชื่อมต่อ</h3>
                            <p className="text-white/40 text-sm">รอผู้เล่นครบ {max_room} คน</p>
                            <p className="text-white/40 text-sm">ทดสอบๆ</p>
                        </div>
                    )}
                    {phase === "ready_to_start" && (
                        <VotingTimer initialSeconds={time} phase={phase} >
                            <div className="text-center">
                                <h3 className="text-white text-xl font-semibold mb-1">เกมกำลังเริ่มใน</h3>
                            </div>
                        </VotingTimer>
                    )}



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
