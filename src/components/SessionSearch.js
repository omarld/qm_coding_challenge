import React, { Component } from 'react';
import Row from 'components/Row/Row';
import styles from './SessionSearch.module.scss';
import Button  from  'components/Shared/Button/Button';

import { getAllConditions } from 'Services/SqlService';

export class SessionSearch extends Component {

    constructor(props){
        super(props);
        const conditions = getAllConditions();
        this.state = {
            rowCount:  0,
            rowConditions: [{
                key:  "1",
                conditions:  conditions
            }]
        }
    }

    render() {
        
        return (
            <section className={styles.mainContent} aria-label="search fields">
                <div>
                    {this.state.rowConditions.map((row, index) => (
                        <Row key={index} conditions={row.conditions}/>
                    ))}
                </div>
                <div className={styles.addBtnContainer}>
                    <Button color="primary" size="mid">And</Button>
                </div>
                
            </section>
        )
    }
}

export default SessionSearch;