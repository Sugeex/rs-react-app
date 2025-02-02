import { Component } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';
import SearchResult from './components/SearchResult';

interface SwapiPerson {
  name: string;
  height: string;
  mass: string;
}

interface AppState {
  value: string;
  result: { name: string; description: string }[];
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      value: '',
      result: [],
    };
  }

  handleChange = (inputValue: string) => {
    this.setState({ value: inputValue });
  };

  handleClick = () => {
    console.log('Search button clicked. Current value:', this.state.value);
    this.fetchData(this.state.value);
  };

  fetchData = async (value: string) => {
    try {
      const url = value
        ? `https://swapi.dev/api/people/?search=${value}`
        : 'https://swapi.dev/api/people/';
      const response = await axios.get<{ results: SwapiPerson[] }>(url);
      const data = response.data.results.map((item) => ({
        name: item.name,
        description: `Height: ${item.height}, Mass: ${item.mass}`,
      }));
      this.setState({ result: data });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchData(this.state.value);
  }

  componentDidUpdate(prevProps: object, prevState: AppState) {
    if (prevState.value !== this.state.value) {
      this.fetchData(this.state.value);
    }
  }

  render() {
    const result = this.state.result;

    return (
      <>
        <div className="container">
          <Search onChange={this.handleChange} handleClick={this.handleClick} />
          <SearchResult result={result} />
        </div>
      </>
    );
  }
}

export default App;
