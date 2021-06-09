import axios from "axios";

const API_URL = "https://animalsquiz.herokuapp.com/";

export async function getRandomAnimal(solvedQuestions) {
  const { data: answer } = await axios.get(API_URL + "randomAnimal/", {
    params: {
      solvedQuestions: solvedQuestions,
    },
  });
  console.log("приходит", solvedQuestions);
  return answer;
}
