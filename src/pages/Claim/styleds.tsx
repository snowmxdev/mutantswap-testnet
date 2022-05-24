import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
  `};
`
export const LeftContainer = styled.div`
  img {
    width: inherit;
    height: inherit;
  }
  ${({ theme }) => theme.mediaWidth.upToLarge`
        width: 220px;
        height: 210px;
        position: relative;
        top: -100px;
        left: -50px;
  `};
  ${({ theme }) => theme.mediaWidth.upToXLarge`
      width: 265px;
      height: 258px;
      position: relative;
      top: 440px;
      left: 170px
  `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
        width: 200px;
        height: 190px;
        position: relative;
        top: 500px;
        left: 0px;
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
        width: 160px;
        height: 150px;
        position: relative;
        top: 405px;
        left: 0px;
  `};
`
export const RightContainer = styled.div`
  img {
    width: inherit;
    height: inherit;
  }
  ${({ theme }) => theme.mediaWidth.upToLarge`
        width: 220px;
        height: 210px;
        position: relative;
        top: 0px;
        right: 0px;
  `};
  ${({ theme }) => theme.mediaWidth.upToXLarge`
        width: 280px;
        height: 270px;
        position: relative;
        top: 100px;
        right: 230px;
  `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
        width: 180px;
        height: 170px;
        position: relative;
        top: -915px;
        left: 65%;
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
        width: 140px;
        height: 130px;
        position: relative;
        top: -630px;
        left: 65%;
        z-index: -1;
  `};
`
export const BackImg = styled.div`
  img {
    width: inherit;
    height: inherit;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
      display: contents;
  `};
  ${({ theme }) => theme.mediaWidth.upToLarge`
        width: 1000px;
        position: relative;
        left:0px;
        z-index: -1;
  `};
  ${({ theme }) => theme.mediaWidth.upToXLarge`
        & > * {
            width: 1253px;
            height: 808px;
            position: relative;
            left:0px;
            z-index: -1;
        }
  `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
      width: 100%;
      position: relative;
      left:0px;
      z-index: -1;
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 450px;
    position: relative;
    left:0px;
    z-index: -1;
  `};
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: auto;
  ${({ theme }) => theme.mediaWidth.upToSmall`
      display: contents;
  `};
`
export const TitleSection = styled.div`
  position: relative;
  bottom: 580px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  margin: auto;
  h1 {
    font-weight: 500;
    font-size: 44px;
    line-height: 52px;
    margin-bottom: 20px;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    top: -330px;
    font-weight: 300;
    font-size: 16px;
    h1 {
        font-size: 25px;
    }
  `};
`
export const StatusAlert = styled.div`
  position: relative;
  bottom: 520px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 266.19%;
  margin: auto;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 12px;
    position: sticky;
  `};
`
export const ConnectWallet = styled.div`
  button {
    border: none;
    width: 165px;
    height: 38px;
    background: #ffffff;
    border-radius: 71px;
    cursor: pointer;
    color: black;
    margin: auto;
  }
  text-align: center;
`
export const ApproveButton = styled.button`
  width: 165px;
  height: 38px;
  background: linear-gradient(180deg, #287be1 0%, #4063e1 100%);
  border-radius: 40px;
  cursor: pointer;
  border: none;
`
export const ClaimButton = styled.button`
  width: 165px;
  height: 38px;
  background: linear-gradient(180deg, #dda74f 0%, #a76b09 100%);
  border-radius: 24px;
  cursor: pointer;
  border: none;
`
