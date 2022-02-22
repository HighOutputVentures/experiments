/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers'

export const sign = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  const signer = provider.getSigner()
  const today = new Date()
  const timestamp = today.toISOString()
  const message = `Timestamp: ${timestamp}`
  const timestampBytes = ethers.utils.toUtf8Bytes(
    `\u0019Ethereum Signed Message:\n${message.length.toString()}${message}`,
    ethers.utils.UnicodeNormalizationForm.current
  )
  const timestampHash = ethers.utils.keccak256(timestampBytes)
  const signature = await signer.signMessage(timestampHash)
  return { timestamp, signature }
}
