const readlineSync = require("readline-sync");

const monster = {
  maxHealth: 10,
  name: "Лютый",
  moves: [
    {
      name: "Удар когтистой лапой",
      physicalDmg: 3, // физический урон
      magicDmg: 0, // магический урон
      physicArmorPercents: 20, // физическая броня
      magicArmorPercents: 20, // магическая броня
      cooldown: 0, // ходов на восстановление
    },
    {
      name: "Огненное дыхание",
      physicalDmg: 0,
      magicDmg: 4,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Удар хвостом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 50,
      magicArmorPercents: 0,
      cooldown: 2,
    },
  ],
};

const wizard = {
  name: "Евстафий",
  moves: [
    {
      name: "Удар боевым кадилом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 50,
      cooldown: 0,
    },
    {
      name: "Вертушка левой пяткой",
      physicalDmg: 4,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 4,
    },
    {
      name: "Каноничный фаербол",
      physicalDmg: 0,
      magicDmg: 5,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Магический блок",
      physicalDmg: 0,
      magicDmg: 0,
      physicArmorPercents: 100,
      magicArmorPercents: 100,
      cooldown: 4,
    },
  ],
};

const showHealthMonsterAndWizard = () => {
  console.log("###########");
  console.log("Здоровье монстра: ", monsterHealth);
  console.log("Здоровье мага: ", wizardHealth);
  console.log("###########");
};

const genRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getMonsterMoves = (cooldown) => {
  const freeCooldown = cooldown.filter((item) => item <= 0);
  const index = genRandomNumber(0, freeCooldown.length);
  return { monsterMoves: monster.moves[index], monsterMovesIndex: index };
};

const calcCooldown = (cooldown) => {
  return cooldown.map((item) => {
    if (item > 0) {
      return item - 1;
    }

    return item;
  });
};

const showActiveWizardSkills = () => {
  wizard.moves.forEach((skill, index) => {
    if (wizardCooldownMoves[index] === 0) {
      console.log("Number", index + 1);
      console.log(skill);
    }
  });
};

const calcMonsterHealth = (monsterMoves, wizardMoves) => {
  const allPhisicalDmgByMonster =
    wizardMoves.physicalDmg -
    wizardMoves.physicalDmg * (monsterMoves.physicArmorPercents / 100);
  const allMagicDmgByMonster =
    wizardMoves.magicDmg -
    wizardMoves.magicDmg * (monsterMoves.magicArmorPercents / 100);
  monsterHealth =
    monsterHealth - allPhisicalDmgByMonster - allMagicDmgByMonster;
};

const calcWizardHealth = (monsterMoves, wizardMoves) => {
  const allPhisicalDmgByWizard =
    monsterMoves.physicalDmg -
    monsterMoves.physicalDmg * (wizardMoves.physicArmorPercents / 100);
  const allMagicDmgByWizard =
    monsterMoves.magicDmg -
    monsterMoves.magicDmg * (wizardMoves.magicArmorPercents / 100);
  wizardHealth = wizardHealth - allPhisicalDmgByWizard - allMagicDmgByWizard;
};

const showFightResult = (monsterMoves, wizardMoves) => {
  calcMonsterHealth(monsterMoves, wizardMoves);
  calcWizardHealth(monsterMoves, wizardMoves);

  showHealthMonsterAndWizard();

  if (wizardHealth <= 0 && monsterHealth > 0) {
    console.log("Ты проиграл!");
    gameEnd = true;
  } else if (monsterHealth <= 0 && wizardHealth > 0) {
    console.log("Ты выиграл!");
    gameEnd = true;
  } else if (monsterHealth <= 0 && wizardHealth <= 0) {
    console.log("Ничья!");
    gameEnd = true;
  }
};

let gameEnd = false;

let monsterCooldownMoves = Array(monster.moves.length).fill(0);
let wizardCooldownMoves = Array(wizard.moves.length).fill(0);

let monsterHealth = monster.maxHealth;
let wizardHealth = readlineSync.question(
  "Введите количество здоровья для вашего мага: "
);

const startGame = () => {
  let { monsterMoves, monsterMovesIndex } =
    getMonsterMoves(monsterCooldownMoves);
  let round = 1;
  let isNextRound = true;

  while (!gameEnd) {
    console.log(`Раунд: ${round}`);
    console.log("--------------");

    if (isNextRound) {
      const monsterMoveInNewRound = getMonsterMoves(monsterCooldownMoves);
      monsterMoves = monsterMoveInNewRound.monsterMoves;
      monsterMovesIndex = monsterMoveInNewRound.monsterMovesIndex;
    }

    console.log("Ход монстра: ");
    console.log(monsterMoves);

    monsterCooldownMoves[monsterMovesIndex] = monsterMoves.cooldown;

    console.log("--------------");
    showActiveWizardSkills();
    console.log("--------------");

    const userMovesIndex = readlineSync.question(
      "Введите номер действия, которые вы хотите использовать в этом раунде: "
    );

    if (
      wizard.moves[userMovesIndex - 1] &&
      wizardCooldownMoves[userMovesIndex - 1] <= 0
    ) {
      wizardCooldownMoves[userMovesIndex - 1] =
        wizard.moves[userMovesIndex - 1].cooldown;

      console.log("Ход мага: ");
      console.log(wizard.moves[userMovesIndex - 1]);
      console.log("--------------");

      showFightResult(monsterMoves, wizard.moves[userMovesIndex - 1]);

      monsterCooldownMoves = calcCooldown(monsterCooldownMoves);
      wizardCooldownMoves = calcCooldown(wizardCooldownMoves);

      round++;
      isNextRound = true;
    } else if (wizardCooldownMoves[userMovesIndex - 1] > 0) {
      isNextRound = false;
      console.log(
        `До использования осталось ${
          wizardCooldownMoves[userMovesIndex - 1]
        } ходов!`
      );
    } else {
      isNextRound = false;
      console.log("Введите корректное значение");
    }
  }
};

startGame();
