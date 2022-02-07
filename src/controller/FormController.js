import { useState } from 'react';
import { baseValidator, refactoredValidator, dataDrivenValidator } from '../validation/CarValidator'
const carValidator = dataDrivenValidator;

const FormController = () => {

    const [values, setValues] = useState({
        make: '',
        year: '',
        isValid: false
    })

    const [errors, setErrors] = useState({})

    const inputChangeHandler = ({ target: { value, name } }) => {
        const updatedValues = {
            ...values,
            [name]: value
        }
        setValues(updatedValues)
        formValidator(updatedValues)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        formValidator(values)
    }

    const validationHandler = (_event) => {
        Object.keys(errors).length === 0 &&
            setValues({
                ...values,
                isValid: carValidator({ make: values.make, year: values.year })
            })
    }

    const formValidator = ({ make, year }) => {
        let error = {}

        if (!make) {
            error.make = "Please enter a make"
        }

        if (!year) {
            error.year = "Please enter a year"
        } else if (year.length !== 2 && year.length !== 4) {
            error.year = "Please enter a valid year of two and four digits"
        } else if (/.*[^\d\n]+.*/.test(year)) {
            error.year = "Please enter an integer as year"
        }

        setErrors(error)
    }

    return { values, errors, inputChangeHandler, submitHandler, validationHandler }
}

export default FormController;