import React from 'react';
import './Form.css';

function Form({ campos, onSubmit, botonTexto }) {
  return (
    <form className="formulario" onSubmit={onSubmit}>
      {campos.map((campo, index) => (
        <div key={index} className="form-group">
          <label className="form-label" htmlFor={campo.name}>
            {campo.label}{campo.required && '*'}
          </label>
          <input
            type={campo.type}
            name={campo.name}
            placeholder={campo.placeholder}
            required={campo.required}
            className="form-input"
            id={campo.name}
          />
          
        </div>
      ))}
    <button type="submit" className="form-button">
        {botonTexto}
      </button>

    </form>
  );
}

export default Form;
