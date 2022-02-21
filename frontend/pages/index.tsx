import type { NextPage } from "next";
import Head from "next/head";
import { FC, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styles from "../styles/Faq.module.css";
import axios from "axios";

// Auth token for backend content
const config = {
  headers: {
    Authorization: `Bearer b8f96dfdfc80936cd792a9a6d5680261229f84739a741d3d5897800b9b2111ccdc7a65c036910f2ad1e30c33239b1186ec3a8cc596d2c0e21e8ed906fdbcd5f589cd13aba6175bfde26da7fab67fdfd6b641ebacaa5db17592da4f18902f55e0b06507321d17a697dc1881d11728e9e05df433754dc61d1da7fb3aa05b62d4ee`,
  },
};

interface FaqItemData {
  Body: string;
  Title: string;
}

interface FaqItemProps {
  title: string;
  body: string;
}

// A single item on the FAQ list
const FaqItem: FC<FaqItemProps> = ({ title, body }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div onClick={toggleExpand} className={styles.expand_container}>
        {title}
        {isExpanded ? (
          <AiOutlineMinusCircle className={styles.toggle_button} />
        ) : (
          <AiOutlinePlusCircle className={styles.toggle_button} />
        )}
        {isExpanded && <div className={styles.expand_body}>{body}</div>}
      </div>
    </>
  );
};

interface FaqListProps {
  data: FaqItemData[];
}

// The main element for the FAQ list
const FaqList: FC<FaqListProps> = ({ data }) => {
  const faqItemsElements: JSX.Element[] = [];

  // Create all the elements from the FAQ data
  for (let i = 0; i < data.length; i++) {
    faqItemsElements.push(
      <FaqItem key={i} title={data[i].Title} body={data[i].Body} />
    );
  }
  console.log(data.length);
  return <>{faqItemsElements}</>;
};

const Home: NextPage = () => {
  const [faqItems, setFaqItems] = useState<FaqItemData[]>();

  // Get FAQ items from backend
  if (faqItems == null) {
    axios
      .get("http://localhost:1337/api/faq-items", config)
      .then(function (response) {
        // handle success
        setFaqItems(response.data["data"].map((x: any) => x.attributes));
      })
      .catch(function (error) {
        // handle error case
        console.log(error);
      });
    return <p>loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Faq Page</title>
        <meta name="description" content="Faq page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        <FaqList data={faqItems} />
      </main>
    </div>
  );
};

export default Home;
