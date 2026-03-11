// Author: Trak & Bowen

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const palette = {
  navy: "#092131",
  orange: "#e87108", 
  cream: "#f8e1cf",
  white: "#ffffff",
};

const aboutCards = [
  {
    label: "Background",
    title: "Third Ontology",
    body:
      "Among many fun possibilities, we chose to focus on the power of sound mapping as that third ontology.",
  },
  {
    label: "Methodology",
    title: "Recorded across campus",
    body:
      "We will be gathering short audio samples (around 30 to 45 seconds) at different times of the day in six different locations across Campus.",
  },
  {
    label: "Reflections",
    title: "Positionality matters",
    body:
      "The subjectivity of each audio mapping datum—with regards to the listener’s positionality—provides an intriguing look into a dimension of mapping which fields and objects may be unable to provide.",
  },
];

const workflow = [
  "Record 30-45 second clips in six Dartmouth locations using a Zoom H5 recorder",
  "Capture multiple times of day such as morning, afternoon, night, or peak traffic hours",
  "Tag each recording with place, time, description, possible sound markers, and optional imagery",
  "Map the sounds through interactive vectors, playable audio, and time-based filtering",
];

function Loader({ done }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        pointerEvents: done ? "none" : "auto",
        opacity: done ? 0 : 1,
        transition: "opacity 0.9s ease",
        background:
          "radial-gradient(circle at top, rgba(232,113,8,0.16), transparent 32%), #092131",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          width: "min(520px, 86vw)",
          color: palette.cream,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontSize: 12,
            marginBottom: 14,
            opacity: 0.8,
          }}
        >
          initializing audio field
        </div>
        <div
          style={{
            height: 1,
            background: "rgba(248,225,207,0.22)",
            overflow: "hidden",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: done ? "100%" : "72%",
              height: "100%",
              background: `linear-gradient(90deg, ${palette.orange}, ${palette.cream})`,
              boxShadow: `0 0 28px ${palette.orange}`,
              transition: "width 1.2s ease",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            fontSize: 14,
            opacity: 0.9,
          }}
        >
          <span>Project Somewhere Street, 03755</span>
          <span>loading interface</span>
        </div>
      </div>
    </div>
  );
}

