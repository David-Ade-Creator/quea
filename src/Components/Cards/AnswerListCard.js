import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Card, Divider } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
//import PostComments from "../Like/Comments/PostComments";
import Postlike from "../Like/Comments/Postlike";

export default function AnswersListCard({ answers, user, answerLike, answerUnlike }) {
  return (
    <div>
      {answers.reverse().map((answer) => {
        return (
          <Card style={{ width: "100%", marginTop: "6px" }} key={answer._id}>
            <Link to={`/profile/${answer.writer._id}`}>
              <Meta avatar={<Avatar />} title={answer.writer.firstname + " " + answer.writer.lastname} />
            </Link>
            <br />
            <Link to={`/answers/${answer.questionId._id}`}>
              <h3>{answer.questionId.question}</h3>
            </Link>
            <p>
              Answered{" "}
              <span>
                <Moment fromNow>{answer.createdAt}</Moment>
              </span>
            </p>
            <div style={{ marginTop: "10px" }}>
              <div dangerouslySetInnerHTML={{ __html: answer.answer }} />
            </div>
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Postlike answer={answer} user={user} answerLike={answerLike} answerUnlike={answerUnlike}/>
              {/* <PostComments answer={answer} user={user}/> */}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
