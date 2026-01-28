
interface Props { title: string; description: string; icon?: React.ReactNode }
export default function BaseCard({ title, description, icon }: Props) {
  return (
    <div className='p-6 rounded-xl bg-white border shadow-sm'>
      <div className='text-3xl mb-3'>{icon}</div>
      <h3 className='font-semibold text-xl'>{title}</h3>
      <p className='text-gray-600 mt-2'>{description}</p>
    </div>
  );
}
