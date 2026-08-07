import React, { useState } from 'react';

interface ReservationViewProps {
  onNavigateLanding: () => void;
  onNavigateMenu: () => void;
  onToast: (msg: string) => void;
}

export const ReservationView = ({
  onNavigateLanding,
  onNavigateMenu,
  onToast,
}: ReservationViewProps) => {
  const [step, setStep] = useState(1);
  const [partySize, setPartySize] = useState(2);
  const [selectedDay, setSelectedDay] = useState(4);
  const [selectedMonth] = useState('September 2026');
  const [selectedTime, setSelectedTime] = useState('6:30 PM');
  const [selectedSeating, setSelectedSeating] = useState<string | null>('Indoor');
  const [isMapVisible, setIsMapVisible] = useState(false);

  // Step 3 Guest Details States
  const [fullName, setFullName] = useState('Julianne Smith');
  const [phone, setPhone] = useState('+1 (555) 000-0000');
  const [email, setEmail] = useState('julianne.s@example.com');
  const [specialRequests, setSpecialRequests] = useState('Gluten-free tasting menu preference for 1 guest.');
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('LUM-82910');

  const daysInMonth = [
    { day: 1, text: 'Tu' },
    { day: 2, text: 'We' },
    { day: 3, text: 'Th' },
    { day: 4, text: 'Fr' },
    { day: 5, text: 'Sa' },
    { day: 6, text: 'Su' },
    { day: 7, text: 'Mo' },
    { day: 8, text: 'Tu' },
    { day: 9, text: 'We' },
    { day: 10, text: 'Th' },
    { day: 11, text: 'Fr' },
    { day: 12, text: 'Sa' },
    { day: 13, text: 'Su' },
    { day: 14, text: 'Mo' },
    { day: 15, text: 'Tu' },
  ];

  const afternoonTimes = [
    { time: '12:00 PM', available: true },
    { time: '1:30 PM', available: true },
    { time: '2:45 PM', available: true },
    { time: '3:30 PM', available: false },
  ];

  const eveningTimes = [
    { time: '6:30 PM', available: true },
    { time: '7:00 PM', available: true },
    { time: '8:15 PM', available: true },
    { time: '9:00 PM', available: true },
    { time: '9:45 PM', available: true },
    { time: '10:30 PM', available: false },
  ];

  const seatingOptions = [
    {
      id: 'Indoor',
      title: 'Indoor',
      badge: 'POPULAR',
      desc: 'The elegant main hall with curated art and soft acoustics.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-UtwQJzT2m9uIFRyQs3WVXgUnEUfRAaUPE1joG1_4fIa3GmQ45nvKDnH6AEhYwiiPXimScn_LpMiiCQSoUmH-vXeRPYpfYGgSYByL4wEpYfSyFDPFlm01yQoHGrOpe4mNKh9JtIiD4dbfa-DYBeJknXksldv_P96lo8oJw309boOHcPQg3y5RYyQ1l8TGvC0H4Lbf7gdrKqz10zlv1gkWmbvCalPrm_I97_3ajnbKCrJLFB1PR6_1QPnTWKCOsbEmKfKI8xbp6LY'
    },
    {
      id: 'Outdoor',
      title: 'Outdoor',
      desc: 'Breezy terrace dining with panoramic garden views.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDelKvhuDf1eaIuh3VbrI0KaZd6jshkXloQKMXsmus1_gfLrRIc0OrFYVrYvrozrLer8ilYRogaCOWGgaiNm3ftqydqKlm5cA_ltLUC4rfmA9UUoj6xNaFgsbZW14nZT4ApEa0hlY8bAAVeb2LKGs9V8UfqJRhtTl7AyLSHeD1KJdyuZokmf7TLLyAW0VWCIXNDE5SB3Scnav9NLXZ8dr--sAFRHuvTFJ9HorS6LVOvvv3HsD5L4zPsunEFtceG-edIccFBDUAKaA'
    },
    {
      id: 'The Bar',
      title: 'The Bar',
      desc: 'High-energy seating near our award-winning mixologists.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHdjyD19lZysABSE7lqFFDnO89QTMq_5hBf4rmivW3z5CMYVLyO1toJwkUr4vBFrRkecWjBu7DUThm49PEU2LMLDUf2GNo5NFklrVZAxQ8FlozJCFGhVpN6xqsaUGbteiFSWEGj-v-VO7VkZgSbphYeH81npt-T89RDlNR2CX5lNTg2i5xq2q-Z4-Sc-nj1YFn9EK3inb3Tfb3Gfwo3px_GbdENWqGzk_30RhjXqAzqq7lXPadJZjMKdw5_QLTticy8dfguoFjmkg'
    },
    {
      id: 'Private',
      title: 'Private',
      badge: 'VIP',
      desc: 'Intimate booths or rooms for focused conversation.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2pkAsFWKQ41_OMA1ddTgYpa-OaWPSfzKjAc3Riu9meylPu7PiRJpRKfIlxI9cPvho5o2PlQ3mK_s81adzM0XUIPUOrfVBR2RM5BmckG2qHqXQs-_sbaPumWslCXmUBNVwG7bLJfq0dQARIoZ23LIi5P-xbnR_61udb1tcdhXdxqlM499-QD35d4i3mf8mhB5QKaaYqfwiMs87ncXVAhgEfGuRWV4y33tUjUVFwJFY8zYnTSOZAIbn1gB9K9d7HxFK0-0eOHZRjS8'
    }
  ];

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) {
      onToast('Please agree to the Terms of Service to continue');
      return;
    }
    setStep(4);
  };

  const handleFinalConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const code = 'LUM-' + Math.floor(10000 + Math.random() * 90000);
      setConfirmationCode(code);
      setIsProcessing(false);
      setStep(5);
      onToast(`Reservation confirmed! Code: ${code}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-20 border-b border-outline-variant/10">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span
              onClick={onNavigateLanding}
              className="font-display-lg text-2xl font-bold tracking-tight text-on-surface cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
              Lumière Reservations
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onNavigateMenu}
              className="text-secondary hover:text-on-surface transition-colors font-body-md"
            >
              Menu
            </button>
            <button
              onClick={onNavigateLanding}
              className="text-secondary hover:text-on-surface transition-colors font-body-md"
            >
              Back to Website
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-outline-variant">
              <span className="text-secondary font-body-md hidden sm:inline">Manager</span>
              <img
                className="w-10 h-10 rounded-full border-2 border-surface-container-high object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDgVxOTcr7ITtCI6CZ7UxhBf2J1EA322nMYCegXOHQPZonQ71mQqowsQYUu1VvphN2KDa8ACpltftAnhl_bEUitEq_d01je7rw9mZfo879CIiidhwd6lyhhoQVfUIWU-d-X2S1Z2W-QJGr4BRLJMvFfMa2eOdTkvefcHTR6XhFXXOe6RCcQKsP_TExKeQoI1pmeNEH1NTHyUpB1YpY_ZfQNhpiCSv2Ki4m__dfNs8xI_Eb6hw0XYHYWOu4QaDz1UAB-yj2euXIH1g"
                alt="Manager Portrait"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center pt-28 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {step < 5 && (
          <div className="w-full max-w-2xl mb-10 fade-in">
            <div className="flex justify-between items-center mb-3">
              <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-[0.2em]">
                Step {step} of 4
              </span>
              <span className="font-label-sm text-xs text-on-surface/70 uppercase font-semibold">
                {step === 1 && 'SELECT DETAILS'}
                {step === 2 && 'SEATING PREFERENCE'}
                {step === 3 && 'GUEST INFORMATION'}
                {step === 4 && 'FINAL REVIEW'}
              </span>
            </div>
            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700 ease-in-out"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* STEP 1: Select Details */}
        {step === 1 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              {/* Party Size */}
              <section className="bg-surface p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant/10">
                <h3 className="font-headline-md font-semibold mb-6 flex items-center gap-3 text-on-surface">
                  <span className="material-symbols-outlined text-primary text-2xl">groups</span>
                  Party Size
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      onClick={() => setPartySize(num)}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                        partySize === num
                          ? 'border-2 border-primary bg-primary/10 text-primary shadow-sm font-bold scale-105'
                          : 'border border-outline-variant/40 text-on-surface hover:border-primary hover:text-primary bg-surface-container-low'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={() => setPartySize(9)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                      partySize >= 9
                        ? 'border-2 border-primary bg-primary/10 text-primary shadow-sm font-bold scale-105'
                        : 'border border-outline-variant/40 text-on-surface hover:border-primary hover:text-primary bg-surface-container-low'
                    }`}
                  >
                    Large Group (8+)
                  </button>
                </div>
              </section>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Date Picker */}
                <section className="bg-surface p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-headline-md font-semibold flex items-center gap-3 text-on-surface">
                      <span className="material-symbols-outlined text-primary text-2xl">calendar_month</span>
                      Date
                    </h3>
                    <div className="flex gap-1">
                      <button className="p-2 hover:bg-surface-container rounded-full text-secondary">
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                      </button>
                      <button className="p-2 hover:bg-surface-container rounded-full text-secondary">
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-center font-bold font-body-md mb-4 text-on-surface">
                    {selectedMonth}
                  </div>
                  <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-bold text-secondary uppercase mb-3">
                    <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    <div className="aspect-square flex items-center justify-center text-outline/30 text-sm">30</div>
                    <div className="aspect-square flex items-center justify-center text-outline/30 text-sm">31</div>
                    {daysInMonth.map((d) => (
                      <button
                        key={d.day}
                        onClick={() => setSelectedDay(d.day)}
                        className={`aspect-square flex items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                          selectedDay === d.day
                            ? 'bg-primary text-on-primary font-bold shadow-md scale-105'
                            : 'hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        {d.day}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Time Slot Picker */}
                <section className="bg-surface p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
                  <h3 className="font-headline-md font-semibold mb-6 flex items-center gap-3 text-on-surface">
                    <span className="material-symbols-outlined text-primary text-2xl">schedule</span>
                    Available Time
                  </h3>
                  <div className="space-y-6 max-h-[380px] overflow-y-auto pr-1">
                    <div>
                      <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Afternoon</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {afternoonTimes.map((t) => (
                          <button
                            key={t.time}
                            disabled={!t.available}
                            onClick={() => setSelectedTime(t.time)}
                            className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                              !t.available
                                ? 'bg-surface-container text-secondary/40 cursor-not-allowed border border-transparent'
                                : selectedTime === t.time
                                ? 'border-2 border-primary bg-primary text-on-primary font-bold shadow-md scale-105'
                                : 'border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white'
                            }`}
                          >
                            {t.time}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">Evening</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {eveningTimes.map((t) => (
                          <button
                            key={t.time}
                            disabled={!t.available}
                            onClick={() => setSelectedTime(t.time)}
                            className={`py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                              !t.available
                                ? 'bg-surface-container text-secondary/40 cursor-not-allowed border border-transparent'
                                : selectedTime === t.time
                                ? 'border-2 border-primary bg-primary text-on-primary font-bold shadow-md scale-105'
                                : 'border border-primary/20 bg-primary/5 text-primary hover:bg-primary hover:text-white'
                            }`}
                          >
                            {t.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-44 space-y-6">
                <section className="bg-surface rounded-2xl overflow-hidden shadow-lg border border-outline-variant/10">
                  <div className="h-48 relative">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn-BCmPvdhaCtvMMugttVWdxIHPK-InLbetXVO24a9ybBlFtbKKa88kuMtsDyNShg-kVTh4ydJJxzjuHH4VJ6Bc08HCUkDKHq9akRSY7XYOEcf_aX2mu1_UOWQT0nopHkjLgHxHpDtNfnxXPKBbHfIZdrLq9jigV-IO7k9lvk8qlXg1dvRDnVNfqIJRXav_hMjCJC52DiBQYXpa_sdLR26lzwHnupS1lFtR2IrbyqFKAOHPQ0tEnS7Osy7Dq8PLpVnHWz-noH3Oyg"
                      alt="Lumière Fine Dining Plating"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-6">
                      <h2 className="text-white font-headline-md text-xl font-bold">Lumière Mayfair</h2>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center font-body-md text-sm">
                        <span className="text-secondary">Guests</span>
                        <span className="font-bold text-on-surface">{partySize} {partySize === 1 ? 'Person' : 'People'}</span>
                      </div>
                      <div className="flex justify-between items-center font-body-md text-sm">
                        <span className="text-secondary">Date</span>
                        <span className="font-bold text-on-surface">Wednesday, Sep {selectedDay}</span>
                      </div>
                      <div className="flex justify-between items-center font-body-md text-sm">
                        <span className="text-secondary">Time</span>
                        <span className="font-bold text-on-surface">{selectedTime}</span>
                      </div>
                    </div>

                    <hr className="border-outline-variant/20" />

                    <div className="flex items-start gap-3 bg-tertiary-fixed/20 p-4 rounded-xl border border-tertiary/20">
                      <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5 filled">stars</span>
                      <div>
                        <p className="text-xs font-bold text-tertiary uppercase tracking-wider mb-0.5">RARE FIND</p>
                        <p className="text-xs text-on-tertiary-fixed-variant leading-relaxed">
                          This time slot is in high demand. We recommend booking soon to secure your experience.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full py-4 bg-on-surface text-surface rounded-xl font-bold font-body-md hover:bg-on-surface/90 transition-all duration-300 shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                      <span>Continue to Seating</span>
                      <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Seating Preference Screen */}
        {step === 2 && (
          <div className="w-full max-w-6xl space-y-12 animate-fadeIn">
            <div className="text-center mb-10">
              <h2 className="font-display-lg text-4xl md:text-5xl font-semibold text-on-surface mb-3">
                Where would you like to sit?
              </h2>
              <p className="text-secondary font-body-lg max-w-xl mx-auto">
                Select your preferred environment for an unforgettable culinary experience tailored to your mood.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12">
              {seatingOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setSelectedSeating(opt.id)}
                  className={`group relative bg-surface-container-lowest rounded-2xl p-4 border cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-[0.98] ${
                    selectedSeating === opt.id
                      ? 'border-primary ring-2 ring-primary bg-primary/5 shadow-md'
                      : 'border-outline-variant/40 hover:border-primary/50'
                  }`}
                >
                  <div className="relative h-60 w-full rounded-xl overflow-hidden mb-4 border border-outline-variant/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={opt.image}
                      alt={opt.title}
                    />
                    {opt.badge && (
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="text-xs font-bold text-white bg-primary py-1 px-3 rounded-full uppercase shadow">
                          {opt.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-on-surface mb-1">{opt.title}</h3>
                  <p className="text-secondary text-sm font-body-md">{opt.desc}</p>
                </div>
              ))}
            </div>

            <div className="w-full max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl">map</span>
                  <h4 className="font-headline-md text-lg font-semibold text-on-surface">Floor Map Visualization</h4>
                </div>
                <button
                  onClick={() => setIsMapVisible(!isMapVisible)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/40 hover:bg-surface-container-low transition-colors text-sm font-medium"
                >
                  <span>{isMapVisible ? 'HIDE MAP' : 'VIEW MAP'}</span>
                  <span className={`material-symbols-outlined text-base transition-transform ${isMapVisible ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
              </div>

              {isMapVisible && (
                <div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/30 relative min-h-[360px] flex items-center justify-center animate-fadeIn">
                  <div className="relative z-10 w-full max-w-2xl aspect-video bg-white/80 backdrop-blur-md rounded-2xl border border-outline-variant/30 p-8 shadow-md flex flex-col justify-center items-center gap-6">
                    <div className="flex gap-8 w-full justify-center">
                      <div className={`w-36 h-28 border-2 border-dashed rounded-xl flex items-center justify-center font-bold text-xs ${selectedSeating === 'Outdoor' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant text-secondary'}`}>
                        OUTDOOR
                      </div>
                      <div className={`w-48 h-28 rounded-xl border-2 flex flex-col items-center justify-center gap-2 font-bold text-xs ${selectedSeating === 'Indoor' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant text-secondary'}`}>
                        <span className="material-symbols-outlined text-lg">restaurant</span>
                        <span>INDOOR HALL</span>
                      </div>
                    </div>

                    <div className="flex gap-8 w-full justify-center">
                      <div className={`w-48 h-16 rounded-full border-2 flex items-center justify-center font-bold text-xs ${selectedSeating === 'The Bar' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant text-secondary'}`}>
                        THE BAR
                      </div>
                      <div className={`w-36 h-16 rounded-xl border-2 flex items-center justify-center font-bold text-xs ${selectedSeating === 'Private' ? 'border-primary bg-primary/10 text-primary' : 'border-outline-variant text-secondary'}`}>
                        PRIVATE
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-outline-variant/20 py-5 px-margin-mobile md:px-margin-desktop z-40">
              <div className="max-w-container-max mx-auto flex justify-between items-center">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-secondary hover:text-on-surface transition-colors font-bold text-xs uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  <span>BACK</span>
                </button>

                <div className="flex items-center gap-8">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-secondary text-[11px] font-bold uppercase tracking-widest">PREFERENCE</span>
                    <span className="text-primary font-bold text-sm">{selectedSeating || 'Please select an option'}</span>
                  </div>

                  <button
                    disabled={!selectedSeating}
                    onClick={() => setStep(3)}
                    className={`px-10 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md ${
                      selectedSeating
                        ? 'bg-on-surface text-on-primary hover:bg-on-surface/90 active:scale-95 cursor-pointer'
                        : 'bg-secondary text-white/50 cursor-not-allowed'
                    }`}
                  >
                    Continue to Information
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Guest Details Screen */}
        {step === 3 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn max-w-5xl">
            <div className="lg:col-span-8">
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 p-6 md:p-10 space-y-8">
                <div>
                  <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-2">Secure Your Table</h2>
                  <p className="text-secondary font-body-md text-sm">
                    Please provide your details to finalize the reservation. We'll send a confirmation to your email.
                  </p>
                </div>

                <form onSubmit={handleGuestSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block font-label-sm text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Julianne Smith"
                        className="w-full bg-surface p-4 rounded-xl border border-outline-variant/50 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-label-sm text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-surface p-4 rounded-xl border border-outline-variant/50 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-label-sm text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="julianne.s@example.com"
                      className="w-full bg-surface p-4 rounded-xl border border-outline-variant/50 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-label-sm text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                      SPECIAL REQUESTS (ANNIVERSARY, ALLERGIES, ETC.)
                    </label>
                    <textarea
                      rows={4}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Is there anything we should know about your visit?"
                      className="w-full bg-surface p-4 rounded-xl border border-outline-variant/50 font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-4 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={newsletterOptIn}
                        onChange={(e) => setNewsletterOptIn(e.target.checked)}
                        className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer mt-0.5"
                      />
                      <span className="text-secondary font-body-md text-sm group-hover:text-on-surface transition-colors">
                        Send me occasional updates, seasonal menu previews, and exclusive offers (Newsletter).
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={termsAgreed}
                        onChange={(e) => setTermsAgreed(e.target.checked)}
                        className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer mt-0.5"
                        required
                      />
                      <span className="text-secondary font-body-md text-sm group-hover:text-on-surface transition-colors">
                        I agree to the <a href="#" className="text-primary font-bold underline">Terms of Service</a> and <a href="#" className="text-primary font-bold underline">Cancellation Policy</a>.
                      </span>
                    </label>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-xl border border-outline text-on-surface font-body-md text-sm font-semibold hover:bg-surface-container-low transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-10 py-4 bg-on-surface text-on-primary rounded-xl font-bold font-headline-md text-base hover:bg-on-surface-variant shadow-lg active:scale-[0.98] transition-all"
                    >
                      Review Reservation
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
                  <div className="h-36 w-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV5mDLxr2c-NtUDInr3uY8C-1KSK6gkvKT0rDyLyaSxCPb0s1jpJ56QEvz_ZyItQFLHQinnwFHRuusak70kT9l9TvZijJirbJXt4Alm4vkjx_-uOAj27MnkbpSxELFwZXeSnd2Cczuc-sUz78m0yLQ_iHV9NacXPQs7sNLDolPn_aVQvwv012LeCqGAZW7-hL5zmNVB9fjDU8TgL7rwx1g67SxI31wmm7bT9EOeTyhSjNDTp_o9XtM9wcNv7aIcnQtbuYt9QOvjgY"
                      alt="Scallop Gourmet Dish"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-headline-md text-lg font-bold text-on-surface mb-4">Reservation Summary</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-xl">calendar_today</span>
                        <div>
                          <p className="font-label-sm text-[10px] text-secondary uppercase font-bold tracking-wider">DATE & TIME</p>
                          <p className="font-body-md text-on-surface font-semibold text-sm">Wednesday, Sep {selectedDay} • {selectedTime}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-xl">group</span>
                        <div>
                          <p className="font-label-sm text-[10px] text-secondary uppercase font-bold tracking-wider">GUESTS</p>
                          <p className="font-body-md text-on-surface font-semibold text-sm">{partySize} People</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-xl">grid_view</span>
                        <div>
                          <p className="font-label-sm text-[10px] text-secondary uppercase font-bold tracking-wider">TABLE TYPE</p>
                          <p className="font-body-md text-on-surface font-semibold text-sm">{selectedSeating || 'Main Dining Area'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-fixed/20 p-5 rounded-2xl border border-primary-fixed/40">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary filled text-xl">verified</span>
                    <h4 className="font-label-sm text-xs text-primary-fixed-dim font-bold uppercase tracking-wider">
                      Instant Confirmation
                    </h4>
                  </div>
                  <p className="text-xs text-on-primary-fixed-variant leading-relaxed">
                    Lumière guarantees your table immediately upon booking. No waiting lists or secondary approvals required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Confirm Screen */}
        {step === 4 && (
          <div className="w-full max-w-4xl space-y-10 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="font-display-lg text-4xl md:text-5xl font-semibold text-on-surface mb-2">Almost there.</h2>
              <p className="font-body-lg text-secondary">Please review your reservation details before confirming.</p>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md">
                  <div className="relative h-48 w-full">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE69CdsxHdMIExbg_I9FWi7Nd48vW4C66in2TTpwKWt4hF_f4Ay18ishqdDIPFD_K_AjWjwaqOVZdkcVlHH_RdigKi-88AuK5JFHEJdIY6jT0c69hn4ysCCHCRkPwtdZhNoNX3oh5L5ZUDz0W7J__FX-Au-pMgzv0u3piZICkSbFYiZ_2osxUT1wW747c4djhVT1DIVVg9ROFQTGPEw2q0fzWS0wR2I-r2a7Srup3NSQ4pkek8Vrd-8-INdq7QfD-GXY-RHYMB7bk"
                      alt="Lumière Interior Dining Room"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-on-surface/75 via-on-surface/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <span className="font-label-sm text-xs font-bold tracking-widest text-primary-fixed bg-on-surface/40 backdrop-blur-md px-3 py-1 rounded-full mb-2 inline-block">
                        CONFIRMED RESTAURANT
                      </span>
                      <h3 className="font-headline-md text-2xl font-bold">Lumière</h3>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <span className="material-symbols-outlined text-2xl">calendar_today</span>
                        </div>
                        <div>
                          <p className="font-label-sm text-xs text-secondary uppercase font-bold tracking-wider mb-1">Date & Time</p>
                          <p className="font-headline-md text-lg font-bold text-on-surface">Wednesday, Sep {selectedDay}</p>
                          <p className="font-body-md text-sm text-on-surface/70">at {selectedTime}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <span className="material-symbols-outlined text-2xl">group</span>
                        </div>
                        <div>
                          <p className="font-label-sm text-xs text-secondary uppercase font-bold tracking-wider mb-1">Party Size</p>
                          <p className="font-headline-md text-lg font-bold text-on-surface">{partySize} People</p>
                          <p className="font-body-md text-sm text-on-surface/70">{selectedSeating || 'Main Dining Area'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-outline-variant/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary filled text-xl">verified</span>
                        <span className="font-body-md text-sm font-semibold text-on-surface">Seating Guaranteed</span>
                      </div>
                      <button
                        onClick={() => setStep(1)}
                        className="text-primary hover:underline font-label-sm text-xs font-bold uppercase tracking-widest transition-all"
                      >
                        Edit Details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low/60 border border-outline-variant/20 rounded-2xl p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-2xl">info</span>
                    <h4 className="font-headline-md text-lg font-semibold text-on-surface">Cancellation Policy</h4>
                  </div>
                  <p className="font-body-md text-sm text-secondary leading-relaxed">
                    We understand plans change. For a full refund of any deposit, please cancel at least{' '}
                    <span className="font-bold text-on-surface">24 hours</span> prior to your reservation. Cancellations made within 24 hours may incur a flat fee of $25 per guest.
                  </p>
                  <div className="flex items-center gap-3 text-on-tertiary-fixed-variant bg-tertiary-fixed/20 p-4 rounded-xl border border-tertiary/20">
                    <span className="material-symbols-outlined text-xl">notifications_active</span>
                    <p className="font-label-sm text-xs">We'll send you a reminder 48 hours before your booking.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="sticky top-28 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 shadow-xl">
                  <h4 className="font-headline-md text-xl font-bold text-on-surface mb-6">Reservation Summary</h4>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between font-body-md text-sm">
                      <span className="text-secondary">Booking Fee</span>
                      <span className="text-on-surface font-semibold">$0.00</span>
                    </div>
                    <div className="flex justify-between font-body-md text-sm">
                      <span className="text-secondary">Security Deposit</span>
                      <span className="text-on-surface font-semibold">None required</span>
                    </div>
                    <div className="h-px bg-outline-variant/20 my-2"></div>
                    <div className="flex justify-between font-headline-md text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">Free</span>
                    </div>
                  </div>

                  <button
                    disabled={isProcessing}
                    onClick={handleFinalConfirm}
                    className="w-full bg-[#1A1A1A] hover:bg-on-surface-variant text-white py-5 rounded-2xl font-headline-md font-semibold text-lg transition-all active:scale-95 shadow-lg mb-4 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-xl">sync</span>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Booking</span>
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="w-full bg-transparent hover:bg-surface-container border border-outline-variant/50 text-on-surface py-3.5 rounded-2xl font-body-md text-sm font-semibold transition-all active:scale-95 mb-6"
                  >
                    Edit Details
                  </button>

                  <p className="text-center font-label-sm text-xs text-secondary/70">
                    By clicking confirm, you agree to our <a className="underline hover:text-primary" href="#">Terms of Service</a>.
                  </p>
                </div>

                <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6 flex items-center gap-4">
                  <div className="p-3 bg-tertiary-fixed/30 rounded-full text-tertiary shrink-0">
                    <span className="material-symbols-outlined filled text-2xl">stars</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-xs font-bold text-on-surface mb-0.5">VIP ACCESSIBILITY</p>
                    <p className="font-body-md text-xs text-secondary">Member rewards apply at check-in.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Success Confirmation Screen (20a1cb4a7d0148f8b547885731dbe854) */}
        {step === 5 && (
          <div className="relative w-full max-w-3xl text-center flex flex-col items-center animate-fadeIn">
            {/* Ambient background glow & image */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
              <div
                className="w-full h-full bg-cover bg-center blur-3xl opacity-20"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWpuEh0jxR4sRh2rCDg2H11WiznFzA9IKShr1YUxW3qUCwnBAsQ-Ac-wQGiM5A2EUSVoYJ9yvxUf4bA8cIUBrnYC6pILTHKGV0M1mCDckMTIOh_pHmB3d1gYPXAq0Cn3qpKrdVedhsOcnCqPGsEuK_f9jI93VGUcTBARa4J14lXUx1VkSBk2i6hSZm61CWDElhGNm6st8nDL3LCzQXrxzGWNFTrS6LLdT_PeV01_iC34nvpCVE5w-Iu7kuhFgv3c_tItttapDYy-U")`
                }}
              ></div>
            </div>

            {/* Icon Cluster */}
            <div className="mb-8 relative group z-10">
              <div className="absolute inset-0 bg-tertiary-fixed-dim rounded-full blur-2xl opacity-25 scale-150 transition-transform group-hover:scale-110"></div>
              <div className="relative w-24 h-24 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-lg border border-outline-variant/30">
                <span className="material-symbols-outlined text-6xl text-primary filled">check_circle</span>
              </div>
            </div>

            {/* Header Content */}
            <div className="z-10 space-y-3 mb-10">
              <h2 className="font-display-lg text-4xl md:text-5xl font-semibold text-on-surface">
                Your table is reserved!
              </h2>
              <div className="inline-block bg-surface-container-low px-4 py-1.5 rounded-full border border-outline-variant/20 shadow-sm">
                <span className="font-label-sm text-xs uppercase text-secondary tracking-widest font-medium">
                  Confirmation ID: <span className="text-on-surface font-bold">#{confirmationCode}</span>
                </span>
              </div>
              <p className="font-body-lg text-secondary max-w-lg mx-auto leading-relaxed text-base pt-2">
                A confirmation has been sent to <span className="text-on-surface font-semibold">{email}</span> and <span className="text-on-surface font-semibold">{phone}</span>.
              </p>
            </div>

            {/* Action Grid (Bento Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-12 z-10">
              {/* Primary Action Card: Add to Calendar */}
              <div className="col-span-1 md:col-span-2 bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-md flex flex-col md:flex-row items-center justify-between text-left group hover:-translate-y-1 transition-all duration-300">
                <div className="mb-6 md:mb-0">
                  <h3 className="font-headline-md text-xl font-bold text-on-surface mb-1">Add to Calendar</h3>
                  <p className="font-body-md text-sm text-secondary">Ensure you don't miss the moment.</p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center md:justify-end">
                  <button
                    onClick={() => onToast('Added to Apple Calendar')}
                    className="px-5 py-2.5 rounded-xl border border-outline-variant bg-surface hover:bg-surface-container-high transition-colors flex items-center gap-2 font-body-md text-sm font-semibold text-on-surface"
                  >
                    <span className="material-symbols-outlined text-lg">event</span> Apple
                  </button>
                  <button
                    onClick={() => onToast('Added to Google Calendar')}
                    className="px-5 py-2.5 rounded-xl border border-outline-variant bg-surface hover:bg-surface-container-high transition-colors flex items-center gap-2 font-body-md text-sm font-semibold text-on-surface"
                  >
                    <span className="material-symbols-outlined text-lg">event_available</span> Google
                  </button>
                  <button
                    onClick={() => onToast('Added to Outlook Calendar')}
                    className="px-5 py-2.5 rounded-xl border border-outline-variant bg-surface hover:bg-surface-container-high transition-colors flex items-center gap-2 font-body-md text-sm font-semibold text-on-surface"
                  >
                    <span className="material-symbols-outlined text-lg">calendar_today</span> Outlook
                  </button>
                </div>
              </div>

              {/* Secondary Action: Modify Reservation */}
              <button
                onClick={() => setStep(1)}
                className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/20 hover:border-primary/40 hover:bg-surface-container transition-all flex items-center justify-between group active:scale-[0.98] text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shrink-0">
                    <span className="material-symbols-outlined text-2xl">edit_calendar</span>
                  </div>
                  <div>
                    <span className="block font-body-md text-base font-bold text-on-surface">Modify Reservation</span>
                    <span className="block font-label-sm text-xs text-secondary">Change time or party size</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                  arrow_forward_ios
                </span>
              </button>

              {/* Secondary Action: Cancel Reservation */}
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you wish to cancel this reservation?')) {
                    onToast('Reservation cancelled');
                    onNavigateLanding();
                  }
                }}
                className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/20 hover:border-error/40 hover:bg-error-container/10 transition-all flex items-center justify-between group active:scale-[0.98] text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-surface-container-highest flex items-center justify-center text-error group-hover:bg-error group-hover:text-on-error transition-colors shrink-0">
                    <span className="material-symbols-outlined text-2xl">event_busy</span>
                  </div>
                  <div>
                    <span className="block font-body-md text-base font-bold text-on-surface">Cancel Reservation</span>
                    <span className="block font-label-sm text-xs text-secondary">No longer able to attend?</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                  arrow_forward_ios
                </span>
              </button>
            </div>

            {/* Footer Back Button */}
            <button
              onClick={onNavigateLanding}
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-on-primary rounded-full font-body-md font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all z-10 cursor-pointer"
            >
              <span>Back to Website</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-container-max mx-auto px-margin-desktop py-12 border-t border-outline-variant/20 w-full flex flex-col md:flex-row justify-between items-center gap-6 text-secondary text-sm">
        <div className="flex items-center gap-2">
          <span>POWERED BY</span>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYKx2IdXw9fD2NWu1zMVjKVJlaDtxMOn2FWETtoKAUhID-k2xsQfC_LMzpHVkHG9KjQlTCW_t1UBI7hlSWDZETVWRMDhk04lPHpI0NCo3Yh5_-V_GGd-t34d5cm94kHdXW-nFtYdjU_GFurYAjvjMPC0ndJt_jBf58hKyV7wyeOO7n2e1fXcIz5DHhvdDPzRYsFF1ORE2k8y2rzd3MwDjuH5dxqwnoTju0e8PUmlEwGwC_iY_dNaQ18SMeKZwfMtrmxvEtgAaSgoc"
            alt="Astryd Logo"
            className="h-8 w-auto inline-block object-contain"
          />
        </div>
        <div className="flex gap-8 font-label-sm text-xs uppercase tracking-wider">
          <a className="hover:text-primary transition-colors" href="#">Privacy</a>
          <a className="hover:text-primary transition-colors" href="#">Contact</a>
          <a className="hover:text-primary transition-colors" href="#">Support</a>
        </div>
      </footer>
    </div>
  );
};
