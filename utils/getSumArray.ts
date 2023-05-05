const getSumArray = (arr: number[]): number => {
    let res: number = 0
    arr.forEach(item => {
        res += item
    })
    return res
}
export default getSumArray
