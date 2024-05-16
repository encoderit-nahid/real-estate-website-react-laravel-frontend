// utils/stripHtmlTags.js
export function stripHtmlTags(htmlString) {
  if (typeof window !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = htmlString;
    return div.textContent || div.innerText || "";
  }
  return htmlString.replace(/<[^>]+>/g, "");
}
