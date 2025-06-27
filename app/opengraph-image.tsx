import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'IVY Hair Studio - Professional Hair Salon';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fdf2f8',
          backgroundImage: 'linear-gradient(45deg, #fdf2f8 0%, #fce7f3 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#be185d',
              marginBottom: '20px',
              fontFamily: 'serif',
            }}
          >
            IVY Hair Studio
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#831843',
              marginBottom: '0',
              maxWidth: '800px',
              lineHeight: 1.2,
            }}
          >
            Professional Hair Salon & Beauty Services
          </p>
          <p
            style={{
              fontSize: '24px',
              color: '#be185d',
              marginTop: '20px',
              opacity: 0.8,
            }}
          >
            Book Your Appointment Today
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
