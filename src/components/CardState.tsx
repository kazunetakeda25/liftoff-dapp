import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { utils } from 'ethers';

import Card from './Card';
import Countdown from './Countdown';

import { useProjectConfig } from 'contexts/useProjectConfig';
import { TokenSale, ProjectKey } from 'utils/types';

import { TYPE, StatusBadge, ExternalLink } from '../theme';

const StyledCard = styled(Card)({
  padding: '1rem 3rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column'
});

const StyledLogo = styled.div({
  alignSelf: 'center',
  paddingBottom: 16
});

const CountdownContainer = styled.div({
  margin: '30px 0'
});

const Badge = styled(StatusBadge)({
  marginTop: 11
});

const CapInfo = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: '20px 0'
});

const StyledLink = styled(ExternalLink)({
  paddingBottom: '1rem'
});

const DefaultLogo = () => (
  <svg
    width="104"
    height="104"
    viewBox="0 0 104 104"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="52" cy="52" r="52" fill="#D8D8D8" />
    <path
      d="M36.3926 40.918C36.3926 41.9297 36.0462 42.709 35.3535 43.2559C34.6654 43.7982 33.6787 44.0693 32.3936 44.0693H31.2178V48H30.0557V38.0059H32.6465C35.1439 38.0059 36.3926 38.9766 36.3926 40.918ZM31.2178 43.0713H32.2637C33.2936 43.0713 34.0387 42.9049 34.499 42.5723C34.9593 42.2396 35.1895 41.7064 35.1895 40.9727C35.1895 40.3118 34.973 39.8197 34.54 39.4961C34.1071 39.1725 33.4326 39.0107 32.5166 39.0107H31.2178V43.0713ZM41.7383 40.3711C42.071 40.3711 42.3695 40.3984 42.6338 40.4531L42.4766 41.5059C42.1667 41.4375 41.8932 41.4033 41.6562 41.4033C41.0501 41.4033 40.5306 41.6494 40.0977 42.1416C39.6693 42.6338 39.4551 43.2467 39.4551 43.9805V48H38.3203V40.5078H39.2568L39.3867 41.8955H39.4414C39.7194 41.4079 40.0544 41.0319 40.4463 40.7676C40.8382 40.5033 41.2689 40.3711 41.7383 40.3711ZM50.502 44.2471C50.502 45.4684 50.1943 46.4232 49.5791 47.1113C48.9639 47.7949 48.1139 48.1367 47.0293 48.1367C46.3594 48.1367 45.7646 47.9795 45.2451 47.665C44.7256 47.3506 44.3245 46.8994 44.042 46.3115C43.7594 45.7236 43.6182 45.0355 43.6182 44.2471C43.6182 43.0257 43.9235 42.0755 44.5342 41.3965C45.1449 40.7129 45.9925 40.3711 47.0771 40.3711C48.1253 40.3711 48.957 40.7197 49.5723 41.417C50.1921 42.1143 50.502 43.0576 50.502 44.2471ZM44.7939 44.2471C44.7939 45.2041 44.9854 45.9333 45.3682 46.4346C45.751 46.9359 46.3138 47.1865 47.0566 47.1865C47.7995 47.1865 48.3623 46.9382 48.7451 46.4414C49.1325 45.9401 49.3262 45.2087 49.3262 44.2471C49.3262 43.2946 49.1325 42.5723 48.7451 42.0801C48.3623 41.5833 47.7949 41.335 47.043 41.335C46.3001 41.335 45.7396 41.5788 45.3613 42.0664C44.9831 42.554 44.7939 43.2809 44.7939 44.2471ZM51.5889 51.3633C51.1559 51.3633 50.805 51.3063 50.5361 51.1924V50.2695C50.8506 50.3607 51.1605 50.4062 51.4658 50.4062C51.8213 50.4062 52.0811 50.3083 52.2451 50.1123C52.4137 49.9209 52.498 49.627 52.498 49.2305V40.5078H53.6328V49.1484C53.6328 50.625 52.9515 51.3633 51.5889 51.3633ZM52.4023 38.4775C52.4023 38.2178 52.4661 38.0286 52.5938 37.9102C52.7214 37.7871 52.8809 37.7256 53.0723 37.7256C53.2546 37.7256 53.4118 37.7871 53.5439 37.9102C53.6761 38.0332 53.7422 38.2223 53.7422 38.4775C53.7422 38.7327 53.6761 38.9242 53.5439 39.0518C53.4118 39.1748 53.2546 39.2363 53.0723 39.2363C52.8809 39.2363 52.7214 39.1748 52.5938 39.0518C52.4661 38.9242 52.4023 38.7327 52.4023 38.4775ZM59.2041 48.1367C58.0967 48.1367 57.2217 47.7995 56.5791 47.125C55.9411 46.4505 55.6221 45.514 55.6221 44.3154C55.6221 43.1077 55.9183 42.1484 56.5107 41.4375C57.1077 40.7266 57.9076 40.3711 58.9102 40.3711C59.849 40.3711 60.5918 40.681 61.1387 41.3008C61.6855 41.916 61.959 42.7295 61.959 43.7412V44.459H56.7979C56.8206 45.3385 57.0417 46.0062 57.4609 46.4619C57.8848 46.9176 58.4795 47.1455 59.2451 47.1455C60.0518 47.1455 60.8493 46.9769 61.6377 46.6396V47.6514C61.2367 47.8245 60.8561 47.9476 60.4961 48.0205C60.1406 48.098 59.71 48.1367 59.2041 48.1367ZM58.8965 41.3213C58.2949 41.3213 57.8141 41.5173 57.4541 41.9092C57.0986 42.3011 56.889 42.8434 56.8252 43.5361H60.7422C60.7422 42.8206 60.5827 42.2738 60.2637 41.8955C59.9447 41.5127 59.4889 41.3213 58.8965 41.3213ZM66.8945 48.1367C65.8099 48.1367 64.9691 47.804 64.3721 47.1387C63.7796 46.4688 63.4834 45.5231 63.4834 44.3018C63.4834 43.0485 63.7842 42.0801 64.3857 41.3965C64.9919 40.7129 65.8532 40.3711 66.9697 40.3711C67.3298 40.3711 67.6898 40.4098 68.0498 40.4873C68.4098 40.5648 68.6924 40.6559 68.8975 40.7607L68.5488 41.7246C68.2982 41.6243 68.0247 41.5423 67.7285 41.4785C67.4323 41.4102 67.1702 41.376 66.9424 41.376C65.4202 41.376 64.6592 42.3467 64.6592 44.2881C64.6592 45.2087 64.8438 45.915 65.2129 46.4072C65.5866 46.8994 66.138 47.1455 66.8672 47.1455C67.4915 47.1455 68.1318 47.0111 68.7881 46.7422V47.7471C68.2868 48.0068 67.6556 48.1367 66.8945 48.1367ZM72.9922 47.2002C73.1927 47.2002 73.3864 47.1865 73.5732 47.1592C73.7601 47.1273 73.9082 47.0954 74.0176 47.0635V47.9316C73.8945 47.9909 73.7122 48.0387 73.4707 48.0752C73.2337 48.1162 73.0195 48.1367 72.8281 48.1367C71.3789 48.1367 70.6543 47.3734 70.6543 45.8467V41.3896H69.5811V40.8428L70.6543 40.3711L71.1328 38.7715H71.7891V40.5078H73.9629V41.3896H71.7891V45.7988C71.7891 46.25 71.8962 46.5964 72.1104 46.8379C72.3245 47.0794 72.6185 47.2002 72.9922 47.2002ZM36.9395 67V57.0059H38.1016V65.9473H42.5107V67H36.9395ZM50.5088 63.2471C50.5088 64.4684 50.2012 65.4232 49.5859 66.1113C48.9707 66.7949 48.1208 67.1367 47.0361 67.1367C46.3662 67.1367 45.7715 66.9795 45.252 66.665C44.7324 66.3506 44.3314 65.8994 44.0488 65.3115C43.7663 64.7236 43.625 64.0355 43.625 63.2471C43.625 62.0257 43.9303 61.0755 44.541 60.3965C45.1517 59.7129 45.9993 59.3711 47.084 59.3711C48.1322 59.3711 48.9639 59.7197 49.5791 60.417C50.1989 61.1143 50.5088 62.0576 50.5088 63.2471ZM44.8008 63.2471C44.8008 64.2041 44.9922 64.9333 45.375 65.4346C45.7578 65.9359 46.3206 66.1865 47.0635 66.1865C47.8063 66.1865 48.3691 65.9382 48.752 65.4414C49.1393 64.9401 49.333 64.2087 49.333 63.2471C49.333 62.2946 49.1393 61.5723 48.752 61.0801C48.3691 60.5833 47.8018 60.335 47.0498 60.335C46.307 60.335 45.7464 60.5788 45.3682 61.0664C44.9899 61.554 44.8008 62.2809 44.8008 63.2471ZM58.6367 59.5078V60.2256L57.249 60.3896C57.3766 60.5492 57.4906 60.7588 57.5908 61.0186C57.6911 61.2738 57.7412 61.5632 57.7412 61.8867C57.7412 62.6204 57.4906 63.2061 56.9893 63.6436C56.488 64.0811 55.7998 64.2998 54.9248 64.2998C54.7015 64.2998 54.4919 64.2816 54.2959 64.2451C53.8128 64.5003 53.5713 64.8216 53.5713 65.209C53.5713 65.4141 53.6556 65.5667 53.8242 65.667C53.9928 65.7627 54.2822 65.8105 54.6924 65.8105H56.0186C56.8298 65.8105 57.4518 65.9814 57.8848 66.3232C58.3223 66.665 58.541 67.1618 58.541 67.8135C58.541 68.6429 58.2083 69.2741 57.543 69.707C56.8776 70.1445 55.9069 70.3633 54.6309 70.3633C53.651 70.3633 52.8945 70.181 52.3613 69.8164C51.8327 69.4518 51.5684 68.9368 51.5684 68.2715C51.5684 67.8158 51.7142 67.4215 52.0059 67.0889C52.2975 66.7562 52.7077 66.5306 53.2363 66.4121C53.0449 66.3255 52.8831 66.1911 52.751 66.0088C52.6234 65.8265 52.5596 65.6146 52.5596 65.373C52.5596 65.0996 52.6325 64.8604 52.7783 64.6553C52.9242 64.4502 53.1543 64.252 53.4688 64.0605C53.0814 63.901 52.7646 63.6299 52.5186 63.2471C52.277 62.8643 52.1562 62.4268 52.1562 61.9346C52.1562 61.1143 52.4023 60.4831 52.8945 60.041C53.3867 59.5944 54.084 59.3711 54.9863 59.3711C55.3783 59.3711 55.7314 59.4167 56.0459 59.5078H58.6367ZM52.6621 68.2578C52.6621 68.6634 52.833 68.971 53.1748 69.1807C53.5166 69.3903 54.0065 69.4951 54.6445 69.4951C55.597 69.4951 56.3011 69.3516 56.7568 69.0645C57.2171 68.7819 57.4473 68.3968 57.4473 67.9092C57.4473 67.5036 57.3219 67.221 57.0713 67.0615C56.8206 66.9066 56.349 66.8291 55.6562 66.8291H54.2959C53.7809 66.8291 53.3799 66.9521 53.0928 67.1982C52.8057 67.4443 52.6621 67.7975 52.6621 68.2578ZM53.2773 61.9072C53.2773 62.4313 53.4255 62.8278 53.7217 63.0967C54.0179 63.3656 54.4303 63.5 54.959 63.5C56.0664 63.5 56.6201 62.9622 56.6201 61.8867C56.6201 60.7611 56.0596 60.1982 54.9385 60.1982C54.4053 60.1982 53.9951 60.3418 53.708 60.6289C53.4209 60.916 53.2773 61.3421 53.2773 61.9072ZM66.6416 63.2471C66.6416 64.4684 66.334 65.4232 65.7188 66.1113C65.1035 66.7949 64.2536 67.1367 63.1689 67.1367C62.499 67.1367 61.9043 66.9795 61.3848 66.665C60.8652 66.3506 60.4642 65.8994 60.1816 65.3115C59.8991 64.7236 59.7578 64.0355 59.7578 63.2471C59.7578 62.0257 60.0632 61.0755 60.6738 60.3965C61.2845 59.7129 62.1322 59.3711 63.2168 59.3711C64.265 59.3711 65.0967 59.7197 65.7119 60.417C66.3317 61.1143 66.6416 62.0576 66.6416 63.2471ZM60.9336 63.2471C60.9336 64.2041 61.125 64.9333 61.5078 65.4346C61.8906 65.9359 62.4535 66.1865 63.1963 66.1865C63.9391 66.1865 64.502 65.9382 64.8848 65.4414C65.2721 64.9401 65.4658 64.2087 65.4658 63.2471C65.4658 62.2946 65.2721 61.5723 64.8848 61.0801C64.502 60.5833 63.9346 60.335 63.1826 60.335C62.4398 60.335 61.8792 60.5788 61.501 61.0664C61.1227 61.554 60.9336 62.2809 60.9336 63.2471Z"
      fill="white"
    />
  </svg>
);

