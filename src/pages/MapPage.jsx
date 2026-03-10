import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const DARTMOUTH_CENTER = [-72.2887, 43.7044];
const DARTMOUTH_BOUNDS = [
  [-72.315, 43.690],
  [-72.265, 43.723],
];

// audio points
const AUDIO_POINTS = [
  {
    id: 1,
    title: "Baker Library Reiss Hall",
    lng: -72.28863982755695,
    lat: 43.70517889517891,
    startMin: 900,
    endMin: 1020,
    imageUrl: "/data/img/library.png",
    audioUrl: "/data/audio/reiss.m4a",
    tags: ["library", "study", "chatter"],
    locationTag: "baker_library",
    description: "Chatter in the Reiss Hall of Baker Library.",
  },

  {
    id: 8,
    title: "First Floor berry",
    lng: -72.2889812936792,
    lat: 43.7055651239069,
    startMin: 1080,
    endMin: 1200,
    imageUrl: "/data/img/library.png",
    audioUrl: "/data/audio/ffb.m4a",
    tags: ["library", "study", "chatter"],
    locationTag: "baker_library",
    description: "Loud conversations over First Floor Berry. People studying.",
  },

  {
    id: 9,
    title: "Second Floor berry",
    lng: -72.2889812936792,
    lat: 43.7055651239069,
    startMin: 1080,
    endMin: 1200,
    imageUrl: "/data/img/library.png",
    audioUrl: "/data/audio/2fb.m4a",
    tags: ["library", "study", "chatter"],
    locationTag: "baker_library",
    description: "Medium chatter in Jones Media Center.",
  },

  {
    id: 10,
    title: "Third Floor berry",
    lng: -72.2889812936792,
    lat: 43.7055651239069,
    startMin: 1080,
    endMin: 1200,
    imageUrl: "/data/img/library.png",
    audioUrl: "/data/audio/3fb.m4a",
    tags: ["library", "study", "quiet zone"],
    locationTag: "baker_library",
    description: "No noise area in 3fb.",
  },

  {
    id: 11,
    title: "1902 Room",
    lng: -72.29001357088967,
    lat: 43.7050023971717,
    startMin: 900,
    endMin: 1020,
    imageUrl: "/data/img/library.png",
    audioUrl: "/data/audio/1902.m4a",
    tags: ["library", "study", "board games", "playing"],
    locationTag: "baker_library",
    description: "People playing boardgames and chatting in the 1902 Room.",
  },

  {
    id: 2,
    title: "FOCO Lunch Rush",
    lng: -72.2922352196727,
    lat: 43.703070474079745,
    startMin: 660,
    endMin: 780,
    imageUrl: "/data/img/foco2.png",
    audioUrl: "/audio/foco-lunch.mp3",
    tags: ["dining", "crowd", "midday"],
    locationTag: "foco",
    description: "Dense conversational sound, trays, doors, and movement around lunch time at FOCO.",
  },

  {
    id: 3,
    title: "Frat Row Night Atmosphere",
    lng: -72.29118708775829,
    lat: 43.706278739935556,
    startMin: 1320,
    endMin: 0,
    imageUrl: "/data/frat-row.jpg",
    audioUrl: "/audio/frat-row-night.mp3",
    tags: ["night", "social", "street"],
    locationTag: "frat_row",
    description: "Late-night atmosphere with voices, passing footsteps, and distant music.",
  },

  {
    id: 4,
    title: "HOP Courtyard Cafe",
    lng: -72.2900000251631,
    lat: 43.701534345427696,
    startMin: 1020,
    endMin: 1140,
    imageUrl: "/data/img/hop2.png",
    audioUrl: "/data/audio/courtyard.m4a",
    tags: ["HOP", "food", "cafeteria"],
    locationTag: "hop",
    description: "Early evening dinner atmosphere before the dinner rush.",
  },

  {
    id: 5,
    title: "Small Piano Practice Room",
    lng: -72.2903000251631,
    lat: 43.70119197678151,
    startMin: 1020,
    endMin: 1140,
    imageUrl: "/data/img/hop2.png",
    audioUrl: "/data/audio/pianoroom.m4a",
    tags: ["HOP", "music", "piano", "practice"],
    locationTag: "hop",
    description: "Someone practicing piano in a small practice room, disrupting the quiet atmosphere.",
  },

  {
    id: 6,
    title: "Outside Medium Practice Hall",
    lng: -72.2903000251631,
    lat: 43.70119197678151,
    startMin: 1020,
    endMin: 1140,
    imageUrl: "/data/img/hop2.png",
    audioUrl: "/data/audio/medrecite.m4a",
    tags: ["HOP", "music", "piano", "practice"],
    locationTag: "hop",
    description: "A set.",
  },

  {
    id: 7,
    title: "Large Practice Hall",
    lng: -72.2903000251631,
    lat: 43.70119197678151,
    startMin: 1020,
    endMin: 1140,
    imageUrl: "/data/img/hop2.png",
    audioUrl: "/data/audio/bigrecite.m4a",
    tags: ["HOP", "music", "piano", "practice"],
    locationTag: "hop",
    description: "A set.",
  },

  {
    id: 12,
    title: "Novack Cafe",
    lng: -72.2909812936792,
    lat: 43.705791415028145,
    startMin: 1080,
    endMin: 1200,
    imageUrl: "/data/img/library.png",
    audioUrl: "/data/audio/Novack.m4a",
    tags: ["library", "study", "food", "cafeteria", "music"],
    locationTag: "baker_library",
    description: "Popular cafe study spot with all day food services and vibrant background music.",
  },

  {
    id: 13,
    title: "Stacks",
    lng: -72.29152936792,
    lat: 43.7053415028145,
    startMin: 1080,
    endMin: 1200,
    imageUrl: "/data/img/library.png",
    audioUrl: "/data/audio/stacks.m4a",
    tags: ["library", "study", "quiet zone"],
    locationTag: "baker_library",
    description: "Ultra quiet study space for locking in.",
  },

  {
    id: 14,
    title: "Gym Reception Couches",
    lng: -72.2869578920499,
    lat: 43.70280034886741,
    startMin: 1140,
    endMin: 1260,
    imageUrl: "/data/gym.jpg",
    audioUrl: "/data/audio/GYMCOUCHES.m4a",
    tags: ["gym", "exercise", "lobby"],
    locationTag: "alumni_gymnasium",
    description: "Resting area and reception lobby for the gym.",
  },

  {
    id: 15,
    title: "Lewinstein Athletic Center",
    lng: -72.2869578920499,
    lat: 43.702834590349795,
    startMin: 1140,
    endMin: 1260,
    imageUrl: "/data/gym.jpg",
    audioUrl: "/data/audio/LEWINSTEIN.m4a",
    tags: ["gym", "exercise", "weightlifting"],
    locationTag: "alumni_gymnasium",
    description: "The main weightlifting and equipment center of the gym.",
  },

  {
    id: 16,
    title: "Basketball Court",
    lng: -72.287778920499,
    lat: 43.70276936846264,
    startMin: 1140,
    endMin: 1260,
    imageUrl: "/data/gym.jpg",
    audioUrl: "/data/audio/BBALL.m4a",
    tags: ["gym", "exercise", "basketball"],
    locationTag: "alumni_gymnasium",
    description: "The basketball at the gym.",
  },
];

