import { Card } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

export default function AnswersListCard({answers}) {
    return (
        <div>
            {
                answers.map((answer)=>{
                    return <Card style={{ width: "100%" }} key={answer._id}>
                    <Link to={`/profile/${answer.writer._id}`} ><Meta avatar={<Avatar />} title={answer.writer.firstname} /></Link>
                    <p>Answered <span><Moment fromNow>{answer.createdAt}</Moment></span></p>
                    <div style={{ marginTop: "10px" }}>
                    <div dangerouslySetInnerHTML={{ __html: answer.answer }}/>
                    </div>
                  </Card>
                })
            }
  </div>
    )
}
