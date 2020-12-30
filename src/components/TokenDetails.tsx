import React from 'react';
import styled from 'styled-components';
import { TYPE } from '../theme';
import { Card } from './card';
import { ProgressBar } from './ProgressBar';

const CardGrid = styled.div({
  display: 'grid',
  gridGap: 10,
  gridTemplateColumns: 'repeat(3, 1fr)',
  marginTop: 20
});

const StyledCard = styled(Card)({
  border: '2px solid #CFD6E2',
  marginTop: 10
});

export const TokenDetails = () => {
  return (
    <>
      <TYPE.Header>Token Details</TYPE.Header>
      <ProgressBar completed={20} />

      <CardGrid>
        <StyledCard>
          <TYPE.Body color="blue1">SOFTCAP</TYPE.Body>
          <TYPE.Header>500 xETH</TYPE.Header>
        </StyledCard>
        <StyledCard>
          <TYPE.Body color="blue1">Total Ignited</TYPE.Body>
          <TYPE.Header>1500 xETH</TYPE.Header>
        </StyledCard>
        <StyledCard>
          <TYPE.Body color="blue1">HARDCAP</TYPE.Body>
          <TYPE.Header>1500 xETH</TYPE.Header>
        </StyledCard>
      </CardGrid>
    </>
  );
};
