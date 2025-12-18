import React from "react";

export function Input(props) {
  const {
    id,
    label,
    error,
    onChange,
    type = "text",
    value,
    placeholder = "",
    row = null,
  } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {row ? (
        <textarea
          id={id}
          className={error ? "form-control is-invalid" : "form-control"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={row}
        />
      ) : (
        <input
          id={id}
          className={error ? "form-control is-invalid" : "form-control"}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
}

export default Input;
