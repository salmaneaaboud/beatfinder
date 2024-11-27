import React from "react";
import { Button } from "react-bootstrap";
import "./CustomButton.css";

export function CustomButton({ type, value }) {
  switch (type) {
    case "btn-light":
      return <Button variant="light" className="btn-light">{value}</Button>;
    case "btn-outline-light":
      return <Button variant="outline-light" className="btn-outline-light">{value}</Button>;
    case "btn-primary":
      return <Button variant="light" className="btn-primary">{value}</Button>;
    case "btn-light-grey":
      return <Button variant="light" className="btn-light-grey">{value}</Button>;
    default:
      return <Button variant="light" className="btn-light">{value}</Button>; 
  }
}
