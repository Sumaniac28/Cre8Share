import React from "react";
import styles from "./ContactComponent.module.css";
import developerImage from "../../assets/images/developer2.jpg";
function ContactComponent() {
  const techStack = [
    {
      name: "HTML",
      icon: "fab fa-html5",
    },
    {
      name: "CSS",
      icon: "fab fa-css3-alt",
    },
    {
      name: "JavaScript",
      icon: "fab fa-js",
    },
    {
      name: "React",
      icon: "fab fa-react",
    },
    {
      name: "Node.js",
      icon: "fab fa-node",
    },
    {
      name: "MongoDB",
      icon: "fas fa-database",
    },
    {
      name: "Express",
      icon: "fas fa-server",
    },
    {
      name: "AWS",
      icon: "fab fa-aws",
    },
  ];

  const contactArray = [
    {
      icon: "fas fa-envelope",
      link: "mailto:sumitgrover343@gmail.com",
      name: "Email",
    },
    {
      icon: "fa fa-twitter",
      link: "lol",
      name: "Twitter",
    },
    {
      icon: "fab fa-linkedin",
      link: "https://www.linkedin.com/in/sumitgrover/",
      name: "LinkedIn",
    },
    {
      icon: "fab fa-github",
      link: "lol",
      name: "GitHub",
    },
  ]
  return (
    <div id={styles.contactComponent}>
      <h1 id={styles.contactHeading}>About Developer</h1>
      <div id={styles.aboutDeveloperContainer}>
        <div id={styles.aboutDeveloper}>
          <div id={styles.developerImageContainer}>
            <img src={developerImage} alt="Developer" />
            <h2>Sumit Grover</h2>
          </div>
          <div id={styles.developerInfo}>
            <p>
              Hi there! I am Sumit Grover, a full stack developer. I have been
              working in the field of web development for the past 1 year. I
              have worked on various projects and have experience in working
              with different technologies. I am proficient in HTML, CSS,
              JavaScript, React, Node.js, Express, MongoDB, and many more.
              <br />
              <br />
              This right here you see is CRE8SHARE - my mern stack project
              prototype. It is a fun tool to play with. I am open for any kind
              of feedback or suggestions. Feel free to reach out to me.
              <br />
              <br />
              This website is not a real investment website. It is just a
              prototype project. You can allocate stocks as a creator and users
              can invest in them. The website is not connected to any real stock
              market. The website is just a fun tool to play with.
            </p>
          </div>
        </div>
      </div>
      <div id={styles.techStackContainer}>
        <h1 id={styles.contactHeading}>Technologies Used</h1>
        <div id={styles.techStack}>
          {techStack.map((tech, index) => {
            return (
              <div key={index} id={styles.techStackItem}>
                <i className={tech.icon}></i>
                <p>{tech.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <h1 id={styles.contactHeading}>Contact Info</h1>
      <div id={styles.contactInfoContainer}>
        <div id={styles.contactInfo}>
          {contactArray.map((contact, index) => {
            return (
              <div id={styles.contactInfoItem}>
            <i className={contact.icon}></i>
            <p>
              <a href={contact.link} target="_blank" rel="noreferrer">{contact.name}</a>
            </p>
          </div>
            )
          })}
        </div>
        <form className={styles.form}>
          <label for="name">Name</label>
          <input
            type="text"
            placeholder="name"
            name="name"
            // value={formData.email}
            // onChange={handleChange}
            required
          />
          <label for="email">Email</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            // onChange={handleChange}
            // value={formData.password}
            required
          />
          <label for="message">Message</label>
          <textarea
            type="text"
            placeholder="message"
            name="message"
            // onChange={handleChange}
            // value={formData.password}
            required
          />
          <button>Send a message</button>
        </form>
      </div>
      <div id={styles.loveMessage}>
        <p>
          Made with <i className="fas fa-heart"></i> by Sumit Grover
        </p>
      </div>
    </div>
  );
}

export default ContactComponent;
