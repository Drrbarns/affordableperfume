import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
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
          background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 24,
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          AP
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, marginBottom: 12 }}>
          Affordable Perfumes
        </div>
        <div style={{ fontSize: 28, opacity: 0.9 }}>
          Authentic fragrances delivered across Ghana
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
