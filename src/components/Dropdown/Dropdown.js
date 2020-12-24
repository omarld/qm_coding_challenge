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
        this.onSelectChange = this.onSelectChange.bind(this);
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
        if(this.props.onSelectHandler && typeof this.props.onSelectHandler === "function"){
            this.props.onSelectHanlder(value);
        }

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
            return <Option key={option.key || index} onSelectHandler={this.onSelectHandler} option={option}/>
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

    // onSelectClick(event){
    //     event.preventDefault();
    //     const tempOpen = !this.state.open;
    //     if(tempOpen) {
    //         document.addEventListener("mousedown", this.onClickOutside);
    //     }
    //     this.setState({open:!this.state.open});
    // }

    onSelectChange(event){
        event.preventDefault();
        const value = event.target.value;
        if(this.props.onSelectHandler && typeof this.props.onSelectHandler === "function"){
            this.props.onSelectHandler(value);
        }
    }

    getSelectHtmlTemplate(){
        const options = this.getOptions();
        return <select onChange={this.onSelectChange}>{options}</select>
    }

    render(){
        const select = this.getSelectHtmlTemplate();
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