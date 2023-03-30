/**
 * It takes a string in the format of "YYYY-MM-DD HH:MM:SS" and returns a Date object.
 * @param date - The date string to be converted.
 * @returns A date object.
 */
const convertDate = (date) => {
    date = date.replace(/\D/g, ' ')
    let components = date.split(' ')
    return (new Date(Date.UTC.apply(null, components)))
}

module.exports = convertDate