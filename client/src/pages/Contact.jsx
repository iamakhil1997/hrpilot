import { Link } from 'react-router-dom';

const developer = {
  name: 'Akhil P Kumar',
  title: 'Creator of HRPilot',
  email: 'akhilpkumar1997@gmail.com',
  linkedin: 'https://www.linkedin.com/in/akhilpkumar/',
};

export default function Contact() {
  const hasContact = developer.email || developer.linkedin;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <header style={{
        height: 64, padding: '0 6vw', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', borderBottom: '1px solid var(--border)',
        background: 'rgba(10,15,30,0.88)',
      }}>
        <Link to="/" style={{ color: 'var(--indigo2)', fontFamily: 'JetBrains Mono, monospace', textDecoration: 'none', fontSize: 16 }}>
          HRPilot
        </Link>
        <Link to="/" style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: 14 }}>
          ← Back to home
        </Link>
      </header>

      <section style={{ maxWidth: 760, margin: '0 auto', padding: '88px 24px 100px' }}>
        <p style={{ color: 'var(--indigo2)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          About the builder
        </p>
        <h1 style={{ fontSize: 'clamp(36px, 7vw, 54px)', letterSpacing: '-1px', marginBottom: 16 }}>
          Contact the developer
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: 16, lineHeight: 1.7, maxWidth: 620, marginBottom: 38 }}>
          Have a question, idea, or feedback about HRPilot? Get in touch with the person building it.
        </p>

        <article style={{
          background: 'var(--bg4)', border: '1px solid var(--border2)', borderRadius: 18,
          padding: '30px clamp(22px, 5vw, 40px)', display: 'flex', gap: 22, alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <div aria-hidden="true" style={{
            width: 68, height: 68, borderRadius: '50%', background: 'var(--indigo-dim)',
            border: '1px solid rgba(99,102,241,0.35)', color: 'var(--indigo2)',
            display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 500,
          }}>
            {developer.name.split(' ').map(part => part[0]).join('')}
          </div>
          <div>
            <h2 style={{ fontSize: 25, fontWeight: 500, marginBottom: 5 }}>{developer.name}</h2>
            <p style={{ color: 'var(--text2)', fontSize: 14 }}>{developer.title}</p>
          </div>
        </article>

        <section aria-labelledby="contact-options" style={{ marginTop: 34 }}>
          <h2 id="contact-options" style={{ fontSize: 18, fontWeight: 500, marginBottom: 14 }}>Contact details</h2>
          {hasContact ? (
            <div style={{ display: 'grid', gap: 12 }}>
              {developer.email && (
                <a href={`mailto:${developer.email}`} style={contactLinkStyle}>
                  <span aria-hidden="true">✉</span><span>{developer.email}</span>
                </a>
              )}
              {developer.linkedin && (
                <a href={developer.linkedin} target="_blank" rel="noreferrer" style={contactLinkStyle}>
                  <span aria-hidden="true">in</span><span>Connect on LinkedIn</span><span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          ) : (
            <p style={{
              color: 'var(--text3)', fontSize: 14, lineHeight: 1.7, padding: '18px 20px',
              background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12,
            }}>
              Public email and LinkedIn links will appear here once confirmed.
            </p>
          )}
        </section>

        <Link to="/chat" style={{
          display: 'inline-flex', marginTop: 34, padding: '11px 18px', borderRadius: 10,
          background: 'var(--indigo)', color: '#fff', textDecoration: 'none', fontSize: 14,
        }}>
          Try HRPilot →
        </Link>
      </section>
    </main>
  );
}

const contactLinkStyle = {
  display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text)',
  textDecoration: 'none', padding: '15px 18px', background: 'var(--bg3)',
  border: '1px solid var(--border)', borderRadius: 12,
};
