import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import api from 'shared/utils/api';
import { font, mixin } from 'shared/utils/styles';

import useApi from 'shared/hooks/api';
import { Link } from 'react-router-dom';

const ModalContainer = styled.div`
  position: absolute;
  top: 100px;
  right: 10px;
  width: 350px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 5px;
  z-index: 9999; /* встановлюємо високий рівень z-index */
  background-color: #f5f5f5;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 16px;
`;

const AvatarInput = styled.input`
  display: none;
`;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 20px;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ isHovered }) => (isHovered ? 0.7 : 1)};
  ${mixin.clickable}
  &:hover {
    cursor: pointer;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h3`
margin: 0;

  input[type="text"] {
    border: none;
    outline: none;
    cursor: text;
    background-color: #f5f5f5;
    padding: 5px;
  }
  
  input[type="text"]:hover {
    background-color: #e0e0e0;
  }
  
  input[type="text"]:focus {
    background-color: #fff;
  }
  
  input[type="text"]:focus::placeholder {
    color: transparent;
  }
  
  input[type="text"]:focus::-webkit-input-placeholder {
    color: transparent;
  }
  
  input[type="text"]:focus::-moz-placeholder {
    color: transparent;
  }
  
  input[type="text"]:focus:-ms-input-placeholder {
    color: transparent;
  }
`;

const Email = styled.p`
  margin: 0;
  color: #aaa;
  padding-left: 5px;
`;


const LogoutText = styled.div`
  position: relative;
  text-transform: uppercase;
  text-align: center;
  ${font.size(12)}
  ${mixin.clickable}
  width: 100%;
  height: 42px;
  line-height: 42px;
  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

const ProfileModal = ({ currentUser, onClose, fetchProject, setCurrentUser }) => {
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);
  const [name, setName] = useState(currentUser.name);
  const [isHovered, setIsHovered] = useState(false);
  const [{ isUpdating }, updateName] = useApi.put('/user/name');

  const modalRef = useRef(null); // створюємо ref для контейнера модального вікна

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert('Selected file is too large!');
      event.target.value = null;
    }
    try {
      const result = await api.uploadFile('/user/change-photo/', file);
      console.log(result);
      setAvatarUrl(result.url);
      fetchProject();
      setCurrentUser({ ...currentUser, avatarUrl: result.url });
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNameSave = async (event) => {
    try {
      const result = await updateName({ name: name });
      fetchProject();
      setCurrentUser({ ...currentUser, name: result.name });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickOutside = async (event) => {
    // перевіряємо, чи клік був поза контейнером модального вікна
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // додаємо обробник події onClick на document, щоб реагувати на кліки поза модальним вікном
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <ModalContainer ref={modalRef}>
      <AvatarContainer>
        <label>
        <Avatar
          src={avatarUrl}
          alt="Avatar"
          isHovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        <AvatarInput type="file" accept="image/*" onChange={handleAvatarChange} />
        </label>
        <UserInfo>
        <Name>
          <input type="text" value={name} onChange={handleNameChange} onBlur={handleNameSave}/>
        </Name>
        <Email>{currentUser.email}</Email>
      </UserInfo>
      </AvatarContainer>
      <Link to="/logout"><LogoutText>Logout</LogoutText></Link>
    
    </ModalContainer>
  );
};

export default ProfileModal;