const darkMatterStyle = {
  version: 8,
  sources: {
    cartoDark: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        "https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors © CARTO",
    },
  },
  layers: [
    {
      id: "carto-dark",
      type: "raster",
      source: "cartoDark",
    },
  ],
};

const lightMatterStyle = {
  version: 8,
  sources: {
    cartoLight: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
        "https://d.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors © CARTO",
    },
  },
  layers: [
    {
      id: "carto-light",
      type: "raster",
      source: "cartoLight",
    },
  ],
};

function formatMinutes(totalMinutes) {
  const mins = ((totalMinutes % 1440) + 1440) % 1440;
  const hours24 = Math.floor(mins / 60);
  const minutes = mins % 60;
  const suffix = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function isNightRange(startMin, endMin) {
  // decide theme from midpoint of selected window
  let midpoint;
  if (startMin <= endMin) {
    midpoint = Math.floor((startMin + endMin) / 2);
  } else {
    const wrappedEnd = endMin + 1440;
    midpoint = Math.floor((startMin + wrappedEnd) / 2) % 1440;
  }

  // night = before 6 AM or after 6 PM
  return midpoint < 360 || midpoint >= 1080;
}

function rangeOverlaps(pointStart, pointEnd, selectedStart, selectedEnd) {
  const expandRange = (start, end) => {
    if (start <= end) return [[start, end]];
    return [
      [start, 1440],
      [0, end],
    ];
  };

  const pointRanges = expandRange(pointStart, pointEnd);
  const selectedRanges = expandRange(selectedStart, selectedEnd);

  for (const [ps, pe] of pointRanges) {
    for (const [ss, se] of selectedRanges) {
      if (ps <= se && pe >= ss) return true;
    }
  }
  return false;
}

export default function MapPage() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRefs = useRef([]);
  const audioRefs = useRef({});
  const playButtonRefs = useRef({});

  const [status, setStatus] = useState("initializing…");
  const [startMin, setStartMin] = useState(480);  // 8:00 AM
  const [endMin, setEndMin] = useState(1080);     // 6:00 PM

  const isNight = useMemo(
    () => isNightRange(startMin, endMin),
    [startMin, endMin]
  );

  const filteredPoints = useMemo(() => {
    return AUDIO_POINTS.filter((point) =>
      rangeOverlaps(point.startMin, point.endMin, startMin, endMin)
    );
  }, [startMin, endMin]);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (mapRef.current) return;

    const FIXED_ZOOM = 16.2;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: isNight ? darkMatterStyle : lightMatterStyle,
      center: DARTMOUTH_CENTER,
      zoom: FIXED_ZOOM,
      minZoom: FIXED_ZOOM,
      maxZoom: FIXED_ZOOM,
      maxBounds: DARTMOUTH_BOUNDS,
    });

    map.addControl(new maplibregl.NavigationControl(), "bottom-right");

    map.on("styledata", () => {
      setStatus("");
    });

    map.on("load", () => {
      setStatus("Map loaded ✅");
    });

    map.on("error", (e) => {
      const msg = e?.error?.message || String(e?.error || e);
      setStatus(`error: ${msg}`);
    });

    mapRef.current = map;

    return () => {
      markerRefs.current.forEach((m) => m.remove());
      markerRefs.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.setStyle(isNight ? darkMatterStyle : lightMatterStyle);
  }, [isNight]);

  useEffect(() => {
  const map = mapRef.current;
  if (!map) return;

  markerRefs.current.forEach((m) => m.remove());
  markerRefs.current = [];

  filteredPoints.forEach((point) => {
    const markerEl = document.createElement("button");
    markerEl.className = "audio-pin";
    markerEl.setAttribute("aria-label", point.title);
    markerEl.setAttribute("data-location-tag", point.locationTag);

    const pulseEl = document.createElement("span");
    pulseEl.className = "audio-pin-pulse";

    const coreEl = document.createElement("span");
    coreEl.className = "audio-pin-core";

    markerEl.appendChild(pulseEl);
    markerEl.appendChild(coreEl);

    const popupNode = document.createElement("div");
    popupNode.className = "popup-card";

    const imageBlock = point.imageUrl
      ? `<img class="popup-image" src="${point.imageUrl}" alt="${point.title}" />`
      : `<div class="popup-image popup-image-placeholder">Image coming soon</div>`;

    const tagsHtml = point.tags
      .map((tag) => `<span class="popup-tag">${tag}</span>`)
      .join("");

    popupNode.innerHTML = `
      <div class="popup-top">
        <div>
          <div class="popup-eyebrow">Audio Point</div>
          <div class="popup-title">${point.title}</div>
        </div>
      </div>

      <div class="popup-media-wrap">
        ${imageBlock}
      </div>

      <div class="popup-time">
        ${formatMinutes(point.startMin)} – ${formatMinutes(point.endMin)}
      </div>

      <div class="popup-description">
        ${point.description || "No description yet."}
      </div>

      <div class="popup-tag-row">
        ${tagsHtml}
      </div>

      <div class="popup-location-tag">
        Location tag: <strong>${point.locationTag}</strong>
      </div>

      <button class="popup-play-btn" type="button">
        ▶ Play sound
      </button>
    `;

    const popup = new maplibregl.Popup({
      anchor: "left",
      offset: [150, 0],
      closeButton: true,
      className: "custom-audio-popup",
    }).setDOMContent(popupNode);

    const marker = new maplibregl.Marker({ element: markerEl })
      .setLngLat([point.lng, point.lat])
      .setPopup(popup)
      .addTo(map);

    markerEl.addEventListener("click", () => {
      markerEl.classList.add("active");
    });

    popup.on("open", () => {
      markerEl.classList.add("active");

      const playBtn = popupNode.querySelector(".popup-play-btn");
      if (!playBtn) return;

      // Reuse one audio object per point
      if (!audioRefs.current[point.id]) {
        const audio = new Audio(point.audioUrl);

        audio.addEventListener("play", () => {
          const btn = playButtonRefs.current[point.id];
          if (btn) btn.textContent = "❚❚ Pause sound";
        });

        audio.addEventListener("pause", () => {
          const btn = playButtonRefs.current[point.id];
          if (btn && !audio.ended) btn.textContent = "▶ Play sound";
        });

        audio.addEventListener("ended", () => {
          const btn = playButtonRefs.current[point.id];
          if (btn) btn.textContent = "▶ Play sound";
          audio.currentTime = 0;
        });

        audioRefs.current[point.id] = audio;
      }

      const audio = audioRefs.current[point.id];
      playButtonRefs.current[point.id] = playBtn;

      // Sync button label with current audio state
      playBtn.textContent = audio.paused ? "▶ Play sound" : "❚❚ Pause sound";

      // Avoid stacking listeners by assigning onclick directly
      playBtn.onclick = async () => {
        try {
          if (audio.paused) {
            await audio.play();
          } else {
            audio.pause();
          }
        } catch (err) {
          console.error("Audio playback failed:", err);
        }
      };
    });

    popup.on("close", () => {
      markerEl.classList.remove("active");
      delete playButtonRefs.current[point.id];
    });

    markerRefs.current.push(marker);
  });

  return () => {
    markerRefs.current.forEach((m) => m.remove());
    markerRefs.current = [];
  };
}, [filteredPoints]);

