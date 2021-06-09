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
  setMode,
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
  const texts = ["Режим тренировки", "Игровой режим"];
  const disabled = false;
  const history = useHistory();

  const isRowBased = useMediaQuery("(min-width: 1000px)");

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "1rem",
          marginTop: "2rem",
        }}
      >
        <Display3>Отгадай Животное</Display3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
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
          //marginBottom: "10rem",
        }}
      >
        <Card
          style={{
            display: "flex",
            width: "21rem",
            margin: "1rem",
            justifyContent: "center",
          }}
        >
          <CardBody>
            <CardMedia src={lion} height={"12rem"} />
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
                  linkToGame();
                  setMode(0);
                }}
              />
            </CardContent>
          </CardBody>
        </Card>
        <Card style={{ width: "21rem", margin: "1rem" }}>
          <CardBody>
            <CardMedia src={opisanie} height={"12rem"} />
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
                  linkToGame();
                  setMode(1);
                }}
              />
            </CardContent>
          </CardBody>
        </Card>
        <Card style={{ width: "21rem", margin: "1rem" }}>
          <CardBody>
            <CardMedia src={hear} height={"12rem"} />
            <CardContent>
              <TextBox>
                <TextBoxBigTitle>{"Угадай по звуку"}</TextBoxBigTitle>
                <TextBoxSubTitle>
                  {
                    "Необходимо понять о каком животном идет речь по не всегда характерному звуку"
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
                  linkToGame();
                  setMode(2);
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
