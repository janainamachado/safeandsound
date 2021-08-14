import React, { useState } from "react"
import '../App.css';

function FormReview(props) {
    const [inputValues, setInputValues] = useState({
        venue_id: '', venuename: '', address: '', date: '', incident: '', username: ''
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setInputValues(inputValues => ({ ...inputValues, [name]: value }));
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        props.addVenue(inputValues);
        // setInputValues("");
        // value={selectedVenue.venuename} 
        // value={selectedVenue.address} 
        // value={selectedVenue.date}
      }
    return (
        <div>
        <form onSubmit={handleSubmit} className="Body">
        <p>Add new occurence:</p>
        <div className="space-div">
          <label className="form-label">Venue:</label>
          <input onChange={handleChange} name="venuename" className="form-input" type="text" required></input>
        </div>
        <div className="space-div">
          <label className="form-label">Venue address:</label>
          <input onChange={handleChange} name="address" className="form-input" type="text" required></input>
        </div>
        <div className="space-div">
          <label className="form-label">Date:</label>
          <input onChange={handleChange} name="date" type="date" required></input>
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
        </form>
        </div>
    )
} 
export default FormReview;