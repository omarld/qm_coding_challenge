import React from 'react';
import styles from './Options.module.scss';

const Option = (props) =>{

    const {onSelectHandler, option} = props;

    const onClickHandler = (event) => {
        event.preventDefault();
        onSelectHandler(option);
    }

    return (
        <li className={styles.optionMain} onClick={onClickHandler}>{option.value}</li>
    );
}

export default Option;