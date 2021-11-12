import * as anchor from '@project-serum/anchor'
import { Token, TOKEN_PROGRAM_ID, u64 } from '@solana/spl-token'
import { Account } from '@solana/web3.js'
import { PublicKey } from '@solana/web3.js'
import assert from 'assert'
import Provider from './provider'
import { ACCOUNTS } from './accounts'
import { createToken, predefinedAccount, assertThrowsAsync } from './utils'
export const SEED = Buffer.from('NB:Airdrop')

describe('airdrop', () => {
  const provider = Provider.local()
  console.log(provider)
  anchor.setProvider(provider);
  //const provider = anchor.Provider.local()
  const program = anchor.workspace.Airdrop as anchor.Program
  const connection = program.provider.connection
  // @ts-expect-error
  const wallet: Account = provider.wallet.payer as Account
  let nonce: number
  let authority: PublicKey
  let programTokenAccount: PublicKey
  let token: Token
  const amountPerUser = new anchor.BN(1000000)
  const totalAmount = new u64(100000000000)
  before(async () => {
    const [_authority, _nonce] = await anchor.web3.PublicKey.findProgramAddress(
      [SEED],
      program.programId
    )
    nonce = _nonce
    authority = _authority
    console.log(authority.toBase58())
    // @ts-expect-error
    await program.state.rpc.new(nonce, amountPerUser, {
      accounts: {
        authority: authority
      }
    })
    token = await createToken({
      connection,
      payer: wallet,
      mintAuthority: wallet.publicKey,
      decimals: 1
    })
    programTokenAccount = await token.createAccount(authority)
    token.mintTo(programTokenAccount, wallet, [], totalAmount)
  })

  describe('#claim', () => {
    it('Claim with eligible account', async () => {
      console.log('claim')
    })
  })
})
