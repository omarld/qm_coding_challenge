import React, { Component } from 'react';
import {connect} from 'react-redux';
import Row from 'components/Row/Row';
import styles from './SessionSearch.module.scss';
import Button  from  'components/Shared/Button/Button';
import SqlPanel from 'components/SqlPanel/SqlPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
            toggleReset: false,
            sqlString: null
        }

        this.onSearchClick = this.onSearchClick.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
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
        if(index < 0 || this.state.rowCount === 1 )  {
            this.onResetClick();
            return
        };

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
       this.setState({sqlString: Utils.sqlBuilder(this.props.clauses)});
    }

    onResetClick(){
        this.setState({
            rowCount: 1,
            rowConditions: [{
                key:  "1",
                conditions:  this.conditions
            }],
            toggleReset: !this.state.toggleReset,
            sqlString: ''
        });

        //index null is to clear all
        this.props.dispatchSelectedCondition({index: null, selected: {}});
    }

    render() {
        const disableAndBtn = this.state.rowCount === this.maxRowsAllowed ? "disabled": null;
        
        return (
            <section className={styles.mainContent} aria-label="search fields">
                <h1>Search for Sessions</h1>
                <div className={styles.rowsContainer}>
                    {this.state.rowConditions.map((row, index) => {
                        if(row && row.conditions){
                            return <Row key={index} reset={this.state.toggleReset} index={index} conditions={row.conditions} onRemoveRow={() => this.onRemoveRow(index)}/>
                        }
                        return null;
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
                <div className={styles.searchResetButtons}>
                    <Button color="primary" className={styles.searchButton} size="lg" onClick={this.onSearchClick} disabled={disableAndBtn}>
                    <FontAwesomeIcon icon={faSearch} /> Search
                    </Button>
                    <Button onClick={this.onResetClick} size="lg">Reset</Button>
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