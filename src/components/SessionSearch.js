import React, { Component } from 'react';
import {connect} from 'react-redux';
import Row from 'components/Row/Row';
import styles from './SessionSearch.module.scss';
import Button  from  'components/Shared/Button/Button';
import SqlPanel from 'components/SqlPanel/SqlPanel';

import Utils from 'Lib/Utils';
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
            }],
            sqlString: null
        }

        this.onSearchClick = this.onSearchClick.bind(this);
        this.onResetClick = this.onResetClick(this);
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

        //delete from redux store by using empty selected object
        this.props.dispatchSelectedCondition({index, selected: {}});
    }

    onSearchClick (){
       this.setState({sqlString: Utils.formatSql(this.props.clauses)});
    }

    onResetClick(){
        console.log("reset!");
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
                    <Button color="primary" size="mid" onClick={this.onSearchClick} disabled={disableAndBtn}>Search</Button>
                    <Button size="mid" onClick={this.onResetClick} disabled={disableAndBtn}>Reset</Button>
                </div>
                <SqlPanel results={this.state.sqlString}/>
                
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        clauses: state.clauses
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatchSelectedCondition: selected =>{
            dispatch({type: "UPDATE_SQL_CLAUSE", value: selected});
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionSearch);