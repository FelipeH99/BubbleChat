import React, { useState, useEffect } from "react";
import "./BubbleButton.css";

const BubbleButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth - 80, // Posición inicial en X
    y: window.innerHeight - 80, // Posición inicial en Y
  });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const toggleChat = (e) => {
    // Evitamos que el clic inicie el arrastre cuando se hace click en el botón
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const onMouseDown = (e) => {
    // Solo consideramos el botón izquierdo del mouse
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

    // Limpieza al desmontar o cambiar dragging
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
            src="http://tu-backend.com/chat" // Reemplaza con la URL de tu backend
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
