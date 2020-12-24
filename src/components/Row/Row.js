import React, { useState } from 'react';
import Dropdown from 'components/Dropdown/Dropdown';

import styles from './Row.module.scss';

export const Row = (props) =>{
    const { conditions } = props;

    const firstCondition = conditions[0];
    const [selectedCondition, setSelectedCondition] = useState(firstCondition);
    const [selectedOperator, setSelectedOperator] = useState(firstCondition.operators[0]);

    const onSelectHandler = (value) =>{
        console.log("value selected: " + value)
    }

    const prePostConditionTemplate = (preCondition, postCondition) =>{
        return (
            <div>
                <span> it has precondition: {preCondition}</span>
                <span>dropdown of operators here depending on type </span>
                <input placeholder="some input" type="string"/>
                <span> it has postcondition: {postCondition} </span>
                <input placeholder="some other input" type="string"/>
            </div>  
        )
    }

    const defaultInputTemplate = () =>{
        return <Dropdown 
            options={selectedCondition.operators} 
            onSelectHandler={onSelectHandler}/>
    }

    return(
        <div className={styles.mainRow}>
            <div className={styles.remove}>X</div>
            <div>
                <Dropdown 
                    options={conditions} 
                    onSelectHandler={onSelectHandler}/>
            </div>
            <div className="precond">
                {(selectedOperator && selectedOperator.preCondition) ? 
                    prePostConditionTemplate(selectedOperator.preCondition, selectedOperator.postCondition) 
                    : defaultInputTemplate()
                }
            </div>
        </div>
    )
}

export default Row;