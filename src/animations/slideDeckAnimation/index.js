import { gsap } from "gsap";

const slideDeckAnimation = ({ slides }) => {
  slides.current.forEach((slide) => {

    const images = Object.values(slide.children);
    
    let z = images.length;

    images.forEach(image => {
      z = z - 1
      image.style.zIndex = z
    })
    
    const timeline = gsap.timeline();

    timeline
      .set(images, {
        x: () => {
          return 500 * Math.random() - 250;
        },
        y: "500%",
        rotation: () => {
          return 90 * Math.random() - 45;
        },
        opacity: 1,
      })
      .to(images, { x: 0, y: 0, stagger: -0.25 })
      .to(images, {
        rotation: () => {
          return 16 * Math.random() - 8;
        },
      });
  });
};

export default slideDeckAnimation;
