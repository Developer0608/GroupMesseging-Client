import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { socket } from '../utils/websocket';

function Signin() {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  let history = useHistory();
  const onJoinedHandler = (e) => {  
    localStorage.setItem('email', name);
    localStorage.setItem('roomId', room);
  
    console.log(name, room);
    socket.emit('join-room', {email: name, roomId: room});
    return history.push('/chat');
  }

  function onNameChangeHandler(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function onRoomChangeHandler(e) {
    e.preventDefault();
    setRoom(e.target.value);
  }

  return <>
    <div className="login">

      <h1 className="login__title">CHAT ROOM</h1><br></br>
      <div className="login__group">
        <input className="login__group__input" id="name" type="name" value={name} onChange={onNameChangeHandler}/>
        <label className="login__group__label">Name </label>
      </div>

      <div className="login__group">
        <input className="login__group__input" id="room" value={room} type="text" onChange={onRoomChangeHandler}/>
        <label className="login__group__label">Room</label>
      </div>
      <button className="login__sign-in" type="button" disabled={name === "" || room === ""} onClick={onJoinedHandler}>JOIN ROOM</button>
    </div>
  </>;
}

export default Signin;