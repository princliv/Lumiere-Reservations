const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const DEFAULT_BUSINESS_ID = "lumiere-mayfair";

export interface AvailabilitySlot {
  time: string;
  time_24: string;
  available: boolean;
}

export interface AvailabilityResponse {
  afternoon: AvailabilitySlot[];
  evening: AvailabilitySlot[];
}

export interface ReservationPayload {
  business_id: string;
  booking: {
    date: string;
    time_slot: string;
    party_size: number;
    seating_preference: string;
  };
  guest: {
    full_name: string;
    email: string;
    phone: string;
    special_requests: string;
    newsletter_opt_in: boolean;
  };
}

export interface ReservationResponse {
  success: boolean;
  confirmation_code: string;
  reservation: {
    date: string;
    time_slot: string;
    time_display: string;
    party_size: number;
    seating_preference: string;
    guest_name: string;
    guest_email: string;
  };
}

export const getAvailableSlots = async (
  date: string,
  partySize: number,
  businessId: string = DEFAULT_BUSINESS_ID,
): Promise<AvailabilityResponse> => {
  const res = await fetch(
    `${API_BASE}/api/v1/availability/${businessId}?date=${date}&party_size=${partySize}`,
  );
  if (!res.ok) throw new Error("Failed to fetch available slots");
  const data = await res.json();
  return data.slots;
};

export const createReservation = async (
  payload: ReservationPayload,
): Promise<ReservationResponse> => {
  const res = await fetch(`${API_BASE}/api/v1/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.status === 409)
    throw new Error("This time slot is no longer available");
  if (!res.ok) throw new Error("Failed to create reservation");
  return res.json();
};

export const getReservation = async (confirmationCode: string) => {
  const res = await fetch(
    `${API_BASE}/api/v1/reservations/${confirmationCode}`,
  );
  if (!res.ok) throw new Error("Reservation not found");
  return res.json();
};

export const cancelReservation = async (confirmationCode: string) => {
  const res = await fetch(
    `${API_BASE}/api/v1/reservations/${confirmationCode}`,
    {
      method: "DELETE",
    },
  );
  if (!res.ok) throw new Error("Failed to cancel reservation");
  return res.json();
};
