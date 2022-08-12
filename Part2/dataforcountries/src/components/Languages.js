import React from 'react';

const Languages = ({ data }) => {
    return (
        <div>
            <h5>languages:</h5>
            <ul>
                {Object.values(data).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
        </div>
    )
}

export default Languages;