import PropTypes from 'prop-types'; // Importa PropTypes para la validación de props
import './Form.css';

// Componente Form que crea un formulario dinámico
function Form({ fields, onSubmit, botonTexto, values, onChange }) {
  return (
    <form className="formulario" onSubmit={onSubmit}>
      {fields.map((field, index) => (
        <div key={index} className="form-group">
          <label className="form-label" htmlFor={field.name}>
            {field.label}
            {field.required && '*'}
          </label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            className="form-input"
            id={field.name}
            value={values[field.name]}
            onChange={onChange}
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
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,     // El nombre del field debe ser una cadena y es obligatorio
      label: PropTypes.string.isRequired,    // La etiqueta del field debe ser una cadena y es obligatoria
      type: PropTypes.string.isRequired,     // El tipo del input (text, email, etc.) es obligatorio
      placeholder: PropTypes.string,         // Placeholder es opcional, pero debe ser una cadena si se proporciona
      required: PropTypes.bool               // Indica si el field es obligatorio
    })
  ).isRequired, // 'fields' debe ser un array de objetos con las propiedades especificadas
  onSubmit: PropTypes.func.isRequired,       // onSubmit debe ser una función y es obligatorio
  botonTexto: PropTypes.string.isRequired,    // botonTexto debe ser una cadena y es obligatorio
  values: PropTypes.object.isRequired,
  onChange:PropTypes.func.isRequired
};

export default Form;
