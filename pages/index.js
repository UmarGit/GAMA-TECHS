import Head from 'next/head'
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'

const words = ["Gama Techs", "Coming Soon..", "Get Ready ! for", "Gama Techs, In 2021"];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  // typeWriter
  useEffect(() => {
    if (index === words.length) return;

    if (subIndex === words[index].length + 1 &&
      index !== words.length - 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }

    const timeout = setInterval(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, 
    
    Math.max(reverse ? 75 : subIndex === words[index].length ? 1500 : 150, parseInt(Math.random() * 350)));

    return () => clearInterval(timeout);
  }, [subIndex, index, reverse]);


  // blinker
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 1000);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto w-auto">
        <div className="text-6xl font-extrabold text-white p-4 text-center animate-pulse">
          {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
        </div>
      </main>
    </div>
  )
}
