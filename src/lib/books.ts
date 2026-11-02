export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  year: number;
  description: string;
  isbn: string;
  available: boolean;
  color: string;
  motif: string;
  rating: string;
};

export const categories = [
  "All",
  "Fiction",
  "Classics",
  "Mystery",
  "Poetry",
  "Non-fiction",
  "Fantasy",
];

export const books: Book[] = [
  {
    id: "secret-garden",
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    category: "Classics",
    year: 1911,
    description:
      "A lonely child discovers a locked garden and, in tending it back to life, finds her own heart beginning to bloom.",
    isbn: "9780141321062",
    available: true,
    color: "#6c7d60",
    motif: "✳",
    rating: "4.9",
  },
  {
    id: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Classics",
    year: 1813,
    description:
      "A sparkling comedy of manners, first impressions, and the courage to see one another clearly.",
    isbn: "9780141439518",
    available: false,
    color: "#a65b58",
    motif: "❋",
    rating: "4.9",
  },
  {
    id: "the-alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    year: 1988,
    description:
      "A young shepherd sets out across the desert in search of treasure, and discovers the language of listening to your heart.",
    isbn: "9780062315007",
    available: true,
    color: "#b28a4b",
    motif: "☼",
    rating: "4.7",
  },
  {
    id: "little-women",
    title: "Little Women",
    author: "Louisa May Alcott",
    category: "Classics",
    year: 1868,
    description:
      "Four sisters grow up, dream boldly, and make a home of their own in this beloved story of family.",
    isbn: "9780147514011",
    available: true,
    color: "#617b80",
    motif: "❀",
    rating: "4.8",
  },
  {
    id: "midnight-library",
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    year: 2020,
    description:
      "Between life and death lies a library where every book offers a chance to try another life.",
    isbn: "9780525559474",
    available: true,
    color: "#435d76",
    motif: "☾",
    rating: "4.6",
  },
  {
    id: "educated",
    title: "Educated",
    author: "Tara Westover",
    category: "Non-fiction",
    year: 2018,
    description:
      "A memoir about the transformative power of education and the cost of leaving home to find your own voice.",
    isbn: "9780399590504",
    available: true,
    color: "#a56c47",
    motif: "✧",
    rating: "4.8",
  },
  {
    id: "where-crawdads-sing",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    category: "Mystery",
    year: 2018,
    description:
      "In a quiet marsh town, a young woman grows up wild and alone, until a mystery draws the whole town near.",
    isbn: "9780735219090",
    available: false,
    color: "#607d70",
    motif: "❧",
    rating: "4.7",
  },
  {
    id: "milk-and-honey",
    title: "Milk and Honey",
    author: "Rupi Kaur",
    category: "Poetry",
    year: 2014,
    description:
      "A collection of poetry and prose about survival, tenderness, and finding sweetness after the hard parts.",
    isbn: "9781449474256",
    available: true,
    color: "#b7826d",
    motif: "♡",
    rating: "4.5",
  },
  {
    id: "the-night-circus",
    title: "The Night Circus",
    author: "Erin Morgenstern",
    category: "Fantasy",
    year: 2011,
    description:
      "A mysterious circus appears without warning, opening only at night and holding a magical contest within its tents.",
    isbn: "9780307744432",
    available: true,
    color: "#453b56",
    motif: "✦",
    rating: "4.8",
  },
  {
    id: "braiding-sweetgrass",
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    category: "Non-fiction",
    year: 2013,
    description:
      "An invitation to see the living world as a gift, woven from Indigenous knowledge and botanical wisdom.",
    isbn: "9781571313560",
    available: true,
    color: "#727e52",
    motif: "❧",
    rating: "4.9",
  },
  {
    id: "the-thursday-murder-club",
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    category: "Mystery",
    year: 2020,
    description:
      "Four unlikely friends in a retirement village take up cold cases—and find themselves in the middle of a new one.",
    isbn: "9781984880987",
    available: true,
    color: "#9b7955",
    motif: "⌕",
    rating: "4.6",
  },
  {
    id: "devotions",
    title: "Devotions",
    author: "Mary Oliver",
    category: "Poetry",
    year: 2017,
    description:
      "A generous gathering of poems that follow the seasons, the natural world, and the art of paying attention.",
    isbn: "9780399563249",
    available: true,
    color: "#7b8570",
    motif: "❋",
    rating: "4.9",
  },
];

export const featuredBooks = books.slice(0, 6);
export const readerBooks = books.filter((book) =>
  ["secret-garden", "little-women", "educated"].includes(book.id),
);
export const borrowedBooks = books.filter((book) =>
  ["pride-and-prejudice", "where-crawdads-sing"].includes(book.id),
);
