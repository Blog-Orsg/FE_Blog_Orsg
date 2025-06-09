import AllFeature from "./components/features/all-feature";
import Container from "./components/container";
import HomepageHero from "./components/hero/homepage";
import Intro from "./components/intro";

export default function Home() {
  return (
    <>
      <div className="overflow-hidden pb-[16.4rem] mb:pb-[25.6rem]">
        <Container className="pt-[6.4rem] mb-[5.4rem]">
          <HomepageHero />
        </Container>
      </div>
      <AllFeature />
      <Container>
        <Intro />
      </Container>
    </>
  );
}
