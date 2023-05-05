import React from 'react'
import styles from './BottomBtns.module.css'
import StepBtn from '../stepBtn/StepBtn'
import useHandlePrev from '../../utils/useHandlePrev'
import useStepBtn from '../../utils/useStepBtn'

const BottomBtns: React.FC = () => {
    const handlePrev = useHandlePrev()
    const getStepBtns = useStepBtn()
    const {next, prev} = getStepBtns()
    return (
        <div className={styles.bottomBtnOut}>
            <div className={styles.bottomBtnIn}>
                <StepBtn onClick={handlePrev} disabled={!prev.flag}>
                    {prev.text}
                </StepBtn>
            </div>
            <div className={styles.bottomBtnIn}>
                <StepBtn buttonType="submit">{next.text}</StepBtn>
            </div>
        </div>
    )
}
export default BottomBtns
