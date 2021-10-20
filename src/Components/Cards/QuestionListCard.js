import { EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Meta from "antd/lib/card/Meta";
import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export default function QuestionListCard({ question }) {
  return (
    <Card style={{ width: "100%" }}>
      <Link to={`/profile/${question.whoasked._id}`}><Meta
        avatar={question.whoasked.info.photo ? <Avatar src={question.whoasked.info.photo}></Avatar>:<Avatar>{question.whoasked.firstname.substring(0, 1)}</Avatar>}
        title={question.whoasked.firstname + " " + question.whoasked.lastname}
      /></Link>
      <div style={{ marginTop: "10px" }}>
        <p>
          Posted{" "}
          <span>
            <Moment fromNow>{question.createdAt}</Moment>
          </span>
        </p>
        <h4>{question.question}</h4>
        <p>{question.link && <a href={question.link} rel="noreferrer" target="_blank">{question.link}</a> }</p>
      </div>
      <Link to={`answers/${question._id}`}>
        <Button type="ghost" icon={<EditOutlined />} style={{ float: "right" }}>
          Answer
        </Button>
      </Link>
    </Card>
  );
}
