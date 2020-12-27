import React, { Component } from 'react';
import Row from 'components/Row/Row';
import styles from './SessionSearch.module.scss';
import Button  from  'components/Shared/Button/Button';

import { getAllConditions } from 'Services/SqlService';

export class SessionSearch extends Component {

    constructor(props){
        super(props);
        this.conditions = getAllConditions();
        this.maxRowsAllowed  =  this.conditions.length;
        this.state = {
            rowCount:  0,
            rowConditions: [{
                key:  "1",
                conditions:  this.conditions
            }]
        }
    }

    onAndClick = () =>{
        if(this.state.rowCount === this.maxRowsAllowed) return;

        const rowCount = this.state.rowCount + 1;
        const newRows =   [...this.state.rowConditions];
        newRows.push({
            key:  rowCount + "",
            conditions:  this.conditions
        });

        this.setState({
             rowCount,
            rowConditions: newRows
        });
    }

    render() {

        const disableAndBtn = this.state.rowCount === this.maxRowsAllowed ? "disabled": null;
        
        return (
            <section className={styles.mainContent} aria-label="search fields">
                <div className={styles.rowsContainer}>
                    {this.state.rowConditions.map((row, index) => (
                        <Row key={index} conditions={row.conditions}/>
                    ))}
                </div>
                <div className={styles.addBtnContainer}>
                    <Button color="primary" size="mid" onClick={this.onAndClick} disabled={disableAndBtn}>And</Button>
                </div>
                <div>
                    {(this.state.rowCount === this.maxRowsAllowed)  ? 
                    <span>Max Conditions Reached!</span>:  null}
                </div>
                
            </section>
        )
    }
}

export default SessionSearch;