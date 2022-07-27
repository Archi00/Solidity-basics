import type { NextPage } from "next"
import Head from "next/head"
import ManualHeader from "../components/ManualHeader"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart Contract Raffle</title>
                <meta name="description" content="Smart contract lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ManualHeader />
        </div>
    )
}

export default Home
