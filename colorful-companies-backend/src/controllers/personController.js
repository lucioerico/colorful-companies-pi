import People from "../models/peopleModel.js";

const findAll = async (req, res) => {
  const people = await People.findAll();
  res.json(people);
};

const findPersonById = async (req, res) => {
  const personById = await People.findOne({
    where: {
      id: req.params.id
    }
  });
  res.json(personById);
};

const addPerson = async (req, res) => {

  const userEmail = await People.findOne({
    where: { 
      email: req.body.email 
    },
  });

  if (userEmail) {
    return res.status(400).json({ 
      ok: false,
      error: "Usuári@ já está cadastrad@, entre com seu E-MAIL e SENHA!" });
  }
  else {
    People.create({
      name: req.body.name,
      cpf: req.body.cpf,
      email: req.body.email,
      city: req.body.city,
      address: req.body.address,
      password: req.body.password,
      amountOfContributions: 0,
    }).then((result) => res.json(result));
  }
};

const findLogin = async (req, res) => {

  if (!req.body.email || !req.body.password){
    return res.status(400).json({ 
      ok: false,
      error: "Os campos E-MAIL e SENHA devem ser preenchidos" });
  }
  
  const userLogin = await People.findOne({
      where: { 
        email: req.body.email,
      },
  });
  console.log('USER LOGIN', userLogin)

  if (!userLogin) {
    return res.status(400).json({ 
      ok: false,
      error: "Usuári@ não encontrad@!" });
  }
  else { 
    if (req.body.password == userLogin.password) {
      return res.status(200).json({
            ok: true,
            message: 'Usuári@ logad@ com sucesso!',
            userId: userLogin.id
          });
    }
    else {
      return res.status(400).json({ 
             ok: false,
             error: "Senha inválida!" });
    }      
  }

};

export default {
  findAll,
  addPerson,
  findPersonById,
  findLogin
};