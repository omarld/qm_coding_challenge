import React, { Component } from 'react';
import Row from 'components/Row/Row';
import styles from './SessionSearch.module.scss';
import Button  from  'components/Shared/Button/Button';
import SqlPanel from 'components/SqlPanel/SqlPanel';

import { getAllConditions } from 'Services/SqlService';

export class SessionSearch extends Component {

    constructor(props){
        super(props);
        this.conditions = getAllConditions();
        this.maxRowsAllowed  =  this.conditions.length;
        this.state = {
            rowCount:  1,
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

    onRemoveRow = (index) =>{
        if(index < 0 || this.state.rowCount === 1 )  return;

        const rowCount = this.state.rowCount - 1;
        const newRows =   [...this.state.rowConditions];
        newRows.splice(index, 1, {});
        this.setState({
            rowCount,
            rowConditions: newRows
        })
    }

    render() {
        const disableAndBtn = this.state.rowCount === this.maxRowsAllowed ? "disabled": null;
        
        return (
            <section className={styles.mainContent} aria-label="search fields">
                <div className={styles.rowsContainer}>
                    {this.state.rowConditions.map((row, index) => {
                        if(row && row.conditions){
                            return <Row key={index} index={index} conditions={row.conditions} onRemoveRow={() => this.onRemoveRow(index)}/>
                        }
                        }
                    )}
                </div>
                <div className={styles.addBtnContainer}>
                    <Button color="primary" size="mid" onClick={this.onAndClick} disabled={disableAndBtn}>And</Button>
                </div>
                <div>
                    {(this.state.rowCount === this.maxRowsAllowed)  ? 
                    <span>Max Conditions Reached!</span>:  null}
                </div>
                <hr/>
                <div>
                    <Button color="primary" size="mid" onClick={this.onAndClick} disabled={disableAndBtn}>Search</Button>
                    <Button size="mid" onClick={this.onAndClick} disabled={disableAndBtn}>Reset</Button>
                </div>
                <SqlPanel />
                
            </section>
        )
    }
}

export default SessionSearch;