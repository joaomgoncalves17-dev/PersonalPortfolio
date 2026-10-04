import { ImageResponse } from "next/og";
import { getDictionary } from "@/content";
import { site } from "@/content/site";
import { hasLocale, locales } from "@/content/types";

// Imagem que aparece ao partilhar o link (LinkedIn, WhatsApp, email).
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}, sysadmin`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : "pt");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f3f4f4",
          color: "#121415",
          borderTop: "16px solid #b9440f",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#b9440f" }}>{t.home.availability}</div>
          <div style={{ marginTop: 28, fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
            {t.home.headline[0]}
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>{t.home.headline[1]}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "2px solid #d2d6d7",
            paddingTop: 28,
            fontSize: 32,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: 700 }}>{site.name}</div>
            <div style={{ color: "#565c61", marginTop: 6 }}>{t.meta.title.split(" | ")[1]}</div>
          </div>
          <div style={{ color: "#565c61" }}>Viana do Castelo, Portugal</div>
        </div>
      </div>
    ),
    size,
  );
}
