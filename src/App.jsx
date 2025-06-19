import React from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const handleSearch = (term) => {
    // Handle search logic here
    console.log('Searching for:', term);
  };

  return (
    <div className="App">
      <h1>Book Finder App 📚</h1>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;
