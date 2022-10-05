import axios from 'axios';

export default function FetchUser() {
  const fetchUser = async () => {
    const { data } = await axios.get('/api/user');
    console.log(data);
  };

  return (
    <div className="container flex flex-col justify-center items-center w-screen h-screen">
      <button onClick={fetchUser}>Print User Data By Fetching Endpoint</button>
    </div>
  );
}
