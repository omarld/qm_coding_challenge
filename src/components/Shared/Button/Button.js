import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

var cx = classNames.bind(styles);

const Button  = (props)=> {

    const btnClasses = cx(styles.btn, props.className, {
        'btnPrimary': props.color && props.color.toLowerCase() === "primary",
        "mid": props.size && props.size.toLowerCase() === "mid",
        "lg": props.size && props.size.toLowerCase() === "lg"
    });

    return (
        <button className={btnClasses} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
    )
}

export default Button;