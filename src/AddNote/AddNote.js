import React from 'react';


export default function AddNote(){


    return (
        <form className="add-note-form">
            <h2>Add a note</h2>
            <label htmlFor="note-name">Name: </label>
            <input type="text" className="note-name-in" name="note-name"/>
            <br />
            <textarea type="text" className="note-text" name="note-text" />
            <br />
            {/* select  from app.state*/}
            <button type="submit" className="note-submit">Submit</button>
        </form>
    )
}