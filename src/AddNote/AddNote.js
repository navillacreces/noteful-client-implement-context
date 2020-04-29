import React from 'react';
import { text } from '@fortawesome/fontawesome-svg-core';
import config from '../config'

import ValidationError from '../ValidationError/ValidationError'
import ApiContext from '../ApiContext'
const { v4: uuidv4 } = require('uuid');



export default class AddNote extends React.Component{

    static defaultProps = {
        history: {
          push: () => { }
        },
      }


    constructor(props){
        super(props);
        this.state = {
            name : '',
            content: '',
            folderId: '',
            noteid: '',
            nameInputBool: false
        };
    }

    static contextType = ApiContext;

    updateName = name => {
        this.setState({
            name: name,
            nameInputBool: true
        })
    }

    updateContent = content =>{
        this.setState({
            
                content: content
            
        })
    }

    updateFolder = folder =>{
        this.setState({
            folder:folder
           
        })
    }
    
    onSubmit(event){
        event.preventDefault();
        
        const theNote = {
            
            note_name : event.target.name.value,
            //id: uuidv4(),
            folder_id : event.target.select.value,
            note_content : event.target.contents.value,
            modified: new Date()
        };
        
        const url = `${config.API_ENDPOINT}/notes`;

        const options = {
            method : 'POST',
            body : JSON.stringify(theNote),
            headers : {
                "Content-Type": "application/json",
            }
        };


        fetch(url,options)
        .then(res =>{
            if(!res.ok){
                throw new Error('Something went wrong, please try again later');
            }
            
            return res.json();
        })
        .then(data =>{
            this.context.handleAddNote(data);
            this.props.history.push('/');
        })
        .catch(err =>{
            this.setState({
                error: err.message
            });
        });
    }


    validateName(){
        const name = this.state.name;

        if(name.length === 0){
            return 'name is required'
        } else if (name.length < 3){
            return 'name must be longer than 3 characters'
        }
    }

    render(){
        

        const nameError = this.validateName();

    return (

        <form className="add-note-form" onSubmit={e => this.onSubmit(e)}>
            <h2>Add a note</h2>
            <label htmlFor="note-name">Name: </label>
            <input type="text" className="note-name-in" name="name" onChange={event => this.updateName(event.target.value)}/>
            {this.state.nameInputBool && <ValidationError message={nameError} />}
            <br />
            <label htmlFor="note-contents"> Contents: </label>
            <textarea type="text" className="note-text" name="contents" onChange={event => this.updateContent(event.target.value)}/>
            <br />
            <select className="selectFolder" name="select" onChange={e => this.updateFolder(e.target.value)}>
            {this.context.folders.map(folder => (
                <option key={folder.name} name='folder' value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
            <br />
            <button type="submit" className="note-submit" disabled={this.validateName()}>Submit</button>
        </form>
    )
    }
}

