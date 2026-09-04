import StoryChainCanvas from "../../components/StoryChainCanvas";
import StoryJourney from "../../components/StoryJourney";

export const metadata = {
  title: "The Story",
  description:
    "Twelve years, one arc — from nine years inside a university's infrastructure to Bloomberg scale to founding Bitcoin startups backed by Jack Dorsey's #startsmall and MIT's Digital Currency Initiative.",
};

export default function StoryPage() {
  return (
    <>
      <StoryChainCanvas />
      <div className="wrap">
        <header className="story-hero">
          <div className="kicker">// the journey · 2014 → now</div>
          <h1>
            Every block <span className="accent">builds on</span> the last.
          </h1>
          <p className="sub">
            Scroll through twelve years — each chapter seals into the next, the way
            the work actually happened.
          </p>
          <div className="scroll-cue" aria-hidden="true">▼</div>
        </header>
      </div>
      <StoryJourney />
    </>
  );
}
