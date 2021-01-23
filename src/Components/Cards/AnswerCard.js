import { Card } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom';
//import Postlike from "../Like/Comments/Postlike";

export default function AnswersCard({answers, user, answerLike, answerUnlike}) {
    return (
        <div>
            {
                answers.reverse().map((answer)=>{
                    return <Card style={{ width: "100%" }} key={answer._id}>
                    <Link to={`/profile/${answer.writer._id}`} ><Meta avatar={<Avatar />} title={answer.writer.firstname + " " + answer.writer.lastname} /></Link>
                    <p>Answered <span><Moment fromNow>{answer.createdAt}</Moment></span></p>
                    <div style={{ marginTop: "10px" }}>
                    <div dangerouslySetInnerHTML={{ __html: answer.answer }}/>
                    </div>
                    {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Postlike answer={answer} user={user} answerLike={answerLike} answerUnlike={answerUnlike}/>
              <PostComments answer={answer} user={user}/>
            </div> */}
                  </Card>
                })
            }
  </div>
    )
}
