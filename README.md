// structure
gamewolf/
├── client/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/        # UI Components
│   │   │   ├── common/        # ปุ่ม, Modal, Card ทั่วไป
│   │   │   ├── game/          # Game-specific components
│   │   │   │   ├── PlayerCard.tsx
│   │   │   │   ├── RoleReveal.tsx
│   │   │   │   ├── VotingPanel.tsx
│   │   │   │   └── GameBoard.tsx
│   │   │   └── lobby/         # Lobby/Room components
│   │   ├── pages/             # หน้าหลักๆ
│   │   │   ├── Home.tsx
│   │   │   ├── Lobby.tsx
│   │   │   └── Game.tsx
│   │   ├── hooks/             # Custom hooks
│   │   │   ├── useSocket.ts   # WebSocket connection
│   │   │   └── useGame.ts     # Game state management
│   │   ├── contexts/          # React Context
│   │   │   ├── AuthContext.tsx
│   │   │   └── GameContext.tsx
│   │   ├── services/          # API calls
│   │   ├── types/             # TypeScript types
│   │   └── utils/             # Helper functions
│
├── server/                    # Backend
│   ├── src/
│   │   ├── game/              # Game Logic
│   │   │   ├── GameManager.ts # จัดการ game instances
│   │   │   ├── GameState.ts   # State machine
│   │   │   └── roles/         # แต่ละ role
│   │   │       ├── Werewolf.ts
│   │   │       ├── Villager.ts
│   │   │       ├── Seer.ts
│   │   │       └── Doctor.ts
│   │   ├── socket/            # WebSocket handlers
│   │   ├── routes/            # REST API routes
│   │   └── models/            # Database models
│
└── shared/                    # Shared types/constants
    └── types/
        ├── game.ts
        └── events.ts