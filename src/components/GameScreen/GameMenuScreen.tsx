import { memo, type JSX } from "react";
import backButton from "../../assets/backButton.png";

import HangmanFigure from "../HangmanFigure/HangmanFigure";
import WordDisplay from "../WordDisplay/WordDisplay";

function GameMenuScreen({
    addExitButtonAnimation,
    word,
    guessedLetters,
    wrongGuesses,
    gameOver,
    GetNewGame,
    backToHomeButton,
}: {
    addExitButtonAnimation: () => void;
    word: string;
    guessedLetters: string[];
    wrongGuesses: number;
    gameOver: number;
    GetNewGame: (e: any) => void;
    backToHomeButton: (e: any) => void;
}): JSX.Element {
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

                <div className="gameStatusMenu">
                    <div className="gameStatus">
                        <p>{gameOver === 0 ? "You Lose!" : "You Won!"}</p>
                    </div>

                    <div className="navigationButtons">
                        <button onClick={GetNewGame} className="nextButton">NEXT</button>
                        <button onClick={backToHomeButton} className="homeButton">HOME</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(GameMenuScreen);