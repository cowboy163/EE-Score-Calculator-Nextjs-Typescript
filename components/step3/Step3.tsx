import React, {useEffect} from 'react'
import handleSubmitHelperFunction from '../../utils/handleSubmitHelperFunction'
import handleErrorSubmit from '../../utils/handleErrorSubmit'
import type {DeepRequired, FieldErrorsImpl, GlobalError, UseFormRegister, UseFormSetValue} from 'react-hook-form'
import {useForm} from 'react-hook-form'
import useHandleNext from '../../utils/useHandleNext'
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {useAppSelector} from '../../../../../src/store/hooks'
import SpouseEducation from './education/SpouseEducation'
import BottomBtns from '../bottomBtns/BottomBtns'
import SpouseLanguageChoice from './language/SpouseLanguageChoice'
import SpouseLanguage from './language/SpouseLanguage'
import SpouseExperience from './experience/SpouseExperience'

type IndexKeys = {[key in `firstLangTestScore${0 | 1 | 2 | 3}`]: string}

export interface FormValues extends IndexKeys {
    education: string
    firstLangTest: string
}
export type RegisterType = UseFormRegister<FormValues>
export type SetValueType = UseFormSetValue<FormValues>
export type ErrorsType = Partial<FieldErrorsImpl<DeepRequired<FormValues>>> & {
    root?: Record<string, GlobalError> & GlobalError
}

const Step3: React.FC = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<FormValues>()
    const handleNext = useHandleNext()
    const langFlag = useAppSelector(state => state.step3Slice.firstLangChoice)

    const onSubmit = () => {
        handleNext()
    }

    // useAutoAnimate
    const [parent, enableAnimations] = useAutoAnimate()
    useEffect(() => {
        if (langFlag) {
            enableAnimations(true)
        }
    }, [langFlag])

    return (
        <section>
            <form onSubmit={handleSubmitHelperFunction(handleSubmit, onSubmit, handleErrorSubmit)}>
                <h4>配偶因素</h4>
                <h4>Spouse factors</h4>
                <p>为了能够获得更准确的分数请认真完整的填写以下信息</p>
                <SpouseEducation register={register} errors={errors} setValue={setValue} />
                <div ref={parent}>
                    <SpouseLanguageChoice />
                    {langFlag === 'yes' && <SpouseLanguage register={register} setValue={setValue} errors={errors} />}
                </div>
                <SpouseExperience />
                <BottomBtns />
            </form>
        </section>
    )
}
export default Step3
