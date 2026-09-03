export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  prepTime: string;
  badge?: string;
  isVeg?: boolean;
}

export const ALL_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Lumière Burger',
    category: 'Burgers',
    price: 24.0,
    description:
      'Wagyu beef patty, triple-cream brie, caramelized shallots, and black truffle aioli on a gilded brioche bun.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPnMW5dTzCZOu7a6PpSjOSlCybHhDHqPeFSGTMzcjnJUv6rBGE21VIhFyzDKEvu-NBMg05nyksq-Lwkw0ossPDtrDTkqTN04smGY-4x3sKpcRpyUE8PrsMcLbrCIjXOpp6V1RwY6ZU5pDEaXNjeWCcBIuvx7PnpR0JM49W-TRK9SoAU_ZaCO_ypjMtuDH3Xf74s8govIaiFKYwFqrhV7YZS2cjgTcc0kGc8goiHp9sWbD-vQoIgo8mIqtFmvkNZUdko_I4t2P0Qbc',
    rating: 4.9,
    reviews: 120,
    prepTime: '15 min',
    badge: 'Chef Special',
  },
  {
    id: '2',
    name: 'Artisanal Pepperoni Pizza',
    category: 'Pizza',
    price: 21.0,
    description:
      'Double-fermented sourdough, spicy calabrese, hot honey, and house-made buffalo mozzarella.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkCy0cRdoW0XthbpMq-yFA-zzuU-bFP9jHg2NTv8sGh3EohO-9aYfK7Dl5-I96z6f5kVU08oYYUTuQ5DMNyTeMikuOiPCQhM8gwpUJlG_K-45ftQPkeaBpFchmd-L9eZiWkvUz6VnF4KaJunClruzOJfkpV1gQugcoan1L0cP-BUMK1NLAkC-kH78J4zOIx-RSoJhW2WfCO42O_-CCtqspXCaTOFiIrzdNbVTW7ZO-t5eMPzEMxowDQFvBi5mSgVoZDUadMLBWbuM',
    rating: 4.8,
    reviews: 340,
    prepTime: '12 min',
    badge: 'Popular',
  },
  {
    id: '3',
    name: 'Bourbon BBQ Smoke Burger',
    category: 'Burgers',
    price: 26.0,
    description:
      'Double beef patty, maple-cured bacon, crispy tobacco onions, and house bourbon glaze.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB07yMQwR76dh5D0-v3MBWBnL3ssfCTKGyCeBFg6jCV6apKSWuJ7r4QgeWROPdFGBcTEzEMFHYZ5UuXxp7elteDC3l8djSmj-okvh33bDz6Z4pUr-ZyPp-WcmhBQc_VghB9iwogm47jb1eYg71auUezC4tyTwRaFVijmT_pdPMcEO8uGZ_j4CZFfLeo85Wn4F-zjBt4ReFBT5L5nYXZHX8Lt8gU48YRbDZcCZqRWkOJC1sSSSVhq4n3PdpMR7hDae52qOnReftxOEg',
    rating: 4.7,
    reviews: 85,
    prepTime: '18 min',
  },
  {
    id: '4',
    name: 'Spicy Buffalo Wings',
    category: 'Starters',
    price: 18.0,
    description:
      'Sous-vide then double-fried wings tossed in aged cayenne sauce. Served with roquefort dip.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbNGfsC8gCsW8lFrJs3yS08HEqpI3QxOqmPTqDuXYiIArhpoLfT2JoIEFFqFD0PD5ANgfPbDlmuQwtg1CGoIy9uEkguffKTxkD00xaEnHp7BMIRKzxABKSsZgWTTQs-UzTYMdpp01BSBCMxUzKhq8lAKrBY6PtVxVp9Vg38jaFFY0VvlSSPvtBi8Dm2BNd2oFg92Swe-F2EIWpCL8LXByIRzzrxTHfJdHN9NvNJsf6gROQQrDf6pMibfjTWtMvwQLXAtTCz2CU9GA',
    rating: 4.6,
    reviews: 1100,
    prepTime: '10 min',
  },
  {
    id: '5',
    name: 'Sea Bass Tartare & Citrus',
    category: 'Starters',
    price: 34.0,
    description: 'Wild sea bass, edible gold leaf, micro-herbs, and ruby grapefruit reduction.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjxo7PTqnkb2ByquvTN4PSJF_aFOMai0e-66m_kY5OcMK4ScTwg9t57oCRYst1rzEc1Neh9Iga_77h8NhDXn967goGSOUgpMHysAY2CIrRlRJ3U6e1itvOO5qradubZrmmoH9PUKg-z1gvg7UrufKkcT9zCRHLBegT0IB6itGigaCDbCHmaqBzpvqf6up6BUoExydS2eQJt_XytyC1J_x5w_EPJit9xmrrqWS2zQa0ONiQUD9kIS7kzrbIZinwkH3ap4F35onxV2Y',
    rating: 4.9,
    reviews: 420,
    prepTime: '12 min',
    badge: 'Signature',
  },
  {
    id: '6',
    name: 'Truffle & Wild Mushroom Pasta',
    category: 'Pasta',
    price: 29.0,
    description:
      'Handcrafted tagliatelle, black summer truffle, chanterelles, and 36-month Parmigiano Reggiano.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqIb_Uo23kTJpPcIMURUZmNrGyhHrLA_AkoSspLoXESUeC2-QgV1mYlBTlKppD6cilp8R3RB8mMxOlfndzPvfhL7xITN5VCYtU4icw39sQMq5p_re4-y6CvplHpd7U_bLH6AjvF_5pZvgdYCleJD2VLWxbX5KPeDhLZfgMDH3IkQEynd-x99MRLYQ26FI1narcNVF049Tj7tSmABL55PD8_mGdAhJKp7Bej6eAaI1hLCiWlXN50imkpkwNu1W9aTVnGekbswD9zQY',
    rating: 4.9,
    reviews: 510,
    prepTime: '15 min',
    isVeg: true,
  },
  {
    id: '7',
    name: 'Wagyu Ribeye Steak (300g)',
    category: 'Steaks',
    price: 65.0,
    description:
      'A5 Japanese Wagyu steak, bone marrow butter, roasted garlic head, and smoked sea salt flakes.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB8ahzV-qIr22Is_b8mUE8ZmFoYSg6UIiCOEuDGEcKRIjnUPd0mPnpt4ygBsi_JGlLMaQkItlCuNo6k36T1YYd4uaU1zoVRM3qrereIuSuADm5MQUgTpS600hMNOiLD9E6waygSgdOF2hRatW5Hh48IzFShpVgUp5ABu79zo68vOQWKv1Wy949N0PUp9CAsUJg9hiAPXAjWLbS1vB6pUebHkwNWFh_Y0BJP4kaMxcSGr1xeu1AsmF41ttCSrPao62HFMy6ihibr3Vg',
    rating: 5.0,
    reviews: 290,
    prepTime: '20 min',
    badge: 'Luxury',
  },
  {
    id: '8',
    name: 'Deconstructed Chocolate Sphere',
    category: 'Desserts',
    price: 28.0,
    description:
      'Valrhona 70% dark chocolate, gold leaf finish, warm hazelnut praline pour over vanilla bean gelato.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqIb_Uo23kTJpPcIMURUZmNrGyhHrLA_AkoSspLoXESUeC2-QgV1mYlBTlKppD6cilp8R3RB8mMxOlfndzPvfhL7xITN5VCYtU4icw39sQMq5p_re4-y6CvplHpd7U_bLH6AjvF_5pZvgdYCleJD2VLWxbX5KPeDhLZfgMDH3IkQEynd-x99MRLYQ26FI1narcNVF049Tj7tSmABL55PD8_mGdAhJKp7Bej6eAaI1hLCiWlXN50imkpkwNu1W9aTVnGekbswD9zQY',
    rating: 4.9,
    reviews: 640,
    prepTime: '10 min',
    badge: 'Popular',
    isVeg: true,
  },
  {
    id: '9',
    name: 'Château Margaux 2015 Premier Cru',
    category: 'Beverages',
    price: 185.0,
    description:
      'Sommelier selected premier grand cru classé, decanted and temperature-controlled.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ2SwfE-L4ENpw0vIUBXHTsJ5WtR_WchM-HleBOHJAKcVE2EBoTYxscGxwzwDphMvAL9Pm3bTQC8jItpGg-PcEX1N9MSqhU2utK5AyJayd_q0O_cOC9f6IAl0iRpUqomC_fV9pMHcOmnPnX0Sou3nleMjzMJkmyjHFb6knQH015fgsy3GnbPME85GyiNwRQCGkXjkwlICjSCGB3pd2zxXB7PMtsokmlyiVv3KycxRD8J9mx0S1RZFZd-YIMe1fwVXt9dw_1vBgTKw',
    rating: 5.0,
    reviews: 180,
    prepTime: '5 min',
  },
];

