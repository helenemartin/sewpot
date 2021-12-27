import Head from "next/head";
import Image from "next/image";

import { web3 } from "../lib/web3";

import { useState, useEffect } from "react";

import Account from "../components/Account";
import EthName from "../components/EthName";
import Answer from "../components/Answer";
import AnswerForm from "../components/AnswerForm";

export default function Home() {
  const [accounts, setAccounts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]);

  const connect = async function () {
    let a = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccounts(a);
  };

  useEffect(
    function () {
      if (accounts.length > 0) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    },
    [accounts]
  );

  useEffect(() => {
    window.ethereum.on("accountsChanged", setAccounts);

    window.ethereum.request({ method: "eth_accounts" }).then(setAccounts);

    fetch("/api/answers")
      .then((response) => response.json())
      .then((data) => {
        setAnswers(data.answers);
        setIsLoading(false);
      });
  }, []);

  let answersArea = <div className="loading">Loading the answers...</div>;

  if (!isLoading) {
    answersArea = answers.map(function (answer, index) {
      return (
        <Answer
          key={index}
          number={index + 1}
          answer={answer}
          accounts={accounts}
          isLoggedIn={isLoggedIn}
        />
      );
    });
  }

  return (
    <main>
      <header>
        <h1>The Sewage Corporation Unit</h1>

        <form>
          <input type="text" placeholder="Search" />
        </form>

        <Account
          accounts={accounts}
          isLoggedIn={isLoggedIn}
          connect={connect}
        />
      </header>

      <section className="question">
        <div className="main">
          <h3>Blog Post #1 </h3>
          <h2>The State of New Jersey</h2>
          <p>
            This is an amended version of the Burdastyle Lydia Pattern. Further
            explanations coming soon! Keep your eyes peeled...
          </p>

          <div className="slides">
            <Image key={1} src="/lydia1.jpg" alt="" width="600" height="800" />
            <Image key={2} src="/image-2.jpg" alt="" width="600" height="800" />
            <Image key={3} src="/image-3.jpg" alt="" width="600" height="800" />
            <Image key={4} src="/image-4.jpg" alt="" width="600" height="800" />
          </div>
        </div>
        <div className="meta">
          <div className="eth-name">
            {/* <img
              src="https://ipfs.io/ipfs/QmbctVN8tPaDLiLysVDwThf7JTJhMejbSypZ4a3v5H2G3a"
              alt="Avatar of riklomas.eth"
            /> */}
            <div className="name">
              <span className="primary">helenemartin.eth</span>
              <span className="secondary">0xc1c85e...ffbf</span>
            </div>
          </div>
        </div>
      </section>

      <section className="answers">
        {answersArea}
        <AnswerForm
          accounts={accounts}
          setAnswers={setAnswers}
          isLoggedIn={isLoggedIn}
        />
      </section>

      <Head>
        <title>Sewing Incorporated – Blog Posts </title>
        <meta
          property="og:title"
          content="Looking for feedback as a beginner on Potstop"
        />
        <meta
          property="og:description"
          content="This is a project on the SuperHi Crypto + Web3 for Creatives course"
        />
        <meta property="og:image" content="/social.png" />
      </Head>
    </main>
  );
}
