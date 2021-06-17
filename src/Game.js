import { Container } from "@sberdevices/plasma-ui/components/Grid";
import { Timer } from "./Timer";
import { useState, useEffect } from "react";
import { Row, Col } from "@sberdevices/plasma-ui";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "./media";

import {
  Card,
  CardBody,
  CardContent,
  CardMedia,
  CardHeadline1,
  Button,
  TextBox,
  cover,
  TextBoxBiggerTitle,
  TextBoxSubTitle,
  TextBoxBigTitle,
  TextField,
  CardParagraph1,
  Headline4,
} from "@sberdevices/plasma-ui";
import { IconVolumeAlt2 } from "@sberdevices/plasma-icons";

const Game = ({
  mode,
  playOrPractice,
  answer,
  assistant,
  generateNewAnimal,
  amountOfSolvedQuestions,
  processCard,
  picture,
  text,
  sumTime,
  ans,
  setAns,
  setCounter,
  counter,
  isListening,
  isPlaying,
  playButtonText,
  setPlayButtonText
}) => {
  const status = ["success", "error", ""];
  const history = useHistory();
  useEffect(() => {
    generateNewAnimal();
  }, []);
  useEffect(() => {
    answer.current = ans;
  }, [ans]);
  useEffect(() => {
    if (amountOfSolvedQuestions.current > 10) {
      {
        assistant.current?.sendData({
          action: { action_id: "gamefinish", payload: {} },
        });
      }
    }
  }, [amountOfSolvedQuestions.current]);
  const isRowBased = useMediaQuery("(min-width: 1000px)");

  const renderMode = (param) => {
    switch (param) {
      case 0:
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                width: isRowBased ? "22rem" : "18rem",
                marginTop: "1rem",
              }}
              tabIndex={-1}
              outlined={false}
              scaleOnFocus={false}
            >
              <CardBody>
                <CardMedia ratio="1/1" src={picture} />
                <CardContent cover={cover}>
                  <TextBox>
                    <TextBoxBigTitle>{"Какое это животное?"}</TextBoxBigTitle>
                  </TextBox>
                  <TextField
                    style={{ marginTop: "1rem" }}
                    value={ans}
                    label={"Ответ"}
                    //   helperText={"Helper text"}
                    disabled={false}
                    status={status !== "" ? status : undefined}
                    onChange={(v) => setAns(v.target.value.toLowerCase())}
                  />
                  <Button
                    style={{ marginTop: "1rem" }}
                    onClick={() => {
                      processCard();
                    }}
                  >
                    Ответить
                  </Button>
                </CardContent>
              </CardBody>
            </Card>
          </div>
        );
      case 1:
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                width: isRowBased ? "30rem" : "20rem",
                marginTop: "1rem",
              }}
              tabIndex={-1}
              outlined={false}
              scaleOnFocus={false}
            >
              <CardBody>
                {/* <CardMedia style={{ width: "30rem" }} src={picture} /> */}
                <CardContent cover={cover}>
                  <TextBox>
                    <CardParagraph1 style={{ marginTop: "0.75rem" }} lines={6}>
                      <Headline4>
                        <em>{text}</em>
                      </Headline4>
                    </CardParagraph1>

                    <TextBoxBigTitle style={{ marginTop: "2rem" }}>
                      {"Какое это животное?"}
                    </TextBoxBigTitle>
                  </TextBox>
                  <TextField
                    style={{ marginTop: "1rem" }}
                    value={ans}
                    label={"Ответ"}
                    //   helperText={"Helper text"}
                    disabled={false}
                    status={status !== "" ? status : undefined}
                    onChange={(v) => setAns(v.target.value.toLowerCase())}
                  />
                  <Button
                    style={{ marginTop: "1rem" }}
                    onClick={() => {
                      processCard();
                    }}
                  >
                    Ответить
                  </Button>
                </CardContent>
              </CardBody>
            </Card>
          </div>
        );
      /*case 2:
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                width: isRowBased ? "30rem" : "20rem",
                marginTop: "1rem",
              }}
              tabIndex={-1}
              outlined={false}
              scaleOnFocus={false}
            >
              <CardBody>
                <CardContent cover={cover}>
                  <Button
                    style={{ marginTop: "1rem" }}
                    onClick={() => {
                       isListening();
                    }}
                    text={playButtonText}
                    view={"primary"}
                    contentLeft={<IconVolumeAlt2 />}
                  />
                  <TextBox>
                    <TextBoxBigTitle style={{ marginTop: "1rem" }}>
                      {"Какое животное издает этот звук?"}
                    </TextBoxBigTitle>
                  </TextBox>
                  <TextField
                    style={{ marginTop: "1rem" }}
                    value={ans}
                    label={"Ответ"}
                    //   helperText={"Helper text"}
                    disabled={false}
                    status={status !== "" ? status : undefined}
                    onChange={(v) => setAns(v.target.value)}
                  />
                  <Button
                    style={{ marginTop: "1rem" }}
                    onClick={() => {
                      processCard();
                    }}
                  >
                    Ответить
                  </Button>
                </CardContent>
              </CardBody>
            </Card>
          </div>
        );*/
    }
  };

  return (
    <Container style={{ marginBottom: "10rem" }}>
      {amountOfSolvedQuestions.current > 10 ? (
        <div>
          <Container>
            {playOrPractice == 0 ? (
              <h1>Тренировка окончена</h1>
            ) : (
              <div>
                <h1>Игра окончена</h1>
                <h2>Потрачено времени: {sumTime} секунды</h2>
              </div>
            )}

            <h2>Выучены {amountOfSolvedQuestions.current - 1} животных</h2>

            <Button
              onClick={() => {
                history.push("/");
                assistant.current?.sendData({
                  action: { action_id: "goneback", payload: {} },
                });
              }}
            >
              Домой
            </Button>
          </Container>
        </div>
      ) : (
        <div>
          {playOrPractice == 0 ? (
            <></>
          ) : (
            <Timer
              style={{ textAlign: "right" }}
              counter={counter}
              setCounter={setCounter}
              amountOfSolvedQuestions={amountOfSolvedQuestions}
            />
          )}
          <div>{renderMode(mode)}</div>
        </div>
      )}
    </Container>
  );
};

export default Game;
