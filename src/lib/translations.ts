export type Lang = 'en' | 'ml';

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    nav_services: 'Services', nav_how: 'How it works', nav_astrologer: 'Astrologer',
    nav_faq: 'FAQ', nav_book: 'Book a reading',
    systems_used: 'systems used', sessions_offered: 'sessions offered',
    english_malayalam: 'English & Malayalam',
    mini_eyebrow: 'A Small Glimpse', mini_title: 'Kavadi Reading',
    mini_desc: 'Enter your birth details to receive an introductory Kavadi reading based on the information you provide.',
    mini_dob: 'Date of birth', mini_tob: 'Time of birth', mini_pob: 'Place of birth',
    pref_date: 'Preferred session date', mini_begin: 'Start Kavadi Reading',
    mini_status_idle: 'Enter your details to begin',
    mini_preview: 'Reading', mini_preview_intro: 'A tailored introductory reading has appeared from the details you entered.',
    theme_toggle_aria: 'Toggle theme',
    currency_label: 'Currency:',
    form_note: 'Your request is saved securely in the Joytir Veda booking system. The owner can review it from the private dashboard.',
    request_booking: 'Request booking', request_received: 'Request received',
    edit_request: 'Edit request',
    confirm_msg: 'Your booking request has been recorded in Joytir Veda. It will appear instantly on the owner dashboard.',
  },
  ml: {
    nav_services: 'സേവനങ്ങൾ', nav_how: 'എങ്ങനെ പ്രവർത്തിക്കുന്നു', nav_astrologer: 'ജ്യോതിഷി',
    nav_faq: 'പതിവുചോദ്യങ്ങൾ', nav_book: 'വായന ബുക്ക് ചെയ്യുക',
    systems_used: 'ഉപയോഗിക്കുന്ന സംവിധാനങ്ങൾ', sessions_offered: 'സെഷനുകൾ ലഭ്യമാണ്',
    english_malayalam: 'ഇംഗ്ലീഷും മലയാളവും',
    mini_eyebrow: 'ഒരു ചെറിയ സൂചന', mini_title: 'കവടി വായന പരീക്ഷണം',
    mini_desc: 'നിങ്ങളുടെ ജനനവിവരങ്ങൾ നൽകി ഒരു പ്രാരംഭ കവടി വായന ലഭ്യമാക്കാം.',
    mini_dob: 'ജനന തീയതി', mini_tob: 'ജനന സമയം', mini_pob: 'ജനന സ്ഥലം',
    pref_date: 'ഇഷ്ടപ്പെട്ട സെഷൻ തീയതി', mini_begin: 'കവടി വായന ആരംഭിക്കുക',
    mini_status_idle: 'ആരംഭിക്കാൻ നിങ്ങളുടെ വിവരങ്ങൾ നൽകുക',
    mini_preview: 'വായന', mini_preview_intro: 'നിങ്ങൾ നൽകിയ ജനനവിവരങ്ങളെ അടിസ്ഥാനമാക്കി വിശദമായ പ്രാരംഭ വായന തയ്യാറായി.',
    theme_toggle_aria: 'നിറം മാറ്റുക',
    currency_label: 'നാണയം:',
    form_note: 'നിങ്ങളുടെ അഭ്യർത്ഥന Joytir Veda ബുക്കിംഗ് സംവിധാനത്തിൽ സുരക്ഷിതമായി സൂക്ഷിക്കുന്നു. ഉടമയ്ക്ക് സ്വകാര്യ ഡാഷ്ബോർഡിൽ നിന്ന് ഇത് പരിശോധിക്കാം.',
    request_booking: 'ബുക്കിംഗ് അഭ്യർത്ഥിക്കുക', request_received: 'അഭ്യർത്ഥന ലഭിച്ചു',
    edit_request: 'അഭ്യർത്ഥന തിരുത്തുക',
    confirm_msg: 'നിങ്ങളുടെ ബുക്കിംഗ് അഭ്യർത്ഥന Joytir Veda-യിൽ രേഖപ്പെടുത്തി. ഉടമയുടെ ഡാഷ്ബോർഡിൽ ഇത് ഉടൻ ലഭ്യമാകും.',
  },
};

