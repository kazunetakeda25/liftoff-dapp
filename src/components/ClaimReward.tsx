import React, { FC } from 'react';
import { BigNumber } from 'ethers';
import styled from 'styled-components';
import Button from './Button';
import { StyledRocketCard, TYPE } from '../theme';
import { useConnectedWeb3Context, useContracts } from '../contexts';

import { TokenSale, Ignitor } from 'utils/types';
import { formatBigNumber } from 'utils';

const CTA = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
  button {
    margin-right: 1rem;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: space-between;
  `}
`;

const StyledButton = styled(Button)``;

interface IProps {
  tokenSale: TokenSale;
  igniteInfo: Maybe<Ignitor>;
}

const ClaimReward: FC<IProps> = ({ igniteInfo, tokenSale }) => {
  const context = useConnectedWeb3Context();
  const { liftoffEngine } = useContracts(context);
  const { account } = context;

  const reward = BigNumber.from(igniteInfo ? igniteInfo.ignited : '0')
    .mul(BigNumber.from(tokenSale.rewardSupply))
    .div(BigNumber.from(tokenSale.totalIgnited));

  const onClaimReward = async () => {
    if (!liftoffEngine || !account) {
      return;
    }
    try {
      await liftoffEngine.claimReward(tokenSale.id, account);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledRocketCard>
      <TYPE.LargeHeader>Claim Token Rewards</TYPE.LargeHeader>
      <CTA>
        <StyledButton onClick={onClaimReward}>Claim</StyledButton>
        <TYPE.Small color="primary1">
          Current available to claim: {formatBigNumber(reward, 18)}{' '}
          {tokenSale.symbol}
        </TYPE.Small>
      </CTA>
    </StyledRocketCard>
  );
};

export default ClaimReward;