import {formatDistance, parseISO, differenceInDays} from 'date-fns';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else if (options?.dateOnly) {
    // Only set to 00:00:00.000 UTC, then slice to YYYY-MM-DD
    today.setUTCHours(0, 0, 0, 0);
    return today.toISOString().slice(0, 10); // Returns "YYYY-MM-DD"
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  // Return the full ISO string by default, or if options.end was set
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', {style: 'currency', currency: 'USD'}).format(
    value
  );
