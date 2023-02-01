import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function login() {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);

  const [error, SetError] = useState(false);
  const router = useRouter();
  const login = async () => {
    //send to api check respons
    //to check via api i have to insert this account in the database
    //createe a model for users

    try {
      await axios.post("http://localhost:3000/api/login", {
        user,
        password,
      });
      router.push("/backend");
    } catch (error) {
      SetError(true);
    }

    /* alert(user + " " + password); */
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p className="danger">Login fehlgeschlagen</p>}
      <div className="row mt-4">
        <Form>
          <Form.Group className="mb-3" controllId="user">
            <Form.Control
              type="text"
              placeholder="User"
              onChange={(e) => setUser(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controllId="password">
            <Form.Control
              type="text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={login}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
