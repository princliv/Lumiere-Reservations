

interface GalleryImage {
  src: string;
  title: string;
  caption: string;
}

interface GalleryLightboxProps {
  isOpen: boolean;
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  if (!isOpen || !images[currentIndex]) return null;

  const current = images[currentIndex];

  const handlePrev = () => {
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <span className="material-symbols-outlined text-2xl">close</span>
      </button>

      {/* Navigation Prev */}
      <button
        onClick={handlePrev}
        className="absolute left-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <span className="material-symbols-outlined text-2xl">chevron_left</span>
      </button>

      {/* Main Image Frame */}
      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center text-center">
        <img
          src={current.src}
          alt={current.title}
          className="max-w-full max-h-[70vh] rounded-xl object-contain shadow-2xl border border-white/10"
        />
        <div className="mt-4 max-w-2xl">
          <h3 className="font-headline-md text-white font-semibold">{current.title}</h3>
          <p className="font-body-md text-white/70 mt-1">{current.caption}</p>
        </div>
      </div>

      {/* Navigation Next */}
      <button
        onClick={handleNext}
        className="absolute right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <span className="material-symbols-outlined text-2xl">chevron_right</span>
      </button>
    </div>
  );
};
