import Dashboard from 'src/components/Dashboard';
import './App.css';
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const App = () => {
  return (
    <div className='App'>
      <Dashboard />
    </div>
  );
};

export default App;
