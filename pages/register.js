import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { registerUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';

export default function Register(props) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [warning, setWarning] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('TODO: Submit form');
    try {
      await registerUser(user, password, password2);

      router.push('/login');
    } catch (err) {
      setWarning(err.message);
    }
  };

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Register New Account</h2>Enter your account information below:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            id="userName"
            name="userName"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            id="password2"
            name="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </Form.Group>
        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}
        <br />
        <Button variant="primary" className="pull-right" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}