export const htmlTranslations: Record<Lang, Record<string, string>> = {
  en: { hero_title: 'Read what the sky<br>recorded the day<span class="em"> you were born.</span>' },
  ml: { hero_title: 'നിങ്ങൾ ജനിച്ച ദിവസം<br>ആകാശം രേഖപ്പെടുത്തിയതെന്തെന്ന്<span class="em"> വായിക്കൂ.</span>' },
};

export const astroQuote: Record<Lang, string> = {
  en: '"A chart doesn\'t predict a fixed future. It shows the weather you were born into — my job is to help you read it correctly."',
  ml: '"ഒരു ജാതകം നിശ്ചിത ഭാവി പ്രവചിക്കുന്നില്ല. നിങ്ങൾ ജനിച്ച സമയത്തിന്റെ കാലാവസ്ഥയാണ് അത് കാണിക്കുന്നത് — അത് ശരിയായി വായിക്കാൻ നിങ്ങളെ സഹായിക്കുകയാണ് എന്റെ ജോലി."',
};

export const placeholderTranslations: Record<Lang, Record<string, string>> = {
  en: {},
  ml: {
    'Your name': 'നിങ്ങളുടെ പേര്',
    'City, Country': 'നഗരം, രാജ്യം',
    'Any specific questions or context...': 'പ്രത്യേക ചോദ്യങ്ങളോ വിവരങ്ങളോ...',
    'you@example.com': 'you@example.com',
    '+971 5X XXX XXXX': '+971 5X XXX XXXX',
  },
};

export const selectTranslations: Record<Lang, Record<string, string>> = {
  en: {},
  ml: {
    'Choose a session': 'ഒരു സെഷൻ തിരഞ്ഞെടുക്കുക',
    'Janma Kundli Reading': 'ജന്മകുണ്ഡലി വായന',
    'Career & Wealth': 'തൊഴിലും സമ്പത്തും',
    'Marriage Compatibility': 'വിവാഹ പൊരുത്തം',
    'Dasha Forecast': 'ദശാ പ്രവചനം',
    'Muhurat Selection': 'മുഹൂർത്ത തിരഞ്ഞെടുപ്പ്',
    'Remedial Consultation': 'പരിഹാര കൺസൾട്ടേഷൻ',
  },
};

