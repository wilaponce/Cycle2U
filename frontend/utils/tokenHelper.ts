import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

const  getToken = (ctx: GetServerSidePropsContext | null = null) => {
  const cookies = ctx ? nookies.get(ctx) : nookies.get();
  return cookies.token || null;
};

export default getToken;