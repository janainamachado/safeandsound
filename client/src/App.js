import React, { useEffect, useState } from "react"
import Routes from './components/Routes';
import Navbar from './components/NavBar';
import './App.css';

function App() {
  //created this to make it easier to navigate between components
  const initialInputValues = {
    venue_id: '', venuename: '', address: '', date: '', incident: '', username: ''};
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [reviews, setReviews] = useState([]);


  return (
    <div className="App">
      <Routes inputValues={inputValues}
      setInputValues={setInputValues}
      initialInputValues={initialInputValues} 
      setReviews={setReviews}
      reviews={reviews} />
      <Navbar 
       />
      
    </div>
  );
}

export default App;
