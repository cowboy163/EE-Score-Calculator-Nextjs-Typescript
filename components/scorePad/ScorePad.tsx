/*
 * this component is used to display the scores
 * @param {string} text - the score
 * @param {string} paddingRight - add padding right style as need
 * @param {boolean} takePlace - decide if add 0 at the beginning for one digit score
 */
import React, {useEffect, useState} from 'react'
import TextTransition, {presets} from 'react-text-transition'

interface ScorePadProps {
    text: string
    paddingRight?: string
    takePlace?: boolean
    paddingTop?: boolean
}

const ScorePad: React.FC<ScorePadProps> = ({text, paddingRight, takePlace, paddingTop}) => {
    const index = 1
    const [texts, setTexts] = useState(['0'])
    const [newText, setNewText] = useState('')

    useEffect(() => {
        let newScore = '0'
        if (newText && newText !== '') {
            newScore = newText
        }
        setTimeout(() => {
            setTexts(prevTexts => {
                const updatedTexts = [...prevTexts, newScore]
                return updatedTexts.slice(-2)
            })
        }, 100)
    }, [newText])

    useEffect(() => {
        if (text && text.length === 1 && text !== '0' && takePlace) {
            setNewText('0' + text)
        } else {
            setNewText(text)
        }
    }, [text])
    return (
        <h5
            style={{
                display: 'flex',
                color: 'gray',
                paddingRight: paddingRight && paddingRight,
                paddingTop: paddingTop ? '0.5rem' : '0'
            }}
        >
            分数:
            <TextTransition springConfig={presets.wobbly}>{texts[index % texts.length]}</TextTransition>
        </h5>
    )
}

export default ScorePad
