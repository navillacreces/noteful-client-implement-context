import React from 'react';

import ValidationError from '../ValidationError/ValidationError'

export default class AddFolder extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            theFolderName : { value: '', touched: false}
        }
    }


    handleSubmit(event){
        event.preventDefault();
        const theFname = event.target.folderName.value;
        console.log(theFname);

        /*
        const url = 

        const options = {
            method : 'POST',
            body : JSON.stringify(theFname),
            headers: {
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
            this.setState({value: ''});
        })
        .catch(err =>{
            this.setState({
                error: err.message
            });
        });
        */
    }

    updateName(name){
        this.setState({theFolderName:{value:name, touched: true}})
    }
    

    validateName(){
        const name = this.state.theFolderName.value.trim();

        if(name.length === 0){
            return 'name is required'
        } else if (name.length < 3){
            return 'name must be longer than 3 characters'
        }
    }


    render(){

        const nameError = this.validateName();

        return(
            <form className="add-folder-form" onSubmit={e => this.handleSubmit(e)}>
            <h2>Add a folder</h2>
            <label htmlFor="folder-name">Name: </label>
            <input type="text" className="folder-input" name="folderName" onChange={ e => this.updateName(e.target.value)} />
            {this.state.theFolderName.touched && <ValidationError message={nameError} />}
            <br />
            <button type="submit" className="folder-submit" disabled={this.validateName()}>Submit</button>
        </form>
        )
    }
}