import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ padding: 24 }}>
      <h2>404</h2>
      <p>Page not found</p>
      <Link to="/">Go back Home</Link>
    </div>
  );
}

export default NotFound;
