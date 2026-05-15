import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { enUS, id as idLocale } from 'date-fns/locale';

/**
 * Format an ISO date string into a human-readable format.
 *
 * @param {string} isoString - ISO 8601 date string (e.g., "2026-05-15T04:30:00Z")
 * @param {string} [locale='en'] - Language code ('en' or 'id')
 * @returns {string} Formatted date (e.g., "May 15, 2026" or "15 Mei 2026")
 */
export function formatDate(isoString, locale = 'en') {
  if (!isoString) return '-';
  const date = parseISO(isoString);
  const dateLocale = locale === 'id' ? idLocale : enUS;
  return format(date, 'PPP', { locale: dateLocale });
}

/**
 * Format an ISO date string into a short format.
 *
 * @param {string} isoString - ISO 8601 date string
 * @param {string} [locale='en'] - Language code
 * @returns {string} Short date (e.g., "May 15" or "15 Mei")
 */
export function formatDateShort(isoString, locale = 'en') {
  if (!isoString) return '-';
  const date = parseISO(isoString);
  const dateLocale = locale === 'id' ? idLocale : enUS;
  return format(date, 'MMM d', { locale: dateLocale });
}

/**
 * Format an ISO date string as relative time.
 *
 * @param {string} isoString - ISO 8601 date string
 * @param {string} [locale='en'] - Language code
 * @returns {string} Relative time (e.g., "2 hours ago" or "2 jam yang lalu")
 */
export function formatRelativeTime(isoString, locale = 'en') {
  if (!isoString) return '-';
  const date = parseISO(isoString);
  const dateLocale = locale === 'id' ? idLocale : enUS;
  return formatDistanceToNow(date, { addSuffix: true, locale: dateLocale });
}

/**
 * Format date and time together.
 *
 * @param {string} isoString - ISO 8601 date string
 * @returns {string} Full datetime (e.g., "May 15, 2026 at 11:30 AM")
 */
export function formatDateTime(isoString) {
  if (!isoString) return '-';
  const date = parseISO(isoString);
  return format(date, 'PPP p');
}
