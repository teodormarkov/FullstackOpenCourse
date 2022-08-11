import React from 'react';

const Sum = ({ parts }) => {
    const total = parts.reduce((next, part) => {
        return { exercises: next.exercises + part.exercises }
    });

    return (
        <span style={{ fontWeight: 'bold' }}>total of {total.exercises} exercises</span>
    );
}

export default Sum;