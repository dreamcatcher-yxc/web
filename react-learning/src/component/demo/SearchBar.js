import React, { Component } from 'react';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
    }

    onChange(e) {
        this.props.onChange(e);
    }

    onSearchChange(e) {
        this.props.onSearchChange(e);
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Search" onChange={ this.onSearchChange.bind(this) }/>
                <br />
                <input type="checkbox" value="1" onChange={ this.onChange.bind(this) }/> Only show products in stock
            </div>
        );
    }
}

export default SearchBar;