export type CartLine = {
  lineId: string;
  itemId: string;
  quantity: number;
  addonIds: string[];
  note?: string;
};

export type CartState = CartLine[];

export interface AddonOption {
  id: string;
  name: string;
  price: number;
  description?: string;
  isVeg?: boolean;
}

export interface AddonCategory {
  id: string;
  name: string;
  subtitle?: string;
  selection: 'single' | 'multiple';
  options: AddonOption[];
}

/** Customize options shown when adding a dish from the menu. */
export const ADDON_CATEGORIES: AddonCategory[] = [
  {
    id: 'beverages',
    name: 'Beverages',
    subtitle: 'Pair your dish with a curated drink',
    selection: 'multiple',
    options: [
      {
        id: 'addon-sparkling-water',
        name: 'San Pellegrino (750ml)',
        price: 6.0,
        description: 'Chilled sparkling mineral water',
        isVeg: true,
      },
      {
        id: 'addon-house-lemonade',
        name: 'Yuzu House Lemonade',
        price: 8.0,
        description: 'Fresh yuzu, mint, and sparkling soda',
        isVeg: true,
      },
      {
        id: 'addon-espresso-martini',
        name: 'Espresso Martini',
        price: 16.0,
        description: 'Vodka, coffee liqueur, fresh espresso',
      },
      {
        id: 'addon-champagne-flute',
        name: 'Champagne Flute',
        price: 22.0,
        description: 'Glass of house champagne',
        isVeg: true,
      },
    ],
  },
  {
    id: 'addons',
    name: 'Add-on Items',
    subtitle: 'Enhance your plate',
    selection: 'multiple',
    options: [
      {
        id: 'addon-truffle-fries',
        name: 'Truffle Parmesan Fries',
        price: 9.0,
        description: 'Hand-cut fries, shaved truffle, aged parmesan',
        isVeg: true,
      },
      {
        id: 'addon-foie-gras',
        name: 'Seared Foie Gras',
        price: 28.0,
        description: 'Pan-seared with cherry gastrique',
      },
      {
        id: 'addon-extra-wagyu',
        name: 'Extra Wagyu Patty',
        price: 14.0,
        description: 'Additional A5 wagyu beef patty',
      },
      {
        id: 'addon-gold-leaf',
        name: 'Edible Gold Leaf Finish',
        price: 12.0,
        description: 'Chef’s signature gold leaf garnish',
        isVeg: true,
      },
      {
        id: 'addon-side-salad',
        name: 'Heritage Leaf Salad',
        price: 8.0,
        description: 'Seasonal greens, citrus vinaigrette',
        isVeg: true,
      },
    ],
  },
  {
    id: 'combination',
    name: 'In Combination With',
    subtitle: 'Recommended pairings from the kitchen',
    selection: 'single',
    options: [
      {
        id: 'addon-combo-soup',
        name: 'Amuse-Bouche Soup Shot',
        price: 7.0,
        description: 'Seasonal bisque tasting pour',
        isVeg: true,
      },
      {
        id: 'addon-combo-dessert',
        name: 'Petit Four Duo',
        price: 11.0,
        description: 'Two chef’s choice bite-sized desserts',
        isVeg: true,
      },
      {
        id: 'addon-combo-cheese',
        name: 'Artisan Cheese Nibble',
        price: 13.0,
        description: 'Selection of three aged cheeses',
        isVeg: true,
      },
    ],
  },
];

