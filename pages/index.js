import HomePage from "@/components/home/HomePage"; 
import axios from "axios";
import useSWR from 'swr';

export default function Home({ rtl }) { 
const fetcher = (url) => fetch(url).then((res) => res.json());
const { data, error } = useSWR('api/staticdata', fetcher);

  // Handle the error state
  if (error) return <div>Failed to load</div>;
  // Handle the loading state
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <HomePage
        dataHome={data}
        rtl={rtl}
      />
    </div>
  );
}

