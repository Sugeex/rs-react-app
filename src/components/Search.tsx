import React, { Component } from 'react';

interface SearchProps {
  onChange: (value: string) => void;
  handleClick: () => void;
}

class Search extends Component<SearchProps> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value.trim());
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Type name"
          onChange={this.handleChange}
        />
        <button onClick={this.props.handleClick}>Search</button>
      </div>
    );
  }
}

export default Search;
