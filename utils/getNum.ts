const getNum = (input: any): number => {
    let res: number = 0
    if (typeof input === 'string') {
        const reg: RegExpMatchArray | null = input.match(/\d+(\.\d+)?/g)
        if (reg) {
            res = +reg[0]
        }
    } else {
        res = +input
    }
    return res
}
export default getNum
