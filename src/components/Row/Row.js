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

    const prePostConditionTemplate = (condition, type) =>{
        return (
            <div>
                {condition && <span className={styles.prePostCondition}>{condition}</span> }
                {!condition && <input placeholder="some input" type={type}/> }
            </div>
        )
    }

    return(
        <div className={styles.mainRow}>
            <div className={styles.remove}>X</div>
            <div>
                <Dropdown 
                    options={conditions} 
                    onSelectHandler={onSelectHandler}/>
            </div>
            {(selectedOperator && selectedOperator.preCondition) ? 
                prePostConditionTemplate(selectedOperator.preCondition, selectedCondition.type) 
                : null
            }
            {(selectedOperator && selectedOperator.preCondition) ? 
                prePostConditionTemplate() 
                : null
            }
            <input placeholder="always input" type={selectedCondition.type}/>
            {(selectedOperator && selectedOperator.postCondition) ? 
                prePostConditionTemplate(selectedOperator.postCondition, selectedCondition.type) 
                : null
            }
            {(selectedOperator && selectedOperator.postCondition) ? 
                prePostConditionTemplate() 
                : null
            }
        </div>
    )
}

export default Row;