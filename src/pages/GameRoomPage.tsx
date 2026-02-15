import { Meteors } from "../components/ui/meteors";
import Moon from "../components/effect/Moon";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { GetRoomById, GetRoomMember, JoinRoomMember } from "../api/room";
import type { GetRoomByIdResponse, GetRoomMemberResponse } from "../types/room";
import { Card } from "../components/ui/card";
import { GoPeople } from "react-icons/go";
import PlayerProgressBar from "../components/effect/ProgessBar";
import { FcGlobe } from "react-icons/fc";
import type { WsMessage } from "../types/ws";
import { motion } from "framer-motion";




const GameRoomPage = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [resRoom, setResRoom] = useState<GetRoomByIdResponse | null>(null);
    const [resRoomMember, setResRoomMember] = useState<GetRoomMemberResponse | null>(null);
    const { room_name, room_id, max_room } = location.state || {};
    const myData = resRoomMember?.data?.find(m => m.user_id === user?.id)
    const isHost = myData?.is_host;
    const isAllReady = resRoomMember?.data?.every(m => m.is_ready || m.is_host)
    const isReady = myData?.is_ready;
    const navigate = useNavigate();
    const wsRef = useRef<WebSocket | null>(null);
    useEffect(() => {
        if (!user) return;
        console.log(user);
        OnJoinRoomMember(max_room);
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
        const ws = new WebSocket(`${protocol}//${window.location.host}/api/auths/ws/test`);
        wsRef.current = ws;
        ws.onopen = () => {
            console.log("✅ WebSocket Connected!");
            console.log(user);

            const joinMessage = {
                type: "join",
                room_id: room_id,
                user_id: user?.id,
                username: user?.username,
            }

            ws.send(JSON.stringify(joinMessage));
        };


        ws.onmessage = async (event) => {
            const msg: WsMessage = JSON.parse(event.data);
            console.log("msg", msg);

            if (msg.type === "load_room") {
                const resRoom = await OnGetRoomById();
                await OnGetRoomMember(resRoom?.data.total_player!);
            } else if (msg.type === "start_game") {
                const params = new URLSearchParams({
                    max_room: max_room,
                    game_id: msg.content
                })
                navigate(`/game/${room_id}?${params.toString()}`)
            }
        }

        ws.onclose = (event) => {
            console.log("WebSocket Closed:", event);
        }

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };

    }, [user])

    const OnGetRoomById = async () => {
        try {
            const resRoom = await GetRoomById(room_id)
            setResRoom(resRoom)
            console.log("resRoom", resRoom);
            return resRoom
        } catch (error) {
            console.log(error);
        }
    }

    const OnJoinRoomMember = async (totalPlayer: number) => {

        try {
            if (room_id && user?.id && totalPlayer !== undefined) {
                await JoinRoomMember(room_id, user.id, totalPlayer)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const OnGetRoomMember = async (maxPlayer: number) => {
        try {
            const resRoomMember = await GetRoomMember(room_id, maxPlayer)
            setResRoomMember(resRoomMember)
        } catch (error) {
            console.log(error);
        }
    }

    const Exit = () => {
        navigate("/lobby")
    }

    const ReadyAndCancelReady = () => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.error("WebSocket is not connected!");
            return;
        }

        const actionText = !isReady ? "ready" : "cancel_ready";

        const data = {
            type: "ready",
            room_id: room_id,
            user_id: user?.id,
            content: actionText
        };


        wsRef.current.send(JSON.stringify(data));


    }

    const StartGame = () => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.error("WebSocket is not connected!");
            return;
        }

        const data = {
            type: "start_game",
            room_id: room_id,
        }

        wsRef.current.send(JSON.stringify(data));
        const params = new URLSearchParams({
            max_room: max_room
        })
        navigate(`/game/${room_id}?${params.toString()}`)

    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex flex-col items-center">
            <Meteors />
            <div className="relative mt-32">
                <Moon />
            </div>

            <div className="mt-6 flex flex-col items-center">
                <h1 className="text-4xl bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent font-bold">
                    ห้อง: {room_name}
                </h1>
                <p className="text-slate-400 text-sm mt-2">
                    Room ID: {room_id}
                </p>


            </div>
            <Card className="bg-gradient-to-br from-purple-500/20 to-purple-900/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-4xl mb-8 relative overflow-hidden mt-5">
                <div className="flex justify-between text-white font-bold text-md">
                    <p className="flex items-center gap-2.5">
                        <GoPeople /> ผู้เล่นในห้อง
                    </p>

                    <p>
                        {resRoom?.data.total_player_current} / {resRoom?.data.total_player}
                    </p>
                </div>

                <PlayerProgressBar current={resRoom?.data.total_player_current ?? 0} max={resRoom?.data.total_player ?? 0} className="mt-2" />
            </Card>

            <div className="text-white text-2xl w-full max-w-4xl font-bold">
                <h2 className="flex items-center gap-2.5">
                    <FcGlobe />  รายชื่อผู้เล่น
                </h2>
            </div>


            {/* เช็คว่ามีข้อมูล และเป็นห้องขนาด 6 หรือ 8 */}
            {resRoom?.data && [6, 8].includes(resRoom.data.total_player) && (
                <div className={`grid gap-5 ${resRoom.data.total_player === 6
                    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
                    : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4"
                    }`}>

                    {resRoomMember?.data?.map((member, index) => (
                        <Card
                            key={member.slot_index || index}
                            className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 rounded-xl flex flex-col items-center gap-2 relative px-10 py-4 mt-5 h-full min-h-[180px]
                              ${member.is_ready && "shadow-[0_0_20px_rgba(34,197,94,0.3)]"}    
                            `}
                        >
                            {!member.empty_slot ? (
                                <>
                                    <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-white text-3xl font-bold relative">
                                        {member.user_name?.charAt(0).toUpperCase()}
                                    </div>

                                    {member.is_host && (
                                        <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                                            <p className="text-white">👑 host</p>
                                        </div>
                                    )}

                                    <div className="text-white font-medium">{member.user_name}</div>

                                    <div>
                                        {member.is_ready ? (
                                            <p className="text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/50 whitespace-nowrap">✓ พร้อม</p>
                                        ) : (
                                            <p className="text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/50 whitespace-nowrap">
                                                ⌛ รอ...
                                            </p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full opacity-60">
                                    <div className="w-16 h-16 rounded-full bg-slate-700/30 flex items-center justify-center border border-white/5">
                                        <span className="text-4xl grayscale opacity-20">👤</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mt-2">รอผู้เล่น</p>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}

            {isHost ? (
                <div className="flex justify-center mt-5 w-full gap-5 mb-10" >
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        disabled={!isAllReady}
                        onClick={() => {
                            StartGame()
                        }}
                        className={`w-full  max-w-[150px] sm:max-w-md  font-semibold py-2 px-4 rounded-xl mt-5 border border-green-600/50 shadow-lg shadow-green-500/20 cursor-pointer
                            ${isAllReady ? "bg-green-600/20 text-green-400 cursor-pointer" : "bg-green-600/20 text-green-400 cursor-not-allowed opacity-50"}`}
                    >
                        {isAllReady ? "เริ่มเกม" : "รอผู้เล่นพร้อม..."}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={Exit}
                        className="w-full max-w-[150px] bg-red-600/20 text-red-400 font-semibold py-2 px-4 rounded-xl mt-5 border border-red-600/50 shadow-lg shadow-red-500/20 cursor-pointer"
                    >
                        🚪ออกจากห้อง
                    </motion.button>
                </div>

            )
                : <div className="flex justify-center mt-5 w-full gap-5 mb-10" >
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05, }}
                        transition={{ duration: 0.2 }}
                        onClick={() => { ReadyAndCancelReady() }}
                        className={`w-full  max-w-[150px] sm:max-w-md  font-semibold py-2 px-4 rounded-xl mt-5  cursor-pointer
                        ${!isReady ? "bg-green-600/20 text-green-400 cursor-pointer border border-green-600/50 shadow-lg shadow-green-500/20" : "bg-red-600 text-white cursor-pointer border border-red-600/50 shadow-lg shadow-red-500/20"}`}
                    >
                        {!isReady ? "พร้อม" : "ไม่พร้อม"}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={Exit}
                        className="w-full max-w-[150px] bg-red-600/20 text-red-400 font-semibold py-2 px-4 rounded-xl mt-5 border border-red-600/50 shadow-lg shadow-red-500/20 cursor-pointer"
                    >
                        🚪ออกจากห้อง
                    </motion.button>
                </div>

            }







        </div>
    )
}

export default GameRoomPage