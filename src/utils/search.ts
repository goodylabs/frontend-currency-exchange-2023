const regex = /\s+/g;

export function includesWithWhitespaceCaseIgnore(
  searched: string,
  phrase: string
) {
  return searched
    .toLowerCase()
    .replace(regex, "")
    .includes(phrase.toLowerCase().replace(regex, ""));
}
