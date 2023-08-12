import React from 'react'
export const dynamic = "force-dynamic";//avoid cache data and obtain only fresh data
import { db } from "@/app/db";
import SubmitButton from "@/app/components/SubmitButton";
import { revalidatePath } from "next/cache";

async function getData(id:string){
  const data =  await db.comment.findMany({
    where:{
      movieId: id
    },
    orderBy:{
        createdAt: "desc" 
    },
  });

  return data;
}

async function postData(formData: FormData) {
  "use server";

  const data = await db.comment.create({
    data: {
      message: formData.get("comment") as string,
      movieId: formData.get("id") as string,
    },
  });

  revalidatePath("/movie/[id]");
}

const page = async ({ params }: { params: { id: string } }) => {

  const data = await getData(params.id);
  return (
   <div className='rounded-lg border p-3  bg-white mb-6'>
    <h1 className='text-xl text-teal-500 font-semibold mb-4'>Your Views</h1>
    <div>
      <form action={postData}>
        <textarea className='w-full border border-teal-400 rounded-md p-3' name="comment" placeholder="add your comment..."></textarea>
        <input className='mt-4' type="hidden" name="id" value={params.id} />
        <SubmitButton/>
      </form>
      <div className="mt-4 flex flex-col gap-y-3 text-black">
          {data.map((post) => (
            <div key={post.id}>
              <p>{post.message}</p>
            </div>
          ))}
      </div>
    </div>
   </div>
  );
}

export default page;
