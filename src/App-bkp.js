import Push from 'push.js';

function App() {

  const handleNotification = () => {
    Push.create("teste")
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => handleNotification()}>Push Notification</button>
      </header>
    </div>
  );
}

export default App;
