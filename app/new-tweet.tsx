import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function NewTweet({ user }: { user: User }) {
  const createTweet = async (formData: FormData) => {
    "use server";
    const supabase = createServerActionClient<Database>({ cookies });

    const title = String(formData.get("tweet"));

    await supabase.from("tweets").insert({ title: title, user_id: user.id });
  };
  return (
    <form className="border border-gray-800 border-t-0" action={createTweet}>
      <div className="flex px-5 py-8">
        <div className="h-12 w-12">
          <Image
            src={user.user_metadata.avatar_url}
            alt="user avatar"
            width={48}
            height={48}
            className="rounder-full"
          ></Image>
        </div>
        <input
          type="text"
          name="tweet"
          id="tweet-input"
          className="bg-inherit flex-1 ml-2 text-2xl leading-loose placeholder-gray-500 px-2"
          placeholder="Don't @ me"
        />
      </div>
    </form>
  );
}
