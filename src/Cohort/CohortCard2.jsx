import React from 'react';

const CohortCard2 = (props) => {
    return (
        <div className="Cards">
            <div className="card">
                <div className="profile-pic">
                    <img src={props.img} alt={props.name} />
                </div>
                <h2>{props.name}</h2>
                <p>{props.pos}</p>
                <div className="social-icons">
                    <a href="https://www.instagram.com/ecell_kiit/#" className="icon">X</a>
                    <a href="https://www.instagram.com/ecell_kiit/" className="icon">in</a>
                    <a href="https://www.instagram.com/ecell_kiit/" className="icon">@</a>
                </div>
            </div>

        </div>
    );
};
export default CohortCard2;