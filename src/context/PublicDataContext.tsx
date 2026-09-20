import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRestaurant } from "./RestaurantContext";
import { getHomepage } from "../services/homepage";
import { getBrandSettings } from "../services/website";
import { getMenu } from "../services/menu";
import { getAddons } from "../services/addons";
import { getOffers } from "../services/offers";
import { getMedia } from "../services/media";
import { getFallbackPublicData } from "../mocks/seed";
import {
  setMenuCatalog,
  type AddonCategory,
  type MenuItem as LegacyMenuItem,
} from "../data/menuItems";
import type {
  BrandSettings,
  HomepageSection,
  MediaAsset,
  MenuCategory,
  MenuItem,
  Addon,
  Offer,
} from "../types";

interface PublicDataValue {
  isLoading: boolean;
  brand: BrandSettings | undefined;
  sections: HomepageSection[];
  mediaMap: Map<string, MediaAsset>;
  categories: MenuCategory[];
  items: MenuItem[];
  addons: Addon[];
  offers: Offer[];
}

const PublicDataContext = createContext<PublicDataValue | undefined>(undefined);

function mergeHomepageSections(
  apiSections: HomepageSection[],
  fallbackSections: HomepageSection[],
) {
  if (!apiSections.length) return fallbackSections;
  const have = new Set(apiSections.map((section) => section.type));
  const missing = fallbackSections.filter((section) => !have.has(section.type));
  if (!missing.length) return apiSections;
  return [...apiSections, ...missing].sort((a, b) => a.order - b.order);
}

function toFoodTypeVeg(foodType: MenuItem["foodType"]) {
  return foodType === "veg" || foodType === "vegan";
}

function toPrepTimeLabel(minutes?: number) {
  return minutes ? `${minutes} min` : "—";
}

function adaptItems(
  items: MenuItem[],
  categories: MenuCategory[],
): LegacyMenuItem[] {
  const categoryName = new Map(categories.map((c) => [c.id, c.name]));
  return items
    .filter((i) => i.isAvailable)
    .map((i) => ({
      id: i.id,
      name: i.name,
      category: categoryName.get(i.categoryId) ?? "Other",
      price: i.price,
      description: i.description,
      image: i.imageUrl ?? "",
      rating: i.rating ?? 4.8,
      reviews: i.reviewCount ?? 0,
      prepTime: toPrepTimeLabel(i.prepTimeMinutes),
      badge: i.tags[0],
      isVeg: toFoodTypeVeg(i.foodType),
    }));
}

function adaptAddons(addons: Addon[]): AddonCategory[] {
  const groups = new Map<string, Addon[]>();
  addons
    .filter((a) => a.isAvailable)
    .forEach((a) => {
      const key = a.group ?? "Add-ons";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(a);
    });
  return Array.from(groups.entries()).map(([name, opts]) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    selection: opts[0]?.groupSelection ?? "multiple",
    options: opts.map((o) => ({
      id: o.id,
      name: o.name,
      price: o.price,
      description: o.description,
      isVeg: o.isVeg,
    })),
  }));
}

export function PublicDataProvider({ children }: { children: ReactNode }) {
  const { restaurantId } = useRestaurant();
  const isPreview =
    new URLSearchParams(window.location.search).get("preview") === "true";
  const version = isPreview ? "draft" : "published";

  const homepageQuery = useQuery({
    queryKey: ["public-homepage", restaurantId, version],
    queryFn: () => getHomepage(restaurantId, version),
  });
  const brandQuery = useQuery({
    queryKey: ["public-brand", restaurantId, version],
    queryFn: () => getBrandSettings(restaurantId, version),
  });
  const menuQuery = useQuery({
    queryKey: ["public-menu", restaurantId],
    queryFn: () => getMenu(restaurantId),
  });
  const addonsQuery = useQuery({
    queryKey: ["public-addons", restaurantId],
    queryFn: () => getAddons(restaurantId),
  });
  const offersQuery = useQuery({
    queryKey: ["public-offers", restaurantId],
    queryFn: () => getOffers(restaurantId),
  });
  const mediaQuery = useQuery({
    queryKey: ["public-media", restaurantId],
    queryFn: () => getMedia(restaurantId),
  });

  const fallback = useMemo(() => getFallbackPublicData(), []);

  const items = menuQuery.data?.items?.length ? menuQuery.data.items : fallback.items;
  const categories = menuQuery.data?.categories?.length ? menuQuery.data.categories : fallback.categories;
  const addons = addonsQuery.data?.length ? addonsQuery.data : fallback.addons;

  useEffect(() => {
    setMenuCatalog(adaptItems(items, categories), adaptAddons(addons));
  }, [items, categories, addons]);

  const isLoading = homepageQuery.isLoading || brandQuery.isLoading;

  const mediaItems = mediaQuery.data?.items?.length ? mediaQuery.data.items : fallback.media;
  const mediaMap = new Map(mediaItems.map((m) => [m.id, m]));
  const sections = homepageQuery.isLoading
    ? []
    : mergeHomepageSections(homepageQuery.data?.sections ?? [], fallback.sections);

  const value: PublicDataValue = {
    isLoading,
    brand: brandQuery.data ?? (brandQuery.isLoading ? undefined : fallback.brand),
    sections,
    mediaMap,
    categories,
    items,
    addons,
    offers: offersQuery.data?.length ? offersQuery.data : fallback.offers,
  };

  return (
    <PublicDataContext.Provider value={value}>
      {children}
    </PublicDataContext.Provider>
  );
}

export function usePublicData() {
  const ctx = useContext(PublicDataContext);
  if (!ctx)
    throw new Error("usePublicData must be used within PublicDataProvider");
  return ctx;
}
