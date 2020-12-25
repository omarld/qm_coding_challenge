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

    const prePostConditionTemplate = (preCondition, postCondition, type) =>{
        return (
            <div>
                <input placeholder="some input" type={type}/>
                <input placeholder="some other input" type={type}/>
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
                    prePostConditionTemplate(selectedOperator.preCondition, selectedOperator.postCondition, selectedCondition.type) 
                    : defaultInputTemplate()
                }
            </div>
        </div>
    )
}

export default Row;