import React from 'react';

const Option = (props) =>{

    const {onSelectHandler, option} = props;

    const onClickHandler = (event) => {
        event.preventDefault();
        const value = event.currentTarget.value || null;
        onSelectHandler(value);
    }

    return (
        <option onClick={onClickHandler}>{option.value}</option>
    );
}

export default Option;