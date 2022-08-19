const readlineSync = require("readline-sync");

const COUNT_TRY = 6;
const MIN_COUNT_NUMBER = 3;
const MAX_COUNT_NUMBER = 6;

const MIN_VALUE_RANDOM_NUMBER = 1;
const MAX_VALUE_RANDOM_NUMBER = 9;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateComputerNumber = (count) => {
  const computerNumber = [];

  while (computerNumber.length !== count) {
    const generatNumber = getRandomNumber(
      MIN_VALUE_RANDOM_NUMBER,
      MAX_VALUE_RANDOM_NUMBER
    );

    if (!computerNumber.includes(generatNumber)) {
      computerNumber.push(generatNumber);
    }
  }

  return computerNumber.join("");
};

const getMessage = (result) => {
  const {
    countNumberInPlace,
    numberInPlace,
    countNumberOutPlace,
    numberOutPlace,
  } = result;
  return `Совпавших цифр не на своих местах - ${countNumberOutPlace} (${numberOutPlace.join(
    ", "
  )}), цифр на своих местах - ${countNumberInPlace} (${numberInPlace.join(
    ", "
  )})`;
};

const checkNumbers = (userNumber) => {
  let countNumberInPlace = 0;
  const numberInPlace = [];

  let countNumberOutPlace = 0;
  const numberOutPlace = [];

  for (let i = 0; i < computerNumber.length; i++) {
    if (computerNumber[i] === userNumber[i]) {
      countNumberInPlace++;
      numberInPlace.push(userNumber[i]);
    } else if (computerNumber.includes(userNumber[i])) {
      countNumberOutPlace++;
      numberOutPlace.push(userNumber[i]);
    }
  }

  return {
    countNumberInPlace,
    numberInPlace,
    countNumberOutPlace,
    numberOutPlace,
  };
};

const startGame = () => {
  const computerNumber = generateComputerNumber(
    getRandomNumber(MIN_COUNT_NUMBER, MAX_COUNT_NUMBER)
  );

  console.log("computerNumber: ", computerNumber);
  console.log(
    "Количество чисел загаданых компьютером: ",
    computerNumber.length
  );

  for (let i = 0; i < COUNT_TRY; i++) {
    const userNumber = readlineSync.question("Введите число? ");
    const resultTest = checkNumbers(userNumber);

    if (resultTest.countNumberInPlace === computerNumber.length) {
      console.log(getMessage(resultTest));
      console.log("Вы победили!");
      break;
    } else {
      console.log(getMessage(resultTest));
      if (i === COUNT_TRY - 1) {
        console.log("Вы проиграли");
      }
    }
  }

  console.log("Игра окончена");
};

startGame();
