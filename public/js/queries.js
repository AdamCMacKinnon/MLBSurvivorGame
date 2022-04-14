// const models = require('../models');
// const { QueryTypes } = require('sequelize');
// const { sequelize } = require('../models');


// export async function getActiveStatus() {
//     const query = await sequelize.query(`SELECT "isactive" FROM "users" AS "users" WHERE "users"."username" = 'adamcmack' LIMIT 1;`, { type: QueryTypes.SELECT })
// }

// export async function checkPicks(userpick, week, user) {
//     const query = await sequelize.query(`SELECT "user", "${week}" FROM "picks" WHERE "user" = ${user}`)
// }