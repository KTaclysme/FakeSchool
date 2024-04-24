import React from "react";
import '../styles/App.css';

export const Accueil = () => {
    
    
    return (
        <div className="ContainerAcc">
            <div className="IntroPic">
                <h1>CRYPTO ACADEMIA</h1>
                <img src = 'https://www.wcpss.net/cms/lib/NC01911451/Centricity/Domain/4/WashingtonElementary.png' alt ='école' className="SchoolPic"/>
            </div>
            <div className="ContainerPan">
                <div class="panel">
                    <h1>FORMATION BRONZE</h1>
                </div>
                <div class="panel">
                    <h1>FORMATION ARGENT</h1>
                </div>
                <div class="panel">
                    <h1>FORMATION GOLD</h1>
                </div>
            </div>
        </div>
    )}