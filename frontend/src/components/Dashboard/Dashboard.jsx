import { useState } from 'react';

import ConnectPhantom from 'src/components/ConnectPhantom';
import Campaigns from 'src/components/Campaigns';

const Dashboard = () => {
  const [connected, setConnected] = useState(false);

  return (
    <div className='Dashboard'>
      {!connected && (
        <ConnectPhantom connected={connected} setConnected={setConnected} />
      )}
      {connected && <Campaigns />}
    </div>
  );
};

export default Dashboard;
