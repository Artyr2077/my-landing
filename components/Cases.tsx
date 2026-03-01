import React from "react";

const cases = [
  {
    title: "Интернет-магазин Fashion",
    description: "Разработка интернет-магазина одежды",
    image: "/photos/shop.jpg",
    alt: "Fashion shop",
  },
  {
    title: "CRM для склада",
    description: "Система управления складскими запасами",
    image: "/photos/crm.png",
    alt: "CRM склад",
  },
];

const Cases = () => {
  return (
    <section className="cases-section" style={{ padding: "3rem 0", background: "#fff" }}>
      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.25rem",
            marginBottom: "2.5rem",
            fontWeight: 700,
            letterSpacing: "-1px",
          }}
        >
          Наши работы
        </h2>
        <div
          className="cases-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          {cases.map((project, idx) => (
            <div
              key={idx}
              className="case-card"
              style={{
                background: "#f8f9fa",
                borderRadius: "1.5rem",
                boxShadow: "0 2px 12px rgba(70, 90, 120, .10)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                className="case-image-placeholder"
                style={{
                  width: "100%",
                  maxWidth: "320px",
                  height: "180px",
                  background: "#e0e3ea",
                  borderRadius: "1rem",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "1rem",
                    display: "block"
                  }}
                />
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                  color: "#29304c",
                  letterSpacing: "-0.5px",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#5a627b",
                  lineHeight: 1.6,
                }}
              >
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          @media (max-width: 900px) {
            .cases-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Cases;