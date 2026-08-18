import { useEffect, useRef, useState } from 'react';
import {
  translations, htmlTranslations, astroQuote, placeholderTranslations,
  selectTranslations, textTranslations, t, translateText, type Lang,
} from '@/lib/translations';
import {
  services, currencies, formatCurrency, grahaDetails, grahaNodes,
  faqItems, type ServiceInfo,
} from '@/lib/data';
import {
  createBooking, fetchBookings, updateBooking, deleteBooking,
  generateBookingRef, type Booking,
} from '@/lib/supabase';

/* ---------- Intro overlay ---------- */
function Intro({ onEnter }: { onEnter: () => void }) {
  return (
    <div id="joytirIntro">
      <div className="joytir-intro-inner">
        <button className="joytir-intro-shell" onClick={onEnter} aria-label="Enter Joytir Veda">✦</button>
        <h1 className="joytir-intro-name">Joytir Veda</h1>
        <div className="joytir-intro-line" />
        <p className="joytir-intro-hint">click to enter</p>
      </div>
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav({ lang, setLang, theme, toggleTheme }: {
  lang: Lang; setLang: (l: Lang) => void; theme: string; toggleTheme: () => void;
}) {
  return (
    <header>
      <nav className="wrap">
        <a className="logo" href="#top" aria-label="Joytir Veda home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" stroke="var(--marigold)" />
            <circle cx="12" cy="12" r="4" stroke="var(--marigold)" />
            <line x1="12" y1="3" x2="12" y2="21" stroke="var(--marigold)" opacity="0.4" />
            <line x1="3" y1="12" x2="21" y2="12" stroke="var(--marigold)" opacity="0.4" />
          </svg>
          Joytir Veda
        </a>
        <div className="navlinks">
          <a href="#services">{t(lang, 'nav_services')}</a>
          <a href="#how">{t(lang, 'nav_how')}</a>
          <a href="#astrologer">{t(lang, 'nav_astrologer')}</a>
          <a href="#faq">{t(lang, 'nav_faq')}</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="lang-switch">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
            <button className={lang === 'ml' ? 'active' : ''} onClick={() => setLang('ml')}>മല</button>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={t(lang, 'theme_toggle_aria')}>
            {theme === 'light' ? '☀' : '◐'}
          </button>
          <a href="#book" className="btn btn-primary navbtn" style={{ marginLeft: 10 }}>{t(lang, 'nav_book')}</a>
        </div>
      </nav>
    </header>
  );
}

/* ---------- Navagraha SVG ---------- */
function Navagraha({ lang, onGraha }: { lang: Lang; onGraha: (key: string) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`;
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = '';
  };

  return (
    <div className="graha-wrap">
      <div className="graha-card" ref={cardRef} onMouseMove={handleMove} onMouseLeave={handleLeave}>
        <div className="graha-caption">
          <span>{translateText(lang, 'Navagraha')}</span>
          <span>sidereal · parashari</span>
        </div>
        <svg className="graha-svg" viewBox="0 0 520 470" role="img" aria-label="Navagraha diagram">
          <circle className="graha-orbit" cx="260" cy="235" r="210" />
          <circle className="graha-orbit" cx="260" cy="235" r="150" />
          <circle className="graha-orbit" cx="260" cy="235" r="90" />
          <g className="graha-sun-node" data-graha="Surya" tabIndex={0} role="button"
             aria-label="Surya details" onClick={() => onGraha('Surya')}
             onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onGraha('Surya'); } }}>
            <circle className="graha-sun" cx="260" cy="235" r="44" />
            <text x="260" y="242" textAnchor="middle" className="graha-center-name">☉</text>
            <text x="260" y="300" textAnchor="middle" className="graha-center-sub">SURYA</text>
          </g>
          {grahaNodes.map(n => (
            <g key={n.key} className="graha-node" data-graha={n.key} transform={n.transform}
               tabIndex={0} role="button" aria-label={`Open ${n.key} details`}
               onClick={() => onGraha(n.key)}
               onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onGraha(n.key); } }}>
              <circle r={n.r} />
              <text textAnchor="middle" dy="6">{n.glyph}</text>
              <text className="graha-label" textAnchor="middle" y={n.r + 14}>
                {translateText(lang, n.labelKey)}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero({ lang, onGraha }: { lang: Lang; onGraha: (k: string) => void }) {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-grid">
          <div className="reveal">
            <div className="eyebrow">{translateText(lang, 'Vedic Astrology · Jyotish Consultations')}</div>
            <h1 dangerouslySetInnerHTML={{ __html: htmlTranslations[lang].hero_title }} />
            <p className="lead">{translateText(lang, 'Joytir Veda pairs classical Jyotish method — sidereal charts, nakshatras, planetary periods — with a live conversation about what\'s actually going on in your life right now.')}</p>
            <div className="hero-ctas">
              <a href="#book" className="btn btn-primary">{translateText(lang, 'Book a reading')}</a>
              <a href="#how" className="btn btn-ghost">{translateText(lang, 'See how a session works')}</a>
            </div>
            <div className="hero-meta">
              <div><strong>6</strong>{t(lang, 'sessions_offered')}</div>
              <div><strong>2</strong>{t(lang, 'systems_used')}</div>
              <div><strong>{t(lang, 'english_malayalam')}</strong></div>
            </div>
          </div>
          <div className="reveal">
            <Navagraha lang={lang} onGraha={onGraha} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee strip ---------- */
function Strip({ lang }: { lang: Lang }) {
  const items = ['Sidereal Chart', 'Nakshatra Analysis', 'Dasha Forecast', 'Guna Milan', 'Muhurat', 'Parashari', 'Jaimini'];
  const track = [...items, ...items];
  return (
    <div className="strip">
      <div className="strip-track">
        {track.map((s, i) => (
          <span key={i}><span>✦</span>{s}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Mini Cowrie Reading ---------- */
function MiniReading({ lang, prefillBooking }: { lang: Lang; prefillBooking: (s: string) => void }) {
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [pob, setPob] = useState('');
  const [rolling, setRolling] = useState(false);
  const [status, setStatus] = useState(t(lang, 'mini_status_idle'));
  const [readings, setReadings] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const seedFromBirth = (d: string, tm: string, p: string) => {
    const str = d + tm + p;
    let h = 0;
    for (let i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRolling(true);
    setShowResults(false);
    setStatus(lang === 'ml' ? 'കവടി ചിപ്പികൾ നീങ്ങുന്നു… രൂപരേഖ വായിക്കുന്നു' : 'The cowrie shells are moving… reading the pattern');

    const seed = seedFromBirth(dob, tob, pob.trim().toLowerCase());
    const dobDate = new Date(dob + 'T12:00:00');
    const day = dobDate.getDate();
    const month = dobDate.getMonth() + 1;
    const year = dobDate.getFullYear();
    const lifePath = String(year).split('').reduce((a, n) => a + Number(n), 0) + day + month;
    const number = String(lifePath).split('').reduce((a, n) => a + Number(n), 0);
    const hour = Number(tob.split(':')[0]);
    const signs = [
      ['Capricorn', 'മകരം'], ['Aquarius', 'കുംഭം'], ['Pisces', 'മീനം'], ['Aries', 'മേടം'],
      ['Taurus', 'ഇടവം'], ['Gemini', 'മിഥുനം'], ['Cancer', 'കർക്കടകം'], ['Leo', 'ചിങ്ങം'],
      ['Virgo', 'കന്നി'], ['Libra', 'തുലാം'], ['Scorpio', 'വൃശ്ചികം'], ['Sagittarius', 'ധനു'],
    ];
    const signIndex = ((month - 1) + Math.floor((day + 10) / 31)) % 12;
    const sign = signs[signIndex];
    const enReadings = [
      `${sign[0]} influence is highlighted in this introductory reading. You may be entering a phase where patience, planning, and a clearer sense of direction matter more than rushing the next decision.`,
      `A birth-number pattern of ${number} adds a practical theme: unfinished matters may need closure before a new opportunity can fully develop. The strongest results come from consistent effort rather than sudden changes.`,
      `Your birth time places this preview in a ${hour < 9 ? 'reflective' : hour < 17 ? 'active' : 'introspective'} timing pattern. Communication and timing may become especially important around an upcoming choice.`,
    ];
    const mlReadings = [
      `ഈ പ്രാരംഭ വായനയിൽ ${sign[1]} രാശിയുടെ സ്വാധീനം പ്രധാനമായി കാണുന്നു. അടുത്ത തീരുമാനം വേഗത്തിൽ എടുക്കുന്നതിനെക്കാൾ ക്ഷമ, ആസൂത്രണം, വ്യക്തമായ ദിശ എന്നിവയ്ക്ക് കൂടുതൽ പ്രാധാന്യമുള്ള ഒരു ഘട്ടമായിരിക്കാം ഇത്.`,
      `ജനനസംഖ്യയുടെ ${number} എന്ന സൂചന പ്രായോഗികതയിലേക്ക് ശ്രദ്ധ തിരിക്കുന്നു. പുതിയ അവസരം പൂർണ്ണമായി വികസിക്കുന്നതിന് മുമ്പ് പൂർത്തിയാകാത്ത കാര്യങ്ങൾക്ക് ഒരു സമാപനം ആവശ്യമായേക്കാം. സ്ഥിരമായ ശ്രമമാണ് പെട്ടെന്നുള്ള മാറ്റങ്ങളെക്കാൾ ഫലപ്രദമാകുന്നത്.`,
      `നിങ്ങളുടെ ജനനസമയം ഈ പ്രിവ്യൂവിൽ ${hour < 9 ? 'ആലോചനാപരമായ' : hour < 17 ? 'സജീവമായ' : 'അന്തർമുഖമായ'} ഒരു സമയസ്വഭാവം സൂചിപ്പിക്കുന്നു. വരാനിരിക്കുന്ന ഒരു തീരുമാനത്തിൽ ആശയവിനിമയത്തിനും ശരിയായ സമയത്തിനും പ്രത്യേക പ്രാധാന്യം ഉണ്ടാകാം.`,
    ];
    const themes = lang === 'ml' ? mlReadings : enReadings;
    const a = themes[seed % themes.length];
    const b = themes[(seed >> 3) % themes.length];
    const c = themes[(seed >> 7) % themes.length];

    timer.current = setTimeout(() => {
      setRolling(false);
      setStatus(lang === 'ml' ? 'ഒരു ചെറിയ രൂപരേഖ പ്രത്യക്ഷപ്പെട്ടു' : 'A small pattern has appeared');
      setReadings([a, b, c]);
      setShowResults(true);
    }, 2200);
  };

  const ph = (key: string) => placeholderTranslations[lang][key] ?? key;

  return (
    <section className="section-pad tight" id="preview">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">{t(lang, 'mini_eyebrow')}</div>
          <h2>{t(lang, 'mini_title')}</h2>
          <p>{t(lang, 'mini_desc')}</p>
        </div>
        <div className="preview-shell reveal">
          <div className="preview-grid">
            <form onSubmit={handleSubmit}>
              <div className="preview-form">
                <div className="field">
                  <label>{t(lang, 'mini_dob')}</label>
                  <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
                </div>
                <div className="field">
                  <label>{t(lang, 'mini_tob')}</label>
                  <input type="time" value={tob} onChange={e => setTob(e.target.value)} required />
                </div>
                <div className="field full">
                  <label>{t(lang, 'mini_pob')}</label>
                  <input type="text" value={pob} onChange={e => setPob(e.target.value)} placeholder={ph('City, Country')} required />
                </div>
              </div>
              <div className="preview-actions">
                <button type="submit" className="btn btn-primary" disabled={rolling}>{t(lang, 'mini_begin')}</button>
                <span className="preview-note">{t(lang, 'mini_status_idle')}</span>
              </div>
            </form>
            <div className={`shell-stage${rolling ? ' rolling' : ''}`}>
              <div className="shells">
                {Array.from({ length: 8 }).map((_, i) => <div key={i} className="cowrie" />)}
              </div>
              <div className="shell-status">{status}</div>
            </div>
          </div>
          {showResults && (
            <div className="preview-results show">
              <div className="preview-results-head">
                <div>
                  <div className="eyebrow">{t(lang, 'mini_preview')}</div>
                  <p>{t(lang, 'mini_preview_intro')}</p>
                </div>
              </div>
              <div className="reading-grid">
                {readings.map((r, i) => (
                  <div key={i} className="reading-card" onClick={() => prefillBooking('')} role="button" tabIndex={0}>
                    <div className="eyebrow">— {i + 1}</div>
                    <p>{r}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services({ lang, currency, setCurrency, prefillBooking }: {
  lang: Lang; currency: string; setCurrency: (c: string) => void; prefillBooking: (s: string) => void;
}) {
  return (
    <section className="section-pad" id="services">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">{translateText(lang, 'Services')}</div>
          <h2>{translateText(lang, 'Six ways to sit down with your chart')}</h2>
          <p>{translateText(lang, 'Pick what you actually need answered — every session is one-to-one, not a recorded reading.')}</p>
        </div>
        <div className="services-grid reveal">
          {services.map((s: ServiceInfo) => (
            <div key={s.name} className="service-card">
              <div className="service-glyph">{s.glyph}</div>
              <div>
                <h3>{translateText(lang, s.name)}</h3>
                <div className="sk">{translateText(lang, s.sk)}</div>
              </div>
              <p>{translateText(lang, s.desc)}</p>
              <div className="service-foot">
                <span className="price">{formatCurrency(s.basePrice, currency)}</span>
                <button onClick={() => prefillBooking(s.name)}>{translateText(lang, 'Select →')}</button>
              </div>
            </div>
          ))}
        </div>
        <div className="currency-picker">
          <span className="currency-label">{t(lang, 'currency_label')}</span>
          {currencies.map(c => (
            <button key={c} className={`currency-option${c === currency ? ' active' : ''}`} onClick={() => setCurrency(c)}>{c}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How It Works ---------- */
function HowItWorks({ lang }: { lang: Lang }) {
  const steps = [
    { n: '01', t: 'Share your birth details', d: 'Date, exact time, and place of birth — this is what the entire chart is built from, so precision here matters more than anything else.' },
    { n: '02', t: 'Your kundli is cast', d: 'A sidereal chart is calculated ahead of the call, so your session is spent talking, not waiting on maths.' },
    { n: '03', t: 'Live reading', d: 'A video or voice call where we go through your houses, your current dasha, and the questions you actually came with.' },
    { n: '04', t: 'Notes to keep', d: 'A written summary of what was discussed, plus any remedies, sent within 48 hours.' },
  ];
  return (
    <section className="section-pad" id="how">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">{translateText(lang, 'How it works')}</div>
          <h2>{translateText(lang, 'Four steps, in the order they actually happen')}</h2>
        </div>
        <div className="steps reveal">
          {steps.map(s => (
            <div key={s.n} className="step">
              <div className="step-num">{s.n}</div>
              <div>
                <h3>{translateText(lang, s.t)}</h3>
                <p>{translateText(lang, s.d)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Astrologer ---------- */
function Astrologer({ lang }: { lang: Lang }) {
  return (
    <section className="section-pad" id="astrologer">
      <div className="wrap">
        <div className="astro-grid">
          <div className="avatar reveal">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="38" r="18" stroke="var(--marigold)" strokeWidth="1.5" />
              <path d="M20 90 Q50 60 80 90" stroke="var(--marigold)" strokeWidth="1.5" fill="none" />
              <circle cx="50" cy="50" r="48" stroke="var(--gold)" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </div>
          <div className="reveal">
            <div className="eyebrow">{translateText(lang, 'Your Astrologer')}</div>
            <p className="astro-quote">{astroQuote[lang]}</p>
            <p style={{ color: 'var(--sandalwood)', fontSize: '0.92rem' }}>{translateText(lang, 'Trained in the parashari and jaimini systems, reading professionally for 5 years, with a focus on practical, question-led sessions rather than long monologue readings.')}</p>
            <div className="astro-creds">
              <div><strong>5 yrs</strong>{translateText(lang, 'reading charts')}</div>
              <div><strong>2</strong>{translateText(lang, 'session types')}</div>
              <div><strong>{translateText(lang, 'English & Malayalam')}</strong></div>
            </div>
            <a href="#book" className="btn btn-primary" style={{ marginTop: 24 }}>{translateText(lang, 'Book a session')}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Booking form ---------- */
function Booking({ lang, currency }: { lang: Lang; currency: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [pob, setPob] = useState('');
  const [pref, setPref] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const ph = (key: string) => placeholderTranslations[lang][key] ?? key;
  const sel = (key: string) => selectTranslations[lang][key] ?? key;

  const prefill = (s: string) => {
    if (s) {
      const match = services.find(svc => svc.name === s);
      if (match) setService(s);
    }
  };

  // expose prefill to parent via custom event
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string;
      if (detail) prefill(detail);
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('joytir:prefill-booking', handler);
    return () => window.removeEventListener('joytir:prefill-booking', handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) { formRef.current?.reportValidity(); return; }
    setSubmitting(true);
    setError('');
    const booking = {
      booking_ref: generateBookingRef(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      service,
      dob,
      tob,
      pob: pob.trim(),
      preferred_date: pref,
      notes: notes.trim() || '—',
      currency,
    };
    const result = await createBooking({ ...booking, status: 'pending', unread: true });
    setSubmitting(false);
    if (!result) {
      setError(lang === 'ml' ? 'ബുക്കിംഗ് സംരക്ഷിക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.' : 'Could not save booking. Please try again.');
      return;
    }
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setName(''); setEmail(''); setPhone(''); setService('');
    setDob(''); setTob(''); setPob(''); setPref(''); setNotes('');
  };

  const summaryData: Record<string, string> = {
    [translateText(lang, 'Full name')]: name,
    [translateText(lang, 'Email')]: email,
    [translateText(lang, 'Phone / WhatsApp')]: phone,
    [translateText(lang, 'Session type')]: service ? sel(service) : '',
    [translateText(lang, 'Date of birth')]: dob,
    [translateText(lang, 'Time of birth')]: tob,
    [translateText(lang, 'Place of birth')]: pob,
    [translateText(lang, 'Preferred session date')]: pref,
  };

  return (
    <section className="section-pad" id="book">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">{translateText(lang, 'Booking request')}</div>
          <h2>{translateText(lang, 'Tell us when and where you were born')}</h2>
        </div>
        <div className="book-shell reveal">
          {submitted ? (
            <div className="confirm-panel show">
              <div className="glyph">✦</div>
              <h3>{t(lang, 'request_received')}</h3>
              <p>{t(lang, 'confirm_msg')}</p>
              <div className="confirm-summary">
                {Object.entries(summaryData).map(([k, v]) => v && <div key={k}>{k}<span>{v}</span></div>)}
              </div>
              <button className="btn btn-ghost" onClick={reset}>{t(lang, 'edit_request')}</button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="field">
                  <label>{translateText(lang, 'Full name')}</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={ph('Your name')} required />
                </div>
                <div className="field">
                  <label>{translateText(lang, 'Email')}</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={ph('you@example.com')} required />
                </div>
                <div className="field">
                  <label>{translateText(lang, 'Phone / WhatsApp')}</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={ph('+971 5X XXX XXXX')} required />
                </div>
                <div className="field">
                  <label>{translateText(lang, 'Session type')}</label>
                  <select value={service} onChange={e => setService(e.target.value)} required>
                    <option value="">{sel('Choose a session')}</option>
                    {services.map(s => <option key={s.name} value={s.name}>{sel(s.name)}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>{translateText(lang, 'Date of birth')}</label>
                  <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
                </div>
                <div className="field">
                  <label>{translateText(lang, 'Time of birth')}</label>
                  <input type="time" value={tob} onChange={e => setTob(e.target.value)} required />
                </div>
                <div className="field full">
                  <label>{translateText(lang, 'Place of birth')}</label>
                  <input type="text" value={pob} onChange={e => setPob(e.target.value)} placeholder={ph('City, Country')} required />
                </div>
                <div className="field">
                  <label>{translateText(lang, 'Preferred session date')}</label>
                  <input type="date" value={pref} onChange={e => setPref(e.target.value)} required />
                </div>
                <div className="field full">
                  <label>{translateText(lang, 'What would you like to focus on? (optional)')}</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder={ph('Any specific questions or context...')} />
                </div>
              </div>
              <div className="form-foot">
                <span className="form-note">{t(lang, 'form_note')}</span>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? '…' : t(lang, 'request_booking')}
                </button>
              </div>
              {error && <div style={{ color: 'var(--vermilion)', fontSize: '0.82rem', marginTop: 12 }}>{error}</div>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-pad tight" id="faq">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">{translateText(lang, 'Before you book')}</div>
          <h2>{translateText(lang, 'How it works')}</h2>
        </div>
        <div className="reveal">
          {faqItems.map((item, i) => (
            <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                {translateText(lang, item.q)}
                <span className="ind">+</span>
              </button>
              <div className="faq-a">{translateText(lang, item.a)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer({ lang }: { lang: Lang }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="logo" style={{ marginBottom: 14 }}>Joytir Veda</div>
            <p style={{ color: 'var(--sandalwood)', fontSize: '0.88rem', maxWidth: '38ch' }}>{translateText(lang, 'Vedic astrology readings, one conversation at a time.')}</p>
          </div>
          <div>
            <h4>{translateText(lang, 'Navigate')}</h4>
            <a href="#services">{t(lang, 'nav_services')}</a>
            <a href="#how">{t(lang, 'nav_how')}</a>
            <a href="#astrologer">{t(lang, 'nav_astrologer')}</a>
            <a href="#faq">{t(lang, 'nav_faq')}</a>
          </div>
          <div>
            <h4>{translateText(lang, 'Contact')}</h4>
            <a href="mailto:hello@joytirveda.com">{translateText(lang, 'Gmail')}</a>
            <a href="#book">{translateText(lang, 'Book a reading')}</a>
            <span style={{ color: 'var(--sandalwood)', fontSize: '0.88rem', display: 'block', padding: '5px 0' }}>{translateText(lang, 'Al Ain, UAE')}</span>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{translateText(lang, '© 2026 Joytir Veda. All readings are for guidance and reflection.')}</span>
          <span>{translateText(lang, 'Made with care, under the same sky as everyone else.')}</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Graha Modal ---------- */
function GrahaModal({ grahaKey, onClose }: { grahaKey: string | null; onClose: () => void }) {
  if (!grahaKey || !grahaDetails[grahaKey]) return null;
  const info = grahaDetails[grahaKey];
  return (
    <div id="grahaModal" className="show" onClick={onClose}>
      <div className="graha-modal-card" onClick={e => e.stopPropagation()}>
        <button className="graha-modal-close" onClick={onClose} aria-label="Close">×</button>
        <h3>{grahaKey}</h3>
        <p>{info.meaning}</p>
        <p className="graha-meta">{info.rules}</p>
      </div>
    </div>
  );
}

/* ---------- Admin Dashboard ---------- */
const ADMIN_CODE = '2468';

function Admin({ lang, theme, toggleTheme }: { lang: Lang; theme: string; toggleTheme: () => void }) {
  const [gateOpen, setGateOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [tab, setTab] = useState('dashboard');
  const [notice, setNotice] = useState<string | null>(null);
  const logoClicks = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadBookings = async () => {
    const data = await fetchBookings();
    setBookings(data);
  };

  useEffect(() => {
    if (loggedIn) loadBookings();
  }, [loggedIn]);

  // five-click logo gesture
  useEffect(() => {
    const logo = document.querySelector('.logo');
    if (!logo) return;
    const handler = () => {
      logoClicks.current++;
      clearTimeout(clickTimer.current!);
      if (logoClicks.current === 5) {
        logoClicks.current = 0;
        setGateOpen(true);
        return;
      }
      clickTimer.current = setTimeout(() => { logoClicks.current = 0; }, 2000);
    };
    logo.addEventListener('click', handler);
    return () => logo.removeEventListener('click', handler);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_CODE) {
      setLoggedIn(true);
      setGateOpen(false);
      setPin('');
      setPinError('');
    } else {
      setPinError(lang === 'ml' ? 'ആക്സസ് കോഡ് തിരിച്ചറിഞ്ഞില്ല.' : 'Access code not recognised.');
    }
  };

  const handleUpdate = async (status: 'confirmed' | 'completed') => {
    if (!selected) return;
    await updateBooking(selected.id, { status, unread: false });
    setSelected(null);
    loadBookings();
  };

  const handleDelete = async () => {
    if (!selected) return;
    await deleteBooking(selected.id);
    setSelected(null);
    loadBookings();
  };

  const markAllRead = async () => {
    await Promise.all(bookings.map(b => updateBooking(b.id, { unread: false })));
    loadBookings();
  };

  const enableNotifications = async () => {
    if (!('Notification' in window)) { alert('Notifications not supported.'); return; }
    const p = await Notification.requestPermission();
    if (p === 'granted') setNotice('Notifications enabled');
  };

  const unread = bookings.filter(b => b.unread).length;
  const pending = bookings.filter(b => b.status === 'pending').length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning.' : hour < 17 ? 'Good afternoon.' : 'Good evening.';

  if (!gateOpen && !loggedIn) return null;

  if (!loggedIn) {
    return (
      <div id="adminGate" className="show">
        <div className="admin-gate-card">
          <div className="admin-brand">
            <div className="admin-brand-mark">✦</div>
            <div>
              <div className="eyebrow">Private area</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1.1rem' }}>Joytir Veda</div>
            </div>
          </div>
          <h2>Admin Access</h2>
          <p>This area is for the Joytir Veda owner. Bookings are synced across all devices via the database.</p>
          <form onSubmit={handleLogin}>
            <input id="adminPin" className="admin-pin" type="password" inputMode="numeric"
              autoComplete="current-password" placeholder="Admin access code"
              aria-label="Admin access code" required value={pin} onChange={e => setPin(e.target.value)} />
            <div className="admin-error">{pinError}</div>
            <div className="admin-gate-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setGateOpen(false)}>Back</button>
              <button type="submit" className="btn btn-primary">Enter dashboard</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="adminApp" className="show">
        <div className="admin-topbar">
          <div className="admin-top-left">
            <button className="admin-icon-btn" onClick={() => setLoggedIn(false)} aria-label="Back to website">←</button>
            <div className="admin-title">Joytir Veda</div>
            <span className="admin-badge">OWNER</span>
          </div>
          <div className="admin-top-actions">
            <button className="admin-icon-btn" onClick={enableNotifications} aria-label="Enable notifications">🔔{unread > 0 && <span className="admin-count">{unread}</span>}</button>
            <button className="admin-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'light' ? '☀' : '◐'}</button>
            <button className="admin-icon-btn" onClick={() => setLoggedIn(false)} aria-label="Log out">↗</button>
          </div>
        </div>
        <div className="admin-layout">
          <aside className="admin-side">
            <button className={tab === 'dashboard' ? 'active' : ''} onClick={() => setTab('dashboard')}>Overview</button>
            <button className={tab === 'bookings' ? 'active' : ''} onClick={() => setTab('bookings')}>Bookings</button>
            <button className={tab === 'calendar' ? 'active' : ''} onClick={() => setTab('calendar')}>Calendar</button>
            <button className={tab === 'customers' ? 'active' : ''} onClick={() => setTab('customers')}>Customers</button>
            <button className={tab === 'ai' ? 'active' : ''} onClick={() => setTab('ai')}>AI Assistant</button>
          </aside>
          <main className="admin-main">
            <div className="admin-welcome">
              <div>
                <div className="eyebrow">Owner dashboard</div>
                <h1>{greeting}</h1>
                <div className="admin-muted">Your Joytir Veda bookings, synced across all devices.</div>
              </div>
              <div className="admin-muted">{new Intl.DateTimeFormat(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}</div>
            </div>
            {tab === 'dashboard' && (
              <section id="adminDashboard">
                <div className="admin-grid">
                  <div className="admin-stat"><span className="label">Total bookings</span><strong>{bookings.length}</strong></div>
                  <div className="admin-stat"><span className="label">Pending</span><strong>{pending}</strong></div>
                  <div className="admin-stat"><span className="label">Confirmed</span><strong>{confirmed}</strong></div>
                  <div className="admin-stat"><span className="label">Unread</span><strong>{unread}</strong></div>
                </div>
                <div className="admin-columns">
                  <div className="admin-panel">
                    <h3>Recent bookings</h3>
                    {bookings.length === 0 ? (
                      <div className="empty-admin">No bookings yet. New requests will appear here instantly.</div>
                    ) : (
                      bookings.slice(0, 12).map(b => (
                        <div key={b.id} className="booking-row" onClick={() => setSelected(b)} style={{ cursor: 'pointer' }}>
                          <span>
                            <span className="booking-name">{b.name}</span>
                            <span className="booking-meta">{b.service} · {b.preferred_date} · {b.booking_ref}</span>
                          </span>
                          <span className={`status ${b.status}`}>{b.status}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="admin-panel">
                    <h3>Quick actions</h3>
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', borderRadius: 14, marginBottom: 10 }} onClick={enableNotifications}>Enable app notifications</button>
                    <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', borderRadius: 14 }} onClick={markAllRead}>Mark all as read</button>
                    <p className="admin-muted" style={{ marginTop: 14 }}>Bookings are stored in the database and synced across all devices in real time.</p>
                  </div>
                </div>
              </section>
            )}
            {tab !== 'dashboard' && (
              <div className="empty-admin">
                {tab === 'ai' ? 'AI Assistant is ready for the next phase.' : 'This section is ready to be connected to the booking database.'}
              </div>
            )}
          </main>
        </div>
      </div>
      {notice && (
        <div className="admin-notice show">
          <strong>New booking received</strong>
          <span>{notice}</span>
        </div>
      )}
      {selected && (
        <div className="admin-modal show" onClick={() => setSelected(null)}>
          <div className="admin-modal-card" onClick={e => e.stopPropagation()}>
            <button className="graha-modal-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <h3>Booking details</h3>
            {Object.entries(selected).filter(([k]) => k !== 'unread').map(([k, v]) => (
              <div key={k} className="admin-detail"><b>{k}</b><span>{String(v)}</span></div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => handleUpdate('confirmed')}>Confirm booking</button>
              <button className="btn btn-ghost" onClick={() => handleUpdate('completed')}>Mark completed</button>
              <button className="btn btn-ghost" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Reveal on scroll hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ---------- App ---------- */
function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [theme, setTheme] = useState('dark');
  const [introVisible, setIntroVisible] = useState(true);
  const [grahaKey, setGrahaKey] = useState<string | null>(null);
  const [currency, setCurrency] = useState('AED');

  useReveal();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.theme = theme;
  }, [lang, theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const prefillBooking = (serviceName: string) => {
    window.dispatchEvent(new CustomEvent('joytir:prefill-booking', { detail: serviceName }));
  };

  return (
    <>
      {introVisible && <Intro onEnter={() => setIntroVisible(false)} />}
      <Nav lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
      <Hero lang={lang} onGraha={setGrahaKey} />
      <Strip lang={lang} />
      <MiniReading lang={lang} prefillBooking={prefillBooking} />
      <Services lang={lang} currency={currency} setCurrency={setCurrency} prefillBooking={prefillBooking} />
      <HowItWorks lang={lang} />
      <Astrologer lang={lang} />
      <Booking lang={lang} currency={currency} />
      <FAQ lang={lang} />
      <Footer lang={lang} />
      <GrahaModal grahaKey={grahaKey} onClose={() => setGrahaKey(null)} />
      <Admin lang={lang} theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}

export default App;
