import React, { useState } from 'react';
import { Header, BoardName, StyledAvatar } from './Styles';
import useCurrentUser from 'shared/hooks/currentUser';
import ProfileModal from 'shared/components/ProfileModal';

const ProjectBoardHeader = () => {
  const { currentUser } = useCurrentUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

      {isProfileOpen && <ProfileModal currentUser={currentUser} onClose={() => setIsProfileOpen(false)} />}
    </>
  );
};

export default ProjectBoardHeader;