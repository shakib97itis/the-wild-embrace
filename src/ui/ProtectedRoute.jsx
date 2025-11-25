import {useAuth} from '../features/authentication/useAuth';
import {useNavigate} from 'react-router';
import Spinner from './Spinner';
import styled from 'styled-components';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();
  const {isAuthenticated, isUserLoading} = useAuth();

  if (isUserLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (!isAuthenticated) {
    navigate('/login', {replace: true});
    return null;
  }

  return children;
};

export default ProtectedRoute;
