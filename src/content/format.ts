/** Date formatting shared by the blog list, posts and case studies. */
export function formatPostDate(date: string, language: string) {
  return new Intl.DateTimeFormat(language.startsWith('en') ? 'en-US' : 'es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}
