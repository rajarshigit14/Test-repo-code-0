import React from 'react'
import { Movie } from "@/app/interfaces";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Footer from '@/app/footer';

async function getData(id: string) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    {
      headers: {
        accept: "application/json",
        Authorization: process.env.TMDB_API as string,
      },
      next: {
        revalidate: 60,
      },
    }
  );

  return url.json();
}

const page = async({params,children,}:
  {children: ReactNode;
    params:{id:string};
  }) => {
    const data: Movie = await getData(params.id); //data of the movie from interfaces.ts
  return (
    <div className="gradient-bg-hero text-white min-h-screen p-10">
    <div className="h-[40vh] relative">
      <Image
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        alt="Image of movie"
        className="object-cover w-full rounded-lg"
        fill
      />
    </div>

    <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>

    <div className="flex gap-x-10 mt-10">
      <div className="w-1/2 font-medium ">
        <h1 className="mb-3">
          <span className="leading-8">Homepage : </span>{" "}
          <Link href={data.homepage} target="_blank">
            Link
          </Link>
        </h1>

        <h1 className="mb-3">
          <span className="leading-8">Original Lanugage : </span>{" "}
          {data.original_language}
        </h1>

        <p className="mb-3">
          <span className="">Overview : </span> {data.overview}
        </p>

        <p className="mb-3">
          <span className="leading-8">Release Date : </span> {data.release_date}
        </p>
      </div>
      <div className="w-1/2 ">{children}</div>
    </div>
    <Footer></Footer>
  </div>
  );
}

export default page;
