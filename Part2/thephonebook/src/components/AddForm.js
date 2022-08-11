import React from "react";

const AddForm = ({ onSubmit, newName, newNumber, onChangeName, onChangeNumber }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={newName} onChange={onChangeName} />
            </div>
            <div>
                number: <input value={newNumber} onChange={onChangeNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
}

export default AddForm;