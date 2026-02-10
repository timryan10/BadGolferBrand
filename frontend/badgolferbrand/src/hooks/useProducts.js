import { useEffect, useState } from 'react';

const initialData = {
  mens: [],
  womens: [],
  hats: [],
  hoodies: []
};

function useProducts() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error(`Failed to load products (${res.status})`);
        }
        const json = await res.json();
        console.log('Fetched products:', json);
        if (!ignore) {
          setData({
            mens: json.mens ?? [],
            womens: json.womens ?? [],
            hats: json.hats ?? [],
            hoodies: json.hoodies ?? []
          });
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Failed to load products');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, []);

  return { data, loading, error };
}

export default useProducts;
