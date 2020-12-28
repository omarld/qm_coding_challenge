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

    componentDidMount() {
        if(!this.selected &&  this.props.defaultSelectedIndex >= 0 && this.props.options && this.props.options.length){
            this.setState({
                selected: this.props.options[this.props.defaultSelectedIndex].value
            });
        }
    }

    componentDidUpdate(prevProp) {
        if(prevProp.defaultSelectedIndex !== this.props.defaultSelectedIndex || 
            prevProp.options !== this.props.options){
            this.setState({
                selected: this.props.options[this.props.defaultSelectedIndex].value
            });
        }

        if(prevProp.reset != this.props.reset){
            this.setState({
                selected: this.props.options[this.props.defaultSelectedIndex].value
            });
        }
    }

    componentWillUnmount(){
        document.removeEventListener("mousedown", this.onClickOutside);
    }
    
    onSelectHandler(option){
        const tempOpen = !this.state.open;
        if(!tempOpen) {
            document.removeEventListener("mousedown", this.onClickOutside);
        }

        if(this.props.onSelectHandler && typeof this.props.onSelectHandler === "function"){
            this.props.onSelectHandler(option);
        }

        this.setState({
            selected: option.value,
            open: !this.state.open
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

    getItems() {
        if(!this.props || !this.props.options){
            return null;
        }

        return this.props.options.map((option, index) =>{
            return <Option key={index} onSelectHandler={this.onSelectHandler} option={option}/>
        });
    }

    renderSelect(){
        const items = this.getItems();
        return (
            <div className={styles.selectMain}>
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
        const select = this.renderSelect();
        return (
            <div ref={this.ref} className={styles.dropdownMain}>
                {select}
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