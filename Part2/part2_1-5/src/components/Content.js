import React from 'react';
import Part from './Part';
import Sum from './Sum';

const Content = ({ parts }) => {
    return (
        <div>
            <div>
                {parts.map(part =>
                    <Part key={part.id} name={part.name} exercises={part.exercises} />
                )}
            </div>
            <Sum parts={parts} />
        </div>
    )
}

export default Content;