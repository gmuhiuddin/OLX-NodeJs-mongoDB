import React from 'react';
import './style.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { addUserMsg, getUsersMsg } from '../../Config/mongoDb';
import SmallLoader from '../../Component/SmallLoader';
import { useSelector } from 'react-redux';

const ChatsPage = () => {
  const { productId } = useParams();
  const [userData, setUserData] = useState();
  const [chats, setChats] = useState();
  const containerRef = useRef(null);
  const res = useSelector(res => res.userSlice.userInfo);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    setUserData(res);
  }, []);

  useEffect(() => {
    getMsgs();

    setTimeout(() => {
      scrollToBottom();
    }, 1000);
    
  }, [userData])

  const chatIdGenerator = () => {
    const { userId } = userData;

    let chatId = userId < productId ? userId + productId : productId + userId;

    return chatId;
  };

  const addMsgs = async (e) => {
    e.preventDefault();

    const chatId = await chatIdGenerator();

    addUserMsg({
      userMsg: e.target[0].value,
      userId: userData.userId,
      chatId,
    })

    e.target[0].value = '';
  };

  const getMsgs = async () => {

    const chatId = await chatIdGenerator();

    const chatsData = getUsersMsg(chatId);

    chatsData
    .then(data => {
      setChats(data);
    })
    .catch(err => {
      console.log(err);
      setChats(err)
    });

  };

  return (
    <div className='chat-container'>
      <div ref={containerRef} className='users-chats-container'>
        {!chats ? <SmallLoader /> : ''}
        {typeof chats == 'object' ?
          chats.map((element) => {
            
            return (
              <div className={element.data().userId == userData.userId ? 'userChat' : 'anotherUserChat'}>
                <span class="user-messsage">{element.data().userMsg}</span>
                <br />
                <span class="chat-time">{dayjs(element.data().time?.toDate()).format(
                "DD-MM-YYYY hh:mm"
            )}</span>
              </div>
            )
          })
          : chats
        }
      </div>
      <form onSubmit={addMsgs}>
        <input required placeholder='Type a message....' type='text' />
        <input id='sumit-btn' style={{ display: "none" }} type="submit" />
        <label for="sumit-btn">
          <i class="fa-solid fa-paper-plane"></i>
        </label>
      </form>
    </div>
  );
  
}

export default ChatsPage;