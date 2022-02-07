import React from "react";
import './InputField.css'

export const InputField = ({ name, onChange, error }) => {

    const Name = name;
    name = name.toLowerCase()

    return (
        <div className="input-container">
            <div className="input-field-container">
                <label
                    className="input-field-label"
                    htmlFor={name}
                >
                    {Name}:
                </label>
                <input
                    className="input-field-element"
                    type="text"
                    id={name}
                    name={name}
                    placeholder={`Please enter the ${name}`}
                    onChange={onChange}
                />
            </div>
            {name in error &&
                <div className="input-error-container">
                    <p className="input-error-text">{error[name]}</p>
                    <i className="input-error-icon"></i>
                </div>
            }
        </div>
    )
}