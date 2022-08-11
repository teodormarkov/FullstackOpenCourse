import React from 'react';

const Filter = ({ value, onChange }) => {
    return (
        <div>
        <span>search: </span>
        <input type="text" value={value} onChange={onChange} />
        </div>
    );
}

export default Filter;