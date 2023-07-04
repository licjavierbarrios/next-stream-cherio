import { load } from "cheerio";
import HomePageClient from "./client";
import { Challenge } from "./types";
async function getChallenges() {
  type NextData = {
    props: {
      initialState: {
        "v2/challenges": {
          entities: Record<string, Challenge>;
        };
      };
    };
  };
  const html = await fetch("https://www.frontendmentor.io/challenges").then(
    (res) => res.text()
  );

  const $ = load(html);
  const nextData = JSON.parse($("#__NEXT_DATA__").html() as string);

  return Object.values(nextData.props.initialState["v2/challenges"].entities);
}

export default async function Home() {
  const challenges = await getChallenges();
  // console.log(challenges)
  return (
    <main>
      <h1 className="text-3xl text-center font-bold m-4">Fontendmentor Challenges</h1>

      <HomePageClient challenges={challenges} />
    </main>
  );
}
