import { React } from '../../deps.tsx';

export const AuthContext = (React as any).createContext();
type User = { email: string; password: string; name: string };

export default function AuthContextProvider({ children }: any) {
  const [token, setToken] = React.useState(undefined);
  const [user, setUser] = React.useState(undefined);

  async function login(email: string, password: string) {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    setToken(json.token);
    setUser(json.user);
  }

  async function signup(user: User) {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ user }),
    });
    const json = await res.json();
    setToken(json.token);
    setUser(json.user);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): {
  token?: string;
  user?: User;
  login: Function;
  signup: Function;
} {
  return (
    (React as any).useContext(AuthContext) || {
      login: () => {},
      signup: () => {},
    }
  );
}