export const textTranslations: Record<string, string> = {
  'Vedic Astrology · Jyotish Consultations': 'വേദജ്യോതിഷം · ജ്യോതിഷ് കൺസൾട്ടേഷനുകൾ',
  'Joytir Veda pairs classical Jyotish method — sidereal charts, nakshatras, planetary periods — with a live conversation about what\'s actually going on in your life right now.': 'ജ്യോതിർ വേദ ക്ലാസിക്കൽ ജ്യോതിഷ രീതികളായ സൈഡിയറൽ ചാർട്ടുകൾ, നക്ഷത്രങ്ങൾ, ഗ്രഹദശകൾ എന്നിവയെ നിങ്ങളുടെ ജീവിതത്തിൽ ഇപ്പോൾ നടക്കുന്നതിനെക്കുറിച്ചുള്ള നേരിട്ടുള്ള സംഭാഷണവുമായി കൂട്ടിച്ചേർക്കുന്നു.',
  'Book a reading': 'ഒരു വായന ബുക്ക് ചെയ്യുക',
  'See how a session works': 'ഒരു സെഷൻ എങ്ങനെ നടക്കുന്നു എന്ന് കാണുക',
  'session types': 'സെഷൻ തരങ്ങൾ', 'per session': 'ഓരോ സെഷനും',
  'written notes after': 'ശേഷമുള്ള എഴുത്തുകുറിപ്പുകൾ',
  'Services': 'സേവനങ്ങൾ',
  'Six ways to sit down with your chart': 'നിങ്ങളുടെ ജാതകവുമായി കൂടിക്കാഴ്ച നടത്താൻ ആറു വഴികൾ',
  'Pick what you actually need answered — every session is one-to-one, not a recorded reading.': 'നിങ്ങൾക്ക് യഥാർത്ഥത്തിൽ അറിയേണ്ടത് തിരഞ്ഞെടുക്കൂ — ഓരോ സെഷനും നേരിട്ടുള്ള ഒന്നിനൊന്ന് സംഭാഷണമാണ്, റെക്കോർഡ് ചെയ്ത വായനയല്ല.',
  'Janma Kundli Reading': 'ജന്മകുണ്ഡലി വായന',
  'Full birth chart': 'പൂർണ്ണ ജനനജാതകം',
  'Your full chart, house by house — personality, strengths, and the themes that tend to repeat.': 'നിങ്ങളുടെ പൂർണ്ണ ജാതകം, ഓരോ ഭാവവും — വ്യക്തിത്വം, ശക്തികൾ, ആവർത്തിച്ച് പ്രത്യക്ഷപ്പെടുന്ന ജീവിതവിഷയങ്ങൾ.',
  'Career & Wealth': 'തൊഴിലും സമ്പത്തും',
  '10th & 2nd house focus': '10-ാം & 2-ാം ഭാവം കേന്ദ്രീകരിച്ച്',
  'Where your work and money houses are pointing, and which current period favours which moves.': 'തൊഴിലും ധനവുമായി ബന്ധപ്പെട്ട ഭാവങ്ങൾ എന്താണ് സൂചിപ്പിക്കുന്നത്, നിലവിലെ ദശയിൽ ഏത് നീക്കങ്ങൾക്കാണ് അനുകൂലം.',
  'Marriage Compatibility': 'വിവാഹ പൊരുത്തം',
  'Guna Milan': 'ഗുണമിലാൻ',
  'A compatibility reading between two charts, covering the traditional matching points and where friction is likely.': 'രണ്ട് ജാതകങ്ങളുടെ പൊരുത്ത വായന — പരമ്പരാഗത പൊരുത്ത ഘടകങ്ങളും അഭിപ്രായഭിന്നത ഉണ്ടാകാൻ സാധ്യതയുള്ള മേഖലകളും ഉൾപ്പെടുത്തി.',
  'Dasha Forecast': 'ദശാ പ്രവചനം',
  'Current planetary period': 'നിലവിലെ ഗ്രഹദശ',
  'What your current mahadasha and antardasha actually mean for the next 12–18 months.': 'നിങ്ങളുടെ നിലവിലെ മഹാദശയും അന്തർദശയും അടുത്ത 12–18 മാസങ്ങൾക്ക് എന്താണ് സൂചിപ്പിക്കുന്നത്.',
  'Muhurat Selection': 'മുഹൂർത്ത തിരഞ്ഞെടുപ്പ്',
  'Auspicious timing': 'ശുഭ സമയം',
  'An auspicious date and time window for a wedding, move, launch, or other important start.': 'വിവാഹം, താമസം മാറ്റൽ, പുതിയ സംരംഭം അല്ലെങ്കിൽ മറ്റൊരു പ്രധാന തുടക്കത്തിനുള്ള ശുഭ തീയതിയും സമയവും.',
  'Remedial Consultation': 'പരിഹാര കൺസൾട്ടേഷൻ',
  'Gemstones, mantra, ritual': 'രത്നങ്ങൾ, മന്ത്രം, ആചാരം',
  'Remedies matched to your chart specifically — nothing generic, and nothing you don\'t need.': 'നിങ്ങളുടെ ജാതകത്തിന് പ്രത്യേകമായി യോജിച്ച പരിഹാരങ്ങൾ — പൊതുവായ നിർദ്ദേശങ്ങളൊന്നുമില്ല, ആവശ്യമില്ലാത്തതും ഒന്നുമില്ല.',
  'Select →': 'തിരഞ്ഞെടുക്കുക →',
  'How it works': 'എങ്ങനെ പ്രവർത്തിക്കുന്നു',
  'Four steps, in the order they actually happen': 'യഥാർത്ഥത്തിൽ നടക്കുന്ന ക്രമത്തിലുള്ള നാല് ഘട്ടങ്ങൾ',
  'Share your birth details': 'ജനന വിവരങ്ങൾ നൽകുക',
  'Date, exact time, and place of birth — this is what the entire chart is built from, so precision here matters more than anything else.': 'ജനന തീയതി, കൃത്യമായ സമയം, സ്ഥലം — മുഴുവൻ ജാതകവും ഇതിന്റെ അടിസ്ഥാനത്തിലാണ് തയ്യാറാക്കുന്നത്; അതിനാൽ ഇവിടെ കൃത്യത ഏറ്റവും പ്രധാനമാണ്.',
  'Your kundli is cast': 'നിങ്ങളുടെ കുണ്ഡലി തയ്യാറാക്കുന്നു',
  'A sidereal chart is calculated ahead of the call, so your session is spent talking, not waiting on maths.': 'കോളിന് മുമ്പ് സൈഡിയറൽ ജാതകം കണക്കാക്കപ്പെടുന്നു; അതിനാൽ സെഷനിൽ കണക്കുകൂട്ടലിനായി കാത്തിരിക്കാതെ സംസാരിക്കാം.',
  'Live reading': 'തത്സമയ വായന',
  'A video or voice call where we go through your houses, your current dasha, and the questions you actually came with.': 'വീഡിയോ അല്ലെങ്കിൽ വോയ്സ് കോളിലൂടെ നിങ്ങളുടെ ഭാവങ്ങൾ, നിലവിലെ ദശ, നിങ്ങൾക്കുള്ള യഥാർത്ഥ ചോദ്യങ്ങൾ എന്നിവ പരിശോധിക്കുന്നു.',
  'Notes to keep': 'സൂക്ഷിക്കാനുള്ള കുറിപ്പുകൾ',
  'A written summary of what was discussed, plus any remedies, sent within 48 hours.': 'സംസാരിച്ച കാര്യങ്ങളുടെ എഴുത്തുസംഗ്രഹവും നിർദ്ദേശിച്ച പരിഹാരങ്ങളും 48 മണിക്കൂറിനുള്ളിൽ അയയ്ക്കും.',
  'Your Astrologer': 'നിങ്ങളുടെ ജ്യോതിഷി',
  'Trained in the parashari and jaimini systems, reading professionally for 5 years, with a focus on practical, question-led sessions rather than long monologue readings.': 'പരാശരി, ജൈമിനി രീതികളിൽ പരിശീലനം നേടിയിട്ടുണ്ട്; 5 വർഷമായി പ്രൊഫഷണലായി ജാതകം വായിക്കുന്നു. ദീർഘമായ ഏകപക്ഷീയ പ്രസംഗങ്ങൾക്ക് പകരം പ്രായോഗികവും ചോദ്യാധിഷ്ഠിതവുമായ സെഷനുകളിലാണ് ശ്രദ്ധ.',
  'reading charts': 'ജാതകങ്ങൾ വായിക്കുന്നു',
  'English & Malayalam': 'ഇംഗ്ലീഷും മലയാളവും',
  'Book a session': 'ഒരു സെഷൻ ബുക്ക് ചെയ്യുക',
  'Tell us when and where you were born': 'നിങ്ങൾ എപ്പോൾ, എവിടെ ജനിച്ചു എന്ന് പറയൂ',
  'Booking request': 'ബുക്കിംഗ് അഭ്യർത്ഥന',
  'Full name': 'പൂർണ്ണ പേര്', 'Email': 'ഇമെയിൽ', 'Phone / WhatsApp': 'ഫോൺ / വാട്ട്സ്ആപ്പ്',
  'Session type': 'സെഷൻ തരം', 'Choose a session': 'ഒരു സെഷൻ തിരഞ്ഞെടുക്കുക',
  'Date of birth': 'ജനന തീയതി', 'Time of birth': 'ജനന സമയം', 'Place of birth': 'ജനന സ്ഥലം',
  'Preferred session date': 'ഇഷ്ടപ്പെട്ട സെഷൻ തീയതി',
  'What would you like to focus on? (optional)': 'എന്തിലാണ് ശ്രദ്ധ കേന്ദ്രീകരിക്കേണ്ടത്? (ഐച്ഛികം)',
  'Before you book': 'ബുക്ക് ചെയ്യുന്നതിന് മുമ്പ്',
  'Do I need my exact birth time?': 'എനിക്ക് കൃത്യമായ ജനനസമയം ആവശ്യമാണോ?',
  'Yes — the ascendant and house positions shift roughly every two hours, so an exact time matters for house-based questions like career or marriage timing.': 'അതെ — ലഗ്നവും ഭാവ സ്ഥാനങ്ങളും ഏകദേശം രണ്ട് മണിക്കൂറിന് ഇടയിൽ മാറാം; അതിനാൽ തൊഴിൽ അല്ലെങ്കിൽ വിവാഹസമയം പോലുള്ള ഭാവാധിഷ്ഠിത ചോദ്യങ്ങൾക്ക് കൃത്യമായ സമയം പ്രധാനമാണ്.',
  'What if I don\'t know my exact birth time?': 'എനിക്ക് കൃത്യമായ ജനനസമയം അറിയില്ലെങ്കിൽ?',
  'Bring whatever you have — a rough window, a birth certificate, or family recollection. We can still do a reading, and flag which parts depend on precise timing.': 'നിങ്ങൾക്കുള്ള വിവരം കൊണ്ടുവരൂ — ഏകദേശ സമയം, ജനന സർട്ടിഫിക്കറ്റ്, അല്ലെങ്കിൽ കുടുംബ ഓർമ്മ. വായന നടത്താം; കൃത്യമായ സമയത്തെ ആശ്രയിക്കുന്ന ഭാഗങ്ങൾ വ്യക്തമാക്കുകയും ചെയ്യും.',
  'How does the session happen?': 'സെഷൻ എങ്ങനെയാണ് നടക്കുന്നത്?',
  'Over video or voice call, whichever you prefer. The link is sent by email after your booking is confirmed.': 'നിങ്ങൾക്ക് ഇഷ്ടമുള്ള വീഡിയോ അല്ലെങ്കിൽ വോയ്സ് കോളിലൂടെ. ബുക്കിംഗ് സ്ഥിരീകരിച്ച ശേഷം ലിങ്ക് ഇമെയിൽ വഴി അയയ്ക്കും.',
  'Can I book a reading for someone else?': 'മറ്റൊരാൾക്കായി വായന ബുക്ക് ചെയ്യാമോ?',
  'Yes — parents booking for a child or a partner is common. Just use that person\'s birth details in the form.': 'അതെ — കുട്ടിക്കോ പങ്കാളിക്കോ വേണ്ടി മാതാപിതാക്കളും മറ്റുള്ളവരും ബുക്ക് ചെയ്യുന്നത് സാധാരണമാണ്. ഫോമിൽ ആ വ്യക്തിയുടെ ജനന വിവരങ്ങൾ മാത്രം നൽകുക.',
  'What\'s the cancellation policy?': 'റദ്ദാക്കൽ നയം എന്താണ്?',
  'Reschedule or cancel up to 24 hours before your session for a full refund. Inside 24 hours, sessions can be rescheduled once.': 'സെഷനിന് 24 മണിക്കൂർ മുമ്പ് വരെ മാറ്റിവയ്ക്കുകയോ റദ്ദാക്കുകയോ ചെയ്താൽ പൂർണ്ണ റീഫണ്ട് ലഭിക്കും. 24 മണിക്കൂറിനുള്ളിൽ ഒരിക്കൽ മാറ്റിവയ്ക്കാം.',
  'Vedic astrology readings, one conversation at a time.': 'വേദജ്യോതിഷ വായനകൾ, ഓരോ സംഭാഷണവും വ്യക്തിഗതമായി.',
  'Navigate': 'നാവിഗേറ്റ്', 'Contact': 'ബന്ധപ്പെടുക', 'Gmail': 'ജിമെയിൽ',
  'Al Ain, UAE': 'അൽ ഐൻ, യുഎഇ',
  '© 2026 Joytir Veda. All readings are for guidance and reflection.': '© 2026 Joytir Veda. എല്ലാ വായനകളും മാർഗ്ഗനിർദ്ദേശത്തിനും ആത്മപരിശോധനയ്ക്കുമായി മാത്രം.',
  'Made with care, under the same sky as everyone else.': 'എല്ലാവരും കാണുന്ന അതേ ആകാശത്തിന് കീഴിൽ, കരുതലോടെ തയ്യാറാക്കിയത്.',
  'Navagraha': 'നവഗ്രഹങ്ങൾ', 'Surya': 'സൂര്യ · Surya', 'Chandra': 'ചന്ദ്ര · Chandra',
  'Mangala': 'ചൊവ്വ · Mangala', 'Budha': 'ബുധ · Budha', 'Brihaspati': 'ഗുരു · ബൃഹസ്പതി',
  'Shukra': 'ശുക്ര · Shukra', 'Shani': 'ശനി · Shani', 'Rahu': 'രാഹു · Rahu', 'Ketu': 'കേതു · Ketu',
  '30–60 min': '30–60 മിനിറ്റ്', '48 hrs': '48 മണിക്കൂർ',
};

export function t(lang: Lang, key: string): string {
  return translations[lang][key] ?? key;
}

export function translateText(lang: Lang, original: string): string {
  if (lang === 'en') return original;
  return textTranslations[original] ?? original;
}
