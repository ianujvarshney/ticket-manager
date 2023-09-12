import { Link } from "react-router-dom";
import { Form } from "./Form";

export function Settings() {
  return (
    <div>
      <Link to="/change-pass">Change Password</Link>

      <Form />
    </div>
  );
}
