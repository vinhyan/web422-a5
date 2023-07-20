import Link from 'next/link';
import {
  Nav,
  Navbar,
  Container,
  Form,
  Button,
  NavDropdown,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function MainNav({}) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function handleSubmit(e) {
    e.preventDefault();
    const searchQuery = `title=true&q=${e.target[0].value}`;
    if (e.target[0].value) {
      router.push(`/artwork?${searchQuery}`);
    }
    setIsExpanded(false);
    setSearchHistory([...searchHistory, searchQuery]);
  }

  function handleExpand(e) {
    setIsExpanded(!isExpanded);
  }
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Vinh Nhan</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={handleExpand}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === '/'}
                  onClick={(e) => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === '/search'}
                  onClick={(e) => setIsExpanded(false)}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp;
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
            &nbsp;
            <Nav>
              <NavDropdown title="User Name" id="nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === '/favourites'}
                    onClick={(e) => setIsExpanded(false)}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === '/history'}
                    onClick={(e) => setIsExpanded(false)}
                  >
                    History
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
