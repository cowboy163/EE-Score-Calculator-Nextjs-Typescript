import type {Single} from '../../../../src/store/step1Slice'
import {SINGLE} from '../data/consts'
import type {ClbRuleProps, ruleProps} from '../../../../src/store/stepperSlice'
import type {TestScoreType} from '../../../../src/store/scoreSlice'
import type {LangType} from '../../../../src/store/step2Slice'
import type {LangClbRuleType} from './useTotalScore'
import getNum from './getNum'

export type SingleRuleType = ruleProps[] | undefined | ClbRuleProps[]

// single score calculation
export const getSingleScore = (
    input: number,
    rule: SingleRuleType,
    index: number,
    scoreAtFront: boolean,
    isIndex: boolean
): number => {
    if (!rule || !input) {
        return 0
    }
    const ruleName = Object.keys(rule[0])
    const sortedRule = rule.slice().sort((a, b) => {
        const first: number = getNum(a[`${ruleName[isIndex ? 1 : 0]}`])
        const second: number = getNum(b[`${ruleName[isIndex ? 1 : 0]}`])
        return first - second
    })

    if (!isIndex) {
        const firstElement: number = getNum(sortedRule[0][`${ruleName[scoreAtFront ? index : 0]}`])
        const lastElement: number = getNum(sortedRule[sortedRule.length - 1][`${ruleName[scoreAtFront ? index : 0]}`])
        if (input < firstElement) {
            return 0
        } else if (input >= lastElement) {
            return getNum(sortedRule[sortedRule.length - 1][`${ruleName[scoreAtFront ? 0 : index]}`])
        } else {
            for (let i = 0; i < sortedRule.length - 1; i++) {
                if (
                    input >= getNum(sortedRule[i][`${ruleName[scoreAtFront ? index : 0]}`]) &&
                    input < getNum(sortedRule[i + 1][`${ruleName[scoreAtFront ? index : 0]}`])
                ) {
                    return getNum(sortedRule[i][`${ruleName[scoreAtFront ? 0 : index]}`])
                }
            }
        }
    } else {
        return getNum(sortedRule[input][`${ruleName[scoreAtFront ? 0 : index]}`])
    }
    return 0
}
// input score calculation: age, work experience in CA
export const getInputScore = (input: number, single: Single, rule: SingleRuleType): number => {
    if (!rule) {
        return 0
    }
    const index = single === SINGLE ? 2 : 1
    return getSingleScore(input, rule, index, false, false)
}
// selection score calculation
export const getSelectionScore = (selection: string, single: Single, rule: SingleRuleType): number => {
    if (!rule) {
        return 0
    }
    let index = 0
    if (single === null) {
        index = 1
    } else {
        index = single === SINGLE ? 2 : 1
    }
    const numSelection = +selection
    return getSingleScore(numSelection, rule, index, false, true)
}
// CLB level calculation
export const getClbLevel = (language: LangType, clbRule: LangClbRuleType): TestScoreType => {
    const res: TestScoreType = [0, 0, 0, 0]
    if (language.test) {
        language.testScore.forEach((score, index) => {
            res[index] = getSingleScore(+score, clbRule[`${language.test}`], index + 1, true, false)
        })
    }
    return res
}
// language Score calculation
export const getLangScore = (clbScore: TestScoreType, single: Single, clbRule: SingleRuleType): TestScoreType => {
    const res: TestScoreType = [0, 0, 0, 0]
    const ruleIndex = single === SINGLE ? 2 : 1
    clbScore.forEach((score, index) => {
        res[index] = getSingleScore(score, clbRule, ruleIndex, false, false)
    })
    return res
}

// no rule score calculation
export const getNoRuleScore = (input: string, score: number | number[]): number => {
    let res: number = 0
    if (input === 'yes' && typeof score === 'number') {
        res = score
    } else if (typeof score === 'object') {
        res = score[+input]
    }
    return res
}

