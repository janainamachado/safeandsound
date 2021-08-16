import React, { useEffect } from "react"
import '../App.css'

function ReviewsList (props) {
    useEffect(() => {
        getReviews();
    },[]);

    const getReviews = () => {
        fetch(`/reviews`)
            .then(response => response.json())
            .then(reviews => {
            console.log(reviews)
            props.setReviews(reviews);
            })
            .catch(error => {
            console.log(error);
            });
      };
    return (
        <div>
        <div className="row">
        <h5 className="card-title">Reviews:</h5>
        {props.reviews.map(review => 
        <div className="col-sm-3">
        <div key={review.id} className="card">
          <div className="card-body">
            <h5 className="card-title">{review.venuename}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{review.address} {review["DATE_FORMAT(r.date, '%Y-%m-%d')"]} {review.username}</h6>
            <p className="card-text">{review.incident}</p>
          </div>
          </div>
          </div>
        )}
        </div>
    </div>

    )
};    

export default ReviewsList;