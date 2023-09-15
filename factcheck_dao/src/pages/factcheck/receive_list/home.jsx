import {React, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import generateFactCheckData from "./dummy";
import "./home.css";
function RequestFactcheck_list_receive({contracts, reloadKey}) {
    const [request_fc_list, setRequestFc_list] = useState([]);
    useEffect(() => {
        async function getContract() {
            setRequestFc_list(await contracts.getRequestFactcheck_list(0, 1, 0));
            // console.log(await contracts.getElection_setting());
        }
        getContract();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reloadKey]);

    function convertepochtime(epochtime) {
        let date = new Date(epochtime.toString() * 1000);
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月を取得し、2桁にパディング
        const day = date.getDate().toString().padStart(2, "0"); // 日を取得し、2桁にパディング
        const hours = date.getHours().toString().padStart(2, "0"); // 時を取得し、2桁にパディング
        const minutes = date.getMinutes().toString().padStart(2, "0"); // 分を取得し、2桁にパディング
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }
    return (
        <div>
            <h3>ファクトチェックのリクエスト</h3>
            {request_fc_list.length === 0 && <p>まだリクエストはありません</p>}

            {request_fc_list.map((request_fc, index) => (
                <Link className="card" key={index} to={process.env.PUBLIC_URL + "/factcheck/receive/" + request_fc.args.requestId} style={{textDecoration: "none"}}>
                    <div className="row">
                        <div className="col-3">
                            <div className="thumbnail">
                                <img src={request_fc.args.thumbnail_url} alt="サムネイル" className="thumbnail" />
                            </div>
                        </div>
                        <div className="col-9">
                            <h4 className="mb-0">{request_fc.args.title}</h4>
                            <p>{request_fc.args.description}</p>
                            <div className="row">
                                <div className="col-4">
                                    <p>依頼者：{request_fc.args.author.slice(0, 10)}</p>
                                </div>
                                <div className="col-4">
                                    <p>投稿日：{convertepochtime(request_fc.args.created_at)}</p>
                                </div>
                                <div className="col-4">
                                    <p>締切：{convertepochtime(request_fc.args.deadline)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default RequestFactcheck_list_receive;
