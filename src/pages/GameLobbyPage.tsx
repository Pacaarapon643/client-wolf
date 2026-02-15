import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BorderBeam } from "../components/ui/border-beam";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinRoomSchema, type JoinRoomInput, type RoomInput } from "../schemas/room";
import { roomSchema } from "../schemas/room";
import { createRoom, GetCountRoom, getRoom, GetRoomById } from "../api/room";
import type { Room } from "../types/room";
import { useAuth } from "../context/AuthContext";
import { getCountUser } from "../api/user";
import type { WsMessage } from "../types/ws";
import RulesGame from "../components/RulesGame/RulesGame";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const PlayerProgressBar = ({ current = 3, max = 8 }) => {
  // คำนวณเปอร์เซ็นต์
  const progress = (current / max) * 100;

  return (
    <div className="flex items-center gap-4 w-full max-w-2xl text-white">
      <div className="flex items-center gap-2 shrink-0">
        <span className="sm:text-sm text-[11px]">👥</span>
        <span className="sm:text-sm text-[11px]">ผู้เล่น:</span>
      </div>

      <div className="relative h-2 flex-1 bg-black/30 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-fuchsia-500 to-fuchsia-400 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]"
        />
      </div>

      <div className="shrink-0 ml-2 sm:text-sm text-[11px]">
        {current}/{max}
      </div>
    </div>
  );
};

const GameLobbyPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpenCardCreateRoom, setIsOpenCardCreateRoom] = useState(false);
  const [isOpenRules, setIsOpenRules] = useState(false);
  const [isOpenJoinRoom, setIsOpenJoinRoom] = useState(false);
  const [countRoom, setCountRoom] = useState<number>(0);
  const [countUser, setCountUser] = useState<number>(0);
  const [room, setRoom] = useState<Room[]>([]);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<RoomInput>({
    resolver: zodResolver(roomSchema)
  })

  const {
    register: registerJoin,
    handleSubmit: handleSubmitJoin,
    formState: { errors: errorsJoin }
  } = useForm<JoinRoomInput>({
    resolver: zodResolver(joinRoomSchema)
  })

  useEffect(() => {

    OnGetRoom();
    OnCountRoom();
    OnCountUser();

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${protocol}//${window.location.host}/api/auths/ws/test`);
    ws.onopen = () => {
      console.log("✅ WebSocket Lobby Connected!");
      console.log(user);

      const joinMessage = {
        type: "join",
        room_id: "lobby",
        user_id: user?.id,
        username: user?.username,
      }

      ws.send(JSON.stringify(joinMessage));
    };

    ws.onmessage = async (event) => {
      const msg: WsMessage = JSON.parse(event.data);
      console.log("msg", msg);

      if (msg.type == "lobby") {
        OnGetRoom();
        OnGetRoom();
        OnCountRoom();
        OnCountUser();
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



  }, [])

  const onSubmitRoom = async (data: RoomInput) => {
    try {
      const response = await createRoom(data);
      console.log(response);
      navigate(`/room/${response.data.room_id}`, {
        state: {
          room_id: response.data.room_id,
          room_name: response.data.room_name,
          max_room: response.data.total_player,
        }
      })

    } catch (error: any) {
      alert(error.message);
    }

  }


  const OnGetRoom = async () => {
    try {
      const response = await getRoom();
      setRoom(response.data);
    } catch (error: any) {
      alert(error.message);
    }
  }

  const OnCountRoom = async () => {
    try {
      const response = await GetCountRoom();
      setCountRoom(response.data);
    } catch (error: any) {
      alert(error.message);
    }
  }

  const OnCountUser = async () => {
    try {
      const response = await getCountUser();
      setCountUser(response.data);
    } catch (error: any) {
      alert(error.message);
    }
  }

  const openPopup = (title: string) => {
    if (title === "สร้างห้อง") {
      setIsOpenCardCreateRoom(true);
    } else if (title === "วิธีการเล่น") {
      setIsOpenRules(true);
    } else {
      setIsOpenJoinRoom(true);
    }
  };

  const joinRoom = (roomId: string, roomName: string, maxRoom: number) => {
    navigate(`/room/${roomId}`, {
      state: {
        room_id: roomId,
        room_name: roomName,
        max_room: maxRoom,
      }
    });
  };

  const joinRoomId = async (data: JoinRoomInput) => {
    try {
      const response = await GetRoomById(data.room_id)
      navigate(`/room/${response.data.room_id}`, {
        state: {
          room_id: response.data.room_id,
          room_name: response.data.room_name,
          max_room: response.data.total_player,
        }
      });
    } catch (error: any) {
      alert(error.message);
    }


  }

  const closeRules = () => {
    setIsOpenRules(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex flex-col items-center">
      <ShootingStars />
      <StarsBackground />



      <div className="relative z-10 mt-24 flex flex-col items-center animate-floating">
        <div className="text-8xl mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] ">
          🌙
        </div>

        <h1 className="text-4xl sm:text-8xl font-black tracking-[0.3em] bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-2xl">
          WEREWOLF
        </h1>

        <p className="text-slate-400 tracking-[0.2em] text-sm sm:text-md mt-4 uppercase">
          เลือกห้องหรือสร้างห้องใหม่เพื่อเริ่มการผจญภัย
        </p>

        <p className="text-white mt-2 text-[12px] sm:text-sm">
          🟢 ผู้เล่นออนไลน์ {countUser} คน    🚪ห้องทั้งหมด {countRoom} ห้อง
        </p>

      </div>

      <div className="text-white mt-10 flex flex-wrap justify-center gap-6 w-full max-w-6xl px-4 pb-20">

        {[
          { icon: "🎮", title: "สร้างห้อง", desc: "เป็นเจ้าของห้องและเริ่มเกม" },
          { icon: "🚪", title: "เข้าร่วมห้อง", desc: "เริ่มเกมเลย" },
          { icon: "📘", title: "วิธีการเล่น", desc: "เรียนรู้วิธีการเล่นเกม" },
        ].map((item, index) => (
          <motion.button
            onClick={() => openPopup(item.title)}
            key={index}
            whileHover={{
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 }
            }}
            whileTap={{
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: index * 0.1, duration: 0.5 }
            }}
            className="flex-1 min-w-[300px] md:min-w-[320px] bg-gradient-to-br from-purple-500/20 to-purple-900/20 backdrop-blur-xl border border-white/20 rounded-2xl p-10 flex flex-col items-center group relative overflow-hidden transition-colors hover:bg-white/5"
          >
            <BorderBeam duration={5} size={100} />

            <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <div className="text-2xl mt-4 font-bold tracking-tight">
              {item.title}
            </div>
            <div className="text-sm text-slate-400 mt-2">
              {item.desc}
            </div>

            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {
          isOpenCardCreateRoom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                y: 100,
                opacity: 0,
                transition: { ease: "easeIn", duration: 0.2 }
              }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="bg-gradient-to-br from-slate-900 to-purple-950 border border-purple-500/30 border border-purple-500/30 p-8 rounded-3xl max-w-md w-full relative"
              >
                <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">สร้างห้องใหม่</h2>
                <form onSubmit={handleSubmit(onSubmitRoom)}>
                  <div className="mb-4 flex flex-col gap-2">
                    <label className="text-sm text-slate-400">ชื่อห้อง</label>
                    <input type="text" {...register("room_name")} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white mt-1 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="ระบุชื่อห้อง..." />
                    {errors.room_name && <span className="text-red-400 text-xs">{errors.room_name.message}</span>}
                    <span className="text-sm text-slate-400 mt-2">เลือกจำนวนผู้เล่น</span>
                    <select {...register("total_player", { valueAsNumber: true })} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white mt-1 focus:ring-2 focus:ring-purple-500 outline-none">
                      <option className="bg-black" value="6">6 คน</option>
                      <option className="bg-black" value="8">8 คน</option>
                      <option className="bg-black" value="12">12 คน</option>
                    </select>
                    <input type="hidden" {...register("create_by")} value={user?.username} />

                    <div className="flex gap-4 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10
                        }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-xl text-white font-bold shadow-lg shadow-purple-500/20"
                      >
                        {isSubmitting ? "กำลังสร้างห้อง..." : "สร้างห้อง"}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10
                        }}
                        type="button"
                        onClick={() => setIsOpenCardCreateRoom(false)}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-xl text-white font-bold shadow-lg shadow-red-500/20"
                      >
                        ยกเลิก
                      </motion.button>
                    </div>

                  </div>
                </form>
              </motion.div>
            </motion.div>


          )
        }

      </AnimatePresence>

      <AnimatePresence>
        {
          isOpenJoinRoom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                y: 100,
                opacity: 0,
                transition: { ease: "easeIn", duration: 0.2 }
              }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="bg-gradient-to-br from-slate-900 to-purple-950 border border-purple-500/30 border border-purple-500/30 p-8 rounded-3xl max-w-md w-full relative"
              >
                <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">เข้าร่วมห้อง</h2>
                <form onSubmit={handleSubmitJoin(joinRoomId)}>
                  <div className="mb-4 flex flex-col gap-2">
                    <label className="text-sm text-slate-400">รหัสห้อง</label>
                    <input type="text" {...registerJoin("room_id")} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white mt-1 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="ระบุชื่อห้อง..." />
                    {errorsJoin.room_id && <span className="text-red-400 text-xs">{errorsJoin.room_id.message}</span>}
                    <div className="flex gap-4 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10
                        }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-xl text-white font-bold shadow-lg shadow-purple-500/20"
                      >
                        {isSubmitting ? "กำลังเข้าห้อง..." : "เข้าร่วมห้อง"}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10
                        }}
                        type="button"
                        onClick={() => setIsOpenJoinRoom(false)}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 p-4 rounded-xl text-white font-bold shadow-lg shadow-red-500/20"
                      >
                        ยกเลิก
                      </motion.button>
                    </div>

                  </div>
                </form>
              </motion.div>
            </motion.div>


          )
        }

      </AnimatePresence>

      <AnimatePresence>
        {isOpenRules && (
          <RulesGame onClose={closeRules} />
        )}
      </AnimatePresence>
      <div className="w-full max-w-6xl mx-auto flex justify-between">

        <h3 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-3xl sm:text-5xl font-bold ml-2 sm:ml-0">
          ห้องที่เปิด
        </h3>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 1000,
            damping: 60
          }}
          type="button"
          className="bg-white/5 border border-white/10 p-2 sm:p-4 rounded-xl text-gray-400 mr-2 sm:mr-0"
          onClick={OnGetRoom}
        >
          🔄️ รีเฟรช
        </motion.button>
      </div>

      <div className="w-full max-w-6xl mx-auto mt-8 grid grid-cols-2 gap-6 px-2 sm:px-0 z-10">
        {room.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.03,
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="bg-purple-500/10 border border-white/10 p-2 sm:p-6 rounded-2xl"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl sm:text-3xl font-bold text-white">{room.room_name}</h3>
            </div>
            <div className="flex items-center gap-3 text-gray-300 text-[11px] sm:text-sm">
              <span>👤</span>
              <span>เจ้าของห้อง:</span>
              <span className="text-purple-400">{room.create_by}</span>
            </div>
            <PlayerProgressBar current={room.total_player_current} max={room.total_player} />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10
              }}
              onClick={() => joinRoom(room.room_id, room.room_name, room.total_player)}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl text-white font-bold shadow-lg shadow-purple-500/20 mt-4"
            >
              เข้าร่วม
            </motion.button>

          </motion.div>
        ))}
      </div>

    </div>
  )
}

export default GameLobbyPage