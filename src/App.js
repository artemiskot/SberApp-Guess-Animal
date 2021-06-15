import Home from "./Home.js";
import Game from "./Game.js";
import { useState, useRef, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { getRandomAnimal } from "./APIHelper.js";
import { Toast } from "@sberdevices/plasma-ui";
import { useToast, Button } from "@sberdevices/plasma-ui";
import useSound from "use-sound";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";
const initializeAssistant = (getState /*: any*/) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token:
      process.env.REACT_APP_TOKEN ??
        "",
      initPhrase: `Запусти Отгадай животное`,
      getState,
    });
  }
  return createAssistant({ getState });
};
function App() {
  const [counter, setCounter] = useState(40);
  const [sound, setSound] = useState("");
  const [play, { stop, isPlaying }] = useSound(sound, { volume: 0.75 });
  const [playButtonText, setPlayButtonText] = useState("Прослушать");
  const history = useHistory();
  const solvedQuestions = useRef("");
  const amountOfSolvedQuestions = useRef(0);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [text, setText] = useState("");
  const [ans, setAns] = useState("");
  const { showToast, hideToast } = useToast();
  const [sumTime, setSumTime] = useState(0);
  useEffect(() => {
    setSumTime(sumTime + 1);
  }, [counter]);
  useEffect(() => {
    if (!isPlaying) {
      setPlayButtonText("Прослушать");
    }
  }, [isPlaying]); 
  const refAnswer = useRef("");
  const refName = useRef();
  const processCard = async () => {
    console.log("Ответ юзера", refAnswer.current);
    console.log("Ответ правильный", name);

    if (refAnswer.current === refName.current) {
      await generateNewAnimal();
      showToast(`Верно!`, "top", 1000);
      setCounter(40);
      refAnswer.current = "";
    } else {
      if (playOrPractice == 0) {
        showToast(`Ошибка! Правильный ответ: ${refName.current}`, "top");
      } else {
        showToast("Ошибка!", "top", 1000);
      }
    }
    setAns("");
  };
  const generateNewAnimal = () => {
    console.log(solvedQuestions.current);
    getRandomAnimal(solvedQuestions.current).then((x) => {
      if (solvedQuestions.current == "") {
        solvedQuestions.current += `${x.id}`;
        console.log(solvedQuestions.current);
      } else {
        solvedQuestions.current += "," + `${x.id}`;
      }
      amountOfSolvedQuestions.current++;
      console.log(x);
      setPicture(x.picture);
      setName(x.name);
      setText(x.description);
      setSound(x.sound);
      refName.current = x.name;
    });
  };
  const linkToGame = () => {
    console.log(mode.current);
    if(mode.current == 2){
      assistant.current?.sendData({ action: { action_id: "playSound", payload: {} } });
    } else{ 
      assistant.current?.sendData({ action: { action_id: "game", payload: {} } });
    }

    amountOfSolvedQuestions.current = 0;
    solvedQuestions.current = "";
    setCounter(40);
    setSumTime(0);

    history.push("/game");
  };
  const mode = useRef(0);
  const [playOrPractice, setPlayOrPractice] = useState(0);
  const assistant = useRef();
  useEffect(() => {
    assistant.current = initializeAssistant(() => getStateForAssistant());
    assistant.current.on("start", (event) => {
      //console.log(`assistant.on(start)`, event);
    });

    assistant.current.on("data", (event /*: any*/) => {
     //console.log(`assistant.on(data)`, event);
      const { action } = event;

      dispatchAssistantAction(action);
    });
  }, []);

  function getStateForAssistant() {
    return undefined;
  }
  const  isListening = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
      setPlayButtonText("Остановить");
    }
  }
  const dispatchAssistantAction = async (action) => {
    console.log("dispatchAssistantAction", action);
    if (action) {
      switch (action.type) {
        case "play_sound":
          console.log('needs to play right now ');
          play();
          break;
        case "choose_level":
          switch (action.data) {
            case "фото":
              mode.current = 0;
              linkToGame();
              break;
            case "описанию":
              mode.current = 1;
              linkToGame();
              break;
            case "описание":
              mode.current = 1;
              linkToGame();
              break;
            /*case "звуку":
              mode.current = 2;
              linkToGame();
              break;
            case "звук":
              mode.current = 2;
              linkToGame();
              break;
            default:
              break;*/
          }
          break;

        case "mode_of_game":
          switch (action.data) {
            case "тренировки":
              setPlayOrPractice(0);

              break;
            case "тренировка":
              setPlayOrPractice(0);

              break;
            case "игровой":
              setPlayOrPractice(1);

              break;
            case "игра":
              setPlayOrPractice(1);

              break;
            case "игры":
              setPlayOrPractice(1);

              break;
            default:
              break;
          }
          break;
        case "input_answer":
          refAnswer.current = action.data;
          setAns(action.data);
          break;
        case "send_answer":
          processCard();
          break;
        case "go_home":
          history.push("/");
          assistant.current?.sendData({
            action: { action_id: "goneback", payload: {} },
          });
          break;

        default:
          break;
      }
    }
  };
  return (
    <Switch>
      <Route path="/game" exact>
        <Game
          mode ={mode.current}
          playOrPractice={playOrPractice}
          sumTime={sumTime}
          setCounter={setCounter}
          answer={refAnswer}
          processCard={processCard}
          picture={picture}
          generateNewAnimal={generateNewAnimal}
          amountOfSolvedQuestions={amountOfSolvedQuestions}
          text={text}
          ans={ans}
          setAns={setAns}
          counter={counter}
          assistant={assistant}
          isListening={isListening}
          isPlaying={isPlaying}
          playButtonText={playButtonText}
          setPlayButtonText={setPlayButtonText}
        />
      </Route>
      <Route path="/">
        <Home
          linkToGame={linkToGame}
          mode={mode}
          setPlayOrPractice={setPlayOrPractice}
          setCounter={setCounter}
          playOrPractice={playOrPractice}
          amountOfSolvedQuestions={amountOfSolvedQuestions}
          solvedQuestions={solvedQuestions}
        />
      </Route>
    </Switch>
  );
}

export default withRouter(App);
