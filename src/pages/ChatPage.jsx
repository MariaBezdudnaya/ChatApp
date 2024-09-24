import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MessageForm } from "../components/MessageForm";
import { MessageList } from "../components/MessageList";
// import { UserCard } from "../components/UserCard";

export const ChatPage = () => { // Страница с чатом

  const navigation = useNavigate();
  const [active, setActive] = useState(true); // Сменена темы
  const [theme, setTheme] = useState('light'); // Сменена темы
  
  useEffect(() => { // Если пользователь существует, при перезагрузке страницы, вместо авторизации остаётся на ней
    const user = localStorage.getItem('user'); 
    if (user) { 
      const userData = JSON.parse(user);
      if (userData.token) { // Если пользователь авторизован, остаётся на странице с чатом
        navigation('/chat'); 
      }
    } 
  }, [navigation]);


  const handleThemeToggle = () => { // Смена темы
    setActive(!active);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => { //Выход из учётной записи
    localStorage.removeItem('user'); // Удаляем из localStorage пользователя
    navigation('/login');
  }

  return (
  <div className={`chat-page ${theme}`} >
    <div className="chat-wrapper">
      <div className="title-container">
        <div className="toggle-container">
          <div className="change-text"> {theme} mode </div>
          <div>
            <label className="switch">
              <input type="checkbox" checked={!active} onChange={handleThemeToggle}  />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div><h1 className={`title ${theme}`}>Global Chat</h1></div>
        
        <button className="log-out_button" onClick={handleLogout}>Log Out</button>
      </div>

      <div className="main-container">
        <div className="message-list">
          <MessageList theme={theme} />

          <div className="messageFormContainer">   
            <MessageForm theme={theme} />
          </div>
        </div>
      </div>
    </div>
  </div> 
  );
};