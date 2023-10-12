import { PublicKey } from '@solana/web3.js';
import { utils, web3, BN } from '@project-serum/anchor';
import { getConfig, programID } from './utils';

const { SystemProgram } = web3;

const fetchCampaignData = async (programID) => {
  const { connection, program } = getConfig();

  const programAccounts = await connection.getProgramAccounts(programID);
  const campaignPromises = programAccounts.map(async (campaign) => {
    const campaignData = await program.account.campaign.fetch(campaign.pubkey);
    return {
      ...campaignData,
      pubkey: campaign.pubkey,
    };
  });

  const campaigns = await Promise.all(campaignPromises);
  return campaigns;
};

export const createCampaign = async () => {
  const { provider, program } = getConfig();

  try {
    const [campaign] = PublicKey.findProgramAddressSync(
      [
        utils.bytes.utf8.encode('CAMPAIGN_DEMO'),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );

    await program.methods
      .create('campaign name', 'campaign description')
      .accounts({
        campaign,
        user: provider.wallet.publicKey,
        SystemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log('Created a new campaign with address:', campaign.toString());
  } catch (error) {
    console.log('Creating campaign error:', error);
  }
};

export const getCampaigns = async () => {
  try {
    const campaigns = await fetchCampaignData(programID);

    return campaigns;
  } catch (error) {
    throw new Error(error);
  }
};

export const donate = async (publicKey) => {
  try {
    const { provider, program } = getConfig();

    await program.methods
      .donate(new BN(0.2 * web3.LAMPORTS_PER_SOL))
      .accounts({
        campaign: publicKey,
        user: provider.wallet.publicKey,
        SystemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log('Donated some solana to:', publicKey.toString());
  } catch (error) {
    throw new Error(error);
  }
};

export const withdraw = async (publicKey) => {
  try {
    const { provider, program } = getConfig();

    await program.methods
      .withdraw(new BN(0.2 * web3.LAMPORTS_PER_SOL))
      .accounts({
        campaign: publicKey,
        user: provider.wallet.publicKey,
      })
      .rpc();

    console.log('Withdraw some solana to:', publicKey.toString());
  } catch (error) {
    console.log(error);
  }
};
