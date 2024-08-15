import React, { useState } from "react";
import styles from "./AboutComponent.module.css";
import HomePage from "../../assets/images/AboutCre8share.png";
import HelpSection from "../HelpSection/HelpSection";
import userRole from "../../assets/images/userRole.jpg";
import creatorRole from "../../assets/images/creatorRole.jpg";

function AboutComponent() {
  const [role, setRole] = useState("creator");
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const testimonials = [
    {
      text: "Cre8Share is an interactive project to play with",
      user: "John Doe",
    },
    {
      text: "Though this is not a real investing tool but it has all feature it requires as an investing tool",
      user: "Jane Smith",
    },
    {
      text: "A great mern stack project built by Sumit",
      user: "Mike Johnson",
    },
    {
      text: "Cre8Share truly bridges the gap between youtube creators and their fans",
      user: "Sarah Williams",
    },
    {
      text: "As a creator this is a very amazing to know value of your channel and content",
      user: "David Brown",
    },
  ];

  const faqData = [
    {
      question: "What is Cre8share?",
      answer:
        "Cre8share is a platform where creators can allocate their stocks and users can invest in them.",
    },
    {
      question: "How does Cre8share work?",
      answer:
        "Creators can allocate their stocks and users can invest in them. The stock valuation is based on the valuation of the creator's channel and demand/supply of the stocks.",
    },
    {
      question: "How can I sign up on Cre8share?",
      answer: "You can sign up as a Creator or a User on Cre8share.",
    },
    {
      question: "How can I invest in a creator?",
      answer:
        "You can invest in a creator by buying their stocks from the stock marketplace.",
    },
    {
      question: "How can I earn profits on Cre8share?",
      answer: "You can earn profits if the creator you invested in does well.",
    },
    {
      question: "Is Cre8share a real investing tool?",
      answer:
        "No, Cre8share is just a MERN stack project prototype. It is not a real investing tool.",
    },
  ];

  return (
    <>
      <section id={styles.aboutCre8share} className={styles.padding10px}>
        <h1 className={styles.aboutHeadings}>What is CRE8SHARE?</h1>

        <div id={styles.aboutCre8shareContainer}>
          <div className={styles.imageContainer}>
            <img src={HomePage} alt="About Cre8share" />
          </div>
          <p>
            “CRE8SHARE” is a transparent and engaging platform, where we empower
            both creators and audiences to actively participate in the success
            of content creation. Creators gain a new source of revenue and
            investment in their content, while audiences can support their
            favorite creators financially and share in their success. Users can
            also earn profits if their creator do well.
            <br />
            <br />
            Together, we can empower creators, engage audiences, and build a
            vibrant community around the shared success of content creation.
          </p>
          <p id={styles.lol}>
            In today's digital age, content creators on platforms like YouTube
            are not just entertainers—they're entrepreneurs building brands and
            communities. However, traditional revenue streams such as ad
            monetization can be unpredictable and limiting.
            <br />
            <br />
            By leveraging advanced algorithms and real-time analytics, we've
            created a dynamic ecosystem where creators can capitalize on their
            influence and fans can invest in their favorite content.
          </p>
        </div>
        <p className={styles.flashMessage}>
          ⚠️ This is just a MERN stack project prototype, I urge users to just
          play with it and not consider it as a real investing tool.
        </p>
      </section>
      <section id={styles.roles} className={styles.padding10px}>
        <h1 className={styles.aboutHeadings}>Roles</h1>
        <p style={{ fontSize: "1.6rem" }}>
          There are two roles by which you can sign up on our platform
        </p>
        <div id={styles.roleTitles}>
          <p
            className={role === "creator" ? styles.activeRole : ""}
            onClick={() => setRole("creator")}
          >
            Creator
          </p>
          <p
            className={role === "user" ? styles.activeRole : ""}
            onClick={() => setRole("user")}
          >
            User
          </p>
        </div>
        {role === "creator" && (
          <div id={styles.creatorRole} className={styles.roleContainer}>
            <div className={styles.imageContainer}>
              {" "}
              <img src={creatorRole} alt="Creator role img" />
            </div>
            <p className={styles.aboutRole}>
              As a creator, you can allocate your stocks on our platform and the
              stocks valuation will be based on the valuation of your channel
              and demand/supply of your stocks according to our internal
              algorithm. You can also earn profits if your content does well.
              You can also get support from your fans by sharing your content
              and help them grow.
              <br />
              <br />
              This platform also provides creators an interactive dashboard to
              track their stocks and earnings in real time.
              <br />
              <br />
              Leveraging the power of the YouTube API, our backend seamlessly
              fetches real-time data about content creators and their channels.
              This integration enables dynamic channel valuation based on key
              metrics such as subscriber count, view count, and engagement rate.
              By harnessing the wealth of information provided by the YouTube
              API, our backend ensures accurate and up-to-date channel
              valuations for creators.
            </p>
          </div>
        )}
        {role === "user" && (
          <div id={styles.userRole} className={styles.roleContainer}>
            <div className={styles.imageContainer}>
              <img src={userRole} alt="User Role img" />
            </div>
            <p className={styles.aboutRole}>
              As a user, you can invest in your favorite creator and earn
              profits if they do well. All the stocks are available in stock
              marketplace and you can buy/sell them according to your choice.
              <br />
              <br />
              This platform also provides users an interactive dashboard to
              track their portfolio and earnings in real time.
              <br />
              <br />
              Our backend seamlessly integrates with the YouTube API to fetch
              real-time metrics, updating channel valuations weekly. Employing
              an advanced algorithm, it factors in user interactions, channel
              performance, and market trends to dynamically adjust stock prices,
              ensuring precise valuation representation and engaging investment
              experiences for users.
            </p>
          </div>
        )}
      </section>
      <section id={styles.testimonials} className={styles.padding10px}>
        <h1 className={styles.aboutHeadings}>Testimonials</h1>
        <p style={{ fontSize: "1.6rem" }}>
          Here is what Creators and Users are saying about us -{" "}
        </p>
        <div id={styles.marquee}>
          <div id={styles.marqueeGroup}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.marqueeItem}>
                <p className={styles.userContent}>"{testimonial.text}"</p>
                <p className={styles.userName}>{testimonial.user}</p>
              </div>
            ))}
          </div>
          <div id={styles.marqueeGroup}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.marqueeItem}>
                <p className={styles.userContent}>"{testimonial.text}"</p>
                <p className={styles.userName}>{testimonial.user}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id={styles.faq} className={styles.padding10px}>
        <h1 className={styles.aboutHeadings}>F.A.Q</h1>
        <div id={styles.accordionContainer}>
          {" "}
          <div id={styles.accordion}>
            {faqData.map((faq, index) => (
              <div key={index} className={styles.accordionItem}>
                <div className={styles.accordionTitle}>
                  <h2>{faq.question}</h2>
                  <div
                    className={styles.accrdionIcon}
                    onClick={() => toggle(index)}
                  >
                    {" "}
                    {activeIndex === index ? "-" : "+"}{" "}
                  </div>
                </div>
                <div
                  className={`${styles.accordionContent} ${
                    activeIndex === index ? styles.active : ""
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HelpSection />
    </>
  );
}

export default AboutComponent;