function SoundWaveBackdrop() {
  const lines = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${(i / 23) * 100}%`,
        height: `${32 + ((i * 17) % 46)}%`,
        delay: `${(i % 7) * 0.35}s`,
      })),
    []
  );

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 30%, rgba(232,113,8,0.18), transparent 28%), radial-gradient(circle at 72% 58%, rgba(248,225,207,0.09), transparent 26%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0))",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: "8% 4% auto 4%",
          height: "72%",
          border: "1px solid rgba(248,225,207,0.12)",
          borderRadius: 28,
          maskImage: "linear-gradient(180deg, black, transparent)",
        }}
      />

      {lines.map((line) => (
        <span
          key={line.id}
          style={{
            position: "absolute",
            bottom: "14%",
            left: line.left,
            width: 1,
            height: line.height,
            transform: "translateX(-50%)",
            background:
              "linear-gradient(180deg, rgba(248,225,207,0), rgba(248,225,207,0.22), rgba(232,113,8,0.72), rgba(248,225,207,0.18))",
            boxShadow: "0 0 18px rgba(232,113,8,0.18)",
            animation: `wavePulse 4.6s ease-in-out infinite`,
            animationDelay: line.delay,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(248,225,207,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(248,225,207,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          opacity: 0.55,
        }}
      />
    </div>
  );
}

function SectionEyebrow({ children }) {
  return (
    <div
      style={{
        color: "rgba(248,225,207,0.72)",
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        fontSize: 12,
        marginBottom: 18,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-kicker, .hero-title, .hero-subtitle, .hero-actions",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.18,
        }
      );

      gsap.to(".hero-orbit", {
        rotate: 360,
        duration: 26,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      gsap.utils.toArray(".reveal-block").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.04,
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
            },
          }
        );
      });

      gsap.to(".ambient-bar", {
        yPercent: -18,
        stagger: 0.06,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        duration: 2.4,
      });

      gsap.to(".hero-panel", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <>
      <style>{`
        @keyframes wavePulse {
          0%, 100% { transform: translateX(-50%) scaleY(0.82); opacity: 0.42; }
          50% { transform: translateX(-50%) scaleY(1.14); opacity: 1; }
        }

        * { box-sizing: border-box; }
        body { margin: 0; background: ${palette.navy}; }
        html { scroll-behavior: smooth; }

        .home-root {
          min-height: 100vh;
          background:
            radial-gradient(circle at top right, rgba(232,113,8,0.14), transparent 26%),
            linear-gradient(180deg, #0a1f2c 0%, #092131 44%, #071a28 100%);
          color: ${palette.cream};
          font-family: Inter, system-ui, sans-serif;
        }

        .hero {
          position: relative;
          min-height: 100vh;
          padding: 28px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-panel {
          position: relative;
          width: min(1360px, 100%);
          margin: 0 auto;
          padding: 34px;
          border-radius: 34px;
          border: 1px solid rgba(248,225,207,0.12);
          background: linear-gradient(180deg, rgba(8,27,41,0.92), rgba(8,27,41,0.72));
          box-shadow: 0 24px 90px rgba(0,0,0,0.32);
          overflow: hidden;
        }

        .top-nav {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: clamp(40px, 7vw, 88px);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .brand-mark {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: ${palette.orange};
          box-shadow: 0 0 20px rgba(232,113,8,0.5);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .nav-link, .primary-btn, .secondary-btn {
          text-decoration: none;
          color: inherit;
          border-radius: 999px;
          transition: 220ms ease;
        }

        .nav-link {
          padding: 10px 14px;
          border: 1px solid rgba(248,225,207,0.12);
          font-size: 13px;
          color: rgba(248,225,207,0.78);
          backdrop-filter: blur(12px);
        }

        .nav-link:hover,
        .secondary-btn:hover {
          border-color: rgba(248,225,207,0.3);
          color: ${palette.white};
          transform: translateY(-1px);
        }

        .hero-grid {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 36px;
          align-items: end;
        }

        .hero-copy {
          max-width: 820px;
        }

        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border: 1px solid rgba(248,225,207,0.12);
          border-radius: 999px;
          background: rgba(248,225,207,0.04);
          color: rgba(248,225,207,0.72);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          margin-bottom: 24px;
        }

        .hero-title {
          margin: 0;
          font-size: clamp(3.8rem, 9vw, 8rem);
          line-height: 0.94;
          letter-spacing: -0.05em;
          max-width: 10.5ch;
          color: ${palette.cream};
          text-wrap: balance;
        }

        .hero-title-accent {
          display: block;
          color: ${palette.white};
          text-shadow: 0 0 28px rgba(248,225,207,0.08);
        }

        .hero-subtitle {
          max-width: 620px;
          margin: 24px 0 0;
          font-size: clamp(1rem, 1.6vw, 1.25rem);
          line-height: 1.8;
          color: rgba(248,225,207,0.78);
        }

        .hero-actions {
          margin-top: 34px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .primary-btn,
        .secondary-btn {
          padding: 14px 18px;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .primary-btn {
          color: ${palette.navy};
          background: linear-gradient(135deg, ${palette.orange}, #ffa54c);
          box-shadow: 0 16px 36px rgba(232,113,8,0.26);
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 42px rgba(232,113,8,0.34);
        }

        .secondary-btn {
          border: 1px solid rgba(248,225,207,0.18);
          color: ${palette.cream};
          background: rgba(248,225,207,0.04);
        }

        .hero-side {
          display: grid;
          gap: 18px;
          justify-self: end;
          width: min(420px, 100%);
        }

        .signal-card,
        .metric-card,
        .about-card,
        .feature-card {
          position: relative;
          border-radius: 26px;
          border: 1px solid rgba(248,225,207,0.12);
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015));
          backdrop-filter: blur(16px);
          overflow: hidden;
        }

        .signal-card {
          padding: 22px;
          min-height: 300px;
        }

        .signal-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
          font-size: 13px;
          color: rgba(248,225,207,0.72);
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }

        .signal-tag {
          padding: 7px 10px;
          border: 1px solid rgba(248,225,207,0.1);
          border-radius: 999px;
          font-size: 11px;
        }

        .ambient-graph {
          height: 170px;
          display: flex;
          align-items: end;
          gap: 8px;
          margin-top: 24px;
        }

        .ambient-bar {
          flex: 1;
          border-radius: 999px 999px 0 0;
          background: linear-gradient(180deg, rgba(248,225,207,0.14), rgba(232,113,8,0.85));
          box-shadow: inset 0 0 18px rgba(255,255,255,0.12), 0 0 24px rgba(232,113,8,0.16);
        }

        .metric-card {
          padding: 20px 22px;
          display: grid;
          gap: 16px;
        }

        .metric-card h4,
        .about-card h4,
        .feature-card h4 {
          margin: 0;
          font-size: 13px;
          color: rgba(248,225,207,0.7);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-weight: 500;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .metric-box {
          padding: 16px;
          border-radius: 18px;
          background: rgba(248,225,207,0.035);
          border: 1px solid rgba(248,225,207,0.08);
        }

        .metric-value {
          font-size: clamp(1.4rem, 2.4vw, 2rem);
          color: ${palette.white};
          margin-bottom: 8px;
        }

        .metric-label {
          color: rgba(248,225,207,0.68);
          font-size: 13px;
          line-height: 1.5;
        }

        .hero-orbit {
          position: absolute;
          right: -140px;
          top: -140px;
          width: 440px;
          height: 440px;
          border-radius: 999px;
          border: 1px solid rgba(248,225,207,0.1);
          z-index: 1;
        }

        .hero-orbit::before,
        .hero-orbit::after {
          content: "";
          position: absolute;
          inset: 34px;
          border-radius: inherit;
          border: 1px dashed rgba(248,225,207,0.14);
        }

        .hero-orbit::after {
          inset: 92px;
          border-style: solid;
          border-color: rgba(232,113,8,0.18);
        }

        .content-wrap {
          width: min(1360px, calc(100% - 40px));
          margin: 0 auto;
          padding: 64px 0 120px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 26px;
          align-items: start;
          margin-top: 18px;
        }

        .about-main,
        .about-side {
          display: grid;
          gap: 20px;
        }

        .about-card,
        .feature-card {
          padding: 28px;
        }

        .section-title {
          margin: 0 0 18px;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1;
          color: ${palette.white};
          letter-spacing: -0.04em;
        }

        .section-body {
          margin: 0;
          line-height: 1.86;
          color: rgba(248,225,207,0.78);
          font-size: 1rem;
        }

        .workflow-list {
          display: grid;
          gap: 12px;
          margin-top: 18px;
        }

        .workflow-item {
          display: grid;
          grid-template-columns: 44px 1fr;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 18px;
          border: 1px solid rgba(248,225,207,0.08);
          background: rgba(248,225,207,0.035);
        }

        .workflow-index {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          color: ${palette.navy};
          background: linear-gradient(135deg, ${palette.orange}, #ffb066);
          font-weight: 700;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin-top: 52px;
        }

        .about-card p,
        .feature-card p {
          margin: 10px 0 0;
          color: rgba(248,225,207,0.76);
          line-height: 1.75;
        }

        .about-card-label {
          color: ${palette.orange};
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.18em;
          margin-bottom: 16px;
        }

        .footer-band {
          margin-top: 60px;
          padding: 26px 28px;
          border-radius: 28px;
          border: 1px solid rgba(248,225,207,0.12);
          background: linear-gradient(180deg, rgba(248,225,207,0.04), rgba(248,225,207,0.02));
          display: flex;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
          color: rgba(248,225,207,0.76);
        }

        @media (max-width: 1080px) {
          .hero-grid,
          .about-grid,
          .cards-grid {
            grid-template-columns: 1fr;
          }

          .hero-side {
            justify-self: stretch;
            width: 100%;
          }
        }

        @media (max-width: 720px) {
          .hero { padding: 16px; }
          .hero-panel { padding: 22px; border-radius: 26px; }
          .top-nav { align-items: flex-start; flex-direction: column; }
          .hero-title { font-size: clamp(3rem, 14vw, 4.8rem); }
          .hero-actions { flex-direction: column; align-items: stretch; }
          .primary-btn, .secondary-btn { justify-content: center; }
          .metric-grid { grid-template-columns: 1fr; }
          .content-wrap { width: min(100% - 24px, 1360px); padding-bottom: 88px; }
        }
      `}</style>

      <Loader done={loaded} />

      <main ref={rootRef} className="home-root">
        <section className="hero">
          <div className="hero-panel">
            <SoundWaveBackdrop />
            <div className="hero-orbit" />

            <nav className="top-nav">
              <div className="brand">
                <span className="brand-mark" />
                <span>ABG / Somewhere Street</span>
              </div>

              <div className="nav-links">
                <a className="nav-link" href="#about">About</a>
                <a className="nav-link" href="#method">Method</a>
                <Link className="nav-link" to="/map">Map</Link>
              </div>
            </nav>

            <div className="hero-grid">
              <div className="hero-copy">
                <div className="hero-kicker">Trak P./ Bowen H./ Nigel J.</div>
                <h1 className="hero-title">
                  Project Somewhere Street,
                  <span className="hero-title-accent">03755</span>
                </h1>
                <p className="hero-subtitle">
                  An Audio-Based Geonavigation Project of Dartmouth College
                </p>
                <p className="hero-subtitle" style={{ maxWidth: 700 }}>
                  A spatial interface for listening to Dartmouth through time, atmosphere,
                  and memory. Project Somewhere Street asks what the benefits are of using
                  an auditory data model rather than relying only on the familiar binary of
                  field and object data models in GIS.
                </p>

                <div className="hero-actions">
                  <Link className="primary-btn" to="/map">
                    Enter the sound map
                    <span aria-hidden>↗</span>
                  </Link>
                  <a className="secondary-btn" href="#about">
                    Read project overview
                  </a>
                </div>
              </div>

              <div className="hero-side">
                <div className="signal-card reveal-block">
                  <div className="signal-head">
                    <span>RASTER + VECTOR + AUDIO</span>
                    <span className="signal-tag">3rd Ontology</span>
                  </div>

                  <div className="ambient-graph">
                    {[68, 46, 92, 54, 78, 36, 88, 58, 70, 48, 96, 40].map((h, i) => (
                      <div
                        key={i}
                        className="ambient-bar"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="metric-card reveal-block">
                  <h4>Project frame</h4>
                  <div className="metric-grid">
                    <div className="metric-box">
                      <div className="metric-value">06</div>
                      <div className="metric-label">Core recording sites: Baker-Berry Library, North Main Street, Frat Row, FOCO, The Hop, and Alumni Gym</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-value">30–45s</div>
                      <div className="metric-label">Typical sample length captured across morning, afternoon, and night recordings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="content-wrap">
          <SectionEyebrow>About the project</SectionEyebrow>
          <div className="about-grid">
            <div className="about-main reveal-block">
              <div className="feature-card">
                <h2 className="section-title">Background</h2>
                <p className="section-body">
                  This website and project starts with a simple, unassuming question:
                </p>
                <p className="section-body" style={{ marginTop: 18, fontStyle: "italic", color: palette.white }}>
                  “What does Foco sound like?”
                </p>
                <p className="section-body" style={{ marginTop: 18 }}>
                  It’s silly, yes, but it offers a springboard into a more interesting conversation about mapping places on campus. See, in Schuurman’s article, Social Dimensions of Object Definition in GIS, he states, “The continued binary between objects and fields is self-reinforcing, and limits the likelihood of developing alternatives” (32). This “binary,” according to Schuurman, is that between two available data models (or ontologies) which he feels we exclusively focus on: fields and objects.
                </p>
                <p className="section-body" style={{ marginTop: 18 }}>
                  Field data models, in mapping, can be envisioned as layers which map the same geographic coordinates, with each containing specific information about that location. Object data models, on the other hand, need not map the same location. Rather, this model focuses on individual objects such as houses, roads, trees, and more.
                </p>
                <p className="section-body" style={{ marginTop: 18 }}>
                  So, we then ask, what could be an interesting contender for a Third Ontology? Perhaps a type of mapping which could offer something past the benefits of fields and objects which dominate the global mapping landscape? Among many fun possibilities, we chose to focus on the power of sound mapping as that third ontology. Through our experiences recording sounds in six different locations on Dartmouth campus—Baker-Berry Library, North Main Street, Frat Row, 1953 Class of Commons (Foco), The Hop, and Alumni Gym—and with the collation of these audio samples and the development of this website, we can glean the benefits of this third ontology as compared to fields and objects.
                </p>
                <p className="section-body" style={{ marginTop: 18 }}>
                  One such benefit is the addition of what we call a temporal dimension. Simply, we are also interested in how the sounds of these six locations change over time. How does North Main Street sound in the morning (perhaps right after common class times) versus at night when there is less vehicle and human traffic? How does Foco sound during lunch periods versus at “Late Night”? How does First Floor Berry sound during class times versus at peak evening working hours for many students? While we need not be this specific when collecting our audio samples, it is still interesting to compare the audio makeup of these locations due to this change in time.
                </p>
                <p className="section-body" style={{ marginTop: 18 }}>
                  Further, we are also acknowledging the “social dimension” described in Schuurman’s writing—in our experience of collecting and sharing auditory mapping data with other people, we are tapping into the listener’s (and our own) social and technical influences. That is, we acknowledge the listener’s positionality as they interact with the gathered audios. How each person remembers or even describes the sounds of, say, the Hop is unique to their own experiences, memories, and familiarity with this location, and so their positionality necessarily changes how they interact with our audio map.
                </p>
                <p className="section-body" style={{ marginTop: 18 }}>
                  Ms. Aletha Spang, our TA for GEOG 4.02, also recommended the following piece about Audio Cartography written by Kornfeld, Shiewe, & Dykes (2011). In this paper, they provide “fundamental building blocks for communication, documentation, and presentation based on auditory and visual perception to involve all stakeholders concerned with the sonic environment” (1). They provide numerous key motivations and tenets for effectively communicating sound through graphical means. “Existing communication techniques in science and practice indicate that mapping sound as the cartographic display of acoustic data on maps is an appropriate instrument for an integrative and interdisciplinary documentation of the sonic environment.”
                </p>
                <p className="section-body" style={{ marginTop: 18 }}>
                  While much of this paper deals with the graphical language to connect sound information such as noise pressure, types of audio traffic, dominant sound marks, sound sources, etc. to visual cues, it still provides evidence for the usefulness of another, more sound-based ontology for mapping spaces.
                </p>
                <p className="section-body" style={{ marginTop: 18, fontStyle: "italic", color: palette.white }}>
                  “What are the benefits of using an auditory data model<br />as opposed to a binary field and data model?”
                </p>
              </div>

              <div id="method" className="feature-card reveal-block">
                <h4>Methodology</h4>
                <p>
                  As mentioned, we will be gathering short audio samples (around 30 to 45 seconds) at different times of the day (morning, afternoon, night, or at peak human traffic hours) in six different locations across Campus: Baker-Berry Library, North Main Street, Frat Row, 1953 Class of Commons (Foco), The Hop, and Alumni Gym. We will be using a Zoom H5 Recorder (borrowed from Jones Media Center) to record audio. As suggested by our peer, Corey Heubner ‘26, we will also acknowledge the ethics of recording in public spaces. Should we record data that has intelligible, discernible, identifiable, and private sounds (e.g., a private conversation), we will make sure to reach out to the involved persons to ask for express permission to use the sounds for this class project.
                </p>
                <p>
                  In the initial stages of our project, we also considered opening the website to the public to allow volunteers to add more audio samples and data such as descriptions, time stamps, tags (of possible sounds in the recording), and (optionally) a picture of the recorded location. This was in an effort to aggregate a queryable database of sounds across Dartmouth campus.
                </p>
                <p>
                  After collecting sounds, we will then develop an online website that features an interactive map of Dartmouth campus. The six locations will have interactable vector images which, when clicked, will show more information about the location (such as the name, a picture, a link to Google Maps) together with the playable audio file. We will also include a slider range on the map which users can use to choose the time of day to listen to. So, when the slider range is set to “morning,” users can listen to the audio samples collected during morning times.
                </p>
                <div className="workflow-list">
                  {workflow.map((item, i) => (
                    <div key={item} className="workflow-item">
                      <div className="workflow-index">{String(i + 1).padStart(2, "0")}</div>
                      <div>{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-side">
              <div className="feature-card reveal-block">
                <h4>Reflections</h4>
                <p>
                  We each found the “social dimension” of mapping these six locations to be an interesting experience. As mentioned above, we were aware of our own positionality when recording audio samples; how we collected data was directly influenced by our experiences at these locations. (For example, we would often ask ourselves, “How do we best record this location so that it really sounds like that location? What are the specific sound markers that could help the listener identify this location?”) Of course, these questions circulate around our own definition of these locations, which is influenced by our social awareness of experiences of it. So, being able to share these personal influences through an online website has been an interesting exercise for us in a shared, collective experience of a location through sound. We also found that through using our map interface, we can overlay multiple audios at the same time and experience the immersive surround audio of the place. By mixing and matching different audio strings to play concurrently, we build a soundscape unique to that location. Another thing is the contrast of sound in many places. We chose to record audio at certain places during an unexpected time to remove stereotypes and expectations one may have of the place. For example, we recorded Frat Row during the day, which was serene and quiet. The temporal condition we added also played a big role. Being able to play different audio of the same place layered by time (by having the entire timescale present), gives us a high dynamic range audio representation of the place through different times of the day in one cohesive audio.
                </p>
              </div>

              <div className="feature-card reveal-block">
                <h4>Why this matters</h4>
                <p>
                  A big part of this project has been inquiring the benefits of audio mapping as the third ontology. Apart from the temporal dimension which we have discussed in theory and implemented in this website, the more fluid definition and representation of each location through sound has been an interesting thought bubble in the discussion of audio mapping versus field and object data models. While the power of these more common data models can be seen in the objective, effective communication of information through different methods, the subjectivity of each audio mapping datum—with regards to the listener’s positionality—provides an intriguing look into a dimension of mapping which fields and objects may be unable to provide.
                </p>
              </div>
            </div>
          </div>

          <div className="cards-grid">
            {aboutCards.map((card) => (
              <article key={card.title} className="about-card reveal-block">
                <div className="about-card-label">{card.label}</div>
                <h3 style={{ margin: 0, fontSize: 28, lineHeight: 1.05, color: palette.white }}>
                  {card.title}
                </h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>

          <div className="feature-card reveal-block" style={{ marginTop: 32 }}>
            <h4>Limitations and Acknowledgement</h4>
            <p style={{ minHeight: 120 }}>
              We found it really surprisingly difficult to combine raster and vector. Because of the nature of our OpenStreetMap API map, zooming in and out loses the vectorized coordinates which are based on latitude and longitude. This made it difficult to have the audio markers (which are vectorized) stay in the same place as users zoom in and out of the map. We tried a lot of different methods to solve this problem, but we were ultimately found that the solution within our timeline would be to limit the zoom. We also acknowledge that Open Public Data of audio samples may be a violation of privacy so we chose to limit it to our controlled audio samples of which we can receive consent.
            </p>
          </div>

          <div className="footer-band reveal-block">
            <div>
              Somewhere Street asks what becomes possible when spatial knowledge is heard as well as seen.
            </div>
            <div>
              Built as an Audio-Based Geonavigation Project focused on temporal variation, positionality, and the sonic environment of Dartmouth.
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
