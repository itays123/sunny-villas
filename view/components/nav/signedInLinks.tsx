import { React } from '../../deps.tsx';
import Link from './Navlink.tsx';

export default function SignedInLinks() {
  return (
    <>
      <Link path="/deals">Deals</Link>
      <Link path="/bookings">Bookings</Link>
    </>
  );
}
