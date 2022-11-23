const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Race, Temper, Op, Race_Temper } = require("../db");

router.get("/", async (req, res) => {
  const { name } = req.query;

  const totalApiData = await axios.get(
    "https://api.thedogapi.com/v1/breeds?api_key=29117eac-fbd3-4f74-9260-69b8c2959c19"
  );

  if (!name) {
    const neededData = totalApiData.data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        image: dog.image
          ? dog.image.url
          : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png",
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
    `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=29117eac-fbd3-4f74-9260-69b8c2959c19`
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
    const neededData = totalData.map((dog) => {
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
    if (neededData.length === 0) {
      return res.status(404).json("No se encontró el perro");
    } else return res.json(totalData);
  } else {
    if (dogApiData.data.length === 0) {
      return res.status(404).json("No se encontró el perro");
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
      "https://api.thedogapi.com/v1/breeds?api_key=29117eac-fbd3-4f74-9260-69b8c2959c19"
    );
    const race = apiData.data.find((r) => {
      return r.id === id;
    });
    if (race) {
      const raceDetailData = {
        name: race.name,
        image: race.image.url,
        temperament: race.temperament,
        height: race.height.metric,
        weight: race.weight.metric,
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
      raceTemperaments.push(temper.dataValues.name);
      if (i === dbTemperament.length - 1) {
        return res.json({
          name: dbRace.dataValues.name,
          height: dbRace.dataValues.height,
          weight: dbRace.dataValues.weight,
          lifeYears: dbRace.dataValues.lifeYears,
          temperament: raceTemperaments,
        });
      }
    });
    // const tempData = await Temper.findByPk(tempId);
    // const tempName = tempData.dataValues.name;
    // if (i === dbTemperament.length - 1) {
    //   raceTemperaments = raceTemperaments + `${tempName}`;
    // } else {
    //   raceTemperaments = raceTemperaments + `${tempName}, `;
    // }
    // console.log(raceTemperaments);
  });
});

router.post("/", async (req, res) => {
  const { name, temperaments, weight, height, lifeYears } = req.body;

  if (!name || !weight || !height) {
    return res.status(404).send("Faltan datos");
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

  return res.send({ msg: "La raza ha sido creada con éxito", data: newRace });
});

module.exports = router;
