import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
function Post({username,caption,imageURL}) {
    return (
        <div class="post">
        <div className="post__header">
            <Avatar
                className="post__avatar"
                alt="Abhi"
                src="public\logo512.png"
            />
                <h6>{username}</h6>
        </div>
            {/* header -> avatar and name */}

            <img className="post__image" src={imageURL}  alt=""/>
            {/* image */}

            <h6 className="post__text"><strong>{username}:</strong> {caption}</h6>
            {/* username :- caption */}
            {/* comments */}
        </div>
    )
}

export default Post

