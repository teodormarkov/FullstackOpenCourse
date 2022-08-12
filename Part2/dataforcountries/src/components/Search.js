import React from "react";

const Search = ({ value, onChange }) => {
    return (
        <div>
            <span>find countries</span>
            <input type="text" value={value} onChange={onChange} />
        </div>
    );
}

export default Search;