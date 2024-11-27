import React from 'react';
import './SocialButton.css';
import PropTypes from 'prop-types';

const SocialButton = ({ icon, url }) => (
  <button className="social-button" onClick={() => window.open(url, '_blank')}>
    <img src={icon} alt="icon" className="social-icon" />
  </button>
);

SocialButton.propTypes = {
  icon: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default SocialButton;
