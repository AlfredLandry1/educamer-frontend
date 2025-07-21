import {
  LandingNavbar,
  LandingHero,
  LandingValueProps,
  LandingFeatures,
  LandingDemo,
  LandingTestimonials,
  LandingFAQ,
  LandingCTA,
  LandingFooter
} from '../components/Landing';

export default function Home() {
  return (
    <>
      <LandingNavbar />
      <LandingHero />
      <LandingValueProps />
      <LandingFeatures />
      <LandingDemo />
      <LandingTestimonials />
      <LandingFAQ />
      <LandingCTA />
      <LandingFooter />
    </>
  );
}
