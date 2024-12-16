import React from "react";
import { Button } from "react-bootstrap";
import "./CustomButton.css"; 

export function CustomButton({ type, value, onClick }) {
  const buttonClass = getButtonClass(type);

  return <Button className={buttonClass} onClick={onClick}>{value}</Button>;
}

function getButtonClass(type) {
  switch (type) {
    case "btn-primary":
      return "btn-primary";
    case "btn-light-grey":
      return "btn-light-grey"; 
    case "btn-outline-light":
      return "btn-outline-light";
    default:
      return "btn-primary";
  }
}
