const data = require('./schedule.json')

const thisWeek = Object.values(data[1]);
const game = thisWeek[0];
const thisGame = game.split(',');
const testGame = thisGame[3];


console.log(testGame)

/**
 * Let's try to use something like this logic to render each team's schedule in a separate card below the three primary ones.
 * Let's say using a dropdown menu and search object.keys for user input.  Then render the schedule in mustahe list like done for rendering previous picks.
 * 
 * UPDATE:  Logic works as written, have to figure out how to pass INDEX of week to determine which week to render. needs to be dynamic value.
 */