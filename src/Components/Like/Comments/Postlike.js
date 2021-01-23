import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import React from 'react';

function Postlike({answer, user, answerLike, answerUnlike}) {
    const [liked, setLiked] = React.useState(false);
    const answerId = answer._id;
    const wholiked = user._id;
    React.useEffect(()=>{
        if( user && answer.likes.find((like) => like._id === wholiked)){
            setLiked(true)
        } else {
            setLiked(false)
        }
    },[answer, liked, user, wholiked]);

    const like = () => {
        answerLike({answerId,wholiked});
    }

    const unLike = () => {
        answerUnlike({answerId,wholiked})
    }

    return (
        
        <span> {liked ? <HeartFilled onClick={unLike}/> : <HeartOutlined onClick={like} /> }{ answer.likes.length > 0 && " " + answer.likes.length} </span>
    )
}

export default Postlike
