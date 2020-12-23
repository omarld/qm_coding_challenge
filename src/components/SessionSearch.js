import React, { Component } from 'react';
import Dropdown from 'components/Dropdown/Dropdown';

export class SessionSearch extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const options = [
            {key: 1, value: "Options 1"},
            {key: 2, value: "Options 2"},
            {key: 3, value: "Options 3"},
            {key: 4, value: "Options 4"}
          ]
        return (
            <div>
                <h1>Session Search</h1>
                <Dropdown options={options}/>
            </div>
        )
    }
}

export default SessionSearch;