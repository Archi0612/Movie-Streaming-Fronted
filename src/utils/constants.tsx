export const genreMap: { [key: number]: string } = {
  28: "Action",
  12: "Adv." , // Adventure -> Adv.
  16: "Anim.", // Animation -> Anim.
  35: "Comedy",
  80: "Crime",
  99: "Doc.", // Documentary -> Doc.
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Myst.", // Mystery -> Myst.
  10749: "Rom.", // Romance -> Rom.
  878: "Sci-Fi", // Science Fiction -> Sci-Fi
  10770: "TV", // TV Movie -> TV
  53: "Thriller", // Thriller -> Thrill.
  10752: "War",
  37: "Western",
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;

}