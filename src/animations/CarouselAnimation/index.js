import { gsap } from "gsap";

const carouselAnimation = ({ carousels }) => {
  const fadeInTimeline = gsap.timeline();
  const movementTimeline = gsap.timeline({
    repeat: -1,
  });


  carousels.current.forEach((carousel) => {
    const width = carousel.children[0].clientWidth;

    fadeInTimeline
      .set(carousel, { opacity: 0 }, 0)
      .to(carousel, { opacity: 1, delay: 1, stagger: 1, duration: 3 });

    movementTimeline
      .set(carousel, { x: 0 }, 0)
      .to(carousel, { x: width * -1, duration: 6, ease: "linear" }, 0);
  });
};

export default carouselAnimation;
