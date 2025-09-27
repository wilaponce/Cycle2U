import axios from 'axios';

export default function Home() {
  const requestPickup = async () => {
    await axios.post('http://localhost:5000/api/pickup', { address: '123 Main St' });
  };

  return (
    <div>
      <h1>Cycle2U</h1>
      <button onClick={requestPickup}>Request Pickup</button>
    </div>
  );
}