useEffect(() => {
  return () => {
    Object.values(audioRefs.current).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    audioRefs.current = {};
    playButtonRefs.current = {};
  };
}, []);

  const handleReset = () => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: DARTMOUTH_CENTER,
      zoom: 15.2,
      essential: true,
    });
  };

  return (
    <>
      <style>{`
        :root {
          --navy: #092131;
          --orange: #e87108;
          --cream: #f8e1cf;
          --white: #ffffff;
        }

        html, body, #root {
          margin: 0;
          height: 100%;
          background: var(--navy);
        }

        .mapShell {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: ${isNight ? "#06131d" : "#eef1f4"};
        }

        .mapLayer {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .mapShell .maplibregl-canvas {
          filter: ${isNight
            ? "contrast(1.04) brightness(0.92) saturate(0.92)"
            : "contrast(1.02) brightness(1.02) saturate(0.88)"};
          transition: filter 300ms ease;
        }

        .mapVignette {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: ${
            isNight
              ? "radial-gradient(circle at center, rgba(0,0,0,0) 36%, rgba(0,0,0,0.34) 100%)"
              : "radial-gradient(circle at center, rgba(255,255,255,0) 38%, rgba(9,33,49,0.08) 100%)"
          };
        }

        .blueprintGrid {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background-image:
            linear-gradient(${isNight ? "rgba(248,225,207,0.05)" : "rgba(9,33,49,0.06)"} 1px, transparent 1px),
            linear-gradient(90deg, ${isNight ? "rgba(248,225,207,0.05)" : "rgba(9,33,49,0.06)"} 1px, transparent 1px);
          background-size: 72px 72px;
          opacity: 0.28;
        }

        .audioGlow {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 50%, rgba(232,113,8,0.08), transparent 34%),
            radial-gradient(circle at 30% 40%, rgba(232,113,8,0.05), transparent 24%);
          mix-blend-mode: screen;
        }

        .topBar {
          position: fixed;
          top: 18px;
          left: 18px;
          right: 18px;
          z-index: 20;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
          pointer-events: none;
        }

        .topLeft, .topRight {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          pointer-events: auto;
        }

        .glassCard {
          border: 1px solid ${isNight ? "rgba(248,225,207,0.14)" : "rgba(9,33,49,0.12)"};
          background: ${isNight ? "rgba(9,33,49,0.74)" : "rgba(255,255,255,0.78)"};
          backdrop-filter: blur(16px);
          color: ${isNight ? "var(--cream)" : "var(--navy)"};
          border-radius: 18px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.18);
        }

        .titleCard {
          padding: 14px 18px;
          min-width: 280px;
        }

        .eyebrow {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          opacity: 0.7;
          margin-bottom: 8px;
        }

        .title {
          font-size: 18px;
          line-height: 1.2;
          color: ${isNight ? "var(--white)" : "var(--navy)"};
          margin: 0;
        }

        .subtitle {
          margin-top: 6px;
          font-size: 13px;
          color: ${isNight ? "rgba(248,225,207,0.75)" : "rgba(9,33,49,0.72)"};
        }

        .homeBtn {
          position: fixed;
          bottom: 20px;
          left: 220px;
          z-index: 20;
          padding: 12px 16px;
          border-radius: 999px;
          border: 1px solid ${isNight ? "rgba(248,225,207,0.16)" : "rgba(9,33,49,0.12)"};
          background: ${isNight ? "rgba(9,33,49,0.82)" : "rgba(255,255,255,0.84)"};
          color: ${isNight ? "var(--cream)" : "var(--navy)"};
          backdrop-filter: blur(14px);
          cursor: pointer;
          font-size: 14px;
          transition: 220ms ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .homeBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(232,113,8,0.5);
        }
        .controlPanel {
          padding: 16px;
          width: min(380px, 92vw);
        }

        .controlTitle {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          opacity: 0.7;
          margin-bottom: 12px;
        }

        .timeLabel {
          font-size: 15px;
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .sliderGroup {
          display: grid;
          gap: 12px;
        }

        .sliderRow {
          display: grid;
          gap: 6px;
        }

        .sliderRow label {
          font-size: 12px;
          opacity: 0.72;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .sliderRow input[type="range"] {
          width: 100%;
          accent-color: var(--orange);
        }

        .themeChip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          padding: 8px 10px;
          border-radius: 999px;
          font-size: 12px;
          background: ${isNight ? "rgba(248,225,207,0.08)" : "rgba(9,33,49,0.06)"};
        }

        .themeDot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: ${isNight ? "var(--orange)" : "#092131"};
        }

        .resetBtn {
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 20;
          padding: 12px 16px;
          border-radius: 999px;
          border: 1px solid ${isNight ? "rgba(248,225,207,0.16)" : "rgba(9,33,49,0.12)"};
          background: ${isNight ? "rgba(9,33,49,0.82)" : "rgba(255,255,255,0.84)"};
          color: ${isNight ? "var(--cream)" : "var(--navy)"};
          backdrop-filter: blur(14px);
          cursor: pointer;
          font-size: 14px;
          transition: 220ms ease;
        }

        .resetBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(232,113,8,0.5);
        }

        .mapHint {
          position: fixed;
          bottom: 20px;
          right: 88px;
          z-index: 20;
          padding: 12px 14px;
          max-width: 320px;
          font-size: 13px;
          line-height: 1.5;
          color: ${isNight ? "rgba(248,225,207,0.76)" : "rgba(9,33,49,0.75)"};
        }

        .audio-pin {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          border: 2px solid ${isNight ? "var(--cream)" : "var(--white)"};
          background: var(--orange);
          box-shadow: 0 0 0 6px rgba(232,113,8,0.18);
          cursor: pointer;
        }

        .popup-card {
          min-width: 180px;
          font-family: Inter, system-ui, sans-serif;
        }

        .popup-eyebrow {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          opacity: 0.6;
          margin-bottom: 6px;
        }

        .popup-title {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .popup-time {
          font-size: 13px;
          opacity: 0.72;
        }
          .audio-pin {
  position: relative;
  width: 26px;
  height: 26px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.audio-pin-pulse {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: rgba(232, 113, 8, 0.22);
  transform: scale(1);
  transition: transform 260ms ease, opacity 260ms ease;
  opacity: 0.9;
}

.audio-pin-core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  background: #e87108;
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px rgba(232, 113, 8, 0.18);
}

.audio-pin:hover .audio-pin-pulse,
.audio-pin.active .audio-pin-pulse {
  transform: scale(1.85);
  opacity: 0.45;
}

.audio-pin.active .audio-pin-core {
  box-shadow: 0 0 0 8px rgba(232, 113, 8, 0.08);
}

.custom-audio-popup .maplibregl-popup-content {
  padding: 0;
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
  max-width: min(340px, calc(100vw - 32px));
}
  .custom-audio-popup .maplibregl-popup-close-button {
  font-size: 18px;
  padding: 8px 10px;
  color: rgba(9, 33, 49, 0.72);
}

.popup-card {
  width: min(320px, calc(100vw - 32px));
  max-width: 100%;
  font-family: Inter, system-ui, sans-serif;
  color: #092131;
  display: flex;
  flex-direction: column;
}

.popup-top {
  padding: 18px 18px 10px 18px;
  min-width: 0;
}

.popup-eyebrow {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  opacity: 0.56;
  margin-bottom: 8px;
}

.popup-title {
  font-size: clamp(1.55rem, 4.6vw, 2.2rem);
  line-height: 1.02;
  font-weight: 700;
  margin: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.popup-media-wrap {
  padding: 0 18px;
}

.popup-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 180px;
  object-fit: cover;
  border-radius: 14px;
  display: block;
  background: #e9ecef;
}

.popup-image-placeholder {
  display: grid;
  place-items: center;
  color: rgba(9, 33, 49, 0.55);
  font-size: 13px;
  min-height: 140px;
}

.popup-time {
  padding: 14px 18px 0 18px;
  font-size: 15px;
  color: rgba(9, 33, 49, 0.72);
  line-height: 1.45;
}

.popup-description {
  padding: 10px 18px 0 18px;
  font-size: 14px;
  line-height: 1.65;
  color: rgba(9, 33, 49, 0.78);
  overflow-wrap: anywhere;
}

.popup-tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 14px 18px 0 18px;
}

.popup-tag {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(232, 113, 8, 0.1);
  color: #b65500;
  font-size: 12px;
  font-weight: 500;
}

.popup-location-tag {
  padding: 14px 18px 0 18px;
  font-size: 12px;
  color: rgba(9, 33, 49, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  overflow-wrap: anywhere;
}

.popup-play-btn {
  margin: 16px 18px 18px 18px;
  width: auto;
  min-height: 46px;
  border: none;
  border-radius: 12px;
  padding: 12px 14px;
  background: #e87108;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.popup-play-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(232, 113, 8, 0.22);
}

        @media (max-width: 720px) {
          .topBar {
            flex-direction: column;
            align-items: stretch;
          }

          .topLeft, .topRight {
            width: 100%;
          }

          .titleCard {
            min-width: 0;
            width: 100%;
          }

          .mapHint {
            display: none;
          }
        }
      `}</style>

      <div className="mapShell">
        <div ref={mapContainer} className="mapLayer" />
        <div className="mapVignette" />
        <div className="blueprintGrid" />
        <div className="audioGlow" />

        <div className="topBar">
          <div className="topLeft">
            <div className="glassCard titleCard">
              <div className="eyebrow">Project Somewhere Street, 03755</div>
              <h1 className="title">Audio-Based Geonavigation Map</h1>
              <div className="subtitle">
                Try playing multiple audios concurrently to create your own soundscape of Dartmouth!
                <br />
                The map is best experienced with headphones.
              </div>
            </div>
          </div>

          <div className="topRight" style={{ flexDirection: "column" }}>

            <div className="glassCard controlPanel">
              <div className="controlTitle">Time filter</div>
              <div className="timeLabel">
                Showing sounds from <strong>{formatMinutes(startMin)}</strong> to{" "}
                <strong>{formatMinutes(endMin)}</strong>
              </div>

              <div className="sliderGroup">
                <div className="sliderRow">
                  <label>Start time</label>
                  <input
                    type="range"
                    min="0"
                    max="1439"
                    value={startMin}
                    onChange={(e) => setStartMin(Number(e.target.value))}
                  />
                </div>

                <div className="sliderRow">
                  <label>End time</label>
                  <input
                    type="range"
                    min="0"
                    max="1439"
                    value={endMin}
                    onChange={(e) => setEndMin(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="themeChip">
                <span className="themeDot" />
                {isNight ? "Night theme active" : "Day theme active"}
              </div>
            </div>
          </div>
        </div>

        <button className="resetBtn" onClick={handleReset}>
          Reset to Dartmouth
        </button>

        <Link to="/" className="homeBtn">
          ← Back to Home
        </Link>

        <div className={`glassCard mapHint`}>
          Audio points are filtered by whether their recording time overlaps the selected
          time window. The basemap automatically shifts between day and night modes.
        </div>
      </div>
    </>
  );
}