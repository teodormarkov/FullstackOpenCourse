import React from 'react';

const Contacts = ({ contacts, onDeletePerson }) => {
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
                    <button onClick={() => { onDeletePerson(p.id) }}>delete</button>
                </div>
            )}
        </div>
    )
}

export default Contacts;