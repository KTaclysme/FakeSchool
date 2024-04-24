const express = require("express");
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
const { MongoClient } = require("mongodb");

app.use(express.json());

// se connecter sur la base de donnée
const uri = "mongodb://127.0.0.1";
const client = new MongoClient(uri);


// Run la DB
async function run() 
{
  try 
  {
    await client.connect();
    //await client.db("test").command({ ping: 1 });
    console.log("connexion to mongo done");
  } 
  catch (error) 
  {
    console.log({ error: error.message });
  } 
  finally 
  {
    await client.close();
  }
}
run()

// l'api 

async function insertusers(obj) 
{
  try 
  {
      await client.connect();
      await client.db("usernode").collection("eleves").insertOne(obj);
      return "Success : Users data stored in database."
  } 
  catch (error) 
  {
      console.log({error: error.message});
  } 
  finally 
  {
      await client.close();
  }
}

async function insertusersP(obj) 
{
  try 
  {
      await client.connect();
      await client.db("usernode").collection("prof").insertOne(obj);
      return "Success : Users data stored in database."
  } 
  catch (error) 
  {
      console.log({error: error.message});
  } 
  finally 
  {
      await client.close();
  }
}

async function displayusers()
{
  try {
    await client.connect();
    const users = await client.db("usernode").collection("eleves").find().toArray();  
    return users;
  }catch (error) {
    console.error(error); 
  }
}

async function displayusersP()
{
  try {
    await client.connect();
    const users = await client.db("usernode").collection("prof").find().toArray();  
    return users;
  }catch (error) {
    console.error(error); 
  }
}

async function delusers(obj) {
  try {
    await client.connect();
    await client.db("usernode").collection("eleves").deleteOne(obj);
    console.log(obj);
    return "Success : Users deleted from database.";
  } catch (error) {
    console.log({ error: error.message });
  } finally {
    await client.close();
  }
}

async function delusersP(obj) {
  try {
    await client.connect();
    await client.db("usernode").collection("prof").deleteOne(obj);
    console.log(obj);
    return "Success : Users deleted from database.";
  } catch (error) {
    console.log({ error: error.message });
  } finally {
    await client.close();
  }
}

// async function updateuser(filter, update) {
//   try {
//     await client.connect();
//     const result = await client
//       .db('usernode')
//       .collection('Userss')
//       .updateOne(filter, { $set: update });
//     return 'Success: User data updated in the database!';
//   } catch (error) {
//     console.error(error);
//   } finally {
//     await client.close();
//   }
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//requete

app.post("/addUsers", (req, res) => 
{
    if (req.body.length !=3) 
    {
        if (req.body.nom && req.body.prenom && req.body.age && req.body.classe && req.body.adresse) 
        {
            let temp = {"nom": req.body.nom, "prenom": req.body.prenom, "age": req.body.age, "classe": req.body.classe,"adresse": req.body.adresse }
            // handle promise
            insertusers(temp).then((resultat)=>
            {
            res.status(200).json({success : true, data : resultat})
            }) 
        }
        else 
        {
            res.end("Error : Wrong parameters");
        }
    }else {
        res.end("Error : No parameters")
    }
})

app.post("/addUsersP", (req, res) => 
{
    if (req.body.length !=3) 
    {
        if (req.body.nom && req.body.prenom && req.body.age && req.body.classe && req.body.adresse && req.body.matiere) 
        {
            let temp = {"nom": req.body.nom, "prenom": req.body.prenom, "age": req.body.age, "classe": req.body.classe,"adresse": req.body.adresse, "matiere": req.body.matiere }
            insertusersP(temp).then((resultat)=>
            {
            res.status(200).json({success : true, data : resultat})
            }) 
        }
        else 
        {
            res.end("Error : Wrong parameters");
        }
    }else {
        res.end("Error : No parameters")
    }
})

app.get('/users', (req, res)=>{
  displayusers().then((resultat)=>{
    console.log(resultat)
    res.json(resultat)
  })
})

app.get('/usersP', (req, res)=>{
  displayusersP().then((resultat)=>{
    console.log(resultat)
    res.json(resultat)
  })
})


app.post("/delUsers", (req, res) => {
  if (req.body.length != 0) {
        if (req.body.nom && req.body.prenom && req.body.age && req.body.classe && req.body.adresse) {
      let temp = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        adresse: req.body.adresse,
        classe: req.body.classe,
      };
      delusers(temp).then((resultat) => {
        res.status(200).json({ success: true, data: resultat });
      });
    } else {
      res.end("Error : Wrong parameters");
    }
  } else {
    res.end("Error : No parameters");
  }
});

app.post("/delUsersP", (req, res) => {
  if (req.body.length != 0) {
    if (req.body.nom && req.body.prenom && req.body.age && req.body.adresse && req.body.classe && req.body.matiere) {
      let temp = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        adresse: req.body.adresse,
        classe: req.body.classe,
        matiere: req.body.matiere,
      };
      delusersP(temp).then((resultat) => {
        res.status(200).json({ success: true, data: resultat });
      });
    } else {
      res.end("Error : Wrong parameters");
    }
  } else {
    res.end("Error : No parameters");
  }
});

// TODO UPDATE USER 
// app.put('/updateUsers/:id', (req, res) => {
//   if (req.body.nom && req.body.prenom && req.body.age && req.body.adresse && req.body.id) {
//     const filter = {
//       _id: req.body.id,
//       nom: req.body.nom,
//       prenom: req.body.prenom,
//       age: req.body.age,
//       adresse: req.body.adresse
//     };
//     const update = {
//       nom: req.body.nom,
//       prenom: req.body.prenom,
//       age: req.body.age,
//       adresse: req.body.adresse
//     };

//     updateuser(filter, update)
//       .then(result => {
//         res.status(200).json({ success: true, data: result });
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).json({ success: false, error: error.message });
//       });
//   } else {
//     res.status(400).json({ success: false, error: "Invalid parameters" });
//   }
// });

