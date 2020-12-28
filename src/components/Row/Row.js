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
            preConditionInputValue: '',
            postConditionInputValue: ''
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
            type: this.props.conditions[0].type,
            index: this.props.index
        };
        this.props.dispatchSelectedCondition({index: this.props.index, clause});
    }

    componentDidUpdate(prevProps){
        if(prevProps.reset != this.props.reset){
            this.setState({
                condition: this.props.conditions[0],
                selectedOperator: this.props.conditions[0].operators[0],
                operators: this.props.conditions[0].operators,
                selectedPredicate: this.props.conditions[0].key,
                preConditionInputValue: '',
                postConditionInputValue: ''
            });
        }
    }

    onSelectHandler(item) {
        const condition = getConditionByKey(item.key);
        const selected = {
            condition,
            selectedOperator: condition.operators[0],
            operators: condition.operators,
            selectedPredicate: condition.key
        }

        const clause = {
            selectedPredicate: condition.key,
            selectedOperator: condition.operators[0],
            preConditionInputValue: '',
            postConditionInputValue: '',
            type: condition.type,
            index: this.props.index
        };
        this.props.dispatchSelectedCondition({index: this.props.index, clause});
        this.setState(selected);
    }

    onOperatorSelectHandler(item){
        const temp = {
            selectedOperator: item
        }
        const clause = {
            selectedPredicate: this.state.condition.key,
            selectedOperator: item,
            preConditionInputValue: this.state.preConditionInputValue,
            postConditionInputValue: this.state.postConditionInputValue,
            type: this.state.condition.type,
            index: this.props.index
        };
        this.props.dispatchSelectedCondition({index: this.props.index, clause});
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
        this.dispatchSelected(event.target.value, this.state.postConditionInputValue);
    }

    onPostconditionChange(event){
        this.setState({
            postConditionInputValue: event.target.value
        });
        this.dispatchSelected(this.state.preConditionInputValue, event.target.value);
    }

    dispatchSelected(preConditionValue, postConditionValue) {
        const clause = {
            selectedPredicate: this.state.selectedPredicate,
            selectedOperator: this.state.selectedOperator,
            preConditionInputValue: preConditionValue,
            postConditionInputValue: postConditionValue,
            type: this.state.condition.type,
            index: this.props.index
        };
        this.props.dispatchSelectedCondition({index: this.props.index, clause});
    }

    render(){
        let preInputName = null, postInputName = null;
        if(this.state.selectedPredicate && this.state.selectedOperator){
            preInputName = `preInput-${this.state.selectedPredicate}-${this.state.selectedOperator.value}-${this.props.index}`;
            postInputName = `postInput-${this.state.selectedPredicate}-${this.state.selectedOperator.value}-${this.props.index}`;
        }
        

        return(
            <div className={styles.mainRow}>
                <div className={styles.remove}>
                    <a href="#" onClick={this.onClickRemove}>&#x2715;</a>
                </div>
                <div className={styles.inputContainers}>
                    <Dropdown 
                            options={this.props.conditions} 
                            defaultSelectedIndex={0}
                            reset={this.props.reset}
                            onSelectHandler={this.onSelectHandler}/>
                   
                    {(this.state.selectedOperator && this.state.selectedOperator.preCondition) ? 
                        <span className={styles.prePostCondition}>{this.state.selectedOperator.preCondition}</span> 
                        : null
                    }

                    <Dropdown
                        options={this.state.operators}
                        defaultSelectedIndex={0}
                        reset={this.props.reset}
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