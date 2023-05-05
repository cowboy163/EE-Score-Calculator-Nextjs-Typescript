/*
 * @function getEmptyArray - get an array with elements of ""
 */

const getEmptyArray = (lengthOfArray: number): string[] => {
    return Array.from({length: lengthOfArray}, () => '')
}
export default getEmptyArray
