const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Op, Temper } = require("../db");

router.get("/", async (req, res) => {
  const apiData = await axios.get(
    "https://api.thedogapi.com/v1/breeds?api_key=live_k34fbe5LFpnZgMN8c9W3GrXoMUDeG42qfyBARMBbUDJAc2pU4cl4SEQAKvT0PrIq"
  );
  let temperaments = [];
  apiData.data.forEach((race) => {
    if (race.temperament) {
      const arrayTemps = race.temperament.split(", ");
      temperaments = temperaments.concat(arrayTemps);
    }
  });
  let filteredTemperaments = temperaments.filter((temp, index) => {
    return temperaments.indexOf(temp) === index;
  });
  filteredTemperaments.forEach(async (temp) => {
    const existTemp = await Temper.findOne({ where: { name: temp } });
    if (!existTemp) {
      const createdTemp = await Temper.create({ name: temp });
    }
  });
  return res.json(filteredTemperaments);
});

module.exports = router;