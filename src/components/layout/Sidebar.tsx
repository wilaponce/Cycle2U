
export default function Sidebar() {
  return (
    <aside className='hidden md:block w-64 border-r p-4 bg-white'>
      <h2 className='font-bold text-xl mb-4'>Cycle2U</h2>
      <nav className='space-y-2'>
        <a className='block hover:text-green-600' href='/request'>Request Pickup</a>
        <a className='block hover:text-green-600' href='/requestmap'>Request Map</a>
      </nav>
    </aside>
  );
}
