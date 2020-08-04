import { React } from './deps.tsx';

export default function useFetch(url: string, options: RequestInit) {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const [status, setStatus] = React.useState(200);
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setData(json);
        setStatus(res.status);
      } catch (err) {
        setError(error);
      }
    })();
  }, []);
  return { data, error, status };
}
