const joiErrorFormatter = (errs) => {
    const errors = {}
    const details = errs.details
    details.map( d => {
        errors[d.path] = [d.message]
    })
    return errors
}

const mongooseErrorFormatter = (errs) => {
    const errors = {}
    const details = errs.errors
    for (const key in details) {
        errors[key] = [details[key].message]
    }
    return errors
}


module.exports = { joiErrorFormatter, mongooseErrorFormatter }


