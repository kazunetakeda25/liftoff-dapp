import React from 'react'
import styled from 'styled-components';
import {Link} from 'react-router-dom'

import {Button} from './button'
import Logo from '../assets/logo.png'

interface Props {}

const StyledNavContainer = styled.nav`
    background-color: ${({theme}) => theme.bg1};
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 2rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-right: 2rem;
`

const StyledNav = styled.div`
    a {
        margin-right: 2rem;
        color: ${({theme}) => theme.white};
        text-decoration: none;
    }
`

const StyledLogo = styled.img`
    width: 2rem;
`


const StyledLink = styled(Link)``
const StyledButton = styled(Button)``

export const Header = (props: Props) => {
    return (
    <StyledNavContainer>
        <StyledLogo src={Logo} alt="LID protocol logo" />
        <StyledNav>
            <StyledLink to="/">Launchpad</StyledLink>
            <StyledLink to="/rockets">Rockets</StyledLink>
            <StyledButton>Connect wallet</StyledButton>
        </StyledNav>
    </StyledNavContainer>)
}