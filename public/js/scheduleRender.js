export async function getActiveStatus() {
    const query = await sequelize.query(`SELECT "isactive" FROM "users" AS "users" WHERE "users"."username" = 'adamcmack' LIMIT 1;`, { type: QueryTypes.SELECT })
}