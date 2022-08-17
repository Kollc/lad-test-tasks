let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает.

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;

const trnaslateList = [
    {
        eng: 'MONDAY',
        rus: 'ПОНЕДЕЛЬНИК'
    },
    {
        eng: 'TUESDAY',
        rus: 'ВТОРНИК'
    },
    {
        eng: 'WEDNESDAY',
        rus: 'СРЕДА'
    },
    {
        eng: 'THURSDAY',
        rus: 'ЧЕТВЕРГ'
    },
    {
        eng: 'FRIDAY',
        rus: 'ПЯТНИЦА'
    },
    {
        eng: 'SATURDAY',
        rus: 'СУББОТА'
    },
    {
        eng: 'SUNDAY',
        rus: 'ВОСКРЕСЕНЬЕ'
    },
];

const replacer = (text, translateObj) => text.replace(translateObj.rus, translateObj.eng);

trnaslateList.forEach((translate) => {
    str = replacer(str, translate);
});

console.log(str);