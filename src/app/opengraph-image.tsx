import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Creativit - Diseño Web y Soluciones Digitales';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0f1a 0%, #0d1420 100%)',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 90,
              height: 90,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)',
              color: 'white',
              fontSize: 48,
              fontWeight: 800,
            }}
          >
            C
          </div>
          <div style={{ display: 'flex', color: 'white', fontSize: 56, fontWeight: 800 }}>
            Creativit
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          Páginas web que convierten
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 40,
            fontWeight: 700,
            background: 'linear-gradient(90deg, #22d3ee 0%, #3b82f6 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          visitas en clientes
        </div>
      </div>
    ),
    { ...size }
  );
}
