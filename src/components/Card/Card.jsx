import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

function Card({ title, subtitle, imageURL, detailsURL }) {
  return (
    <div className='profile-card-container'>
      <div className='profile-card-image'>
        <img src={imageURL} alt={title} />
      </div>
      <div className='profile-card-info'>
        <div className='profile-card-title'>
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
