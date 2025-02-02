import React, { Component } from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  handleClick: () => void;
}

class Search extends Component<SearchProps> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.value}
          placeholder="Type name"
          onChange={this.handleChange}
        />
        <button onClick={this.props.handleClick}>Search</button>
      </div>
    );
  }
}

export default Search;
