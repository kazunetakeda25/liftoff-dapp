import React from 'react';
import { Flex } from 'rebass';
import styled from 'styled-components';
import { StyledRocketCard, TYPE, StatusBadge, ExternalLink } from '../theme';
import Avatar from './Avatar';
import Countdown from './Countdown';
import { ReactComponent as DiscordIcon } from '../assets/svgs/discord.svg';
import { ReactComponent as TelegramIcon } from '../assets/svgs/telegram.svg';
import { ReactComponent as TwitterIcon } from '../assets/svgs/twitter.svg';
import { ReactComponent as FacebookIcon } from '../assets/svgs/facebook.svg';

const StyledRocketDetailHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
`;
const StyledCountdown = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 1rem;
    flex-direction: column;
    justify-content: center;
  `}
  span {
    margin-right: 1rem;
  }
`;

const StyledRocketDetailBody = styled.div``;

const StyledDescription = styled.div`
  max-width: 600px;
`;

export const StyledTable = styled.table`
  padding: 2rem 0;
`;

const Detail = () => {
  return (
    <StyledRocketCard>
      <StyledRocketDetailHead>
        <Flex
          flexDirection={['column', 'row']}
          alignItems={['flex-start', 'center']}
        >
          <Flex alignItems="center" mr={['0', '1rem']} mb={['1rem', '0']}>
            <Avatar size="4.375rem" />
            <TYPE.Header ml="1.25rem">[Project Name]</TYPE.Header>
          </Flex>

          <StatusBadge>Coming Soon</StatusBadge>
        </Flex>

        <StyledCountdown>
          <span>Launch in:</span>
          <Countdown date={1609731780} />
        </StyledCountdown>
      </StyledRocketDetailHead>
      <StyledRocketDetailBody>
        <StyledTable cellSpacing={0} cellPadding={0}>
          <tbody>
            <tr>
              <td width="40%">
                <TYPE.Body>Ticker</TYPE.Body>
              </td>
              <td width="60%">
                <TYPE.Body>XYZ</TYPE.Body>
              </td>
            </tr>
            <tr>
              <td width="40%">
                <TYPE.Body>Total Supply</TYPE.Body>
              </td>
              <td width="60%">
                <TYPE.Body>10,000,000 XYZ</TYPE.Body>
              </td>
            </tr>
            <tr>
              <td width="40%">
                <TYPE.Body>Website</TYPE.Body>
              </td>
              <td width="60%">
                <ExternalLink href="website.com">www.website.com</ExternalLink>
              </td>
            </tr>
            <tr>
              <td width="40%">
                <TYPE.Body>dApp</TYPE.Body>
              </td>
              <td width="60%">
                <ExternalLink href="website.com/dapp">
                  www.website.com/dapp
                </ExternalLink>
              </td>
            </tr>
            <tr>
              <td width="40%">
                <TYPE.Body>Whitepaper</TYPE.Body>
              </td>
              <td width="60%">
                <ExternalLink href="website.com/dapp">
                  Click to view
                </ExternalLink>
              </td>
            </tr>
            <tr>
              <td width="40%">
                <TYPE.Body>Launch Date</TYPE.Body>
              </td>
              <td width="60%">
                <TYPE.Body>11/10/2020 9PM PST</TYPE.Body>
              </td>
            </tr>
            <tr>
              <td width="40%">
                <TYPE.Body>Social Media</TYPE.Body>
              </td>
              <td width="60%">
                <Flex
                  width="20%"
                  justifyContent="space-around"
                  flexDirection="row"
                >
                  <ExternalLink href="https://discord.gg">
                    <DiscordIcon />
                  </ExternalLink>
                  <ExternalLink href="https://t.me">
                    <TelegramIcon />
                  </ExternalLink>
                  <ExternalLink href="https://twitter.com">
                    <TwitterIcon />
                  </ExternalLink>
                  <ExternalLink href="https://facebook.com">
                    <FacebookIcon />
                  </ExternalLink>
                </Flex>
              </td>
            </tr>
          </tbody>
        </StyledTable>
        <StyledDescription>
          <TYPE.Body>
            Project description Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </TYPE.Body>
        </StyledDescription>
      </StyledRocketDetailBody>
    </StyledRocketCard>
  );
};

export default Detail;
