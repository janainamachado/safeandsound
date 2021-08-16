import React from "react"
import '../App.css'

function FormReview(props) {
    //getting the info from my form and saving in my state without overwritting the last saved
    const handleChange = (event) => {
        const { name, value } = event.target;
        props.setInputValues(inputValues => ({ ...inputValues, [name]: value }));
    };

    //once my form is sent, a review is added
    const handleSubmit = async (event) => {
        event.preventDefault();
        await addReview(props.inputValues);
        // props.setInputValues(props.initialInputValues);
    };

      async function addReview(newReview) {
        console.log("data", newReview)
        let options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReview)
        }
        try {
          let response = await fetch('/reviews', options);
          if (response.ok) {
            let data = await response.json();
            props.setReviews([...props.reviews, data]);
            
          } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
          }
        } catch (err) {
          console.log(`Network error: ${err.message}`)
        }
      }

    return (
        <div className="container-fluid">
            <div className="row"></div>
                <div className="col-md-8"></div>
            <form onSubmit={handleSubmit} className="Body">
                <h5 className="form-font">Add a new review:</h5>
                <div className="space-div">
                    <label className="form-font form-label">Venue:</label>
                    <input value={props.inputValues.venuename} onChange={handleChange} name="venuename" className="form-input" type="text" required></input>
                </div>
                <div className="space-div">
                    <label className="form-font form-label">Venue address:</label>
                    <input value={props.inputValues.address} onChange={handleChange} name="address" className="form-input" type="text" required></input>
                </div>
                <div className="space-div">
                    <label className="form-font form-label">Date:</label>
                    <input onChange={handleChange} name="date" type="date" required></input>
                </div>
                <div className="space-div">
                    <label className="form-font form-label">Share your experience:</label>
                    <textarea onChange={handleChange} name="incident" className="form-text" required></textarea>
                </div>
                <div className="space-div">
                    <label className="form-font form-label">Your name:</label>
                    <input onChange={handleChange} name="username" type="text" placeholder="Optional"></input>
                </div>
                <button type="submit" className="form-label">Send</button>
            </form>
        </div>
    )
} 
export default FormReview;