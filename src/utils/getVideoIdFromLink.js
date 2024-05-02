export function getVideoIdFromLink(link) {
  const regex = /(?:\?|&)v=([^&]+)/;
  const match = link.match(regex);
  return match ? match[1] : null;
}
