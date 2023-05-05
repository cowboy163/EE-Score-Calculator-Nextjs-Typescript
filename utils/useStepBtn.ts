/*
 * @function useBeautifulStep - custom hook to determine the status of next/prev button
 */

import {useAppSelector} from '../../../../src/store/hooks'
import type {StepperState} from '../../../../src/store/stepperSlice'

interface StepStatus {
    next: {
        text: string
        flag: boolean
    }
    prev: {
        text: string
        flag: boolean
    }
}
const useStepBtn = (): (() => StepStatus) => {
    const stepStatus: StepperState = useAppSelector(state => state.stepperSlice)
    const {activeStep, stepLength} = stepStatus

    const getStepStatus = () => {
        const res: StepStatus = {
            next: {
                text: '下一页',
                flag: true
            },
            prev: {
                text: '上一页',
                flag: false
            }
        }
        if (activeStep > 0) {
            res.prev.flag = true
        }
        if (activeStep === stepLength - 1) {
            res.next = {
                text: '计算总分',
                flag: false
            }
        }
        return res
    }

    return getStepStatus
}

export default useStepBtn
