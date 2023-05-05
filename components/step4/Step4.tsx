import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import CustomDialog from '../dialog/CustomDialog'
import handleSubmitHelperFunction from '../../utils/handleSubmitHelperFunction'
import Pnp from './pnp/Pnp'
import Sponsorship from './sponsorship/Sponsorship'
import Education from './education/Education'
import BottomBtns from '../bottomBtns/BottomBtns'
import Relative from './relative/Relative'
import useTotalScore from '../../utils/useTotalScore'

const Step4: React.FC = () => {
    const [control, setControl] = useState(false)
    const [content, setContent] = useState('')
    const {handleSubmit} = useForm()
    const calculateScore = useTotalScore()
    const onSubmit = () => {
        setContent('您的总分是：' + calculateScore())
        setControl(true)
    }

    return (
        <section>
            <CustomDialog
                control={control}
                content={content}
                handleClose={() => {
                    setControl(false)
                }}
            />
            <form onSubmit={handleSubmitHelperFunction(handleSubmit, onSubmit)}>
                <h4>附加分</h4>
                <h4>Additional points</h4>
                <p>为了能够获得更准确的分数请认真完整的填写以下信息</p>
                <Pnp />
                <Sponsorship />
                <Education />
                <Relative />

                <BottomBtns />
            </form>
        </section>
    )
}
export default Step4
