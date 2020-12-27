import './App.module.scss';
import SessionSearch from 'components/SessionSearch';

function App() {
  return (
    <div className="App" aria-label="">
      <header>
        <h1>Search for Sessions</h1>
      </header>
      <main>
        <SessionSearch />
      </main>
    </div>
  );
}

export default App;
