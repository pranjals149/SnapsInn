import { Avatar } from '@material-ui/core'
import React from 'react'

import './Chats.css'

import SearchIcon from '@material-ui/icons/Search'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useState } from 'react'
import { useEffect } from 'react'
import { auth, db } from '../../firebase'
import Chat from '../Chat/Chat'
import { selectUser } from '../../features/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetCameraImage } from '../../features/cameraSlice'

const Chats = () => {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        db
            .collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => setPosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))))
    }, [])

    const takeSnap = () => {
        dispatch(resetCameraImage());
        history.push('/');
    }

    return (
        <div className='chats'>

            {/* Header */}
            <div className="chats__header">
                <Avatar src={user.profilePic} onClick={() => auth.signOut()} className='chats__avatar' />
                <div className="chats__search">
                    <SearchIcon className='chats__searchIcon' />
                    <input placeholder='Friends' type="text" />
                </div>
                <ChatBubbleIcon className='chats__chatIcon' />
            </div>

            {/* Posts */}
            <div className="chats__posts">
                {posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => (
                    <Chat
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                        profilePic={profilePic}
                    />
                ))}
            </div>

            <RadioButtonUncheckedIcon
                className='chats__takePicIcon'
                onClick={takeSnap}
                fontSize='large'
            />

        </div>
    )
}

export default Chats
