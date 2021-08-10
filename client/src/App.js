import './App.css';

function App() {





  return (
    <div className="App">
      <h1>Safe and Sound</h1>
      <h3>A safe place for women to share reviews of venues where they felt safe - or not.</h3>
      <input type="text" className="form-input" placeholder="Search establishment"></input>
      <form className="Body">
        <p>Add new occurence:</p>
        <div className="space-div">
          <label className="form-label">Establishment:</label>
          <input className="form-input" type="text" required></input>
        </div>
        <div className="space-div">
          <label className="form-label">Date:</label>
          <input type="date" required></input>
        </div>
        <div className="space-div">
          <label className="form-label">Share your experience:</label>
          <textarea className="form-text" required></textarea>
        </div>
        <div className="space-div">
        <label className="form-label">Your name:</label>
        <input type="text" placeholder="Optional"></input>
        </div>
        <button className="form-label">Send</button>


        </form>
      
    </div>
  );
}

export default App;
