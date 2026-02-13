import { useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [noClickCount, setNoClickCount] = useState(0);
  const [question, setQuestion] = useState("wanna hangout?💕");
  const [message, setMessage] = useState("");
  const [gif, setGif] = useState("");
  const [showGif, setShowGif] = useState(false);
  const [yesSize, setYesSize] = useState(20);
  const [noSize, setNoSize] = useState(20);
  const [noPosition, setNoPosition] = useState({ position: "static" });
  const [noDisabled, setNoDisabled] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [hearts, setHearts] = useState([]);

  const handleNoClick = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    setShowGif(true);
    setGif("https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTlmd3Bubmo1MmZidTc2YTBwdGNhY3hhbm56cWFhOXRwdGhydXdhNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ov9k9lURIV8NxMg7u/giphy.gif");

    if (newCount === 1) {
      setYesSize(30);
    } else if (newCount === 2) {
      setYesSize(40);
      setNoSize(10);
    } else if (newCount === 3) {
      setYesSize(90);
      setNoSize(7);
    } else if (newCount >= 4 && newCount < 15) {
      setMessage("Are you sure? 😏");
      setNoPosition({
        position: "absolute",
        left: Math.random() * (window.innerWidth - 100) + "px",
        top: Math.random() * (window.innerHeight - 50) + "px",
      });
    } else if (newCount === 15) {
      setNoDisabled(true);
      setMessage("Oh no! You broke the NO button 😭");
    }
  };

  const handleYesClick = async () => {
    if (!name.trim()) {
      alert("Please enter your name first 💕");
      return;
    }

    // 🔥 Insert into Supabase
    const { error } = await supabase
      .from("date_responses")
      .insert([
        {
          name: name,
          status: "YES",
        },
      ]);

    if (error) {
      console.error(error);
      alert("Something went wrong 😢");
      return;
    }

    setQuestion(`Let's gooooo💖`);
    setMessage("");
    setShowGif(true);
    setGif("https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjI3MjFrMjB3YnNmdTNtcnRuMmV5enhyZGw2cWF6ZnFpNHA4MXprbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/O0ZVylIJnfyehl1UzQ/giphy.gif");
    setShowButtons(false);

    const newHearts = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: Math.random() * window.innerWidth,
      duration: Math.random() * 2 + 3,
      delay: Math.random() * 2,
    }));

    setHearts(newHearts);
  };

  return (
    <>
      <div className="container">
        <div className="content">
        <h1 className="valentineTitle">HAPPY VALENTINE'S DAY DANICA💖</h1>
          <h2>{question}</h2>

          {showButtons && (
            <>
              {/* 💖 Name Input */}
              <input
                type="text"
                placeholder="Message💕"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="nameInput"
              />

              <button
                className="yesButton"
                style={{ fontSize: yesSize }}
                onClick={handleYesClick}
              >
                YES
              </button>

              <button
                className="noButton"
                style={{ fontSize: noSize, ...noPosition }}
                onClick={handleNoClick}
                disabled={noDisabled}
              >
                NO
              </button>
            </>
          )}

          <p>{message}</p>

          {showGif && (
            <div className="gifContainer">
              <img src={gif} alt="reaction gif" />
            </div>
          )}
        </div>
      </div>

      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: heart.left,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        />
      ))}
    </>
  );
}

export default App;
