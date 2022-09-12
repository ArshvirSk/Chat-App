import React from "react";
import { useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import io from "socket.io-client";
import Chat from "./Chat";
import "./App.css";

const socket = io.connect("https://salty-retreat-48240.herokuapp.com/");
// const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
      localStorage.setItem('username', username);
    }
  };

  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };
  
  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <div className="App">
      <img src="./logo.png" alt="" />
      <Particles className="particles"
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              fpsLimit: 60,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#ff0000",
                },
                links: {
                  color: "#ff0000",
                  distance: 200,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 2,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 80,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle"
                },
                size: {
                  value: { min: 1, max: 3 },
                },
              },
              detectRetina: true,
            }}
        />
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <form action="">
            <div className="input-field">
              <input
                className="effect"
                type="text"
                placeholder="Username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                required
              />
              <span class="focus-border"></span>
            </div>
            <div className="input-field">
              <input
                className="effect"
                type="text"
                placeholder="Room Id"
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
                onKeyPress={(event) => {
                  event.key === "Enter" && joinRoom();
                }}
                required
              />
              <span class="focus-border"></span>
            </div>
          </form>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
          <div>
            <Chat socket={socket} username={username} room={room} />
          </div>
      )}
    </div>
  );
}

export default App;