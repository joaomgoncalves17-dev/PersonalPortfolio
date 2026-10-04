import { ImageResponse } from "next/og";

// Ícone do separador: iniciais sobre fundo escuro, com o acento laranja do site.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: -2,
        }}
      >
        JG
        <div style={{ width: 30, height: 4, marginTop: 2, background: "#f0773a" }} />
      </div>
    ),
    size,
  );
}
