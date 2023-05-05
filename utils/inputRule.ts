/*
 * This function is called 'numInput' and it returns only numbers characters
 * @function numInput
 * @param {string} val - original string
 * @param {number} limitLength - the maximum digit for the return value
 */

const numInput = (val: string, limitLength: number): string => {
    if (typeof val !== 'string') {
        return 'wrong input value for numInput()'
    }
    // leave 0 only once
    val = val.replace(/^0{2,}/, '0')
    // number only
    val = val.replace(/[^\d]/g, '')
    // limit digit only
    val = val.slice(0, limitLength)

    return val
}

const numInputAndDot = (val: string, limitLength: number): string => {
    if (typeof val !== 'string') {
        return 'wrong input value for numInput()'
    }
    // leave 0 only once
    val = val.replace(/^0{2,}/, '0')
    // number only
    val = val.replace(/[^\d.?]/g, '')
    // limit digit only
    val = val.slice(0, limitLength)

    return val
}

export {numInput, numInputAndDot}
