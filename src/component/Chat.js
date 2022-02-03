import { useEffect, useState } from "react";
import { socket } from "../utils/websocket";

function Chat(){
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState([]);
  const [receivedUser, setReceivedUser] = useState([]);

  useEffect(() => {
    const roomId = localStorage.getItem('roomId');
    const email = localStorage.getItem('email');

    socket.emit('join-room', {email: email, roomId: roomId});
    socket.emit('get-messages', {roomId: roomId, email: email});
    socket.emit('get-users', {roomId: roomId, email: email});

    socket.on('user-list', users => {
      console.log('Received User List::', users);
      setReceivedUser(users);
    });

    socket.on('message-list', messages => {
      console.log('Received Message List::', messages);
      setReceivedMessage(messages);
    });

  }, []);

  useEffect(() => {
      socket.on('new-message', (message) => {
        console.log('New Message::', message);
        setReceivedMessage([...receivedMessage, message])
        console.log('Message Received from Server : ', receivedMessage);
    });

    // return () => {
    //   socket.off("receiveMsg");
    // }
  }, [receivedMessage, setReceivedMessage]);

  useEffect(() => {
    socket.on('new-user', (users) => {
      setReceivedUser([...receivedUser, users])
      console.log('Users : ', receivedUser);
    });

  }, [receivedUser, setReceivedUser]);

  function OnMessageChangeHandler(e) {
    setMessage(e.target.value);
  }

  function onSendHandler(e) {
    e.preventDefault();
    setMessage('');
    socket.emit('message-send', {message, 
      roomId : localStorage.getItem('roomId'), email : localStorage.getItem('email')})
  }
  
  return <>
      <div className="navbar">  
          <div className="dropdown">
            <button className="dropbtn">Group Members</button>
            <div className="dropdown-content">
              {receivedUser.map((users, index) => (
                <p key={index}>{users.email}</p>
              ))}
            </div>
          </div> 
          <a className="active" href="#home">{localStorage.getItem('email')}</a>
      </div>

      <div className="container">
        {receivedMessage.map((message, index) => (
          message.email === localStorage.getItem("email") 
            ? <div key={index} className = "message right">{message.email} : {message.message}</div>
            : <div key={index} className = "message left">{message.email} : {message.message}</div>
        ))}
       
      </div>
      <div className="send">
          <form action="#" id="send-container">
            <input type="text" name="messageInp" id = "messageInp" value={message} onChange={OnMessageChangeHandler}></input>
            <button className = "btn" type="submit" disabled={message === ""} onClick={onSendHandler}>Send</button>
          </form>
        </div>
  </>
}

export default Chat;