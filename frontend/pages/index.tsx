import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FC, useState } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import styles from "../styles/Faq.module.css";
import { redirect } from "next/dist/server/api-utils";

interface FaqItemProps {
  title: string;
  body: string;
}

const ToggleButtonPlus = styled(AiOutlinePlusCircle)`
  float: right;
`;

const ToggleButtonMinus = styled(AiOutlineMinusCircle)`
  float: right;
`;

const ExpandableContainer = styled.div`
  font-size: 26px;
  line-height: 28px;
  font-weight: 700;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-right: 50px;
  border-bottom: solid;
  -o-transition: 0.2s;
  -ms-transition: 0.2s;
  -moz-transition: 0.2s;
  -webkit-transition: 0.2s;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  width: 100%;
  border-width: 2px;
  border-color: #ebebeb;
  color: #595959;
  &:hover {
    color: #6ecbb8;
  }
  width: 80%;
`;

const ExpandableBody = styled.div`
  font-weight: 300;
  font-size: 20px;
  margin-top: 30px;
  color: #595959;
`;

const FaqItem: FC<FaqItemProps> = ({ title, body }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <ExpandableContainer
        onClick={toggleExpand}
        className={styles.fag_item_title}
      >
        {title}
        {isExpanded ? <ToggleButtonMinus /> : <ToggleButtonPlus />}
        {isExpanded && <ExpandableBody>{body}</ExpandableBody>}
      </ExpandableContainer>
    </>
  );
};

interface FaqListProps {}

const FaqList: FC<FaqListProps> = ({}) => {
  return (
    <>
      <FaqItem title="hello" body="world" />
      <FaqItem title="hello" body="world" />
      <FaqItem title="hello" body="world" />
      <FaqItem title="hello" body="world" />
    </>
  );
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        <FaqList />
      </main>
    </div>
  );
};

export default Home;