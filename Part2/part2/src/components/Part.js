import React from 'react';

const Part = ({name, exercises}) => {
    return (
        <div>
            <span>{name}</span>
            <span>{exercises}</span>
        </div>
    )
}

export default Part;