const Logo = styled.img`
  width: 104px;
  height: 104px;
  object-fit: cover;
`;

interface ICardStateProps {
  type: ProjectKey;
  project: TokenSale;
}

const CardState: React.FC<ICardStateProps> = ({ type, project }) => {
  const badges = {
    inactive: {
      color: 'blue1',
      title: 'COMING SOON'
    },
    active: {
      color: 'red4',
      title: 'ACTIVE NOW'
    },
    completed: {
      color: 'grey',
      title: 'COMPLETED'
    }
  };

  const { projectConf } = useProjectConfig(project.ipfsHash);

  return (
    <StyledCard>
      <StyledLogo>
        <Link to={`/project/${project.id}`}>
          {projectConf ? (
            <Logo src={projectConf.logo} alt="project logo" />
          ) : (
            <DefaultLogo />
          )}
        </Link>
      </StyledLogo>
      <TYPE.LargeHeader textAlign="center">
        {projectConf ? projectConf.projectName : 'Project Name'}
      </TYPE.LargeHeader>
      <Badge color="red1">{badges[type].title}</Badge>
      <CountdownContainer>
        <Countdown
          date={
            type === 'completed'
              ? 0
              : type === 'active'
              ? project.endTime
              : project.startTime
          }
        />
      </CountdownContainer>
      <CapInfo>
        <TYPE.Header>Soft Cap:</TYPE.Header>
        <TYPE.Header>{utils.formatEther(project.softCap)} xETH</TYPE.Header>
      </CapInfo>
      <CapInfo>
        <TYPE.Header>Hard Cap:</TYPE.Header>
        <TYPE.Header>{utils.formatEther(project.hardCap)} xETH</TYPE.Header>
      </CapInfo>
      <StyledLink href="website.com">
        {projectConf ? projectConf.websiteLink : ''}
      </StyledLink>
    </StyledCard>
  );
};

export default CardState;
