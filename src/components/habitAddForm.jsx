import React, { Component } from 'react';

class habitAddForm extends Component {
    render() {
        return (
            <form className='add-form'>
                <input type="text" className='add-input' placeholder='habit'></input>
                <button className='add-button'>add</button>
            </form>
        );
    }
}

export default habitAddForm;