import "./App.css";
import { ClientHeader } from "./components/ClientHeader/ClientHeader.jsx";

function App() {
  return (
    <>
      <ClientHeader
        clientName="Juan Pérez"
        clientAvatar="/path/to/avatar.jpg"
      />
    </>
  );
}

export default App;
