import React, { useState, useRef, useEffect } from 'react';
import api from 'shared/utils/api';
import { Spinner } from 'shared/components';
import useApi from 'shared/hooks/api';
import { Link } from 'react-router-dom';
import { 
  ModalContainer,
  AvatarContainer,
  AvatarInput,
  StyledAvatar,
  CameraIcon,
  AvatarLabel,
  UserInfo,
  Name,
  Email,
  LogoutText,
 } from './Styles';

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
      <AvatarLabel>
      <CameraIcon
          src={avatarUrl ? "https://cdn1.iconfinder.com/data/icons/edit-6/64/edit-photo-camera-rename-512.png" : "https://cdn2.iconfinder.com/data/icons/camera-56/48/3_add_plus_camera_photo_mobile_phone_video-512.png"}
          alt="Camera"
          isHovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        <StyledAvatar
          avatarUrl={avatarUrl}
          alt="Avatar"
          name={name}
          size={70}
          isHovered={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
        <AvatarInput type="file" accept="image/*" onChange={handleAvatarChange} />
      </AvatarLabel>
      {isUpdating && <Spinner size={24} />}
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
