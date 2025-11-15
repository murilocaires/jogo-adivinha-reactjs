import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import reset from "../../assets/reset.svg";

type Props = {
    current: number;
    max: number;
    onReset: () => void;
}
export function Header({current, max, onReset}: Props) {


  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo" />
      <header>
        <span>
          <strong>{current}</strong> de {max} tentativas
        </span>
        <button type="button" onClick={onReset}>
          <img src={reset} alt="" />
        </button>
      </header>
    </div>
  );
}
