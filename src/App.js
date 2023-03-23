import { Component } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor(){
    super();
    this.state = {
      monsters: [], 
      searchField: ''
    };
    console.log('component');
  }
  componentDidMount(){
    console.log('Didmount');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState(() => {
      return{monsters: users}
    },
    () => {
      console.log(this.state);
    }
    ));
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return {searchField};
    }); 
  }

  render(){
    console.log('render');

    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchField);
    });

    return (
      <div className="App">
      <div className='app-title'> Monster Rolodex</div>
      <SearchBox onChangeHandler= {this.onSearchChange} placeholder='Search Box'/>
      <CardList monsters={filteredMonsters}/>
      
      </div>
    );
  }
  }

  

export default App;
