import React from "react";
import I18n from "i18n-js";

export default class InlineEditable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {editable: false, newValue: props.value};
    }

    onChangeInternal = (e) => {
        this.setState({newValue: e.target.value});
    };

    onKeyUp = (e) => {
        if (e.keyCode === 13) {//enter
            return this.save();
        }
        if (e.keyCode === 27) {//esc
            return this.cancel();
        }
    };

    save = () => {
        this.setState({editable: false});
        this.props.onChange(this.state.newValue);
    };

    cancel = () => {
        this.setState({editable: false, newValue: this.props.value});
    };

    renderEditable(name, value) {
        return (
            <div className="inline-editable-edit">
                <label htmlFor={name}>{I18n.t(name)}</label>
                <input ref={ref => this.input = ref} type="text" name={name} id={name} value={value}
                       onChange={this.onChangeInternal} onKeyUp={this.onKeyUp} onBlur={this.save}/>
            </div>
        );
    }

    toggleEditable = (e) => {
        this.setState({editable: !this.state.editable});
        setTimeout(()=>this.input.focus(), 250);
    };

    renderNonEditable(name, value, mayEdit) {
        const span = mayEdit ?
            <span onClick={this.toggleEditable}>{value}<i className="fa fa-pencil"></i></span> :
            <span>{value}</span>
        return (
            <div className="inline-editable">
                <label>{I18n.t(name)}</label>
                {span}
            </div>
        );
    }


    render() {
        const {name, mayEdit} = this.props;
        const {editable, newValue} = this.state;
        return (editable && mayEdit) ? this.renderEditable(name, newValue) : this.renderNonEditable(name, newValue, mayEdit);
    }

}
