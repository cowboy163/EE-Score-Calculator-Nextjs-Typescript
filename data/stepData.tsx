import React from 'react'
import Step1 from '../components/step1/Step1'
import Step2 from '../components/step2/Step2'
import Step3 from '../components/step3/Step3'
import Step4 from '../components/step4/Step4'

const singleData = [() => <Step1 />, () => <Step2 />, () => <Step4 />]

const notSingleData = [() => <Step1 />, () => <Step2 />, () => <Step3 />, () => <Step4 />]
const StepData = {
    singleData,
    notSingleData
}

export default StepData
