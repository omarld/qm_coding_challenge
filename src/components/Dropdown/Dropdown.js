import React, {Component} from 'react';
import {connect} from 'react-redux';
import Option from './Option/Option';

import styles from './Dropdown.module.scss';

class Dropdown extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected: null,
            open: false,
            clickedOutSide: false
        }

        this.ref = React.createRef();
        this.onSelectClick = this.onSelectClick.bind(this);
        this.onSelectHandler = this.onSelectHandler.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
    }

    componentWillUnmount(){
        document.removeEventListener("mousedown", this.onClickOutside);
    }
    
    onSelectHandler(value){
        const tempOpen = !this.state.open;
        if(!tempOpen) {
            document.removeEventListener("mousedown", this.onClickOutside);
        }

        this.props.dispatchSelected(value);

        this.setState({
            selected: value,
            open: !this.state.open
        });
    }

    getOptions() {
        if(!this.props || !this.props.options){
            return null;
        }

        return this.props.options.map((option, index) =>{
            return <Option key={index} onSelectHandler={this.onSelectHandler} option={option}/>
        });
    }

    onClickOutside(event){
        //check that select is not the ref being clicked
        //check that current target is not part of ref.current
        if(!this.ref || !this.ref.current || this.ref.current.contains(event.target)){
            return; //exit if its select event
        }
        this.setState({open: false});
    }

    onSelectClick(event){
        event.preventDefault();
        const tempOpen = !this.state.open;
        if(tempOpen) {
            document.addEventListener("mousedown", this.onClickOutside);
        }
        this.setState({open:!this.state.open});
    }

    getSelectHtmlTemplate(){
        const options = this.getOptions();
        return <select>{options}</select>
    }

    getCustomSelect(){
        const items = this.getOptions();
        return (
            <div className={styles.selectWrapper}>
                <div className={styles.selectedItem} onClick={this.onSelectClick}>
                    <span>{this.state.selected || "Select"}</span>
                </div>
                <div className={styles.optionWrapper}>
                    {this.state.open && <ul>{items}</ul>}
                </div>
            </div>
        )
    }

    render(){
        const select = this.getCustomSelect();
        return (
            <div ref={this.ref} className={styles.dropdown}>
                <div className={styles.selectWrapper}>
                    {select}
                </div>
            </div>
        )
    }    
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchSelected: selected =>{
            dispatch({type: "SELECTED_OPTION", value: selected});
        }
    }
};

export default connect(null, mapDispatchToProps)(Dropdown);