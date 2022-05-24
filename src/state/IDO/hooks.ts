import { ChainId, CurrencyAmount } from '@mutantswap/sdk'

import { useCallback } from 'react'
import { useTransactionAdder } from '../transactions/hooks'
import { useActiveWeb3React } from '../../hooks'
import { useContract } from '../stake/hooks-sushi'
import { Contract } from '@ethersproject/contracts'
import { abi as MCOIN_IDO_ABI } from '../../constants/abis/mcoin-ido.json'
import { IDO_ADDRESS, MCOIN, fUSDC } from '../../constants'
import { useTokenBalance } from '../wallet/hooks'

export function useIDO() {
  const addTransaction = useTransactionAdder()
  const idoContract = useIDOContract()

  const purchase = useCallback(
    async (amount: CurrencyAmount | undefined) => {
      if (amount?.raw) {
        const tx = await idoContract?.purchase(amount?.raw.toString())
        return addTransaction(tx, { summary: 'Purchased MCOIN' })
      }
    },
    [addTransaction, idoContract]
  )

  return { purchase }
}

export function useIDOContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && IDO_ADDRESS[chainId], MCOIN_IDO_ABI, withSignerIfPossible)
}

export function useIDOStats() {
  const chainId = ChainId.AURORA
  const totalUSDC = useTokenBalance(IDO_ADDRESS[chainId], fUSDC[chainId])
  const totalMCOIN = useTokenBalance(IDO_ADDRESS[chainId], MCOIN[chainId])

  return {
    totalMCOIN: totalMCOIN,
    totalUSDC: totalUSDC,
  }
}
