import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import UserInfoCard from "./components/user_info_card";
import UserHistory from "./components/user_history";

const User_page = ({contracts, reloadKey}) => {
    const {address} = useParams("address");
    const [requestPosts, setRequestPosts] = useState(0);
    const [factcheckPosts, setFactcheckPosts] = useState(0);
    const [votePosts, setVotePosts] = useState(0);

    const [factcheck_ids, setFactcheck_ids] = useState([]);
    const [request_ids, setRequest_ids] = useState([]);
    const [vote_ids, setVote_ids] = useState([]);
    let selfIntroduction = "This is a template for a simple marketing or informational website. It includes a large callout called the hero unit and three supporting pieces of content. Use it as a starting point to create something more unique.";

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        console.log("User_page");
        async function getContract() {
            //setTransactions(await contracts.getTransactions());
            console.log(address);
            let res = await contracts.getUserprofile(address);

            setRequestPosts(res.request_ids.length);
            setFactcheckPosts(res.factcheck_ids.length);
            setVotePosts(res.vote_ids.length);

            setFactcheck_ids(res.factcheck_ids);
            setRequest_ids(res.request_ids);
            setVote_ids(res.vote_ids);

            console.log(res);
        }
        getContract();
    }, [address, reloadKey]);

    return (
        <Container fluid>
            <Row>
                <Col xs={4}>
                    <UserInfoCard address={address} requestPosts={request_ids.length} factcheckPosts={factcheck_ids.length} votePosts={vote_ids.length} selfIntroduction={selfIntroduction} transactions={transactions} />
                </Col>
                <Col xs={8}>
                    <UserHistory address={address} contracts={contracts} request_ids={request_ids} setRequest_ids={setRequest_ids} factcheck_ids={factcheck_ids} setFactcheck_ids={setFactcheck_ids} vote_ids={vote_ids} setVote_ids={setVote_ids} />
                </Col>
            </Row>
        </Container>
    );
};

export default User_page;
