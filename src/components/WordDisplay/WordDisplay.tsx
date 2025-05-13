import { memo, type JSX } from "react"
import "./WordDisplay.css"

import UnderLineSvg from "../UnderLineSvg/UnderLineSvg";

function WordDisplay({ word, guessedLetters, gameOver }: { word: string, guessedLetters: string[], gameOver: number }): JSX.Element {
    let wordList: string[] = [];

    if (word != undefined && word != "") {
        wordList = word.split("");
    }


    return (
        <div className="wordsDisplay">
            {
                wordList.map((value, index) => {
                    return (
                        <div key={index} className="word">
                            {
                                guessedLetters.includes(value) ? (
                                    <p className="correctWord">{value.toUpperCase()}</p>
                                ) : gameOver === 0 && !guessedLetters.includes(value) ? (
                                    <p className="notGuessed">{value.toUpperCase()}</p>
                                ) : (
                                    <p className="hiddenWord"></p>
                                )
                            }
                            
                            <UnderLineSvg />
                        </div>
                    )                   
                })
            }
        </div>
    )
}

export default memo(WordDisplay);