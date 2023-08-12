import Image from 'next/image'
import { Trending } from "./interfaces"
import Link from 'next/link';
import Footer from './footer'


async function getData(){
  const url = await fetch ("https://api.themoviedb.org/3/trending/movie/day",
  {
    headers: {
      accept: 'application/json',
      Authorization: process.env.TMDB_API as string,
    },
    next: {
      revalidate: 10,
    },
  });
  return url.json();
}

export default async function Home() {
  const data:Trending = await getData();//data of trending movies from interfaces.ts

  console.log(data);
  return (
    <div className='gradient-bg-hero bg-white py-6 px-2 sm:py-8 px-4 lg:py-10 px-6'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-6'>
        <div className="md:w-3/6 w-full mb-6">
        <div>
          <h1 className="text-white text-5xl font-bold my-4">
            
            Share your thoughts </h1>
            <h1 className="text-white text-5xl font-bold my-4">Win <span className="text-gradient">NFTs</span>
          </h1>
          <p className="text-gray-400 font-semibold  mt-3">
            Get limited edition NFTs.
          </p>
        </div>
        </div>
          <div className='mb-10 md:mb-16'>
              <h2 className='mb-4 text-center text-2xl font-bold text-white md:mb-4 lg:text-3xl top-text'>Top Trending Movies</h2>
          </div>
          <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8'>
          {data.results.map((movie) => (
              <div key={movie.id}
              className="flex flex-col overflow-hidden rounded-lg border bg-gray-100">
              <Link
                className="group relative block h-48 overflow-hidden bg-gray-300 md:h-64"
                href={`/movie/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="image movie banner"
                  width={500}
                  height={500}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </Link>
              <div className='flex flex-1 flex-col p-4 sm:p-6'>
                <h2 className='mb-2 text-lg font-semibold text-gray-800'>
                  <Link
                    href={`/movie/${movie.id}`}
                    className="transition duration-100 hover:text-teal-400 active:text-teal-600">
                    {movie.title}
                  </Link>
                </h2>

                <p className='text-gray-500 line-clamp-4'>{movie.overview}</p>
              </div>
              </div>
          ))}
          </div>
        </div>
        <Footer></Footer>
    </div>
  );
}
