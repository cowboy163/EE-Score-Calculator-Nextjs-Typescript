/*
 * This helper function is used to avoid the error: Promise-returning function provided to attribute where a void return was expected.
 */
import type {FieldValues, SubmitErrorHandler, SubmitHandler} from 'react-hook-form'
import type {FormEventHandler} from 'react'

type HandleSubmitHelperFunction = <T extends FieldValues>(
    handleSubmitFn: (onSubmit: SubmitHandler<T>, handleErrorSubmit: SubmitErrorHandler<any>) => FormEventHandler,
    onSubmitFn: SubmitHandler<T>,
    handleErrorSubmit?: () => void
) => FormEventHandler

const handleSubmitHelperFunction: HandleSubmitHelperFunction = (handleSubmitFn, onSubmitFn, handleErrorSubmit) => {
    return e => {
        e.preventDefault()
        handleSubmitFn(onSubmitFn, handleErrorSubmit ?? (() => {}))(e)
    }
}

export default handleSubmitHelperFunction
