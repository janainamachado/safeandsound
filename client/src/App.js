import React, { useEffect, useState } from "react"
import FormReview from './components/FormReview' 
import SearchVenue from './components/SearchVenue' 
import ReviewsList from './components/ReviewsList' 
import './App.css';

function App() {
  //created this to make it easier to navigate between components
  const initialInputValues = {
    venue_id: '', venuename: '', address: '', date: '', incident: '', username: ''};
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [reviews, setReviews] = useState([]);


  return (
    <div className="App">
      <SearchVenue inputValues={inputValues}
      setInputValues={setInputValues} />
      <FormReview inputValues={inputValues}
       setInputValues={setInputValues}
       initialInputValues={initialInputValues} 
       setReviews={setReviews}
       reviews={reviews}/>
      <ReviewsList 
      setReviews={setReviews}
      reviews={reviews}/>
    </div>
  );
}

export default App;
