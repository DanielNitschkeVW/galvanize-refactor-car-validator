import { validCarData } from './Data'

/*
 * This file contains all car validation functions.
 * Keeping these versions in here shall serve the purpose
 * of an simplified overview and comparison.
 * 
 * Versions:
 *  - base version that was given for the assignment
 *  - refactored version using a simple shift from if-else to bit-logic
 *  - data driven version using a data structure with vendors and valid ranges
 */

export const baseValidator = (car) => {
    if (isNaN(car.year)) { return false; }

    if (car.year.length !== 2 && car.year.length !== 4) { return false; }

    if (car.make.toLowerCase() === "mazda") {
        if (car.year.length === 2) {
            if (parseInt(car.year) < 97 && parseInt(car.year) > 17) {
                return false;
            } else {
                return true;
            }
        } else if (car.year.length === 4) {
            if (parseInt(car.year) < 1997) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    } else if (car.make.toLowerCase() === "toyota") {
        if (car.year.length === 2) {
            if (parseInt(car.year) >= 6 && parseInt(car.year) <= 18) {
                return false;
            } else if (parseInt(car.year) <= 98) {
                return false;
            } else {
                return true;
            }
        } else if (car.year.length === 4) {
            if (parseInt(car.year) >= 2006) {
                return false;
            } else if (parseInt(car.year) <= 1998) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export const refactoredValidator = (car) => {
    if (isNaN(car.year)) {
        return false;
    }

    const carMake = car.make.toLowerCase()
    const yearLength = car.year.length
    const year = parseInt(car.year)

    if (yearLength !== 2 && yearLength !== 4) {
        return false;
    }

    switch (carMake) {
        case "mazda":
            return (
                (yearLength === 2)
                && !(year < 97 && year > 17)
            ) || (
                    (yearLength === 4)
                    && !(year < 1997)
                )

        case "toyota":
            return (
                (yearLength === 2)
                && !(year >= 6 && year <= 18) // intended: 2006 <= year <= 2018 real: 06 <= year <= 18
                && !(year <= 98) // intended: year <= 1998, real: year <= 98
            ) || (
                    (yearLength === 4)
                    && !(year >= 2006)
                    && !(year <= 1998)
                )

        default: return false
    }
}

export const dataDrivenValidator = ({ make, year }) => {
    year = parseInt(year)
    // map 2 digit years to 4+ digit years using the current year as reference
    if (year < 100) {
        const currentYear = new Date().getFullYear();
        const century = Math.floor(currentYear / 100) * 100;
        year = currentYear - century < year ? century - 100 + year : century + year;
    }

    return !!(validCarData[make.toLowerCase()]?.filter(({ min, max }) =>
        (min === undefined || min <= year)
        && (max === undefined || year <= max)
    ).length > 0)
}