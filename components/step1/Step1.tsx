import type {Single} from '../../../../../src/store/step1Slice'
import type {SubmitHandler} from 'react-hook-form'
import {useAppDispatch, useAppSelector} from '../../../../../src/store/hooks'
import React, {useEffect} from 'react'
import useHandleNext from '../../utils/useHandleNext'
import {useForm} from 'react-hook-form'
import {changeSingle} from '../../../../../src/store/step1Slice'
import styles from './Step1.module.css'
import SelectionBtn from '../selectionBtn/SelectionBtn'
import {NOT_SINGLE, SINGLE} from '../../data/consts'
import InputErrAlert from '../inputErrAlert/InputErrAlert'
import BottomBtns from '../bottomBtns/BottomBtns'
import handleSubmitHelperFunction from '../../utils/handleSubmitHelperFunction'

export interface FormValues {
    single: Single
}

const Step1 = () => {
    const dispatch = useAppDispatch()
    const single: Single = useAppSelector(state => state.step1Slice.single)
    const handleNext = useHandleNext()
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<FormValues>()

    const handleClick = (value: Single) => {
        dispatch(changeSingle(value))
        errors.single = undefined
    }

    const onSubmit: SubmitHandler<FormValues> = data => {
        handleNext()
    }

    useEffect(() => {
        setValue('single', single)
    }, [single])

    return (
        <section>
            <form onSubmit={handleSubmitHelperFunction(handleSubmit, onSubmit)}>
                <h4>请问您目前的状态是？</h4>
                <p>单身和已婚人士打分的规则会有所不同</p>
                <input type="hidden" {...register('single', {required: '请选择一个选项'})} />
                <div className={styles.buttonAreaOut}>
                    <div className={styles.buttonAreaIn}>
                        <div className={styles.btn}>
                            <SelectionBtn
                                variant={single === NOT_SINGLE ? 'contained' : 'outlined'}
                                value={NOT_SINGLE}
                                selected={single === NOT_SINGLE}
                                fullWidth
                                onClick={() => {
                                    handleClick(NOT_SINGLE)
                                }}
                            >
                                已婚或有伴侣
                            </SelectionBtn>
                        </div>
                        <div className={styles.btn}>
                            <SelectionBtn
                                variant={single === SINGLE ? 'contained' : 'outlined'}
                                value={SINGLE}
                                selected={single === SINGLE}
                                fullWidth
                                onClick={() => {
                                    handleClick(SINGLE)
                                }}
                            >
                                单身
                            </SelectionBtn>
                        </div>
                        {errors.single && <InputErrAlert error={errors.single.message} />}
                    </div>
                </div>

                <BottomBtns />
            </form>
        </section>
    )
}
export default Step1
