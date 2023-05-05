import type {RuleType} from '../../../src/store/stepperSlice'
import CustomStepper from './components/stepper/CustomStepper'
import React, {useEffect, useState} from 'react'
import styles from './styles/EEScoreBetterUI.module.css'
import stepData from './data/stepData'
import {useAppDispatch, useAppSelector} from '../../../src/store/hooks'
import {setScoreRule, setStepLength} from '../../../src/store/stepperSlice'
import {Button} from '@mui/material'
import useTotalScore from './utils/useTotalScore'
import type {Single} from '../../../src/store/step1Slice'
import {SINGLE} from './data/consts'

interface ImmigrationEEProps {
    data: RuleType
}
const EEScoreCalculate: React.FC<ImmigrationEEProps> = ({data}) => {
    const dispatch = useAppDispatch()
    const stepper = useAppSelector(state => state.stepperSlice)
    const {activeStep, stepLength} = stepper
    const [steps, setSteps] = useState(stepData.notSingleData)
    const selection: Single = useAppSelector(state => state.step1Slice.single)

    useEffect(() => {
        if (selection === SINGLE) {
            setSteps(stepData.singleData)
        } else {
            setSteps(stepData.notSingleData)
        }
    }, [selection])

    useEffect(() => {
        dispatch(setStepLength(steps.length))
    }, [steps])

    // ======= Test below =======
    useEffect(() => {
        console.log('every time step length  check ===> ', stepLength)
    }, [stepLength])

    const calculateScore = useTotalScore()

    const handleClick = () => {
        calculateScore()
    }

    // ======== Test above =======

    useEffect(() => {
        dispatch(setScoreRule(data))
    }, [data])

    return (
        <div className={styles.container}>
            <div className={styles.calcStepper}>
                <CustomStepper numOfStep={stepLength} activeStep={activeStep} />
            </div>
            <div className={styles.beautifulMain}>
                <div className={styles.content}>{stepData.notSingleData[activeStep]()}</div>
            </div>
            {/* Test button */}
            <Button
                onClick={() => {
                    handleClick()
                }}
            >
                TEST
            </Button>
        </div>
    )
}
export default EEScoreCalculate
