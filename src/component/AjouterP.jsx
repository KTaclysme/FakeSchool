import React, { useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";



export const AjouterP = () => {

const history = useHistory();
const PAUSE_DURATION = 1000; 

const [user, setUser] = useState({
    nom: '',
    prenom: '',
    age: '',
    classe:'',
    adresse: '',
    matiere: '',
});

const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
};      

const handleClick = async () => {
try {
        await axios.post("/addUsersP", user);
        console.log("Utilisateur ajouté à la bdd")
        setTimeout(()=>{
          history.push("/listeP");
      }, PAUSE_DURATION);
    } catch (error) {
        console.error(error);
    }
};

return (
    <div className = 'ContainerAdd'>
      <h2>Ajouter un professeur</h2>
        <form>
          <input
            type="text"
            name="nom"
            value={user.nom}
            onChange={handleInputChange}
            placeholder="Nom"
          />
          <input
            type="text"
            name="prenom"
            value={user.prenom}
            onChange={handleInputChange}
            placeholder="Prénom"
          />
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={handleInputChange}
            placeholder="Age"
          />
          <input
            type="text"
            name="classe"
            value={user.classe}
            onChange={handleInputChange}
            placeholder="classe"
          />
          <input
            type="text"
            name="adresse"
            value={user.adresse}
            onChange={handleInputChange}
            placeholder="Adresse"
          />
          <input
            type="text"
            name="matiere"
            value={user.matiere}
            onChange={handleInputChange}
            placeholder="Matière" 
          />
          <button className='btn' onClick={handleClick}>Ajouter</button>
        </form>
    </div>
  );
};
