import React, { useEffect, useRef, useState } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { gsap } from "gsap";

import GlobalStyles from "../styles";
import { carouselAnimation, slideDeckAnimation } from "../animations";
import { Arrow } from "../assets/svgs";

const IndexPage = ({ data }) => {
  const pageData = data.allMarkdownRemark.edges[0].node.frontmatter;
  const carousels = useRef([]);
  const slides = useRef([]);

  const [zIndex, setZIndex] = useState(0);

  const handleImageClick = (event) => {
    event.preventDefault();
    const flipTimeline = gsap.timeline();

    let direction = "150%";
    let midAngle = 15;

    if (Math.random() > 0.5) {
      direction = "-150%";
      midAngle = -15;
    }

    // GatsbyImage positions the img tag absolute so the target ends up being the img.
    // So have to access div that's being clicked by accessing parent elements.
    const slide = event.target.parentElement.parentElement.parentElement;

    flipTimeline
      .set(slide, { x: 0 })
      .to(slide, {
        x: direction,
        rotation: midAngle,
        rotationY: 90,
        scale: 1.1,
      })
      .set(slide, { zIndex: zIndex })
      .to(slide, {
        x: 0,
        rotation: () => {
          return 16 * Math.random() - 8;
        },
        rotationY: 0,
        scale: 1,
      });

    setZIndex(zIndex - 1);
  };

  useEffect(() => {
    carouselAnimation({ carousels });
    slideDeckAnimation({ slides });
  }, []);

  return (
    <>
      <GlobalStyles />
      <Header>
        <h1 ref={(element) => (carousels.current[0] = element)}>
          {Array.apply(null, { length: 20 }).map((index) => {
            return <span key={index}>Seamstress</span>;
          })}
        </h1>
        <h2 ref={(element) => (carousels.current[1] = element)}>
          {Array.apply(null, { length: 20 }).map((index) => {
            return <span key={index}>Lookbook Spring + Summer</span>;
          })}
        </h2>
      </Header>
      {pageData.sections.map((section, index) => {
        const reverse = (index & 1) === 1 ? 2 : 1;
        return (
          <Section reverse={reverse} key={index}>
            <Split>
              <Slides ref={(element) => (slides.current[index] = element)}>
                {section.slides.map((slide) => {
                  const profile = getImage(slide.slide);
                  return (
                    <div onClick={handleImageClick}>
                      <GatsbyImage image={profile} alt={slide.alt} />
                    </div>
                  );
                })}
              </Slides>
            </Split>
            <Split>
              <Info>
                <h2>{section.title}</h2>
                <p>{section.summary}</p>
                <p>
                  <a href="#">
                    Read more
                    <Arrow />
                  </a>
                </p>
              </Info>
            </Split>
          </Section>
        );
      })}
    </>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(filter: { frontmatter: { id: { eq: 1 } } }) {
      edges {
        node {
          id
          frontmatter {
            id
            sections {
              sectionOrder
              summary
              title
              slides {
                alt
                slide {
                  id
                  childImageSharp {
                    gatsbyImageData(
                      layout: FULL_WIDTH
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Info = styled.div`
  padding: 2rem;
  max-width: 480px;
  h2 {
    font-size: 2rem;
  }
  p {
    font-size: 1.5rem;
    margin-top: 2rem;
  }
`;

const Slides = styled.div`
  width: 500px;
  height: 750px;
  position: relative;
  perspective: 800px;
  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 500px;
    height: 750px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.25);
  }
`;

const Split = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  grid-auto-flow: dense;
  a {
    background-color: #ffffff;
    color: #111111;
    text-decoration: none;
    font-size: 16px;
    padding: 8px 24px 8px 24px;
    border-radius: 50px;
    display: inline-flex;
    align-items: center;
    svg {
      margin: 0 0 0 8px;
      width: 10px;
      height: 16px;
      transition: width 0.25s;
    }
    &:hover {
      svg {
        width: 25px;
      }
    }
  }
  > * {
    &:first-child {
      grid-column: ${({ reverse }) => reverse};
    }
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0.5rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  font-weight: 800;
  z-index: 100;
  h1,
  h2 {
    display: flex;
    margin: 0;
  }
  span {
    font-size: 1rem;
    flex: 0 0 auto;
    display: inline-block;
  }
  h1 {
    span {
      width: 150px;
    }
  }
  h2 {
    span {
      width: 250px;
    }
  }
`;

export default IndexPage;
