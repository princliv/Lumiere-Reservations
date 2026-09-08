import { createContext, useContext, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

const DEFAULT_RESTAURANT_ID = import.meta.env.VITE_DEFAULT_RESTAURANT_ID || 'rest_lumiere';
const DEFAULT_RESTAURANT_SLUG = import.meta.env.VITE_DEFAULT_RESTAURANT_SLUG || 'lumiere-mayfair';

interface RestaurantContextValue {
  restaurantId: string;
  restaurantSlug: string;
}

const RestaurantContext = createContext<RestaurantContextValue>({
  restaurantId: DEFAULT_RESTAURANT_ID,
  restaurantSlug: DEFAULT_RESTAURANT_SLUG,
});

/** Public site: always resolves to the single seeded restaurant (no real domain routing yet). */
export function PublicRestaurantProvider({ children }: { children: ReactNode }) {
  return (
    <RestaurantContext.Provider value={{ restaurantId: DEFAULT_RESTAURANT_ID, restaurantSlug: DEFAULT_RESTAURANT_SLUG }}>
      {children}
    </RestaurantContext.Provider>
  );
}

/** Admin: resolves from the logged-in user's restaurantId (falls back to the default for super_admin, whose cross-tenant management is out of MVP scope). */
export function AdminRestaurantProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const restaurantId = user?.restaurantId ?? DEFAULT_RESTAURANT_ID;
  return (
    <RestaurantContext.Provider value={{ restaurantId, restaurantSlug: DEFAULT_RESTAURANT_SLUG }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  return useContext(RestaurantContext);
}
