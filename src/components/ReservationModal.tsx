import { useState } from 'react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState('Main Dining Floor');
  const [date, setDate] = useState('2026-08-10');
  const [time, setTime] = useState('19:30');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onSuccess(`Table reserved for ${guests} guests on ${date} at ${time} (${seatingArea})`);
      onClose();
      setStep(1);
    }
  };

  const timeSlots = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
  const areas = [
    { name: 'Main Dining Floor', desc: 'Soaring ceilings & warm amber twilight illumination' },
    { name: 'Private Vault Room', desc: 'Intimate mahogany setting for up to 10 guests' },
    { name: 'Chef’s Counter', desc: 'Front-row view of culinary preparation with Chef Vignon' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/20 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-surface-container flex items-center justify-between border-b border-outline-variant/20 font-sans">
          <div>
            <span className="font-label-sm text-primary uppercase tracking-[0.2em] font-bold">Fine Dining Reservation</span>
            <h3 className="font-serif text-2xl text-on-surface font-semibold">Reserve Your Table at Lumière</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-secondary hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-surface-container-high h-1 flex">
          <div className={`bg-primary h-full transition-all duration-300 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleNext} className="p-6 overflow-y-auto space-y-6 flex-1">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block font-body-md font-medium text-on-surface mb-3">Number of Guests</label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`flex-1 py-3 rounded-xl border text-center font-body-md font-semibold transition-all ${
                        guests === num
                          ? 'bg-primary text-on-primary border-primary shadow-md'
                          : 'border-outline-variant/40 bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-body-md font-medium text-on-surface mb-3">Atmosphere & Seating Area</label>
                <div className="space-y-3">
                  {areas.map((area) => (
                    <div
                      key={area.name}
                      onClick={() => setSeatingArea(area.name)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                        seatingArea === area.name
                          ? 'bg-surface-container border-primary shadow-sm'
                          : 'border-outline-variant/30 hover:border-outline-variant'
                      }`}
                    >
                      <div>
                        <div className="font-body-md font-semibold text-on-surface">{area.name}</div>
                        <div className="font-body-md text-sm text-secondary">{area.desc}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-1 ${
                        seatingArea === area.name ? 'border-primary bg-primary text-white' : 'border-outline'
                      }`}>
                        {seatingArea === area.name && <span className="material-symbols-outlined text-xs">check</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block font-body-md font-medium text-on-surface mb-2">Select Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block font-body-md font-medium text-on-surface mb-3">Available Sitting Time</label>
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`py-2.5 rounded-xl border text-center font-body-md transition-all ${
                        time === slot
                          ? 'bg-primary text-on-primary border-primary shadow-md font-bold'
                          : 'border-outline-variant/40 bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block font-body-md font-medium text-on-surface mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Lord / Lady Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body-md font-medium text-on-surface mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="sterling@mayfair.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block font-body-md font-medium text-on-surface mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+44 7911 123456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-body-md font-medium text-on-surface mb-1">Dietary Requirements / Special Occasion</label>
                <textarea
                  rows={3}
                  placeholder="e.g., Gluten-free tasting menu, Anniversary celebration"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-surface focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          )}

          {/* Modal Footer Buttons */}
          <div className="pt-4 flex items-center justify-between border-t border-outline-variant/20">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-xl border border-outline text-on-surface font-body-md hover:bg-surface-container-low transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-primary text-on-primary font-body-md font-bold hover:bg-primary-container shadow-md transition-all active:scale-95"
            >
              {step === 3 ? 'Confirm Reservation' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
