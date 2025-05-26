
import { useAdminMessages } from './useAdminMessages';
import { useAdminBookings } from './useAdminBookings';
import { useAdminSettings } from './useAdminSettings';

export const useAdminData = () => {
  const messagesHook = useAdminMessages();
  const bookingsHook = useAdminBookings();
  const settingsHook = useAdminSettings();

  const loading = messagesHook.loading || bookingsHook.loading || settingsHook.loading;

  const refetchData = () => {
    messagesHook.refetch();
    bookingsHook.refetch();
    settingsHook.refetch();
  };

  return {
    messages: messagesHook.messages,
    bookings: bookingsHook.bookings,
    settings: settingsHook.settings,
    loading,
    updateMessageStatus: messagesHook.updateMessageStatus,
    updateBookingStatus: bookingsHook.updateBookingStatus,
    saveSettings: settingsHook.saveSettings,
    refetchData
  };
};

// Re-export types for backward compatibility
export type { AdminMessage } from './useAdminMessages';
export type { AdminBooking } from './useAdminBookings';
export type { AdminSettings } from './useAdminSettings';
