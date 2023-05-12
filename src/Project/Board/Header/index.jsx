import React, { useState } from 'react';
import { Header, BoardName, StyledAvatar } from './Styles';
import useApi from 'shared/hooks/api';
import ProfileModal from 'shared/components/ProfileModal';
import { get } from 'lodash';

const ProjectBoardHeader = ({fetchProject}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const useCurrentUser = () => {
    const [{ data }, setCurrentUser] = useApi.get('/user/me');
    return [{
      currentUser: get(data, 'currentUser'),
      
    }, setCurrentUser];
  };

  const [{ currentUser }, setCurrentUser] = useCurrentUser();

  if (!currentUser) {
    return (
      <Header>
        <BoardName>Kanban board</BoardName>
      </Header>
    );
  }

  return (
    <>
      <Header>
        <BoardName>Kanban board</BoardName>
        <StyledAvatar
          avatarUrl={currentUser.avatarUrl}
          name={currentUser.name}
          size={40}
          onClick={() => setIsProfileOpen(true)}
        />
      </Header>

      {isProfileOpen && 
        <ProfileModal 
          currentUser={currentUser} 
          onClose={() => setIsProfileOpen(false)} 
          fetchProject={fetchProject}
          setCurrentUser={setCurrentUser}
        />
      }
    </>
  );
};

export default ProjectBoardHeader;