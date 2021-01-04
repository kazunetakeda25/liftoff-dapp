import React from 'react';
import styled from 'styled-components';
import { StyledRocketCard, TYPE } from '../theme';
import Card from './Card';
import { ProgressBar } from './ProgressBar';

const CardGrid = styled.div({
  display: 'grid',
  gridGap: 10,
  gridTemplateColumns: 'repeat(3, 1fr)'
});

const StyledCard = styled(Card)({
  border: '2px solid #CFD6E2',
  marginTop: 10
});

const ProgressStatus = styled.div({
  padding: '1rem 0'
});

type Props = {
  project: any;
};

const TokenDetails = ({ project }: Props) => {
  return (
    <StyledRocketCard>
      <TYPE.LargeHeader>Token Details</TYPE.LargeHeader>
      <ProgressStatus>
        <ProgressBar completed={20} />
      </ProgressStatus>
      <CardGrid>
        <StyledCard>
          <TYPE.Body color="blue1">SOFTCAP</TYPE.Body>
          <TYPE.Header>{project.softCap} xETH</TYPE.Header>
        </StyledCard>
        <StyledCard>
          <TYPE.Body color="blue1">TOTAL IGNITED</TYPE.Body>
          <TYPE.Header>0 xETH</TYPE.Header>
        </StyledCard>
        <StyledCard>
          <TYPE.Body color="blue1">HARDCAP</TYPE.Body>
          <TYPE.Header>{project.hardCap} xETH</TYPE.Header>
        </StyledCard>
      </CardGrid>
    </StyledRocketCard>
  );
};

export default TokenDetails;
