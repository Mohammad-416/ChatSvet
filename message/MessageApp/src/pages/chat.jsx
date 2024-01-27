import React, { useEffect, useState } from 'react';
import Messages from '../components/Messages';
import {useParams} from 'react-router-dom'

function Chat() {
    let { slug } = useParams();
    return (
        <Messages slug={slug} />
    );
}

export default Chat;
