import { React, MatUI } from '../../deps.tsx';
import { useAuth } from '../ctx/AuthContext.tsx';
import SignedInLinks from './signedInLinks.tsx';
import SignedOutLinks from './signedOutLinks.tsx';
const { Drawer } = MatUI as any;

export default function MobileDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  const { token } = useAuth();

  return (
    <Drawer anchor={'left'} open={open} onClose={() => setOpen(false)}>
      <div
        style={{
          width: 250,
        }}
        role="presentation"
        onClick={() => setOpen(false)}
        onKeyDown={() => setOpen(false)}
      >
        <ul>{token ? <SignedInLinks /> : <SignedOutLinks />}</ul>
      </div>
    </Drawer>
  );
}
