const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Race, Temper, Op, Race_Temper } = require("../db");

router.get("/", async (req, res) => {
  const { name } = req.query;

  const totalApiData = await axios.get(
    "https://api.thedogapi.com/v1/breeds?api_key=live_k34fbe5LFpnZgMN8c9W3GrXoMUDeG42qfyBARMBbUDJAc2pU4cl4SEQAKvT0PrIq"
  );

  if (!name) {
    const neededData = totalApiData.data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        image: dog.image.url,
        temperament: dog.temperament,
        weight: dog.weight,
      };
    });

    const dbData = await Race.findAll({
      include: {
        model: Temper,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const dbRealData = dbData.map((r) => {
      const temperaments = r.Tempers.map((t) => {
        return t.name;
      });
      const temperament = temperaments.join(", ");
      return {
        id: r.id,
        name: r.name,
        weight: r.weight,
        temperament: temperament,
      };
    });
    return res.json(dbRealData.concat(neededData));
  }

  const dogApiData = await axios.get(
    `https://api.thedogapi.com/v1/breeds/search?q=${name}api_key=live_k34fbe5LFpnZgMN8c9W3GrXoMUDeG42qfyBARMBbUDJAc2pU4cl4SEQAKvT0PrIq`
  );

  const dogDbData = await Race.findAll({
    where: { name: { [Op.iLike]: name } },
    include: {
      model: Temper,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const dbRealData = dogDbData.map((r) => {
    const temperaments = r.Tempers.map((t) => {
      return t.name;
    });
    const temperament = temperaments.join(", ");
    return {
      id: r.id,
      name: r.name,
      weight: r.weight,
      temperament: temperament,
    };
  });

  if (dbRealData.length > 0) {
    const totalData = dogApiData.data.concat(dbRealData);
    const neededData = totalData.mao((dog) => {
      const dogImage = totalApiData.data.find((doggie) => {
        return doggie.id === dog.id;
      });

      if (dogImage) {
        return {
          id: dog.id,
          name: dog.name,
          image: dogImage.image.url,
          temperament: dog.temperament,
          weight: dog.weight,
        };
      } else {
        return {
          id: dog.id,
          name: dog.name,
          image: falwse,
          temperament: dog.temperament,
          weight: dog.weight,
        };
      }
    });

    if (neededData.length === 0) {
      return res.status(404).json("Dog not found");
    } else {
      const neededData = dogApiData.data.map((dog) => {
        const dogImage = totalApiData.data.find((doggie) => {
          return doggie.id === dog.id;
        });
        if (dogImage) {
          return {
            id: dog.id,
            name: dog.name,
            image: dogImage.image.url,
            temperament: dog.temperament,
            weight: dog.weight,
          };
        } else {
          return {
            id: dog.id,
            name: dog.name,
            image: false,
            temperament: dog.temperament,
            weight: dog.weight,
          };
        }
      });
      return res.json(neededData);
    }
  }
});

router.get("/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  const id = Number(idRaza);
  if (!isNaN(id)) {
    const apiData = await axios.get(
      "https://api.thedogapi.com/v1/breeds?api_key=live_k34fbe5LFpnZgMN8c9W3GrXoMUDeG42qfyBARMBbUDJAc2pU4cl4SEQAKvT0PrIq"
    );
    const race = apiData.data.find((r) => {
      return r.id === id;
    });
    if (race) {
      const raceDetailData = {
        name: race.name,
        image: race.image.url,
        temperament: race.temperament,
        weight: race.weight.metric,
        height: race.height.metric,
        lifeYears: race.life_span,
      };
      return res.json(raceDetailData);
    }
  }

  const dbRace = await Race.findByPk(idRaza);
  const dbTemperament = await Race_Temper.findAll({
    where: { RaceId: idRaza },
  });
  let raceTemperaments = [];
  dbTemperament.forEach((temp, i) => {
    const tempId = temp.dataValues.TemperId;
    Temper.findByPk(tempId).then((temper) => {
      raceTemperament.push(temper.dataValues.name);
      if (i === dbTemperament.length - 1) {
        return res.json({
          name: dbRace.dataValues.name,
          height: dbRace.dataValues.height,
          weight: dbRace.dataValues.weight,
          lifeYears: dbRace.dataValues.lifeYears,
          temperament: temperaments,
        });
      }
    });
  });
});

router.post("/", async (req, res) => {
  const { name, temperaments, weight, height, lifeYears } = req.body;

  if (!name || !weight || !height) {
    return res.status(404).send("insufficient data");
  }

  const newRace = await Race.create({
    name,
    weight,
    height,
    lifeYears,
  });

  if (temperaments) {
    temperaments.forEach(async (temp) => {
      const temperament = await Temper.findOne({ where: { name: temp } });
      if (temperament) {
        await newRace.setTempers(temperament.dataValues.id);
      }
    });
  }

  return res.send({ msg: "successfully created" });
});

module.exports = router;
