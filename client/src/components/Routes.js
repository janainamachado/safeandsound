import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import FormReview from '../views/FormReview';
import ReviewsList from '../views/ReviewsList';


function Routes (props){
    return (
     <BrowserRouter>   
      <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        <Route path="/add-a-review">
            <FormReview inputValues={props.inputValues}
            setInputValues={props.setInputValues}
            initialInputValues={props.initialInputValues} 
            setReviews={props.setReviews}
            reviews={props.reviews}/>
        </Route>
        <Route path="/reviews-list">
            <ReviewsList/>
        </Route>
      </Switch>
    </BrowserRouter>
    )
}

export default Routes;