export const ALL_ADDON_OPTIONS: AddonOption[] = ADDON_CATEGORIES.flatMap((c) => c.options);

export type CatalogEntry = {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
};

export function getCatalogEntry(id: string): CatalogEntry | undefined {
  const menuItem = ALL_MENU_ITEMS.find((item) => item.id === id);
  if (menuItem) {
    return {
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      image: menuItem.image,
      description: menuItem.description,
    };
  }
  const addon = ALL_ADDON_OPTIONS.find((item) => item.id === id);
  if (addon) {
    return {
      id: addon.id,
      name: addon.name,
      price: addon.price,
      description: addon.description,
    };
  }
  return undefined;
}

function addonKey(addonIds: string[]) {
  return [...addonIds].sort().join('|');
}

function createCartLineId() {
  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Add a primary dish with optional add-ons as one bundled cart line. */
export function addCartLine(
  cart: CartState,
  itemId: string,
  quantity: number,
  addonIds: string[] = []
): CartState {
  const key = addonKey(addonIds);
  const existing = cart.find(
    (line) => line.itemId === itemId && addonKey(line.addonIds) === key
  );

  if (existing) {
    return cart.map((line) =>
      line.lineId === existing.lineId
        ? { ...line, quantity: line.quantity + quantity }
        : line
    );
  }

  return [
    ...cart,
    {
      lineId: createCartLineId(),
      itemId,
      quantity,
      addonIds: [...addonIds],
      note: '',
    },
  ];
}

/** Remove an entire cart line (primary + add-ons). */
export function removeCartLine(cart: CartState, lineId: string): CartState {
  return cart.filter((line) => line.lineId !== lineId);
}

/** Remove a single add-on from a cart line. */
export function removeCartAddon(cart: CartState, lineId: string, addonId: string): CartState {
  return cart.map((line) =>
    line.lineId === lineId
      ? { ...line, addonIds: line.addonIds.filter((id) => id !== addonId) }
      : line
  );
}

/** Update the per-item kitchen note on a cart line. */
export function updateCartLineNote(cart: CartState, lineId: string, note: string): CartState {
  return cart.map((line) => (line.lineId === lineId ? { ...line, note } : line));
}

/** Change quantity for a specific cart line. Removing the primary removes its add-ons too. */
export function updateCartLineQty(cart: CartState, lineId: string, delta: number): CartState {
  return cart
    .map((line) =>
      line.lineId === lineId ? { ...line, quantity: line.quantity + delta } : line
    )
    .filter((line) => line.quantity > 0);
}

/** Adjust quantity for a menu item across its lines (used by menu +/-). */
export function updateItemQty(cart: CartState, itemId: string, delta: number): CartState {
  if (delta === 0) return cart;

  if (delta > 0) {
    return addCartLine(cart, itemId, delta, []);
  }

  let remaining = -delta;
  const next = cart.map((line) => ({ ...line }));

  for (let i = 0; i < next.length && remaining > 0; i++) {
    if (next[i].itemId !== itemId) continue;
    if (next[i].quantity <= remaining) {
      remaining -= next[i].quantity;
      next[i].quantity = 0;
    } else {
      next[i].quantity -= remaining;
      remaining = 0;
    }
  }

  return next.filter((line) => line.quantity > 0);
}

export function getItemQuantity(cart: CartState, itemId: string) {
  return cart
    .filter((line) => line.itemId === itemId)
    .reduce((sum, line) => sum + line.quantity, 0);
}

export type CartDisplayLine = {
  lineId: string;
  itemId: string;
  name: string;
  image: string;
  description: string;
  quantity: number;
  basePrice: number;
  unitPrice: number;
  lineTotal: number;
  note: string;
  addons: { id: string; name: string; price: number }[];
};

export function getCartLineItems(cart: CartState): CartDisplayLine[] {
  return cart
    .map((line) => {
      const item = getCatalogEntry(line.itemId);
      if (!item) return null;

      const addons = line.addonIds
        .map((id) => getCatalogEntry(id))
        .filter((entry): entry is CatalogEntry => Boolean(entry))
        .map((entry) => ({ id: entry.id, name: entry.name, price: entry.price }));

      const addonsTotal = addons.reduce((sum, addon) => sum + addon.price, 0);
      const unitPrice = item.price + addonsTotal;

      return {
        lineId: line.lineId,
        itemId: line.itemId,
        name: item.name,
        image: item.image || '',
        description: item.description || '',
        quantity: line.quantity,
        basePrice: item.price,
        unitPrice,
        lineTotal: unitPrice * line.quantity,
        note: line.note || '',
        addons,
      };
    })
    .filter((line): line is CartDisplayLine => line !== null);
}

export function getCartSubtotal(cart: CartState) {
  return getCartLineItems(cart).reduce((sum, item) => sum + item.lineTotal, 0);
}

/** Total primary dish units in the cart (add-ons are bundled, not counted separately). */
export function getCartCount(cart: CartState) {
  return cart.reduce((sum, line) => sum + line.quantity, 0);
}

/** Number of distinct cart lines (each primary + its add-ons). */
export function getCartUniqueCount(cart: CartState) {
  return cart.length;
}

/** Project unique count after adding a configured dish. */
export function projectUniqueCountAfterAdd(
  cart: CartState,
  itemId: string,
  addonIds: string[] = []
) {
  const key = addonKey(addonIds);
  const exists = cart.some(
    (line) => line.itemId === itemId && addonKey(line.addonIds) === key
  );
  return exists ? cart.length : cart.length + 1;
}
