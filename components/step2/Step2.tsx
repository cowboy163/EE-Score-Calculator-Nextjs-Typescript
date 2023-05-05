import type {DeepRequired, FieldErrorsImpl, GlobalError, UseFormRegister, UseFormSetValue} from 'react-hook-form'

import BottomBtns from '../bottomBtns/BottomBtns'
import Age from './age/Age'
import {useForm} from 'react-hook-form'
import handleSubmitHelperFunction from '../../utils/handleSubmitHelperFunction'
import useHandleNext from '../../utils/useHandleNext'
import handleErrorSubmit from '../../utils/handleErrorSubmit'
import React, {useEffect} from 'react'
import Education from './education/Education'
import FirstLang from './firstLang/FirstLang'
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {useAppSelector} from '../../../../../src/store/hooks'
import SecondLangChoice from './secondLang/SecondLangChoice'
import SecondLang from './secondLang/SecondLang'
import Experience from './experience/Experience'
import Certification from './certification/Certification'

type FirstLangTestScoreKeys = {[key in `firstLangTestScore${0 | 1 | 2 | 3}`]: string}
type SecondLangTestScoreKeys = {[key in `secondLangTestScore${0 | 1 | 2 | 3}`]: string}

type MappedFormValues = FirstLangTestScoreKeys & SecondLangTestScoreKeys

export interface FormValues extends MappedFormValues {
    age: string
    education: string
    firstLangTest: string
    secondLangTest: string
}

export type RegisterType = UseFormRegister<FormValues>
export type SetValueType = UseFormSetValue<FormValues>
export type ErrorsType = Partial<FieldErrorsImpl<DeepRequired<FormValues>>> & {
    root?: Record<string, GlobalError> & GlobalError
}

const Step2: React.FC = () => {
    const secLangFlag: string = useAppSelector(state => state.step2Slice.secondLangChoice)
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<FormValues>()
    const handleNext = useHandleNext()

    const onSubmit = () => {
        handleNext()
    }

    // useAutoAnimate
    const [parent, enableAnimations] = useAutoAnimate()
    useEffect(() => {
        if (secLangFlag) {
            enableAnimations(true)
        }
    }, [secLangFlag])

    return (
        <section>
            <form onSubmit={handleSubmitHelperFunction(handleSubmit, onSubmit, handleErrorSubmit)}>
                <h4>核心/人力资本因素</h4>
                <h4>Core/human capital factors</h4>
                <p>为了能够获得更准确的分数请认真完整的填写以下信息</p>
                <Age register={register} errors={errors} />
                <Education register={register} errors={errors} setValue={setValue} />
                <FirstLang register={register} errors={errors} setValue={setValue} />
                <div ref={parent}>
                    <SecondLangChoice />
                    {secLangFlag === 'yes' && <SecondLang register={register} setValue={setValue} errors={errors} />}
                </div>
                <Experience />
                <Certification />
                <BottomBtns />
            </form>
        </section>
    )
}
export default Step2
