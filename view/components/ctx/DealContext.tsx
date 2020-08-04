import { React } from '../../deps.tsx';
import useFetch from '../../fetch.tsx';

export const DealContext = (React as any).createContext();

export default function DealContextProvider({ children }: any) {
  const { data }: any = useFetch('/api/deals', {});

  const findById = (id: number): any => {
    if (data.deals) {
      const matchedDeals = data.deals.filter((deal: any) => deal.id === id);
      if (matchedDeals.length === 0) return {};
      else return matchedDeals[0];
    } else return {};
  };
  return (
    <DealContext.Provider
      value={{
        // @ts-ignore
        deals: data?.deals || [],
        findById,
      }}
    >
      {children}
    </DealContext.Provider>
  );
}

type Deal = {
  id: number | string;
  title: string;
  price: number;
  ordered?: number;
  limted?: number;
  imageUrl?: string;
};

export function useDeals(): { deals: Deal[]; findById: Function } {
  return (React as any).useContext(DealContext) || {};
}
