import styled from 'styled-components';
import { font, mixin } from 'shared/utils/styles';
import { Avatar } from 'shared/components';


export const ModalContainer = styled.div`
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

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 16px;
`;

export const AvatarInput = styled.input`
  display: none;
`;

export const StyledAvatar = styled(Avatar)`
  margin-right: 20px;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ isHovered }) => (isHovered ? 0.4 : 1)};
  ${mixin.clickable}
  &:hover {
    cursor: pointer;
  }
`;

export const CameraIcon = styled.img`
  position: absolute;
  bottom: 13px;
  left: 40%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

export const AvatarLabel = styled.label`
  position: relative;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.h3`
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

export const Email = styled.p`
  margin: 0;
  color: #aaa;
  padding-left: 5px;
`;


export const LogoutText = styled.div`
  position: relative;
  text-transform: uppercase;
  text-align: center;
  ${font.size(12)}
  ${mixin.clickable}
  width: 100%;
  height: 42px;
  line-height: 42px;
  &:hover {
    background: rgb(255, 255, 255);
  }
`;