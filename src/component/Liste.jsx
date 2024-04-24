import React from "react";

import { DisplayData } from "./DisplayBdd"
import { DisplayDataP } from "./DisplayBddP";

export const Liste = () => {
    
    
    return (
        <div>
            <DisplayData/>
            <button className='btn'> <a href="/ajouter">Ajouter</a> </button>
            <br/>
            <DisplayDataP/>
            <button className='btn'> <a href="/ajouterP">Ajouter</a> </button>
        </div>
    )}