import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./GameScreen.css";
import backButton from "../../assets/backButton.png";

import HangmanFigure from "../HangmanFigure/HangmanFigure";
import WordDisplay from "../WordDisplay/WordDisplay";
import Keyboard from "../Keyboard/Keyboard";
import GameMenuScreen from "./GameMenuScreen";

export default function GameScreen() {
    // fetch the word from the API
    const [word, setWord] = useState("");

    const fetchWord = async () => {
        try {
            const res = await fetch('https://random-word-api.vercel.app/api?words=1');
            const result = await res.json();

            const wordString = result[0];
            setWord(wordString);

        } catch (err) {
            console.error('Fetch error:', err);
        }
    }

    const navigate = useNavigate();

    const addExitButtonAnimation = () => {
        const button = document.querySelector(".exitButton") as HTMLButtonElement;
        if (button) {
            button.classList.add("exitButtonAnimation");
            setTimeout(() => {
                button.classList.remove("exitButtonAnimation");
                navigate("/");
            }, 1100);
        }
    };


    const [wrongGuesses, setWrongGuesses] = useState<number>(0);

    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const [gameOver, setGameOver] = useState<number>(3);

    const backToHomeButton = (e: any) => {
        localStorage.removeItem("hangmanData");
        localStorage.removeItem("enteredLetters");
        const button = e.target as HTMLButtonElement;
        button.classList.add("popButtonAnimation");
        setTimeout(() => {
            button.classList.remove("popButtonAnimation");
            navigate("/");
        }, 800);
    }

    const GetNewGame = (e: any) => {
        const button = e.target as HTMLButtonElement;
        button.classList.add("popButtonAnimation");

        setTimeout(() => {
            button.classList.remove("popButtonAnimation");
            setWrongGuesses(0);
            setGuessedLetters([]);
            setGameOver(3);
            fetchWord();

            // clear the localStorage
            localStorage.removeItem("hangmanData");
            localStorage.removeItem("enteredLetters");
        }, 800);
    }

    const [hasLoaded, setHasLoaded] = useState(false);

    // First effect: load from localStorage or fetch
    useEffect(() => {
        const storedData = localStorage.getItem("hangmanData");
        if (storedData) {
            try {
                const { word, guessedLetters, wrongGuesses, gameOver } = JSON.parse(storedData);
                setWord(word);
                setGuessedLetters(guessedLetters);
                setWrongGuesses(wrongGuesses);
                setGameOver(gameOver);
            } catch (e) {
                fetchWord();
            }
        } else {
            fetchWord();
        }

        setHasLoaded(true); // only after attempting to load
    }, []);

    // Second effect: save only after initial load
    useEffect(() => {
        if (!hasLoaded || !word) return;

        const hangmanData = {
            word,
            guessedLetters,
            wrongGuesses,
            gameOver
        };

        localStorage.setItem("hangmanData", JSON.stringify(hangmanData));
    }, [word, guessedLetters, wrongGuesses, gameOver, hasLoaded]);

    // chcek wrong guesses more than 5
    useEffect(() => {
        if (wrongGuesses > 5 && gameOver === 3) {
            setGameOver(0);
        }
    }, [wrongGuesses]);

    // check if the word is guessed
    useEffect(() => {
        const wordArray: string[] = word.split("");
        const setWords: Set<string> = new Set(wordArray);
        const correctLetters: string[] = Array.from(setWords);

        if ( guessedLetters.length !== 0 && (correctLetters.length === guessedLetters.length)) {
            setWrongGuesses(7);
            setGameOver(1);
        }
    }, [guessedLetters, word]);

    console.log(word)

    if (wrongGuesses > 5) {
        return <GameMenuScreen addExitButtonAnimation={addExitButtonAnimation} word={word} guessedLetters={guessedLetters} wrongGuesses={wrongGuesses} gameOver={gameOver} GetNewGame={GetNewGame} backToHomeButton={backToHomeButton} />

    } else if (gameOver == 1) {
        return <GameMenuScreen addExitButtonAnimation={addExitButtonAnimation} word={word} guessedLetters={guessedLetters} wrongGuesses={wrongGuesses} gameOver={gameOver} GetNewGame={GetNewGame} backToHomeButton={backToHomeButton} />

    } else {
        return (
            <div className="game_screen">
                <button onClick={addExitButtonAnimation} className="exitButton">
                    <img className="BackButton" src={backButton} alt="exitImage" />
                </button>

                <div className="gameContainer">
                    <div className="GameStatus">
                        <HangmanFigure wrongGuesses={wrongGuesses} />
                        <WordDisplay word={word} guessedLetters={guessedLetters} gameOver={gameOver} />
                    </div>


                    <Keyboard word={word} setGuessedLetters={setGuessedLetters} setWrongGuesses={setWrongGuesses} />
                </div>
            </div>
        );
    }

}