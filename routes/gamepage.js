const express = require("express");
const router = express.Router();
router.use(express.json());
const models = require("../models");
const { sequelize } = require("../models");
const { TEXT } = require("sequelize");
const authorization = require("../auth/authorization");
const AmazonS3URI = require('amazon-s3-uri');

router.get("/gamepage", authorization, async (req, res) => {
  let userid = req.session.id;
  let isactive = req.session.isactive;
  let user = req.session.username;

  const totalUsers = await models.users.findOne({
    where: {
      isactive: true,
    },
    attributes: [sequelize.fn("COUNT", sequelize.col("username"))],
    raw: true,
  });
  const userCount = Object.values(totalUsers).toString();

  const picksArr = await models.picks.findAll({
    where: {
      userid: userid,
    },
    attributes: ["picks"],
    raw: true,
  });
  let result = picksArr.map((p) => p.picks);
  const picksResult = result[0];

  function setKey(picksResult) {
    if (picksResult.length > 0) {
      let fullObj = "pick: " + picksResult;
      return fullObj;
    }
  }
  const picksList = function (picksResult) {
    if (picksResult === null || undefined) {
      return null;
    } else {
      let picks = picksResult.map(setKey);
      return picks;
    }
  };

  const teamSelect = result.toString().split(",");
  const thisTeam = teamSelect[teamSelect.length -1];
  const teamImage = `/assets/teamlogos/Diamondbacks.svg`;
  console.log(teamImage)

  if (isactive === true) {
    res.render("gamepage", {
      alert: `Hello ${user.toUpperCase()}, You are currently ACTIVE`,
      picksResult,
      userCount,
      thisTeam
    });
  } else {
    res.render("gamepage", {
      warning: `Hello ${user.toUpperCase()}, you have been ELIMINATED`,
      picksResult,
      userCount,
    });
  }
});

router.post("/gamepage", async (req, res) => {
  const user = req.session.username;
  const status = req.session.isactive;
  const userid = req.session.id;
  const userpick = [req.body.pick];
  const picksArr = await models.picks.findAll({
    where: {
      userid: userid,
    },
    attributes: ["picks"],
    raw: true,
  });
  let result = picksArr.map((p) => p.picks);
  let picksResult = result[0];
  if (picksResult === undefined) {
    picksResult = "";
  }

  const totalUsers = await models.users.findOne({
    where: {
      isactive: true,
    },
    attributes: [sequelize.fn("COUNT", sequelize.col("username"))],
    raw: true,
  });
  const userCount = Object.values(totalUsers).toString();

  if (status === false) {
    res.render("gamepage", {
      message: "Sorry, you have been eliminated",
      picksResult,
      userCount,
    });
  } else if (picksResult.includes(userpick.toString())) {
    res.render("gamepage", {
      message: "you've already picked that team!",
      picksResult,
      userCount,
    });
  } else {
    let findId = await models.picks.findOne({
      where: {
        userid: userid,
      },
    });
    if (findId !== null) {
      await models.picks.update(
        {
          picks: sequelize.fn(
            "array_append",
            sequelize.col("picks", TEXT),
            userpick.toString()
          ),
        },
        {
          where: {
            userid: userid,
          },
        }
      );
      res.render("gamepage", {
        message: `Current Pick: ${userpick}`,
        picksResult,
        userCount,
      });
    } else {
      let pick = models.picks.build({
        userid: userid,
        username: user,
        picks: userpick,
      });
      let savedPick = await pick.save();
      if (savedPick != null) {
        res.render("gamepage", {
          message: `Current Pick: ${userpick}`,
          picksResult,
          userCount,
        });
      }
    }
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/", { message: "you have been logged out" });
  });
});

module.exports = router;
