
import { useAdminMessages } from './admin/useAdminMessages';
import { useAdminBookings } from './admin/useAdminBookings';
import { useAdminSettings } from './admin/useAdminSettings';

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
export type { AdminMessage } from './admin/useAdminMessages';
export type { AdminBooking } from './admin/useAdminBookings';
export type { AdminSettings } from './admin/useAdminSettings';
