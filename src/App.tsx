import { Component } from 'react';
import axios from 'axios';
import './App.css';
import Search from './components/Search';
import SearchResult from './components/SearchResult';
import ErrorBoundary from './components/ErrorBoundary';

interface SwapiPerson {
  name: string;
  height: string;
  mass: string;
}

interface AppState {
  value: string;
  result: { name: string; description: string }[];
  triggerError: boolean;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const savedValue = localStorage.getItem('searchQuery') || '';
    this.state = {
      value: savedValue,
      result: [],
      triggerError: false,
    };
  }

  handleChange = (inputValue: string) => {
    this.setState({ value: inputValue });
    const trimmedValue = inputValue.trim();
    localStorage.setItem('searchQuery', trimmedValue);
    this.fetchData(trimmedValue);
  };

  handleClick = () => {
    console.log('Search button clicked. Current value:', this.state.value);
    this.fetchData(this.state.value);
  };

  triggerError = () => {
    this.setState({ triggerError: true });
  };

  resetError = () => {
    this.setState({ triggerError: false });
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
      this.setState({ result: data, triggerError: false });
    } catch (error) {
      console.log(error);
      this.setState({ triggerError: true });
    }
  };

  componentDidMount() {
    this.fetchData(this.state.value);
  }

  render() {
    if (this.state.triggerError) {
      throw new Error('Simulated error triggered by button!');
    }

    return (
      <>
        <div className="container">
          <Search
            value={this.state.value}
            onChange={this.handleChange}
            handleClick={this.handleClick}
          />
          <ErrorBoundary onReset={this.resetError}>
            <SearchResult result={this.state.result} />
          </ErrorBoundary>
          <button onClick={this.triggerError} className="error-button">
            Trigger Error
          </button>
        </div>
      </>
    );
  }
}

export default App;
