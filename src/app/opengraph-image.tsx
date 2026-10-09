import { ImageResponse } from "next/og";

export const alt = "3R ZeroWaste — Turning sustainable gestures into measurable climate impact";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-share card for every page that doesn't set its own image. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(900px circle at 85% 20%, #0E3B28 0%, #05100C 60%)",
          color: "#F2F6F3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              background: "#C8F26A",
              color: "#05100C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            3R
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700 }}>3R ZeroWaste</span>
            <span style={{ fontSize: 20, color: "#9DB0A7", letterSpacing: 4 }}>CLIMATE-TECH · CIRCULAR ECONOMY</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
          <span>Sustainable gestures.</span>
          <span>Everyday actions.</span>
          <span style={{ color: "#C8F26A" }}>Measurable climate impact.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9DB0A7" }}>
          <span>ESG · Circular Economy · EPR · Carbon & Net Zero · KarmaVerse</span>
          <span style={{ color: "#C8F26A" }}>0waste.co.in</span>
        </div>
      </div>
    ),
    size,
  );
}
