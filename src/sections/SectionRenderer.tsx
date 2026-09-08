import type { BrandSettings, HomepageSection, MediaAsset, MenuItem, Offer } from '../types';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { FeaturedMenuSection } from './FeaturedMenuSection';
import { GallerySection } from './GallerySection';
import { resolveGalleryImages } from './galleryUtils';
import { OffersSection } from './OffersSection';
import { TestimonialsSection } from './TestimonialsSection';
import { LocationSection } from './LocationSection';

interface SectionRendererProps {
  sections: HomepageSection[];
  brand: BrandSettings;
  mediaMap: Map<string, MediaAsset>;
  items: MenuItem[];
  offers: Offer[];
  onNavigate: (link: string) => void;
  onAboutImageClick: () => void;
  onGalleryImageClick: (index: number) => void;
  onViewMenu: () => void;
}

const OFFER_BADGE: Record<Offer['type'], (o: Offer) => string> = {
  percentage: (o) => `${o.discountValue}% OFF`,
  fixed: (o) => `$${o.discountValue} OFF`,
  special_price: (o) => `Now $${o.specialPrice}`,
  bogo: () => 'Buy 1 Get 1',
};

export const SectionRenderer = ({
  sections,
  brand,
  mediaMap,
  items,
  offers,
  onNavigate,
  onAboutImageClick,
  onGalleryImageClick,
  onViewMenu,
}: SectionRendererProps) => {
  const visibleSections = [...sections].filter((s) => s.visible).sort((a, b) => a.order - b.order);

  return (
    <>
      {visibleSections.map((section) => {
        switch (section.type) {
          case 'hero':
            return (
              <HeroSection
                key={section.id}
                content={section.content}
                backgroundImageUrl={section.content.backgroundMediaId ? mediaMap.get(section.content.backgroundMediaId)?.fileUrl : undefined}
                onNavigate={onNavigate}
              />
            );

          case 'about':
            return (
              <AboutSection
                key={section.id}
                content={section.content}
                imageUrl={
                  (section.content.chefImageMediaId && mediaMap.get(section.content.chefImageMediaId)?.fileUrl) ||
                  (section.content.imageMediaId ? mediaMap.get(section.content.imageMediaId)?.fileUrl : undefined)
                }
                onImageClick={onAboutImageClick}
              />
            );

          case 'featured_menu': {
            const selected = section.content.selectedItemIds.length
              ? items.filter((i) => section.content.selectedItemIds.includes(i.id))
              : items.filter((i) => i.isFeatured);
            return (
              <FeaturedMenuSection
                key={section.id}
                content={section.content}
                items={selected.slice(0, 4).map((i) => ({
                  id: i.id,
                  name: i.name,
                  description: i.description,
                  price: i.price,
                  image: i.imageUrl ?? '',
                  badge: i.tags[0],
                }))}
                onViewMenu={onViewMenu}
              />
            );
          }

          case 'gallery':
            return (
              <GallerySection
                key={section.id}
                content={section.content}
                images={resolveGalleryImages(sections, mediaMap)}
                onImageClick={onGalleryImageClick}
              />
            );

          case 'offers': {
            const selectedOffers = offers.filter(
              (o) => o.isActive && (section.content.selectedOfferIds.length === 0 || section.content.selectedOfferIds.includes(o.id)),
            );
            return (
              <OffersSection
                key={section.id}
                content={section.content}
                offers={selectedOffers.map((o) => ({
                  id: o.id,
                  name: o.name,
                  description: `Valid through ${new Date(o.endDate).toLocaleDateString()}`,
                  badgeLabel: OFFER_BADGE[o.type](o),
                  imageUrl: o.imageMediaId ? mediaMap.get(o.imageMediaId)?.fileUrl : undefined,
                  cta: o.cta,
                }))}
                onCtaClick={onViewMenu}
              />
            );
          }

          case 'testimonials':
            return <TestimonialsSection key={section.id} content={section.content} />;

          case 'location':
            return (
              <LocationSection
                key={section.id}
                content={section.content}
                address={section.content.addressOverride || brand.contact.address}
                phone={brand.contact.phone}
                mapEmbedUrl={section.content.mapEmbedUrlOverride || brand.contact.mapEmbedUrl}
                businessHours={brand.businessHours}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
};
