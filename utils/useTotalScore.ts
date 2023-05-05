/*
 * this custom hook is used to calculate each score and return total score
 */
import type {Single} from '../../../../src/store/step1Slice'
import type {LangType, Step2State} from '../../../../src/store/step2Slice'
import type {RuleType} from '../../../../src/store/stepperSlice'
import type {SingleRuleType} from './calculations'
import {
    getCertificateAndClbScore,
    getClbLevel,
    getEduAndExInCaScore,
    getEduAndLangScore,
    getExOutCaAndExInCaScore,
    getFrAndEnScore,
    getInputScore,
    getLangAndExOutCaScore,
    getLangScore,
    getNoRuleScore,
    getSelectionScore
} from './calculations'
import type {TestScoreType} from '../../../../src/store/scoreSlice'
import {
    setAgeScore,
    setEducationInCaScore,
    setEducationScore,
    setExInCaScore,
    setFirstLangEEClbScore,
    setFirstLangEEScore,
    setPnpScore,
    setRelativeScore,
    setSecondLangEEClbScore,
    setSecondLangEEScore,
    setSponsorshipScore,
    setSpouseEducationScore,
    setSpouseExInCaScore,
    setSpouseLangEEClbScore,
    setSpouseLangEEScore
} from '../../../../src/store/scoreSlice'
import {useAppDispatch, useAppSelector} from '../../../../src/store/hooks'
import getSumArray from './getSumArray'
import {NOT_SINGLE} from '../data/consts'
import type {Step3State} from '../../../../src/store/step3Slice'
import type {Step4State} from '../../../../src/store/step4Slice'

export interface LangClbRuleType {
    ielts: SingleRuleType
    celpip: SingleRuleType
    tef: SingleRuleType
    tcf: SingleRuleType
    [key: string]: SingleRuleType
}

const useTotalScore = () => {
    const dispatch = useAppDispatch()
    const scoreRule: RuleType = useAppSelector(state => state.stepperSlice.scoreRule)
    const single: Single = useAppSelector(state => state.step1Slice.single)
    const step2: Step2State = useAppSelector(state => state.step2Slice)
    const step3: Step3State = useAppSelector(state => state.step3Slice)
    const step4: Step4State = useAppSelector(state => state.step4Slice)
    const {age, education, firstLang, secondLang, exInCA, exOutCA, certification} = step2
    const spouseEducation: string = step3.education
    const spouseLanguage: LangType = step3.firstLang
    const spouseExInCa: string = step3.exInCA
    const {pnp, sponsorship, relative} = step4
    const educationInCa = step4.education

    return (): number => {
        let totalScore: number = 0
        // calculate age score
        const ageScore: number = getInputScore(+age, single, scoreRule?.[0])
        dispatch(setAgeScore(ageScore))
        totalScore += ageScore
        // calculate education score
        const educationScore: number = getSelectionScore(education, single, scoreRule?.[1])
        dispatch(setEducationScore(educationScore))
        totalScore += educationScore

        // calculate first language CLB level
        const langClbRule: LangClbRuleType = {
            celpip: scoreRule?.[12],
            ielts: scoreRule?.[13],
            tef: scoreRule?.[14],
            tcf: scoreRule?.[15]
        }
        const firstLangClbLevel: TestScoreType = getClbLevel(firstLang, langClbRule)
        dispatch(setFirstLangEEClbScore(firstLangClbLevel))
        // calculate first language score
        const firstLangScore: TestScoreType = getLangScore(firstLangClbLevel, single, scoreRule?.[2])
        dispatch(setFirstLangEEScore(firstLangScore))
        totalScore += getSumArray(firstLangScore)

        // calculate second language clb level
        const secondLangClbLevel: TestScoreType = getClbLevel(secondLang, langClbRule)
        dispatch(setSecondLangEEClbScore(secondLangClbLevel))
        // calculate second language score
        const secondLangScore: TestScoreType = getLangScore(secondLangClbLevel, single, scoreRule?.[4])
        dispatch(setSecondLangEEScore(secondLangScore))
        let totalSecondLangScore: number = getSumArray(secondLangScore)
        // adjust second language total score for married applicants
        if (single === NOT_SINGLE && totalSecondLangScore > 22) {
            totalSecondLangScore = 22
        }
        totalScore += totalSecondLangScore

        // calculate score for work experience in Canada
        const exInCaScore: number = getInputScore(+exInCA, single, scoreRule?.[3])
        dispatch(setExInCaScore(exInCaScore))
        totalScore += exInCaScore

        // calculate spouse education score
        const spouseEducationScore: number = getSelectionScore(spouseEducation, null, scoreRule?.[5])
        dispatch(setSpouseEducationScore(spouseEducationScore))
        totalScore += spouseEducationScore

        // calculate spouse language score
        const spouseClbLevel: TestScoreType = getClbLevel(spouseLanguage, langClbRule)
        dispatch(setSpouseLangEEClbScore(spouseClbLevel))
        const spouseLangScore: TestScoreType = getLangScore(spouseClbLevel, null, scoreRule?.[6])
        dispatch(setSpouseLangEEScore(spouseLangScore))
        totalScore += getSumArray(spouseLangScore)

        // calculate spouse work experience in CA score
        const spouseExInCaScore: number = getInputScore(+spouseExInCa, null, scoreRule?.[7])
        dispatch(setSpouseExInCaScore(spouseExInCaScore))
        totalScore += spouseExInCaScore

        // calculate pnp score
        const pnpScore: number = getNoRuleScore(pnp, 600)
        dispatch(setPnpScore(pnpScore))
        totalScore += pnpScore

        // calculate sponsorship score
        const sponsorshipScoreRule = [0, 50, 200]
        const sponsorshipScore: number = getNoRuleScore(sponsorship, sponsorshipScoreRule)
        dispatch(setSponsorshipScore(sponsorshipScore))
        totalScore += sponsorshipScore

        // calculate education in Canada score
        const educationInCaScoreRule = [0, 15, 30]
        const educationInCaScore: number = getNoRuleScore(educationInCa, educationInCaScoreRule)
        dispatch(setEducationInCaScore(educationInCaScore))
        totalScore += educationInCaScore

        // calculate relative in Canada score
        const relativeScore: number = getNoRuleScore(relative, 15)
        dispatch(setRelativeScore(relativeScore))
        totalScore += relativeScore

        // other combination score calculation
        // education + language
        const eduAndLangScore: number = getEduAndLangScore(firstLangClbLevel, education, scoreRule?.[8])
        totalScore += eduAndLangScore

        // education + work experience in Canada
        const eduAndExInCaScore: number = getEduAndExInCaScore(exInCA, education, scoreRule?.[9])
        totalScore += eduAndExInCaScore

        // foreign work experience + language
        const langAndExOutCaScore: number = getLangAndExOutCaScore(firstLangClbLevel, exOutCA, scoreRule?.[10])
        totalScore += langAndExOutCaScore

        // foreign work experience + Canada work experience
        const exOutCaAndExInCaScore: number = getExOutCaAndExInCaScore(exOutCA, exInCA, scoreRule?.[11])
        totalScore += exOutCaAndExInCaScore

        // certificate + clb
        const certificateAndClbScore: number = getCertificateAndClbScore(firstLangClbLevel, certification)
        totalScore += certificateAndClbScore

        // French + english
        const frAndEnScore: number = getFrAndEnScore(
            firstLangClbLevel,
            secondLangClbLevel,
            firstLang.test,
            secondLang.test
        )
        totalScore += frAndEnScore
        return totalScore
    }
}
export default useTotalScore
