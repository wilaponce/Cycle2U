
import PickupCard from '@/components/cards/PickupCard';
import RewardsCard from '@/components/cards/RewardsCard';

export default function CardGrid() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
      <PickupCard />
      <RewardsCard />
    </div>
  );
}
