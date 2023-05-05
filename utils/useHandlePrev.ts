import {useAppDispatch, useAppSelector} from '../../../../src/store/hooks'
import useStepBtn from './useStepBtn'
import {setActiveStep} from '../../../../src/store/stepperSlice'

const useHandlePrev = () => {
    const dispatch = useAppDispatch()
    const getStepStatus = useStepBtn()
    const activeStep: number = useAppSelector(state => state.stepperSlice.activeStep)
    const {prev} = getStepStatus()
    return () => {
        if (prev.flag) {
            dispatch(setActiveStep(activeStep - 1))
            window.scrollTo({top: 0})
        }
    }
}
export default useHandlePrev
