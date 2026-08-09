

interface ChefStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChefStoryModal: React.FC<ChefStoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-outline-variant/20 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-surface-container flex items-center justify-between border-b border-outline-variant/20 font-sans">
          <div>
            <span className="font-label-sm text-tertiary uppercase tracking-[0.2em] font-bold">3-Michelin-Starred Executive Chef</span>
            <h3 className="font-serif text-2xl text-on-surface font-semibold">Chef Marcelle Vignon</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-secondary hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCERWltkKVtse3b_wW36xjpnZH9THUDFygROWcQspdLRJ5HTiu6Q4NBDuP8s0kk_E5oXJtloZBVvgdvk9BSW6eZHPM0JIm2MWQi0JMbTSKmUFPHN4RR69klsdUG0fJLlQmNJl_wd_GzrcIxSvK19U9fBER_3KQL7fA0zIGK-dHc3w62l7nXnZm1R38Mognk_2XXCPih-BC_JYziLjhqu3dAC5c7svqIrWt6KOHKHronMZSMIgEaSepyrh4D-yb3FfW83BWYd5-39AA"
              alt="Chef Marcelle Vignon"
              className="w-full aspect-[4/5] object-cover rounded-xl shadow-lg border border-outline-variant/20"
            />
            <div className="md:col-span-2 space-y-4">
              <blockquote className="font-body-lg text-primary font-medium italic border-l-2 border-primary pl-4 py-1">
                "Culinary art is not found in complexity, but in the radical simplification of a flavor until its soul is revealed. At Lumière, we strip away the noise to let the ingredient speak."
              </blockquote>
              <p className="font-body-md text-secondary leading-relaxed">
                Chef Marcelle Vignon trained under legendary French masters in Lyon and Paris before earning three Michelin stars over a distinguished 20-year career. Her philosophy centers on hyper-seasonal British and French produce transformed through surgical technical precision.
              </p>
            </div>
          </div>

          <hr className="border-outline-variant/20" />

          <div className="space-y-4">
            <h4 className="font-headline-md text-on-surface font-semibold">Tasting Menu Philosophy</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <div className="font-body-md font-bold text-on-surface mb-1">Seasonal Harmony</div>
                <p className="font-body-md text-sm text-secondary">Menus change every six weeks to honor micro-seasons and peak flavor profiles.</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <div className="font-body-md font-bold text-on-surface mb-1">Zero-Waste Gastronomy</div>
                <p className="font-body-md text-sm text-secondary">Every trimming and element is upcycled into house-fermented garums, reductions, and infusions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-surface-container border-t border-outline-variant/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-body-md font-semibold hover:bg-primary-container transition-all"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};
