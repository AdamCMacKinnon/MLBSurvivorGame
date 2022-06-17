const mustacheExpress = require('mustache-express');
const models = require('../../models');

async function renderUserCount() {
    const userCount = document.getElementById('totalUsers')
    const totalUsers = await models.users.findOne({
      where: {
        isactive: true
      },
      attributes: [sequelize.fn("COUNT", sequelize.col("username"))],
      raw: true
    })
    const render = mustacheExpress.render(userCount, {totalUsers})
    return render
}