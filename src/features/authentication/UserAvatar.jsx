import styled from 'styled-components';
import {useUser} from './useUser';
import SpinnerMini from '../../ui/SpinnerMini';

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  height: 4rem;
  width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const UserAvatar = () => {
  const {user, isUserLoading} = useUser();

  if (isUserLoading) {
    return <SpinnerMini />;
  }

  if (!user) {
    return null;
  }

  const fullName = user.user_metadata?.fullName || 'User';
  const avatarUrl = user.user_metadata?.avatar || '/default-user.jpg';

  return (
    <StyledUserAvatar>
      <Avatar src={avatarUrl} alt={`${fullName}'s avatar`} />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
