import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ConnectPhantom = ({ connected, setConnected }) => {
  const [walletAvail, setWalletAvail] = useState(false);
  const [provider, setProvider] = useState(null);
  const [pubKey, setPubKey] = useState(null);

  useEffect(() => {
    if ('solana' in window) {
      const solWindow = window;
      if (solWindow.solana.isPhantom) {
        setProvider(solWindow.solana);
        setWalletAvail(true);
        // Attemp an eager connection
        solWindow.solana.connect({ onlyIfTrusted: true });
      }
    }
  }, []);

  useEffect(() => {
    if (provider) {
      provider.on('connect', (publicKey) => {
        console.log(`connect event: ${publicKey}`);
        setConnected(true);
        setPubKey(publicKey);
      });

      provider.on('disconnect', () => {
        console.log('disconnect event');
        setConnected(false);
        setPubKey(null);
      });
    }
  }, [provider]);

  const connectHandler = () => {
    console.log(`connect handler`);
    if (provider) {
      provider.connect().catch((err) => {
        console.error('connect ERROR:', err);
      });
    }
  };

  const disconnectHandler = () => {
    console.log('disconnect handler');
    if (provider) {
      provider.disconnect().catch((err) => {
        console.error('disconnect ERROR:', err);
      });
    }
  };

  return (
    <div>
      {walletAvail ? (
        <>
          <button disabled={connected} onClick={connectHandler}>
            Connect to Phantom
          </button>
          <button disabled={!connected} onClick={disconnectHandler}>
            Disconnect from Phantom
          </button>
          {connected ? <p>Your public key is : {pubKey?.toBase58()}</p> : null}
        </>
      ) : (
        <>
          <p>
            Opps!!! Phantom is not available. Go get it{' '}
            <a href='https://phantom.app/'>https://phantom.app/</a>.
          </p>
        </>
      )}
    </div>
  );
};

ConnectPhantom.propTypes = {
  connected: PropTypes.bool.isRequired,
  setConnected: PropTypes.func.isRequired,
};

export default ConnectPhantom;
