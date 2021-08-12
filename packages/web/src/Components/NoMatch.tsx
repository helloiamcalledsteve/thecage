import React from "react";
import '../global/global.css';
import './css/NoMatch.css';

const NoMatch = () => {
    return (
        <div className="background">
            <h1 className="nomatch">404 not found</h1>
            <span className="text">maybe you can find it if you reach for the stars ¯\_(ツ)_/¯</span>
        </div>
    );
}

export default NoMatch;