import { React } from '../../deps.tsx';
import Link from './Navlink.tsx';

export default function SignedOutLinks() {
  return (
    <>
      <Link path="/deals">Deals</Link>
      <Link path="/login">Log In</Link>
      <Link path="/signup">Register</Link>
    </>
  );
}
