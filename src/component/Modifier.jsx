import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const Modifier = () => {
  const [user, setUser] = useState({
    id: '',
    nom: '',
    prenom: '',
    age: '',
    adresse: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/users');
        const userData = response.data[0]; 

        setUser((prevUser) => ({
          ...prevUser,
          id: userData.id,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleClickUpd = async () => {
    try {
      await axios.put(`/updateUsers/${user.id}`, user);
      console.log('Utilisateur modifié dans la base de données');
      console.log(user.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className='ContainerUpd'>
        <h1>Modification</h1>
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
            name="adresse"
            value={user.adresse}
            onChange={handleInputChange}
            placeholder="Adresse"
          />
          <button className='btn' onClick={handleClickUpd}>Modifier</button>
        </form>
    </div>
  );
};
