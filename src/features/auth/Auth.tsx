import { useAppSelector } from '../../app/hooks';

export default () => {
  const isAuth = useAppSelector((state) => state.auth.authenticated);
  return <div>{isAuth ? 'authenticated' : 'not'}</div>;
};
