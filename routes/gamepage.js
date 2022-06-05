const express = require("express");
const router = express.Router();
router.use(express.json());
const models = require("../models");
const { sequelize } = require("../models");
const { TEXT } = require("sequelize");
const authorization = require('../auth/authorization');

router.get("/gamepage", authorization, async (req, res) => {
  let userid = req.session.id;
  let isactive = req.session.isactive;
  let user = req.session.username;

  console.log(req.session)

    const picksArr = await models.picks.findAll({
      where: {
        userid: userid,
      },
      attributes: ["picks"],
      raw: true,
    });
    let result = picksArr.map((p) => p.picks);
    const picksResult = result[0];

  if (isactive === true) {
    res.render("gamepage", {
      alert: `Hello ${user}, You are currently ACTIVE`,
    });
  } else {
    res.render("gamepage", {
      warning: `Hello ${user}, you have been ELIMINATED`,
    });
  }
});

router.post("/gamepage", async (req, res) => {
  const user = req.session.username;
  const status = req.session.isactive;
  const userid = req.session.id;
  const userpick = [req.body.pick];

  if (!userid || userid === undefined) {
    res.render("gamepage", {
      alert: "you are not logged in!, please login to continue.",
    });
  } else {
    const picksArr = await models.picks.findAll({
      where: {
        userid: userid,
      },
      attributes: ["picks"],
      raw: true,
    });
    const result = picksArr.map((p) => p.picks);
  }
  if (status === false) {
    res.render("gamepage", { message: "Sorry, you have been eliminated!" });
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
      res.render("gamepage", { message: `Week 6 Pick: ${userpick}` });
    } else {
      let pick = models.picks.build({
        userid: userid,
        username: user,
        picks: userpick,
      });
      let savedPick = await pick.save();
      if (savedPick != null) {
        res.render("gamepage", { message: `Week 6 Pick: ${userpick}` });
      } else {
        comparePicks(userpick, userid);
      }
    }
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/", { message: "you have been logged out" });
  });
});

async function comparePicks(userid, userpick) {
  const picksArr = await models.picks.findAll({
    where: {
      userid: userid,
    },
    attributes: ["picks"],
    raw: true,
  });
  const result = picksArr.map((p) => p.picks);
  for (let p = 0; p < result.length; p++) {
    if (p === userpick) {
      return true;
    }
  }
}

module.exports = router;
