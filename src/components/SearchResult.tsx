import { Component } from 'react';

interface ResultProps {
  name: string;
  description: string;
}

interface SearchResultProps {
  result: ResultProps[];
}

class SearchResult extends Component<SearchResultProps> {
  render() {
    const { result } = this.props;

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>Name</h2>
          <h2>Description</h2>
        </div>
        <div className="main">
          {result.map((item, index) => (
            <div
              style={{ display: 'flex', justifyContent: 'space-between' }}
              key={index}
            >
              <span>{item.name}</span>
              <span>{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchResult;
