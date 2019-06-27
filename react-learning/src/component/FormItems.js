import React, { Component } from 'react';

class YInput  extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
    }

    onChange(e) {
        this.setState({value: e.target.value});
    }
    
    render() {
        return (
            <div>
                <input name={ this.state.name } type="text" value={ this.state.value } placeholder={ this.state.placeholder } onChange={ this.onChange.bind(this) } autoComplete="false"/>
                { this.state.value }
            </div>
        );
    }
}

export { YInput };