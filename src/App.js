import Home from "./Home.js";
import Game from "./Game.js";
import { useState, useRef, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { getRandomAnimal } from "./APIHelper.js";
import { Toast } from "@sberdevices/plasma-ui";
import { useToast, Button } from "@sberdevices/plasma-ui";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";
const initializeAssistant = (getState /*: any*/) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNzgyOGE0NmZmZmI5ZWRiNDQ3MzVmMmMzMzRlMDg0ZjRkMGFhMGE5YzMwZjIyZjk5Y2Q5YWJmZTIxY2QyYmYzNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTYyMzM0NTgzMCwiaWF0IjoxNjIzMjU5NDIwLCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiYTgxNWExMzktZTBkMS00ODhhLWFmMDAtYTY0ODdhNDdiN2IyIiwic2lkIjoiNGJjMmE4MjAtN2JkNC00YmZhLWFiNDktYjMzZjYxMTNkYjRmIn0.N1u8ZBpm0-j1Gww3xAx5EGWvLk_gTeA0dY0gO5C4bBiMhlJ3wlfUIStPCLM-kvqS9N06_lJNLNF57DpFQFwbZ-3XSb_d82FSQ5wTZGDzWTLImQv4du5ZXxXpnnN2Z9waMcLQyhbA4ZJlktOQsiM8HAjlGjt04MKmn9eReNuqZDKUTY7jg9MOaiqjmXwECH9efpaamNyQGZrBiUKjJTupCAsnmpkKP22or3YbtuaPZ-HCLTnj9qNX0Y7R-ZKZ_KWWHgcNtMkiVQCI_O0Tri3_wA8xTkg-QmZ8s-w43Wb0hzZpEe6t81Z5oMoOl9AoY5QScxEZr67Gry6YJ344gHViPupPjOZ1fzlbEAotUT1r_f_ofyQ5FeA61cMNOmNG4We3w4xkcywAF8-YYnMIjCON4ENiITnRDfOs8OK9bweU-ADrOtP-Tt4_CL1q8P3QN-6eVNwguFNlIJutk3x0eSXYPFXrfouo3d8pYiE3-JCAGAXbO9_9AWgPSRm5wcfoTASdgqx9ajZ8SYpT8T42gCXu0oTqXl-WS06o3wAo1X0LVOERrDKNPp8z7BR5vkrGl-5W6JI7SQoukWRKnNdFWpXBzyJe1taSkvsLHT5KeRHUUv9ITKRDuOFkvwG1mZmFdcoegFL3jUKRyNeUTXxNCQw3TxVXG0rm7BPGrfwp1dg8gkQ" ??
        "",
      initPhrase: `Запусти Отгадай животное`,
      getState,
    });
  }
  return createAssistant({ getState });
};
function App() {
  const [counter, setCounter] = useState(40);

  const history = useHistory();
  const solvedQuestions = useRef("");
  const amountOfSolvedQuestions = useRef(0);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [text, setText] = useState("");
  const [sound, setSound] = useState("");
  const [ans, setAns] = useState("");
  const { showToast, hideToast } = useToast();
  const [sumTime, setSumTime] = useState(0);
  useEffect(() => {
    setSumTime(sumTime + 1);
  }, [counter]);
  const refAnswer = useRef("");
  const refName = useRef();
  const processCard = async () => {
    console.log("Ответ юзера", refAnswer.current);
    console.log("Ответ правильный", name);

    if (refAnswer.current === refName.current) {
      //alert("Верно");
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
      //alert("Не верно");
    }
    setAns("");
  };
  const generateNewAnimal = () => {
    console.log(solvedQuestions.current);
    getRandomAnimal(solvedQuestions.current).then((x) => {
      if (solvedQuestions.current == "") {
        //setSolvedQuestions(solvedQuestions + `${x.id}`);
        solvedQuestions.current += `${x.id}`;
        console.log(solvedQuestions.current);
      } else {
        //setSolvedQuestions(solvedQuestions + "," + `${x.id}`);
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
    amountOfSolvedQuestions.current = 0;
    solvedQuestions.current = "";
    setCounter(40);
    setSumTime(0);
    assistant.current?.sendData({ action: { action_id: "game", payload: {} } });

    history.push("/game");
  };
  const [mode, setMode] = useState(0);
  const [playOrPractice, setPlayOrPractice] = useState(0);
  const assistant = useRef();
  useEffect(() => {
    //Инициализация ассистента
    assistant.current = initializeAssistant(() => getStateForAssistant());
    assistant.current.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });

    assistant.current.on("data", (event /*: any*/) => {
      console.log(`assistant.on(data)`, event);
      const { action } = event;

      dispatchAssistantAction(action);
    });
  }, []);

  function getStateForAssistant() {
    return undefined;
  }
  const dispatchAssistantAction = async (action) => {
    console.log("dispatchAssistantAction", action);
    if (action) {
      switch (action.type) {
        case "choose_level":
          switch (action.data) {
            case "фото":
              setMode(0);
              linkToGame();
              break;
            case "описанию":
              setMode(1);
              linkToGame();
              break;
            case "описание":
              setMode(1);
              linkToGame();
              break;
            case "звуку":
              setMode(2);
              linkToGame();
              break;
            case "звук":
              setMode(2);
              linkToGame();
              break;
            default:
              break;
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
          console.log("в сенд ансвере", solvedQuestions.current);
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
          mode={mode}
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
          sound={sound}
          counter={counter}
          assistant={assistant}
        />
      </Route>
      <Route path="/">
        <Home
          linkToGame={linkToGame}
          setMode={setMode}
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
