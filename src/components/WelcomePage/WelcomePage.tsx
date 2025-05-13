import { useNavigate } from "react-router-dom";

import "./WelcomePage.css";

import logo from "../../assets/mainPageLogo.png";
import startingButton from "../../assets/startingButton.png";


export default function WelcomePage() {
    const navigate = useNavigate();

    const addStartButtonAnimation = () => {
        localStorage.removeItem("hangmanData");
        localStorage.removeItem("enteredLetters");
        const button = document.querySelector(".startButton") as HTMLButtonElement;
        if (button) {
            button.classList.add("startButtonAnimation");
            setTimeout(() => {
                button.classList.remove("startButtonAnimation");
                navigate("/GameScreen");
            }, 1100);
        }
    };

    return (
        <div className="welcome_page">
            <img src={logo} alt="App Logo" />
            <button onClick={addStartButtonAnimation} className="startButton">
                <img src={startingButton} alt="startButtonImage" />
            </button>
        </div>
    );
}