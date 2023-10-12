import { useState } from 'react';

import { web3 } from '@project-serum/anchor';
import {
  createCampaign,
  getCampaigns,
  donate,
  withdraw,
} from 'src/api/campaign';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  const getCampaignsHandler = async () => {
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.log('Get campaign error:', error);
    }
  };

  const donateHandler = async (pubKey) => {
    try {
      await donate(pubKey);
      getCampaignsHandler();
    } catch (error) {
      console.log('Donate error:', error);
    }
  };

  return (
    <>
      <button onClick={createCampaign}>Create campaign</button>
      <button onClick={getCampaignsHandler}>Get a list of campaigns</button>
      <br />
      {campaigns.map((campaign) => (
        <div key={campaign.pubkey.toString()}>
          <p>Campaign ID: {campaign.pubkey.toString()}</p>
          <p>
            Balance:{' '}
            {(campaign.amountDonated / web3.LAMPORTS_PER_SOL).toString()}
          </p>
          <p>{campaign.name}</p>
          <p>{campaign.description}</p>
          <button onClick={() => donateHandler(campaign.pubkey)}>
            Click to donate!
          </button>
          <button onClick={() => withdraw(campaign.pubkey)}>
            Click to withdraw!
          </button>
          <br />
        </div>
      ))}
    </>
  );
};

export default Campaigns;
