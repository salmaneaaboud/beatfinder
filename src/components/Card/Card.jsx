import React from 'react';
import './Card.css';;
import PropTypes from 'prop-types';


function Card({ title, subtitle, imageURL, detailsURL} ) {
  return (

<div className='custom-card'>
    <div className='card-image'>
        <img src={imageURL} alt={title} />
    </div>
    <div className='card-info'>
        <div className='card-title'>
            <h3>{title}</h3>
            <p>{subtitle}</p>
        </div>
        <a href={detailsURL}><p> &gt; See Details</p></a>

    </div>
</div>

  );
}
Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  detailsURL: PropTypes.string
};
export default Card;