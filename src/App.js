import "./App.css";
import ChatBubble from "./components/BubbleButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChatBubble
          message={{ text: "Hola, soy un mensaje de texto" }}
          isUser={true}
        />
      </header>
    </div>
  );
}

export default App;
