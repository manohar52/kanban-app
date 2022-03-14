import React from 'react';
import '../styles/Notification.css'
const Notification = ({message}) => {
    return (
        <div class='notif'>
            {message}
        </div>
    );
};

export default Notification;