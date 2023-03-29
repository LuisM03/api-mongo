const convertDate = (date) => {
    date = date.replace(/\D/g, ' ')
    let components = date.split(' ')
    return (new Date(Date.UTC.apply(null, components)))
}

module.exports = convertDate