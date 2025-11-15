import { Header } from "./components/Header";
import styles from "./App.module.css";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Lettler";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { LetterUsed, type LetterUsedProps } from "./components/LetterUsed";
import { WORDS } from "./utils/words";
import type { Challenge } from "./utils/words";
import { useEffect, useState } from "react";

export function App() {
  const [letter, setLetter] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LetterUsedProps[]>([]);
  const [score, setScore] = useState(0);
  const [challange, setChallange] = useState<Challenge | null>(null);
  const ATTEMPT_MARGIN = 5;

  function endGame(message: string) {
    alert(message);
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];
    setChallange(randomWord);
    setScore(0);
    setLettersUsed([]);
    setLetter("");
  }

  function handleResartGame() {
    const isConfirmed = window.confirm("Deseja reiniciar o jogo?");
    if(isConfirmed){
      startGame();
    }
   

  }

  useEffect(() => {
    if (!challange) {
      return;
    }
    setTimeout(() => {

    if (score === challange.word.length) {
      return endGame("Você ganhou!");
    } else if (lettersUsed.length === challange.word.length + ATTEMPT_MARGIN) {
      //se o numero de letras usadas for igual ao numero de letras da palavra + o numero de tentativas
      endGame("Você perdeu!");
      startGame();
    } else {
      setLetter("");
    }
  }, 250);
  }, [score, lettersUsed.length]);

  function handleConfirm() {
    if (!challange) {
      return;
    }
    if (!letter.trim()) {
      return alert("Digite uma letra");
    }
    const value = letter.toUpperCase();
    const exists = lettersUsed.find(
      (used) => used.value.toUpperCase() === value
    );

    if (exists) {
      setLetter("");
      return alert("Letra já utilizada");
    }
    const hits = challange.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0;
    const currentScore = score + hits;

    setLettersUsed((prevState) => [...prevState, { value, correct }]);
    setScore(currentScore);
    setLetter("");
  }

  useEffect(() => {
    startGame();
  }, []);
  if (!challange) return null;

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={challange.word.length + ATTEMPT_MARGIN}
          onReset={handleResartGame}
        />

        <Tip tip={challange.tip} />
        <div className={styles.letters}>
          {challange.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find(
              (used) => used.value.toUpperCase() === letter.toUpperCase()
            );
            return (
              <Letter
                key={index}
                value={letterUsed?.value}
                color={letterUsed?.correct ? "correct" : "default"}
              />
            );
          })}
        </div>
        <h4>Paltipte</h4>
        <div className={styles.inputContainer}>
          <Input
            autoFocus
            value={letter}
            maxLength={1}
            placeholder="?"
            onChange={(e) => setLetter(e.target.value)}
          />
          <Button onClick={handleConfirm} title="Confirmar" />
        </div>
        <LetterUsed data={lettersUsed} />
      </main>
    </div>
  );
}
