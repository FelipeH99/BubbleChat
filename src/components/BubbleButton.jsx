import React, { useState, useEffect } from "react";
import "./BubbleButton.css";

const BubbleButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 80,
  });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const toggleChat = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, offset]);

  return (
    <div
      className="bubble-button-container"
      onMouseDown={onMouseDown}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 1000,
      }}
    >
      {/* Botón burbuja */}
      <button className="bubble-button" onClick={toggleChat}>
        Chat
      </button>

      {/* Ventana de chat con iframe */}
      {isOpen && (
        <div className="chat-window">
          <iframe
            title="Chat Iframe"
            src="http://127.0.0.1:5000/chat-widget" // Ahora apunta al endpoint que sirve la interfaz
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: "none", borderRadius: "8px" }}
          />
        </div>
      )}
    </div>
  );
};

export default BubbleButton;
