import React from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes para la validación de props
import './Form.css';

// Componente Form que crea un formulario dinámico
function Form({ title,campos, onSubmit, botonTexto }) {
  return (
    <form className="formulario" onSubmit={onSubmit}>
      <h2 className='formulario-title'>{title}</h2>
      {campos.map((campo, index) => (
        <div key={index} className="form-group">
          <label className="form-label" htmlFor={campo.name}>
            {campo.label}
            {campo.required && '*'}
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

// Validación de props con PropTypes
Form.propTypes = {
  title: PropTypes.string,
  campos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,     // El nombre del campo debe ser una cadena y es obligatorio
      label: PropTypes.string.isRequired,    // La etiqueta del campo debe ser una cadena y es obligatoria
      type: PropTypes.string.isRequired,     // El tipo del input (text, email, etc.) es obligatorio
      placeholder: PropTypes.string,         // Placeholder es opcional, pero debe ser una cadena si se proporciona
      required: PropTypes.bool               // Indica si el campo es obligatorio
    })
  ).isRequired, // 'campos' debe ser un array de objetos con las propiedades especificadas
  onSubmit: PropTypes.func.isRequired,       // onSubmit debe ser una función y es obligatorio
  botonTexto: PropTypes.string.isRequired    // botonTexto debe ser una cadena y es obligatorio
};

export default Form;
