import React from "react";
import "../../App.css";
import {withRouter} from 'react-router-dom'
const Card = ({ details,history }) => {

  const productPage = () => {
    history.push(`/character/${details.char_id}`);
}

  return (
    <div>
      <div class="card" onClick={productPage}>
        <div class="front">
          <img src={details.img} width="250px" height="250px" alt="" />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Card);
