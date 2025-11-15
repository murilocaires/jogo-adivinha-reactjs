
import styles from './styles.module.css'
import { Letter } from '../Lettler'

export type LetterUsedProps = {
    value: string
    correct: boolean
}
type Props = {
    data: LetterUsedProps[]
}

export function LetterUsed({data}: Props){
    return (
        <div className={styles.letterUsed}>
            <h5>Letras utilizadas</h5>
            <div>
                {data.map(({value, correct})=>(
                    <Letter size="small" value={value} color={correct ? 'correct' : 'wrong'}/>
                ))}
            </div>
        </div>


    )
}