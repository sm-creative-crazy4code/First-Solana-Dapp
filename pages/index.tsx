import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as web3 from '@solana/web3.js'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const[isExecutable,setIsExecutable] =useState(false)

  const addressSubmittedHandler = async(address: string) => {
    try {
    setAddress(address)
    const key= new web3.PublicKey(address);
    const connection= new web3.Connection(web3.clusterApiUrl('devnet'));
    const balance = await connection.getBalance(key);
    const info = await connection.getAccountInfo(key);
    if(info!==null){
      console.log(info.executable);
      setIsExecutable(info.executable)
    }

    
    setBalance(balance/web3.LAMPORTS_PER_SOL);
      
    } catch (error) {
      setAddress("0x");
      setBalance(0);
      alert(error);
      
    }
    
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          My first Solana Interaction
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>Is Account Executable</p>
        {isExecutable ? `YES`:`NO`}
      </header>
    </div>
  )
}

export default Home
