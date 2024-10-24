import { Urbanist } from "next/font/google";

import { Main } from "@/base/Onboarding";
import HeroSection from "@/components/home/HeroSection";
import HomeFooter from "@/components/home/HomeFooter";
import HomeHeader from "@/components/home/HomeHeader";
import { Meta } from "@/layouts/Meta";
import { AppConfig } from "@/utils/AppConfig";

const urbanistFont = Urbanist({ subsets: ["latin"] });

const Index = () => {
  return (
    <Main
      meta={
        <Meta title={AppConfig.title} description={AppConfig.description} />
      }
    >
      <div className={urbanistFont.className}>
        <HomeHeader />
        <HeroSection />
        <HomeFooter />
        {/* <SubmissionIndex /> */}
      </div>
    </Main>
  );
};
export default Index;
