import React from 'react';
import { InputField } from './InputField'
import FormController from '../controller/FormController'
import './Form.css'

const Form = () => {
    const { values, errors, inputChangeHandler, submitHandler, validationHandler } = FormController()

    return (
        <form className="form" onSubmit={submitHandler}>
            <div className="form-header">
                {values.isValid ? <h2>Valid Vehicle</h2> : <h2>Invalid Vehicle</h2>}
            </div>
            <div className="form-body">
                <InputField name="Make" error={errors} onChange={inputChangeHandler} />
                <InputField name="Year" error={errors} onChange={inputChangeHandler} />
                <button className="form-submit-button" type="submit" onClick={validationHandler}>
                    Validate
                </button>
            </div>
        </form>
    );
};

export default Form;
