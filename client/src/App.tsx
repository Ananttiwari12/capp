import "./App.css";
import { useSocket } from "./Context/SocketProvider";
import { useState } from "react";
function App() {
  const [message, setMessage] = useState("");
  const { sendMessage, messages } = useSocket();

  return (
    <>
      <div>
        <div>
          <h1>Chat here</h1>
        </div>

        <div>
          <input
            onChange={(e) => setMessage(e.target.value)}
            className=".input-box"
            placeholder="type here.."
          />
        </div>
        <div>
          <button onClick={(e) => sendMessage(message)}>send Message</button>
        </div>
      </div>
    </>
  );
}

export default App;
