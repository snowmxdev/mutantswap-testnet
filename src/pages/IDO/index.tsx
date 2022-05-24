import { ChainId, CurrencyAmount, JSBI } from '@mutantswap/sdk'
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { DarkGreyCard, LightCard } from '../../components/Card'
import { AutoColumn } from '../../components/Column'
import Row, { RowBetween } from '../../components/Row'
import { MCOIN, fUSDC, IDO_ADDRESS, BIG_INT_ZERO } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import { tryParseAmount } from '../../state/swap/hooks'
import { TYPE } from '../../theme'
import { ClickableText } from '../Pool/styleds'
import { useTokenBalance } from '../../state/wallet/hooks'
import { CardSection, HighlightCard } from '../../components/earn/styled'
import StakeInputPanel from '../../components/StakeMCOIN/StakeInputPanel'
import CurrencyLogo from '../../components/CurrencyLogo'
import { useIDO, useIDOStats } from '../../state/IDO/hooks'
import StakeMCOINDataCard from '../../components/StakeMCOIN/StakeMCOINDataCard'
import { ButtonConfirmed, ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button'
import { useWalletModalToggle } from '../../state/application/hooks'
import { Dots } from '../../components/swap/styleds'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { PageWrapper } from '../../components/Page'

const DataRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   flex-direction: column;
   margin: 15px;
 `};
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const LargeHeaderWhite = styled(TYPE.largeHeader)`
  color: white;
`

const INPUT_CHAR_LIMIT = 18

export default function IDOMCOIN() {
  const toggleWalletModal = useWalletModalToggle() // toggle wallet when disconnected

  const { chainId: _chainId, account } = useActiveWeb3React()
  const chainId = _chainId ? _chainId! : ChainId.AURORA

  const [input, _setInput] = useState<string>('')
  const [usingBalance, setUsingBalance] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const { purchase } = useIDO()

  const mcoinBalance = useTokenBalance(account ?? undefined, MCOIN[chainId])!
  const usdcBalance = useTokenBalance(account ?? undefined, fUSDC[chainId])!

  const balance = usdcBalance
  const parsedAmount = usingBalance ? balance : tryParseAmount(input, balance?.currency)

  const [approvalState, handleApproval] = useApproveCallback(parsedAmount, IDO_ADDRESS[chainId])

  function setInput(v: string) {
    // Allows user to paste in long balances
    const value = v.slice(0, INPUT_CHAR_LIMIT)

    setUsingBalance(false)
    _setInput(value)
  }

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(balance)
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmount?.equalTo(maxAmountInput))

  const handleClickMax = useCallback(() => {
    if (maxAmountInput) {
      setInput(maxAmountInput.toExact())
      setUsingBalance(true)
    }
  }, [maxAmountInput, setInput])

  function renderApproveButton() {
    return (
      <ButtonConfirmed
        mr="0.5rem"
        onClick={handleApproval}
        confirmed={approvalState === ApprovalState.APPROVED}
        disabled={approvalState !== ApprovalState.NOT_APPROVED}
      >
        {approvalState === ApprovalState.PENDING ? (
          <Dots>Approving</Dots>
        ) : approvalState === ApprovalState.APPROVED ? (
          'Approved'
        ) : (
          'Approve'
        )}
      </ButtonConfirmed>
    )
  }

  function renderPurchaseButton() {
    // If account balance is less than inputted amount
    const insufficientFunds = (balance?.equalTo(BIG_INT_ZERO) ?? false) || parsedAmount?.greaterThan(balance)
    if (insufficientFunds) {
      return (
        <ButtonError error={true} disabled={true}>
          Insufficient Balance
        </ButtonError>
      )
    }

    const isValid =
      (approvalState === ApprovalState.APPROVED) &&
      !pendingTx &&
      parsedAmount?.greaterThan(BIG_INT_ZERO) === true

    return (
      <ButtonPrimary disabled={!isValid} onClick={handlePurchase}>
        {'Purchase'}
      </ButtonPrimary>
    )
  }

  async function handlePurchase() {
    try {
      setPendingTx(true)

      await purchase(parsedAmount)

      setInput('')
    } catch (e) {
      console.error(`Error Purchasing: }: `, e)
    } finally {
      setPendingTx(false)
    }
  }

  const { totalMCOIN: totalMCOIN, totalUSDC: totalUSDC } = useIDOStats()
  const totalMCOINBalanceFormatted = totalMCOIN?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const totalUSDCBalanceFormatted = totalUSDC?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const totalAllocation = (1661538 + 1500000) * 0.03
  const totalAllocationFormatted = totalAllocation?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const raisedPercentage = Number(totalUSDC?.toFixed(0)) * 100 / totalAllocation

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <HighlightCard>
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <LargeHeaderWhite fontWeight={600}>Mutant Swap IDO</LargeHeaderWhite>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Each MCOIN is priced at 0.03 USDC. Participate in the IDO by 3 easy steps: 1) Approve the contract 2) Enter the amount of USDC you would like to
                  purchase MCOIN 3) Click the Purchase button to purchase.
                </TYPE.white>
              </RowBetween>{' '}
            </AutoColumn>
          </CardSection>
        </HighlightCard>
      </TopSection>

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ gap: '10px', margin: 0 }}>
          <StakeMCOINDataCard label="USDC Price for 1 MCOIN">
            <Row align="center" justifyContent="center">
              <CurrencyLogo currency={MCOIN[chainId]} size={'20px'} style={{ marginRight: '10px' }} />
              <TYPE.black fontWeight={400}>${0.03}</TYPE.black>
            </Row>
          </StakeMCOINDataCard>
          <StakeMCOINDataCard label="Raised">
            <Row align="center" justifyContent="center">
              <CurrencyLogo currency={fUSDC[chainId]} size={'20px'} style={{ marginRight: '10px' }} />
              <TYPE.black fontWeight={400}>${totalUSDCBalanceFormatted ?? 0} ({raisedPercentage.toFixed(2)}%)</TYPE.black>
            </Row>
          </StakeMCOINDataCard>
          <StakeMCOINDataCard label="Total Allocation">
            <Row align="center" justifyContent="center">
              <CurrencyLogo currency={fUSDC[chainId]} size={'20px'} style={{ marginRight: '10px' }} />
              <TYPE.black fontWeight={400}>${totalAllocationFormatted}</TYPE.black>
            </Row>
          </StakeMCOINDataCard>
        </DataRow>
      </AutoColumn>

      <AutoColumn style={{ width: '100%' }}>
        <DarkGreyCard>
          <AutoColumn gap="20px">
            <StakeInputPanel
              value={input!}
              onUserInput={setInput}
              showMaxButton={!atMaxAmountInput}
              currency={fUSDC[chainId]}
              id="purchase-currency-input"
              onMax={handleClickMax}
            />
          </AutoColumn>
          <div style={{ marginTop: '1rem' }}>
            {account == null ? (
              <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
            ) : (
              <RowBetween>
                {renderApproveButton()}
                {renderPurchaseButton()}
              </RowBetween>
            )}
          </div>
        </DarkGreyCard>
      </AutoColumn>
    </PageWrapper>
  )
}
