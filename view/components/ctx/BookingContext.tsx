import { React } from '../../deps.tsx';
import { useAuth } from './AuthContext.tsx';

const BookingContext = (React as any).createContext();

export default function BookingContextProvider({ children }: any) {
  const [bookings, setBookings] = (React as any).useState([]);
  const { token } = useAuth();

  const getById = (id: number) => {
    const matchedBookings = bookings.filter(
      (booking: any) => booking.id === id
    );
    return matchedBookings.length > 0 ? matchedBookings[0] : {};
  };

  (React as any).useEffect(() => {
    if (token) {
      (async () => {
        const res = await fetch('/api/bookings', {
          method: 'GET',
          headers: { ['Authorization']: token },
        });
        const json = await res.json();
        if (res.status === 200) setBookings(json.bookings);
      })();
    }
  }, [token]);

  return (
    <BookingContext.Provider value={{ bookings, getById }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings(): { bookings: any[]; getById: Function } {
  return (React as any).useContext(BookingContext) || {};
}