// other score calculation
export const getOtherScore = (colIndex: number, rowIndex: number, rule: SingleRuleType): number => {
    if (!rule?.[rowIndex]?.[colIndex]) {
        return 0
    }
    return +(rule[rowIndex]?.[colIndex] ?? 0)
}

export const getEduAndLangScore = (clb: TestScoreType, education: string, rule: SingleRuleType): number => {
    let res: number = 0
    if (!clb || !education) {
        return res
    }
    const rowIndex: number = +education
    let colIndex: number = 2
    clb.forEach(score => {
        if (score < 7) {
            colIndex = -1
        }
    })
    if (colIndex >= 0) {
        clb.forEach(score => {
            if (score < 9) {
                colIndex = 1
            }
        })
    }
    res = getOtherScore(colIndex, rowIndex, rule)
    return res
}

// education and work experience in Canada
export const getEduAndExInCaScore = (exInCa: string, education: string, rule: SingleRuleType): number => {
    let res: number = 0
    if (!exInCa || !education) {
        return res
    }
    const rowIndex: number = +education
    let colIndex: number = 0
    if (+exInCa >= 2) {
        colIndex = 2
    } else if (+exInCa >= 1) {
        colIndex = 1
    } else {
        return res
    }
    res = getOtherScore(colIndex, rowIndex, rule)
    return res
}

// foreign work experience + language
export const getLangAndExOutCaScore = (clb: TestScoreType, exOutCa: string, rule: SingleRuleType): number => {
    let res: number = 0
    if (!clb || !exOutCa) {
        return res
    }
    const rowIndex: number = +exOutCa <= 3 ? +exOutCa : 3
    let colIndex: number = 2
    clb.forEach(score => {
        if (score < 7) {
            colIndex = -1
        }
    })
    if (colIndex >= 0) {
        clb.forEach(score => {
            if (score < 9) {
                colIndex = 1
            }
        })
    }
    res = getOtherScore(colIndex, rowIndex, rule)
    return res
}

// foreign work experience + Canada work experience
export const getExOutCaAndExInCaScore = (exOutCa: string, exInCa: string, rule: SingleRuleType): number => {
    let res: number = 0
    if (!exOutCa || !exInCa) {
        return res
    }
    const rowIndex: number = +exOutCa <= 3 ? +exOutCa : 3
    let colIndex: number = 2
    if (+exInCa < 1) {
        return res
    } else if (+exInCa < 2) {
        colIndex = 1
    }
    res = getOtherScore(colIndex, rowIndex, rule)
    return res
}

// certificate + clb
export const getCertificateAndClbScore = (clb: TestScoreType, certificate: string): number => {
    const res: number = 0
    let scoreRes: number = 50
    if (certificate === 'no' || !clb || !certificate) {
        return res
    }
    clb.forEach(score => {
        if (score < 5) {
            scoreRes = 0
        }
    })
    if (scoreRes > 0) {
        clb.forEach(score => {
            if (score < 7) {
                scoreRes = 25
            }
        })
    }
    return scoreRes
}

// French + english
export const getFrAndEnScore = (
    firstClb: TestScoreType,
    secondClb: TestScoreType,
    firstTest: string,
    secondTest: string
): number => {
    let res: number = 0
    let flag: boolean = true
    let frClb: TestScoreType = [0, 0, 0, 0]
    let enClb: TestScoreType = [0, 0, 0, 0]
    if (!firstTest) {
        return res
    }
    if (firstTest.charAt(0) === 't') {
        frClb = firstClb
        enClb = secondClb
    } else if (secondTest.charAt(0) === 't') {
        frClb = secondClb
        enClb = firstClb
    }
    frClb.forEach(score => {
        if (score < 7) {
            flag = false
        }
    })
    if (!flag) {
        return res
    }
    enClb.forEach(score => {
        if (score <= 4) {
            flag = false
        }
    })
    res = flag ? 50 : 25
    return res
}
