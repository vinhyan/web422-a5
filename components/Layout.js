import { Container } from 'react-bootstrap';
import MainNav from './MainNav';
// import { useAtom } from 'jotai';

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <br />
      <Container>{children}</Container>
      <br />
    </>
  );
}
