import { memo, useEffect, useState } from "react";

import "./Keyboard.css";
import normalKeyImg from "../../assets/normalKey.png";
import clickedKeyImg from "../../assets/clickedKey.png";


interface KeyboardProps {
    word: string;
    setGuessedLetters: React.Dispatch<React.SetStateAction<string[]>>;
    setWrongGuesses: React.Dispatch<React.SetStateAction<number>>;
}


function Keyboard({ word, setGuessedLetters, setWrongGuesses }: KeyboardProps) {
    const list_of_words: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    const wordArray: string[] = word.split("");
    const setWords: Set<string> = new Set(wordArray);
    const correctLetters: string[] = Array.from(setWords);

    const [enteredLetters, setEnteredLetters] = useState<string[]>([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const storedLetters = localStorage.getItem("enteredLetters");

        if (storedLetters && word != "") {
            const { enteredLetters } = JSON.parse(storedLetters);
            setEnteredLetters(enteredLetters);

            enteredLetters.forEach((letter: string) => {
                const letterIndex = list_of_words.indexOf(letter.toUpperCase());
                const keyboardKey = document.querySelector(`.key-${letterIndex}`) as HTMLDivElement;

                // Chnage the background color of the clicked key
                keyboardKey.querySelector("img")?.setAttribute("src", clickedKeyImg);

                // Check if the clicked key is in the correctLetters
                if (correctLetters.includes(letter.toLowerCase())) {
                    keyboardKey.querySelector(".keyBoardWord p")?.classList.add("correctKey");
                } else {
                    keyboardKey.querySelector(".keyBoardWord p")?.classList.add("wrongKey");
                }
            })
        }
    }, [word]);

    useEffect(() => {
        if (!hasLoaded) return;
        localStorage.setItem("enteredLetters", JSON.stringify({ "enteredLetters": enteredLetters }));
    }, [enteredLetters]);

    const addAnimationAndCheckWord = (event: any) => {
        // Check if the clicked element is a key
        if (event.target.tagName === "P") {
            let clickedKey = event.target.innerText as string;
            clickedKey = clickedKey.toLowerCase();

            if (!enteredLetters.includes(clickedKey)) {

                const letterIndex = list_of_words.indexOf(clickedKey.toUpperCase());
                const keyboardKey = document.querySelector(`.key-${letterIndex}`) as HTMLDivElement;

                // Add animation class to the clicked key
                keyboardKey.classList.add("keyAnimation");
                setTimeout(() => {
                    keyboardKey.classList.remove("keyAnimation");
                }, 1000);

                // Chnage the background color of the clicked key
                keyboardKey.querySelector("img")?.setAttribute("src", clickedKeyImg);

                // Check if the clicked key is in the correctLetters
                if (correctLetters.includes(clickedKey)) {
                    keyboardKey.querySelector(".keyBoardWord p")?.classList.add("correctKey");
                    setGuessedLetters((GuessedLetters: any) => {
                        const newGuessedLetters = [...GuessedLetters, clickedKey];
                        return newGuessedLetters;
                    })
                } else {
                    keyboardKey.querySelector(".keyBoardWord p")?.classList.add("wrongKey");
                    setWrongGuesses((wrongGuesses: number) => {
                        const newWrongGuesses = wrongGuesses + 1;
                        return newWrongGuesses;
                    })
                }

                // Add the clickedkey in gussedLetters array
                setHasLoaded(true);
                setEnteredLetters((prevLetters) => [...prevLetters, clickedKey]);
            }
        }
    }

    return (
        <div className="keyBoard" onClick={addAnimationAndCheckWord}>
            {
                list_of_words.map((letter, index) => {
                    return (
                        <div key={index} className={`key key-${index}`}>
                            <div className="keyBoardWord">
                                <p>{letter}</p>
                            </div>
                            <img width="45px" height="45px" src={normalKeyImg} alt="" />
                        </div>
                    )
                })
            }
        </div>
    )

}

export default memo(Keyboard);