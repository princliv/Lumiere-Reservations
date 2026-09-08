import { useNavigate } from 'react-router-dom';
import { useHomepageDraft, useReorderSections, useUpdateSection } from '../../hooks/api/useWebsite';
import { ReorderableList } from '../../components/ReorderableList';
import { ToggleField } from '../../components/forms/ToggleField';
import type { HomepageSection } from '../../../types';

const SECTION_LABEL: Record<string, string> = {
  hero: 'Hero',
  about: 'About',
  featured_menu: 'Featured Menu',
  gallery: 'Gallery',
  offers: 'Offers',
  testimonials: 'Testimonials',
  location: 'Location',
};

export function HomepageSectionsPage() {
  const { data: homepage, isLoading } = useHomepageDraft();
  const reorderSections = useReorderSections();
  const updateSection = useUpdateSection();
  const navigate = useNavigate();

  if (isLoading || !homepage) {
    return <p className="text-secondary text-sm">Loading homepage...</p>;
  }

  const sections = [...homepage.sections].sort((a, b) => a.order - b.order);

  const handleReorder = (next: HomepageSection[]) => {
    reorderSections.mutate(next.map((s, idx) => ({ sectionId: s.id, order: idx + 1 })));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-on-surface">Homepage Sections</h1>
        <p className="text-secondary text-sm mt-1">Drag to reorder, toggle visibility, or edit each section's content.</p>
      </div>

      <ReorderableList
        items={sections}
        onReorder={handleReorder}
        renderItem={(section, dragHandle) => (
          <div className="flex items-center gap-3 bg-surface rounded-xl border border-outline-variant/20 p-4 shadow-sm">
            {dragHandle}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-on-surface">{SECTION_LABEL[section.type] ?? section.type}</div>
            </div>
            <ToggleField
              label=""
              checked={section.visible}
              onChange={(visible) => updateSection.mutate({ type: section.type, payload: { visible } })}
            />
            <button
              onClick={() => navigate(`/admin/website/homepage/${section.type}`)}
              className="px-4 py-2 rounded-lg border border-outline-variant/40 text-sm font-medium hover:bg-surface-container-high transition-colors"
            >
              Edit
            </button>
          </div>
        )}
      />
    </div>
  );
}
