import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';
import idl from 'src/idl/idl.json';

const opts = {
  preflightCommitment: 'processed',
};
export const programID = new PublicKey(idl.metadata.address);

export const getConfig = () => {
  const connection = new Connection(
    'http://127.0.0.1:8899',
    opts.preflightCommitment
  );
  const provider = new AnchorProvider(
    connection,
    window.solana,
    opts.preflightCommitment
  );
  const program = new Program(idl, programID, provider);

  return { connection, provider, program };
};
