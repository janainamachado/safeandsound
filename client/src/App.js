import React, { useEffect, useState } from "react"
import FormReview from './components/FormReview' 
import './App.css';


function App() {
const [venues, setVenues] = useState([]); 
const [reviews, setReviews] = useState([]);
const [selectedVenue, setSelectedVenue] = useState({})
const [inputValues, setInputValues] = useState({
  venue_id: '', venuename: '', address: '', date: '', incident: '', username: ''
});
let [searchInput, setSearchInput] = useState("");

useEffect(() => {
  getVenues();
}, []);

console.log("aqui estao as reviews:", reviews);
console.log("aqui estao as venues:", venues);

const handleFormSubmit = async (venue) => {
  await addReview(venue);
  // setInputValues("");

}

async function addReview(newReview) {
  let options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newReview)
  }
  try {
    let response = await fetch('/reviews', options);
    if (response.ok) {
      let data = await response.json();
      setReviews(data);
    } else {
      console.log(`Server error: ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    console.log(`Network error: ${err.message}`)
  }
}

const getVenues = (venuename) => {
  fetch(`/venues?venuename=${venuename}`)
    .then(response => response.json())
    .then(venues => {
      console.log(venues)
      setVenues(venues);
    })
    .catch(error => {
      console.log(error);
    });
};

const handleSearchChange = (event) => {
  setSearchInput(event.target.value);
};

const handleSearchSubmit = async (event) => {
  event.preventDefault();
  getVenues(searchInput);
  setSearchInput("");
}

const selectVenue = (clickedVenue) => {
  setInputValues(inputValues => ({...inputValues, "venue_id": clickedVenue.id}))
  setSelectedVenue(clickedVenue);
}

  return (
    <div className="App">
      <div class="App-header">
      <h1>Safe and Sound</h1>
      <h3>A safe place for women to share where they felt safe - or not.</h3>
      <form onSubmit={handleSearchSubmit}>
        <input onChange={handleSearchChange} type="text" className="form-input" 
        placeholder="Search venue"></input> 
      </form>
      </div>
      <FormReview addVenue={(venue) => handleFormSubmit(venue)}/>
      {/* <form onSubmit={handleSubmit} className="Body">
        <p>Add new occurence:</p>
        <div className="space-div">
          <label className="form-label">Venue:</label>
          <input value={selectedVenue.venuename} onChange={handleChange} name="venuename" className="form-input" type="text" required></input>
        </div>
        <div className="space-div">
          <label className="form-label">Venue address:</label>
          <input value={selectedVenue.address} onChange={handleChange} name="address" className="form-input" type="text" required></input>
        </div>
        <div className="space-div">
          <label className="form-label">Date:</label>
          <input value={selectedVenue.date} onChange={handleChange} name="date" type="date" required></input>
        </div>
        <div className="space-div">
          <label className="form-label">Share your experience:</label>
          <textarea onChange={handleChange} name="incident" className="form-text" required></textarea>
        </div>
        <div className="space-div">
        <label className="form-label">Your name:</label>
        <input onChange={handleChange} name="username" type="text" placeholder="Optional"></input>
        </div>
        <button type="submit" className="form-label">Send</button>
        </form> */}
        <h2>Venues List</h2>
        {venues.map(venue => (
          <li onClick={e => selectVenue(venue)} key={venue.id}>
              {venue.venuename}
          </li>
        ))}
        <h2>Reviews:</h2>
        <ul>{reviews.map(review => 
          <li key={review.id}>{review}</li>)}
        </ul>
        </div>
  );
}

export default App;
