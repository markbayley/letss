import React from "react";
import Meta from "./../components/Meta";
import HeroSection2 from "./../components/HeroSection2";
import StatsSection from "./../components/StatsSection";
import TeamBiosSection from "./../components/TeamBiosSection";
import CtaSection from "./../components/CtaSection";

function AboutPage(props) {
  return (
    <>
      <Meta title="About" description="Learn about our company and team" />
      <HeroSection2
        bgColor="default"
        size="large"
        bgImage=""
        bgImageOpacity={1}
        title="About LETSS"
        subtitle="LETSS was founded in 2021 by Dr. Ofi to help international medical students learn conversational English. Since then the company has experienced rapid growth, and enrollments have increasing each month."
      />
      <StatsSection
        bgColor="light"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
      />
      <TeamBiosSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Meet the Team"
        subtitle=""
      />
      <CtaSection
        bgColor="primary"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Ready to get started?"
        subtitle=""
        buttonText="Get Started"
        buttonColor="secondary"
        buttonPath="/pricing"
      />
    </>
  );
}

export default AboutPage;
