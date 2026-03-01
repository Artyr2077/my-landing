import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#23243a",
        color: "#fff",
        padding: "2rem 0 1.2rem",
        marginTop: "3rem"
      }}
    >
      <div
        className="footer-container"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "0 1rem"
        }}
      >
        <div
          className="footer-copyright"
          style={{
            fontSize: "1.05rem",
            fontWeight: 500,
            opacity: 0.85,
            letterSpacing: "-0.2px"
          }}
        >
          © 2024 WebStudio. Все права защищены
        </div>
        <div className="footer-socials" style={{ display: "flex", gap: "1.3rem" }}>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="Twitter"
          >
            <img
              src="/icons/Twitter.svg"
              alt="Twitter"
              width={24}
              height={24}
              style={{ display: "block" }}
            />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="GitHub"
          >
            <img
              src="/icons/Github.svg"
              alt="GitHub"
              width={24}
              height={24}
              style={{ display: "block" }}
            />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="LinkedIn"
          >
            <img
              src="/icons/LinkedIn.svg"
              alt="LinkedIn"
              width={24}
              height={24}
              style={{ display: "block" }}
            />
          </a>
        </div>
      </div>
      <style>
        {`
          @media (max-width: 700px) {
            .footer-container {
              flex-direction: column;
              text-align: center;
              gap: 1rem;
            }
            .footer-socials {
              justify-content: center !important;
            }
          }
          .footer-socials a {
            opacity: 0.82;
            transition: opacity .2s, transform .18s;
            display: flex;
            align-items: center;
          }
          .footer-socials a:hover {
            opacity: 1 !important;
            text-decoration: none;
            transform: translateY(-3px) scale(1.1);
          }
          .footer-socials img {
            width: 24px;
            height: 24px;
            display: block;
            filter: brightness(1) invert(0);
            transition: filter .18s;
          }
          .footer-socials a:hover img {
            filter: brightness(1.2) invert(0);
          }
        `}
      </style>
    </footer>
  );
};


export default Footer;