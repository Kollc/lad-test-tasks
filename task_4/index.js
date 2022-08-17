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
  maxHealth: 10,
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
  console.log("Здоровье монстра: ", monster.maxHealth);
  console.log("Здоровье мага: ", wizard.maxHealth);
};

const genRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getMonsterAction = (cooldown) => {
  const freeCooldown = cooldown.filter((item) => item <= 0);
  const index = genRandomNumber(0, freeCooldown.length);
  return { monsterAction: monster.moves[index], monsterActionIndex: index };
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

const showFightResult = (monsterMoves, wizardMoves) => {
  const allPhisicalDmgByMonster =
    wizardMoves.physicalDmg -
    wizardMoves.physicalDmg * (monsterMoves.physicArmorPercents / 100);
  const allMagicDmgByMonster =
    wizardMoves.magicDmg -
    wizardMoves.magicDmg * (monsterMoves.magicArmorPercents / 100);
  monster.maxHealth =
    monster.maxHealth - allPhisicalDmgByMonster - allMagicDmgByMonster;

  const allPhisicalDmgByWizard =
    monsterMoves.physicalDmg -
    monsterMoves.physicalDmg * (wizardMoves.physicArmorPercents / 100);
  const allMagicDmgByWizard =
    monsterMoves.magicDmg -
    monsterMoves.magicDmg * (wizardMoves.magicArmorPercents / 100);
  wizard.maxHealth =
    wizard.maxHealth - allPhisicalDmgByWizard - allMagicDmgByWizard;

  showHealthMonsterAndWizard();

  if (wizard.maxHealth <= 0 && monster.maxHealth > 0) {
    console.log("Ты проиграл!");
    gameEnd = true;
  } else if (monster.maxHealth <= 0 && wizard.maxHealth > 0) {
    console.log("Ты выиграл!");
    gameEnd = true;
  } else if (monster.maxHealth <= 0 && wizard.maxHealth <= 0) {
    console.log("Ничья!");
    gameEnd = true;
  }
};

let gameEnd = false;

let monsterCooldownMoves = Array(monster.moves.length).fill(0);
let wizardCooldownMoves = Array(wizard.moves.length).fill(0);

let { monsterAction, monsterActionIndex } =
  getMonsterAction(monsterCooldownMoves);
let round = 1;
let isNextRound = true;

while (!gameEnd) {
  console.log(`Раунд: ${round}`);
  console.log("--------------");

  if (isNextRound) {
    const monsterMoveInNewRound = getMonsterAction(monsterCooldownMoves);
    monsterAction = monsterMoveInNewRound.monsterAction;
    monsterActionIndex = monsterMoveInNewRound.monsterActionIndex;
  }

  console.log("Ход монстра: ");
  console.log(monsterAction);

  monsterCooldownMoves[monsterActionIndex] = monsterAction.cooldown;

  console.log("--------------");
  showActiveWizardSkills();
  console.log("--------------");

  const userActionIndex = readlineSync.question(
    "Enter number of movies what you want change? "
  );

  if (
    wizard.moves[userActionIndex - 1] &&
    wizardCooldownMoves[userActionIndex - 1] <= 0
  ) {
    wizardCooldownMoves[userActionIndex - 1] =
      wizard.moves[userActionIndex - 1].cooldown;

    console.log("Ход мага: ");
    console.log(wizard.moves[userActionIndex - 1]);
    console.log("--------------");

    showFightResult(monsterAction, wizard.moves[userActionIndex - 1]);

    round++;
    isNextRound = true;

    monsterCooldownMoves = calcCooldown(monsterCooldownMoves);
    wizardCooldownMoves = calcCooldown(wizardCooldownMoves);
  } else if (wizardCooldownMoves[userActionIndex - 1] > 0) {
    isNextRound = false;
    console.log(
      `До использования осталось ${
        wizardCooldownMoves[userActionIndex - 1]
      } ходов!`
    );
  } else {
    isNextRound = false;
    console.log("Введите корректное значение");
  }
}
