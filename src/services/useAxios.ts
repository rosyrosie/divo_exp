import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const useAxios = (url: string, body: any, fetchType: 'POST' | 'GET', dependency: any[] = [], condition: boolean = true) => {
  const [ payload, setPayload ] = useState<any>(null);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  let fetcher: (url: string, body: any) => Promise<AxiosResponse<any, any>>;

  switch(fetchType){
    case 'POST':
      fetcher = (url, body) => axios.post(url, body, token ? {headers: {"Authorization": `Token ${token}`}} : undefined);
      break;
    
    case 'GET':
      fetcher = (url, body) => axios.get(url, token ? {headers: {"Authorization": `Token ${token}`}} : undefined);
      break;
    
    default:
      break;
  }

  useEffect(() => {
    if(!condition) return;
    
    setLoading(true);
    setError(false);

    fetcher(url, body)
    .then(res => setPayload(res.data))
    .then(() => setLoading(false))
    .catch(e => setError(true));

  }, dependency);

  return [ payload, loading, error ];
}

export default useAxios;