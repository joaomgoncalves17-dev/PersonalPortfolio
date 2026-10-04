import { ImageResponse } from "next/og";

// Ícone para o ecrã inicial do iPhone (mesmo desenho do icon.tsx, maior).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#121415",
          color: "#f3f4f4",
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: -5,
        }}
      >
        JG
        <div style={{ width: 80, height: 8, marginTop: 6, background: "#f0773a" }} />
      </div>
    ),
    size,
  );
}
