import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/App.css';

export const DisplayDataP = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/usersP');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleClickDel = async (user) => {
  try {
          await axios.post("/delUsersP", user);
          console.log("Utilisateur supprimé de la bdd");
          // Effectuez les actions supplémentaires nécessaires après l'ajout de l'utilisateur
      } catch (error) {
          console.error(error);
      }
  };

  // const handleClickUpd = async (user) => {
  //   try {
  //           await axios.post("/updateUsers", user);
  //           console.log("Utilisateur modifié de la bdd");
  //           // Effectuez les actions supplémentaires nécessaires après l'ajout de l'utilisateur
  //       } catch (error) {
  //           console.error(error);
  //       }
  //   };

  return (
    <div className='ContainerUser'>
      <h2>La Liste des professeurs</h2>
      <table className='TabUser'>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Age</th>
            <th>Adresse</th>
            <th>Classe</th>
            <th>Matière</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => {
        return (
          <tr key={user.id}>
            <td>{user.nom}</td>
            <td>{user.prenom}</td>
            <td>{user.age}</td>
            <td>{user.adresse}</td>
            <td>{user.classe}</td>
            <td>{user.matiere}</td>
            <td>
              <button className='btn' onClick={() => handleClickDel(user)}>Supprimer</button>
              <button className='btn'><a href = "/modifier"> Modifier </a></button>
            </td>
          </tr>
        );
      })}
        </tbody>
      </table>
    </div>
  );
};
