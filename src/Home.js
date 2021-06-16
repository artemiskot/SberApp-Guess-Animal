import hear from "./hear.jpg";
import lion from "./lionpic.jpg";
import opisanie from "./opisanie.jpg";
import { IconRefresh } from "@sberdevices/plasma-icons";
import { IconTimerFill } from "@sberdevices/plasma-icons";
import { useHistory, withRouter } from "react-router-dom";
import { useMediaQuery } from "./media";

import { Container } from "@sberdevices/plasma-ui/components/Grid";
import { Button, P } from "@sberdevices/plasma-ui";
import { Display3 } from "@sberdevices/plasma-ui";
import { useState } from "react";
import {
  Card,
  Icon,
  CardBody,
  CardContent,
  CardMedia,
  Tabs,
  TabItem,
  TextBoxSubTitle,
  TextBoxBiggerTitle,
  TextBoxBigTitle,
  TextBox,
} from "@sberdevices/plasma-ui";
const Home = ({
  mode,
  setPlayOrPractice,
  playOrPractice,
  setCounter,
  amountOfSolvedQuestions,
  solvedQuestions,
  linkToGame,
}) => {
  const icons = [<IconRefresh />, <IconTimerFill />];
  const outlined = false;
  const items = [0, 0];
  const texts = ["Режим тренировки", "Режим игровой"];
  const disabled = false;
  const history = useHistory();

  const isRowBased = useMediaQuery("(min-width: 1000px)");

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "0.5rem",
          marginTop: "1rem",
        }}
      >
        <Display3>Отгадай Животное</Display3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          //marginBottom: "0.5rem",
        }}
      >
        <Tabs
          size={isRowBased ? "l" : "s"}
          view={"secondary"}
          scaleOnPress={true}
          outlined={!disabled && outlined}
          disabled={disabled}
        >
          {items.map((_, i) => (
            <TabItem
              key={`item:${i}`}
              isActive={i === playOrPractice}
              tabIndex={!disabled ? i : -1}
              contentLeft={icons[i]}
              onClick={() => !disabled && setPlayOrPractice(i)}
            >
              {texts[i]}
            </TabItem>
          ))}
        </Tabs>
      </div>

      <div
        style={{
          flexDirection: isRowBased ? "row" : "column",
          marginBottom: isRowBased ? "0rem" : "10rem",
          display: "flex",
          //justifyContent: "center",
          justifyContent: "center",
          alignItems: "center",
          //flexGrow: "1",
          //flexShrink: "1",
          marginBottom: "10rem",
        }}
      >
        <Card
          style={{
            display: "flex",
            width: "18.5rem",
            margin: "0.5rem",
            justifyContent: "center",
          }}
        >
          <CardBody>
            <CardMedia src={lion} height={"9rem"}/>
            <CardContent>
              <TextBox>
                <TextBoxBigTitle>{"Угадай по фото"}</TextBoxBigTitle>
                <TextBoxSubTitle>
                  {
                    "Необходимо понять о каком животном идет речь по изображению"
                  }
                </TextBoxSubTitle>
              </TextBox>
              <Button
                text="Начать"
                view="primary"
                size="s"
                scaleOnInteraction={true}
                outlined={true}
                stretch
                style={{ marginTop: "1em" }}
                tabIndex={-1}
                onClick={() => {
                  mode.current = 0; 
                  linkToGame();
                }}
              />
            </CardContent>
          </CardBody>
        </Card>
        <Card style={{ width: "18.5rem", margin: "0.5rem" }}>
          <CardBody>
            <CardMedia src={opisanie} height={"9rem"} />
            <CardContent>
              <TextBox>
                <TextBoxBigTitle>{"Угадай по описанию"}</TextBoxBigTitle>

                <TextBoxSubTitle>
                  {
                    "Необходимо понять о каком животном идет речь по текстовому описанию"
                  }
                </TextBoxSubTitle>
              </TextBox>
              <Button
                text="Начать"
                view="primary"
                size="s"
                scaleOnInteraction={true}
                outlined={true}
                stretch
                style={{ marginTop: "1em" }}
                tabIndex={-1}
                onClick={() => {
                  mode.current = 1;
                  linkToGame();
                }}
              />
            </CardContent>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};

export default Home;
