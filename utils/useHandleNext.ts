import type {StepperState} from '../../../../src/store/stepperSlice'
import {setActiveStep} from '../../../../src/store/stepperSlice'
import useStepBtn from './useStepBtn'
import {useAppDispatch, useAppSelector} from '../../../../src/store/hooks'

const useHandleNext = () => {
    const dispatch = useAppDispatch()
    const getStepStatus = useStepBtn()
    const stepperState: StepperState = useAppSelector(state => state.stepperSlice)
    const {activeStep} = stepperState
    const {next} = getStepStatus()
    return () => {
        if (next.flag) {
            // todo,how to resolve two parameters prototype
            dispatch(setActiveStep(activeStep + 1))
            window.scrollTo({top: 450})
        }
    }
}
export default useHandleNext
