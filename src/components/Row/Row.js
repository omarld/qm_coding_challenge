import React, {Component} from 'react';
import { connect } from 'react-redux'
import Dropdown from 'components/Dropdown/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import styles from './Row.module.scss';

import {getConditionByKey} from 'Services/SqlService';

class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPredicate: null,
            condition: null,
            selectedOperator: null,
            operators: null,
            preConditionInputValue: null,
            postConditionInputValue: null
        }

        this.onSelectHandler = this.onSelectHandler.bind(this);
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onOperatorSelectHandler = this.onOperatorSelectHandler.bind(this); 
        this.onPreconditionChange = this.onPreconditionChange.bind(this);
        this.onPostconditionChange = this.onPostconditionChange.bind(this);
    }

    componentDidMount() {
        const selected = {
            condition: this.props.conditions[0],
            selectedOperator: this.props.conditions[0].operators[0],
            operators: this.props.conditions[0].operators,
            selectedPredicate: this.props.conditions[0].key
        }
        this.setState(selected);

        const clause = {
            selectedPredicate: this.props.conditions[0].key,
            selectedOperator: this.props.conditions[0].operators[0],
            preConditionInputValue: this.state.preConditionInputValue,
            postConditionInputValue: this.state.postConditionInputValue,
            index: this.props.index
        };
        this.props.dispatchSelectedCondition(clause);
    }

    onSelectHandler(item) {
        const condition = getConditionByKey(item.key);
        const selected = {
            condition,
            selectedOperator: condition.operators[0],
            operators: condition.operators,
            selectedPredicate: condition.key
        }
        this.setState(selected);
    }

    onOperatorSelectHandler(item){
        const temp = {
            selectedOperator: item
        }
        this.setState(temp);
    }

    onClickRemove (event) {
        event.preventDefault();
        if(this.props.onRemoveRow && typeof this.props.onRemoveRow === "function"){
            this.props.onRemoveRow();
        }
    }

    onPreconditionChange(event){
        this.setState({
            preConditionInputValue: event.target.value
        });
        const clause = {
            selectedPredicate: this.state.selectedPredicate,
            selectedOperator: this.state.selectedOperator,
            preConditionInputValue: event.target.value,
            postConditionInputValue: this.state.postConditionInputValue,
            index: this.props.index
        };
        this.props.dispatchSelectedCondition(clause);
    }

    onPostconditionChange(event){
        this.setState({
            postConditionInputValue: event.target.value
        });
        const clause = {
            selectedPredicate: this.state.selectedPredicate,
            selectedOperator: this.state.selectedOperator,
            preConditionInputValue: this.state.preConditionInputValue,
            postConditionInputValue: event.target.value,
            index: this.props.index
        };
        this.props.dispatchSelectedCondition(clause);
    }

    // dispatchSelected() {
    //     const clause = {
    //         selectedPredicate: this.state.selectedPredicate,
    //         selectedOperator: this.state.selectedOperator,
    //         preConditionInputValue: this.state.preConditionInputValue,
    //         postConditionInputValue: this.state.postConditionInputValue,
    //         index: this.props.index
    //     };
    //     // this.props.dispatchSelectedCondition(clause);
    // }

    render(){
        let preInputName = null, postInputName = null;
        if(this.state.selectedPredicate && this.state.selectedOperator){
            preInputName = `preInput-${this.state.selectedPredicate}-${this.state.selectedOperator.value}-${this.props.index}`;
            postInputName = `postInput-${this.state.selectedPredicate}-${this.state.selectedOperator.value}-${this.props.index}`;
        }
        

        return(
            <div className={styles.mainRow}>
                <div className={styles.remove}>
                    <a href="#" onClick={this.onClickRemove}><FontAwesomeIcon icon={faTrashAlt} /></a>
                </div>
                <div className={styles.inputContainers}>
                    <Dropdown 
                            options={this.props.conditions} 
                            defaultSelectedIndex={0}
                            onSelectHandler={this.onSelectHandler}/>
                   
                    {(this.state.selectedOperator && this.state.selectedOperator.preCondition) ? 
                        <span className={styles.prePostCondition}>{this.state.selectedOperator.preCondition}</span> 
                        : null
                    }

                    <Dropdown
                        options={this.state.operators}
                        defaultSelectedIndex={0}
                        onSelectHandler={this.onOperatorSelectHandler}/>

                    {(this.state.selectedOperator && this.state.selectedOperator.preCondition) ? 
                        <input placeholder="between input" 
                            name={preInputName} 
                            value={this.state.preConditionInputValue}
                            onChange={this.onPreconditionChange} 
                            type={this.state.condition.type}/> 
                        : null
                    }
    
                    {(this.state.selectedOperator && this.state.selectedOperator.postCondition) ? 
                        <span className={styles.prePostCondition}>{this.state.selectedOperator.postCondition}</span>
                        : null
                    }
    
                    {this.state.condition && <input name={postInputName} placeholder="always input"
                        value={this.state.postConditionInputValue}
                        onChange={this.onPostconditionChange} 
                        type={this.state.condition.type}/> }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchSelectedCondition: selected =>{
            dispatch({type: "UPDATE_SQL_CLAUSE", value: selected});
        }
    }
};

export default connect(null, mapDispatchToProps)(Row);