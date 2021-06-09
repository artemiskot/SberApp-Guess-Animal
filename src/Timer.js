import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Button } from "@sberdevices/plasma-ui";

import { text, background, gradient } from "@sberdevices/plasma-tokens";
import { IconHouse } from "@sberdevices/plasma-icons";
import "./Modal.css";

import { Headline2 } from "@sberdevices/plasma-ui";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
const format = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${padTime(seconds)}`;
};
const customStyles = {
  content: {
    color: `${text}`,
    backgroundColor: `${background}`,
    backgroundImage: `${gradient}`,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1em",
    padding: "1em",
    width: "30rem",
  },
};

export const Timer = ({ counter, setCounter, amountOfSolvedQuestions }) => {
  const history = useHistory();

  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function afterOpenModal() {
    subtitle.style.color = "";
    setCounterRest(7);
  }

  const [counterRest, setCounterRest] = React.useState(30);
  React.useEffect(() => {
    setCounter(counter);
  }, [counter]);
  React.useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    } else if (counter === 0) {
      setIsOpen(true);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);
  React.useEffect(() => {
    let timer;
    if (counterRest > 0) {
      timer = setTimeout(() => setCounterRest((c) => c - 1), 1000);
    } else if (counter === 0) {
      history.push("/");
      setIsOpen(false);
      setCounter(counter);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counterRest]);
  return (
    <div>
      {counter !== 0 && (
        <Headline2 style={{ marginTop: "1rem" }}>
          Время: {format(counter)}
        </Headline2>
      )}
      <div>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          style={customStyles}
        >
          <h2
            ref={(_subtitle) => (subtitle = _subtitle)}
            style={{ textAlign: "center" }}
          >
            Ой-ой, время вышло!
          </h2>
          <h3
            ref={(_subtitle) => (subtitle = _subtitle)}
            style={{ textAlign: "center" }}
          >
            Правильно {amountOfSolvedQuestions.current - 1} из 10
          </h3>
          <div style={{ textAlign: "center" }}>
            <Headline2>Возврат домой через</Headline2>
            <br />
            {counterRest !== 0 && <Headline2>{format(counterRest)}</Headline2>}
          </div>
        </Modal>
      </div>
    </div>
  );
};

const padTime = (time) => {
  return String(time).length === 1 ? `0${time}` : `${time}`;
};
