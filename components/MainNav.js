import Link from 'next/link';
import { Nav, Navbar, Container, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function MainNav() {
  const router = useRouter();
  function handleSubmit(e) {
    e.preventDefault();
    if (e.target[0].value) {
      router.push(`/artwork?title=true&q=${e.target[0].value}`);
    }
  }
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>Vinh Nhan</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link>Advanced Search</Nav.Link>
              </Link>
            </Nav>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
