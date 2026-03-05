# PeerDrop - WebRTC P2P File Transfer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![WebRTC](https://img.shields.io/badge/WebRTC-Supported-green.svg)](https://webrtc.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

A modern, secure, and blazing-fast peer-to-peer file transfer application built with WebRTC technology. Transfer files directly between devices without storing them on any server.

![PeerDrop Demo](./demo.gif)

## ✨ Features

### 🚀 Core Features

- **Direct P2P Transfer**: Files are transferred directly between peers using WebRTC
- **No Server Storage**: Files never touch your server - complete privacy
- **Real-time Streaming**: Large files are streamed in chunks for optimal performance
- **Secure Connection**: End-to-end encrypted WebRTC connections
- **Cross-platform**: Works on all modern browsers and devices

### 🎨 User Experience

- **Modern UI**: Beautiful, responsive design with dark theme
- **Real-time Status**: Live progress tracking and connection status
- **Drag & Drop**: Intuitive file selection interface
- **Mobile Friendly**: Fully responsive design for all screen sizes
- **Toast Notifications**: User-friendly feedback and error handling

### 🔧 Technical Features

- **WebRTC Data Channels**: Reliable, ordered data transfer
- **WebSocket Signaling**: Efficient connection establishment
- **Chunk-based Transfer**: Optimized for large files
- **Connection Management**: Automatic cleanup and error recovery
- **Environment Configuration**: Flexible deployment options

## 🛠️ Technology Stack

### Frontend

- **React 19** - Modern React with hooks and concurrent features
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React Toastify** - Beautiful toast notifications

### Backend

- **Node.js** - JavaScript runtime
- **WebSocket (ws)** - Real-time communication
- **Express.js** - Web framework (future enhancement)

### Communication

- **WebRTC** - Peer-to-peer data transfer
- **WebSocket** - Signaling server for connection establishment
- **STUN Servers** - NAT traversal for peer discovery

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Modern web browser** with WebRTC support (Chrome, Firefox, Safari, Edge)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AzizzAzizli/WebRTC-P2P-File-Transfer.git
cd WebRTC-P2P-File-Transfer
```

### 2. Install Dependencies

#### Client Setup

```bash
cd client
npm install
```

#### Server Setup

```bash
cd ../server
npm install
```

### 3. Environment Configuration

Create a `.env` file in the client directory:

```env
# WebSocket URL for signaling server
VITE_WS_URL="ws://localhost:3001"
```

### 4. Start the Application

#### Terminal 1: Start the Signaling Server

```bash
cd server
npm start
# Server will run on http://localhost:3001
```

#### Terminal 2: Start the Client

```bash
cd client
npm run dev
# Client will run on http://localhost:5173
```

### 5. Access the Application

Open your browser and navigate to: **http://localhost:5173**

## 📖 Usage

### For Senders (File Upload)

1. **Select a File**: Click or drag & drop any file you want to share
2. **Generate Link**: Click "Create Link" to generate a unique sharing link
3. **Copy Link**: Copy the generated link and share it with the recipient
4. **Wait for Connection**: Keep the tab open until the transfer completes
5. **Monitor Progress**: Watch real-time transfer progress and status

### For Receivers (File Download)

1. **Open Shared Link**: Click the link shared by the sender
2. **Wait for Connection**: The page will automatically connect to the sender
3. **Request File**: Click "Get files" when ready
4. **Download**: Once transfer completes, download your file

### Connection Status Indicators

- 🟡 **Idle**: Ready to share
- 🔵 **Waiting**: Link created, waiting for receiver
- 🟣 **Connecting**: Establishing peer connection
- 🟢 **Connected**: Ready for transfer
- 🟢 **Sending/Receiving**: Transfer in progress
- 🟢 **Done**: Transfer completed successfully

## 🏗️ Project Structure

```
WebRTC-P2P-File-Transfer/
├── client/                          # React Frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Header/             # Navigation header
│   │   │   ├── Status/             # Connection status indicator
│   │   │   ├── Downloadbox/        # File upload interface
│   │   │   ├── ReceiveBox/         # File download interface
│   │   │   ├── Input/              # File input component
│   │   │   ├── Progress/           # Progress bar
│   │   │   └── ...
│   │   ├── pages/                  # Page components
│   │   │   ├── Home/               # Main upload page
│   │   │   ├── DownloadPage/       # Download page
│   │   │   └── NotFound/           # 404 error page
│   │   ├── webrtc/                 # WebRTC utilities
│   │   │   └── createPeer.js       # Peer connection factory
│   │   ├── shared/                 # Shared utilities
│   │   │   └── utils/              # Helper functions
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # App entry point
│   ├── .env                        # Environment variables
│   ├── package.json                # Dependencies
│   └── vite.config.js              # Vite configuration
├── server/                          # Node.js Backend
│   ├── server.js                   # WebSocket signaling server
│   └── package.json                # Dependencies
└── README.md                       # Project documentation
```

## 📡 API Documentation

### WebSocket Signaling Protocol

The signaling server uses WebSocket connections for peer coordination. All messages are JSON formatted.

#### Client → Server Messages

| Message Type    | Description              | Payload                                  |
| --------------- | ------------------------ | ---------------------------------------- |
| `create-room`   | Create new transfer room | `{ fileName: string, fileSize: number }` |
| `join-room`     | Join existing room       | `{ roomId: string }`                     |
| `request-file`  | Request file transfer    | `{ roomId: string }`                     |
| `offer`         | WebRTC offer             | `{ sdp: RTCSessionDescription }`         |
| `answer`        | WebRTC answer            | `{ sdp: RTCSessionDescription }`         |
| `ice-candidate` | ICE candidate            | `{ candidate: RTCIceCandidate }`         |

#### Server → Client Messages

| Message Type        | Description               | Payload                                  |
| ------------------- | ------------------------- | ---------------------------------------- |
| `room-created`      | Room created successfully | `{ roomId: string }`                     |
| `room-joined`       | Successfully joined room  | `{ fileName: string, fileSize: number }` |
| `receiver-joined`   | Receiver connected        | -                                        |
| `file-requested`    | File transfer requested   | -                                        |
| `peer-disconnected` | Peer disconnected         | `{ message: string }`                    |
| `error`             | Error occurred            | `{ message: string }`                    |

### WebRTC Data Transfer

- **Data Channel**: Binary data transfer using WebRTC DataChannel API
- **Chunk Size**: 16KB chunks for optimal performance
- **Binary Type**: `arraybuffer` for efficient binary data handling
- **Flow Control**: Buffered amount monitoring to prevent overflow

## 🔧 Development

### Available Scripts

#### Client

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

#### Server

```bash
npm start            # Start production server
npm run nodemon      # Start with auto-reload (development)
```

### Environment Variables

| Variable      | Description                    | Default               |
| ------------- | ------------------------------ | --------------------- |
| `VITE_WS_URL` | WebSocket signaling server URL | `ws://localhost:3001` |

### Building for Production

1. **Build the client:**

   ```bash
   cd client
   npm run build
   ```

2. **Start the server:**

   ```bash
   cd server
   npm start
   ```

3. **Serve static files** from `client/dist` directory

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **WebRTC** for enabling peer-to-peer communication
- **React** community for excellent documentation
- **Tailwind CSS** for beautiful styling utilities
- **Vite** for blazing-fast development experience

## 📞 Support

If you have any questions or need help:

- **Issues**: [GitHub Issues](https://github.com/AzizzAzizli/WebRTC-P2P-File-Transfer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/AzizzAzizli/WebRTC-P2P-File-Transfer/discussions)

---

**Made with ❤️ using WebRTC, React, and modern web technologies**
