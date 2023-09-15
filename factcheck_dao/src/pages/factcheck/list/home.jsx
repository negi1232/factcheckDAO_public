import {React, useState, useEffect} from "react";
// import generateFactCheckData from "./dummy";
import {Link} from "react-router-dom";
import {Form} from "react-bootstrap";
import "./home.css";
function RequestFactcheck_list({contracts, reloadKey}) {
    const [request_fc_list, setRequestFc_list] = useState([]);
    useEffect(() => {
        async function getContract() {
            //state=>0 全て
            //state=>1 deadlineを超えているか
            //state=>2 deadlineを超えていないかつ、評価を受け付けているか
            //state=>3 評価済み
            setRequestFc_list(await contracts.getRequestFactcheck_list(1, 0, 0));
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
            <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>ファクトチェックの状態</Form.Label>
                    <Form.Control as="select">
                        <option>全て</option>
                        <option>締切を超えている</option>
                        <option>締切を超えていない</option>
                        <option>評価を受け付けている</option>
                        <option>評価済み</option>
                    </Form.Control>
                    <Form.Label>ファクトチェックのカテゴリ</Form.Label>
                    <Form.Control as="select">
                        <option>全て</option>
                        <option>政治</option>
                        <option>経済</option>
                        <option>社会</option>
                        <option>科学</option>
                        <option>その他</option>
                    </Form.Control>
                    <Form.Label>表示順</Form.Label>
                    <Form.Control as="select">
                        <option>昇順</option>
                        <option>降順</option>
                    </Form.Control>
                </Form.Group>
            </Form>

            {request_fc_list.map((request_fc, index) => (
                <Link className="card" key={index} to={"/factcheck/browse/" + request_fc.args.requestId} style={{textDecoration: "none"}}>
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

export default RequestFactcheck_list;
