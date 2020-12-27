import React, { useState, useEffect } from 'react';
import Dropdown from 'components/Dropdown/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import styles from './Row.module.scss';

import {getConditionByKey} from 'Services/SqlService';

export const Row = (props) =>{
    const { conditions } = props;

    const [selected, setSelected] = useState({});

    useEffect(() =>{
        const selected = {
            condition: conditions[0],
            selectedOperator: conditions[0].operators[0],
            operators: conditions[0].operators
        }
        setSelected(selected);
    }, []);

    const onSelectHandler = (item) =>{
        const condition = getConditionByKey(item.key);
        const selected = {
            condition,
            selectedOperator: condition.operators[0],
            operators: condition.operators
        }
        setSelected(selected);
    }

    const renderPrePostConditionTemplate = (condition, type) =>{
        return (
            <div>
                {condition && <span className={styles.prePostCondition}>{condition}</span> }
                {!condition && <input placeholder="some input" type={type}/> }
            </div>
        )
    }

    const onOperatorSelectHandler = (item) =>{
        console.log(item);
        const temp = {
            ...selected,
            selectedOperator: item
        }
        console.log(temp);
        setSelected(temp);
    }

    return(
        <div className={styles.mainRow}>
            <div className={styles.remove}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </div>
            <div className={styles.inputContainers}>
                <Dropdown 
                        options={conditions} 
                        defaultSelectedIndex={0}
                        onSelectHandler={onSelectHandler}/>
               
                {(selected.selectedOperator && selected.selectedOperator.preCondition) ? 
                    renderPrePostConditionTemplate(selected.selectedOperator.preCondition, selected.condition.type) 
                    : null
                }
                {(selected.operators && selected.operators.preCondition) ? 
                    renderPrePostConditionTemplate() 
                    : null
                }
                <Dropdown
                    options={selected.operators}
                    defaultSelectedIndex={0}
                    onSelectHandler={onOperatorSelectHandler}/>
                {(selected.selectedOperator && selected.selectedOperator.postCondition) ? 
                    <input placeholder="between input" type={selected.condition.type}/> 
                    : null
                }

                {(selected.selectedOperator && selected.selectedOperator.postCondition) ? 
                    renderPrePostConditionTemplate(selected.selectedOperator.postCondition, selected.condition.type) 
                    : null
                }
            
                {(selected.operators && selected.operators.postCondition) ? 
                    renderPrePostConditionTemplate() 
                    : null
                }

                {selected.condition && <input placeholder="always input" type={selected.condition.type}/> }
            </div>
        </div>
    )
}

export default Row;