import React from 'react';
import styled from 'styled-components';
import { Box, Image } from 'rebass';

interface IProps {
  imgSrc?: string;
  size: string;
}

const AvatarContainer = styled(Box)<{ size: string }>`
  border-radius: 50%;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: ${({ theme }) => theme.bg6};
`;

const Avatar = (props: IProps) => {
  return (
    <AvatarContainer size={props.size}>
      {!!props.imgSrc && <Image src={props.imgSrc} />}
    </AvatarContainer>
  );
};

export default Avatar;