import Navbar from "./components/Navbar/navbar.jsx";
// import "./styles/App.css"; 

function App() {
  return (
    <div class="app-container">
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content Area */}
      <main class="main-content">
        <p>Welcome to your Google Keep Clone!</p>
        {/* Add other components like Sidebar, Notes List here */}
      </main>
    </div>
  );
}

export default App;
