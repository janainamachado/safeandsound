import React, { useState } from "react"
import '../App.css'

function SearchVenue (props) {
  const [venues, setVenues] = useState([])
  const [searchInput, setSearchInput] = useState([])
  
  //getVenues is getting venues saved in my DB by their names so it can
  //be filtered in my search
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
  //saving in my state the input in my form
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    getVenues(searchInput);
  };
  
  //search for saved venues by my state
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setSearchInput("");
  }
  //it's setting the inputValues of my form with the venue that was found
  //and clicked and it's completing only their id, venuename and addres
  //so i dont have double venues
  const selectVenue = (clickedVenue) => {
    console.log("bateu?")
    props.setInputValues(inputValues => ({...inputValues, "venue_id": clickedVenue.id, "venuename": clickedVenue.venuename, "address": clickedVenue.address}));
  }
    
    return (
        <div class="App-header">
        <h1>Safe and Sound</h1>
        <h3>A space for women to share where they felt <span id="spin"></span></h3>
        <form onSubmit={handleSearchSubmit}>
          <label for="exVenueList" className="form-label"></label>
          <input onChange={handleSearchChange} className="form-control" list="venuesOptions" id="exVenueList" placeholder="Search a venue"/>
          {/* <select id="venuesOptions">
           {venues.map(venue => (
            <option onClick={e => selectVenue(venue)} key={venue.id}>
            {venue.venuename}
            </option>
            ))} 
          </select> */}
          {venues && venues.map(venue =>
            <li onClick={e => selectVenue(venue)} key={venue.id}>{venue.venuename}</li>)}
          {/* <input  type="text" className="form-input" 
          placeholder="Search venue"/>    */}
        </form>
        
      </div>
    )
}
export default SearchVenue;