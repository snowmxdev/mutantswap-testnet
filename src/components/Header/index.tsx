import React from 'react'
import { Text } from 'rebass'
import { NavLink } from 'react-router-dom'
import { darken, lighten } from 'polished'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'

import LogoMSDark from '../../assets/images/mutant-swap-logo.png'
import LogoMCDark from '../../assets/images/mutant-coin-logo.png'
import LogoMSTextDark from '../../assets/images/mutant-swap-logo-text.png'
import { useActiveWeb3React } from '../../hooks'
import { ButtonSecondary } from '../Button'

import { RedCard } from '../Card'
import Menu from '../Menu'
import BridgesMenu from '../BridgesMenu'

import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import useMCOINPrice from '../../hooks/useMCOINPrice'
import { useToggleMCOINPriceModal } from '../../state/application/hooks'
import MCOINPriceModal from '../MCOINPriceModal'

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem 1.5rem 1rem 1rem;
  z-index: 2;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const HeaderLinks = styled(Row)`
  justify-content: center;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem 0 1rem 1rem;
    justify-content: flex-end;
`};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 1rem 0;
    justify-content: center;
`};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
  /* :hover {
    background-color: ${({ theme, active }) => (!active ? theme.bg2 : theme.bg4)};
  } */
`

const MCOINButton = styled(ButtonSecondary)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  border: none;
  background-image: linear-gradient(to bottom, ${({ theme }) => theme.primary1}, ${({ theme }) => theme.primary4});
  &:hover,
  &:focus,
  &:active {
    border: none;
    box-shadow: none;
    background-image: linear-gradient(
      to bottom,
      ${({ theme }) => darken(0.12, theme.primary1)},
      ${({ theme }) => darken(0.12, theme.primary4)}
    );
  }
`

const MCOINWrapper = styled(AccountElement)`
  color: white;
  padding: 4px 0;
  height: 36px;
  font-weight: 500;
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const NetworkCard = styled(RedCard)`
  border-radius: 12px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const Title = styled(NavLink)`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const MCOINIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }

  ${({ theme }) => theme.mediaWidth.upToXxSmall`
    margin: 0 6px;
  `}
`

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

const StyledHomeNavLink = styled(StyledNavLink)`
  margin: 0 0 0 0.25rem;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display:none;
  `};
`

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right:0;
  `};
`

export default function Header() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  const { mcoinPriceFriendly: mcoinPriceFriendly } = useMCOINPrice()

  const toggleMCOINPriceModal = useToggleMCOINPriceModal()

  return (
    <HeaderFrame>
      <HeaderRow>
        <HomeContainer>
          <Title id={`home-link`} to={'/'}>
            <MCOINIcon>
              <img width={'24px'} src={LogoMSDark} alt="logo" />
            </MCOINIcon>
          </Title>
          <StyledHomeNavLink id={`home-link`} to={'/'}>
            <img height={'18px'} src={LogoMSTextDark} alt="logo-text" />
          </StyledHomeNavLink>
        </HomeContainer>
        <HeaderLinks>
          <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
            {t('header.swap')}
          </StyledNavLink>
          <StyledNavLink
            id={`pool-nav-link`}
            to={'/pool'}
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/add') ||
              pathname.startsWith('/remove') ||
              pathname.startsWith('/create') ||
              pathname.startsWith('/find')
            }
          >
            {t('header.pool')}
          </StyledNavLink>
          {/* <StyledNavLink id={`xmc-nav-link`} to={'/stake'} isActive={Boolean}>
            {t('header.stake')}
          </StyledNavLink> */}
          <StyledNavLink
            id={`png-nav-link`}
            to={'/farm/1'}
            isActive={(match, { pathname }) => Boolean(match) || pathname.startsWith('/png')}
          >
            {t('header.farm')}
          </StyledNavLink>
          <StyledNavLink id={`claim-nav-link`} to={'/claim'}>
            {t('header.claim')}
          </StyledNavLink>
          <StyledNavLink id={`ido-nav-link`} to={'/ido'} isActive={Boolean}>
            {t('header.ido')}
          </StyledNavLink>
          <BridgesMenu />
        </HeaderLinks>
      </HeaderRow>
      <HeaderControls>
        <HeaderElement>
          <MCOINWrapper active={true}>
            <MCOINButton
              onClick={e => {
                e.currentTarget.blur()
                toggleMCOINPriceModal()
              }}
            >
              <IconWrapper size={18}>
                <img src={LogoMCDark} />
              </IconWrapper>
              <Text style={{ flexShrink: 0 }} pl="0.75rem" fontWeight={500}>
                {mcoinPriceFriendly != null ? `$${mcoinPriceFriendly}` : '-'}
              </Text>
            </MCOINButton>
            <MCOINPriceModal />
          </MCOINWrapper>
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElementWrap>
          <Menu />
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  )
}
