import { React, useRouter, MatUI } from '../../deps.tsx';
const { Typography } = MatUI as any;

export default function Link({
  children,
  path,
}: {
  children: any;
  path: string;
}) {
  const { pathname, push } = useRouter();
  const isActive = pathname === path;
  return (
    <a
      onClick={() => push(path)}
      style={{
        cursor: 'pointer',
        borderBottom: isActive ? '1px solid white' : 'none',
        margin: '0 10px',
      }}
    >
      <Typography variant="body1">{children}</Typography>
    </a>
  );
}
