import styles from './styles.module.css'

type Props = React.ComponentProps<'input'>

export function Input({...rest} : Props){
    return(
        <input className={styles.input

        } type="text"  placeholder='?' maxLength={1} autoFocus {...rest } />
    )
}