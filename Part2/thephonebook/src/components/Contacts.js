import React from 'react';

const Contacts = ({ contacts }) => {
    return (
        <div>
            {contacts.map((p, i) =>
                <div key={p.name}>
                    <span>
                        {p.name}
                    </span>
                    <span>
                        {p.number}
                    </span>
                </div>
            )}
        </div>
    )
}

export default Contacts;