export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  leagueTag: string;
  leagueId: string;
  author: string;
  date: string;
  readTime: number;
  category: "news" | "analysis" | "interview" | "preview" | "review";
  featured: boolean;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "IPL 2025: Five Players Who Could Define the Season",
    excerpt:
      "As the world's biggest T20 league gears up for its 18th edition, we look at the five players who have the potential to completely transform their franchises' fortunes.",
    content: "Full article content here...",
    leagueTag: "IPL",
    leagueId: "ipl",
    author: "Rohit Menon",
    date: "2025-03-18",
    readTime: 6,
    category: "preview",
    featured: true,
  },
  {
    id: "2",
    title: "SA20 Season 3: South Africa's Cricket Revolution Continues",
    excerpt:
      "The third edition of SA20 has cemented its place as one of world cricket's premier competitions, with record viewership numbers and stellar international lineups.",
    content: "Full article content here...",
    leagueTag: "SA20",
    leagueId: "sa20",
    author: "Avishkar Patel",
    date: "2025-03-15",
    readTime: 5,
    category: "analysis",
    featured: true,
  },
  {
    id: "3",
    title: "PSL 2025: Babar Azam's Return to Form Sparks Lahore Revival",
    excerpt:
      "After a challenging 2024, Pakistan's run-machine is back to his devastating best, leading Lahore Qalandars with the bat and revitalising the franchise's title hopes.",
    content: "Full article content here...",
    leagueTag: "PSL",
    leagueId: "psl",
    author: "Zara Khan",
    date: "2025-03-14",
    readTime: 4,
    category: "news",
    featured: false,
  },
  {
    id: "4",
    title: "BBL Season 14: The Stars Who Will Light Up the Summer",
    excerpt:
      "With the BBL expanding its global footprint, we preview the international signings that could make the difference between a title run and a forgettable summer.",
    content: "Full article content here...",
    leagueTag: "BBL",
    leagueId: "bbl",
    author: "Marcus Webb",
    date: "2025-03-12",
    readTime: 7,
    category: "preview",
    featured: false,
  },
  {
    id: "5",
    title: "The Hundred 2025: Will the Format Revolution Continue?",
    excerpt:
      "Four years in, The Hundred has fundamentally changed how England consumes cricket. But with The Ashes around the corner, can it keep the momentum going?",
    content: "Full article content here...",
    leagueTag: "The Hundred",
    leagueId: "hundred",
    author: "Sophie Clarke",
    date: "2025-03-11",
    readTime: 8,
    category: "analysis",
    featured: false,
  },
  {
    id: "6",
    title: "MLC's Explosive Growth: How Cricket is Conquering America",
    excerpt:
      "Two years ago, Major League Cricket was a dream. Today, it's attracting the world's best players and millions of viewers. We chart the remarkable rise of US cricket.",
    content: "Full article content here...",
    leagueTag: "MLC",
    leagueId: "mlc",
    author: "Tyler Johnson",
    date: "2025-03-09",
    readTime: 9,
    category: "analysis",
    featured: true,
  },
  {
    id: "7",
    title: "ILT20 2025: UAE's Desert Vipers Eye Historic Three-Peat",
    excerpt:
      "Back-to-back champions Desert Vipers have assembled a star-studded squad once again. Can anyone stop them from making it three in a row?",
    content: "Full article content here...",
    leagueTag: "ILT20",
    leagueId: "ilt20",
    author: "Amir Hassan",
    date: "2025-03-08",
    readTime: 5,
    category: "preview",
    featured: false,
  },
  {
    id: "8",
    title: "CPL 2025 Preview: Andre Russell's Final Hurrah?",
    excerpt:
      "At 36, Andre Russell remains one of cricket's most devastating players. This CPL season could be a watershed moment for the legendary Jamaican all-rounder.",
    content: "Full article content here...",
    leagueTag: "CPL",
    leagueId: "cpl",
    author: "Dion Charles",
    date: "2025-03-07",
    readTime: 6,
    category: "interview",
    featured: false,
  },
  {
    id: "9",
    title: "T20 Blast 2025: The Counties Ready to Shake Up English Cricket",
    excerpt:
      "With Nottinghamshire defending the crown, several counties have made shrewd signings to challenge for domestic T20 supremacy this summer.",
    content: "Full article content here...",
    leagueTag: "T20 Blast",
    leagueId: "t20blast",
    author: "James Hartley",
    date: "2025-03-05",
    readTime: 5,
    category: "preview",
    featured: false,
  },
  {
    id: "10",
    title: "BPL 2024 Review: Comilla Victorians' Dynasty Rolls On",
    excerpt:
      "Three consecutive titles. Comilla Victorians have become the most dominant team in BPL history. We break down what makes them so consistently excellent.",
    content: "Full article content here...",
    leagueTag: "BPL",
    leagueId: "bpl",
    author: "Farhan Ahmed",
    date: "2025-03-03",
    readTime: 6,
    category: "review",
    featured: false,
  },
  {
    id: "11",
    title: "LPL 2024: Sri Lanka's T20 Showcase Gains Global Attention",
    excerpt:
      "Played in some of cricket's most picturesque venues, the Lanka Premier League is quietly becoming one of the most attractive tournaments for overseas players.",
    content: "Full article content here...",
    leagueTag: "LPL",
    leagueId: "lpl",
    author: "Priya Fernando",
    date: "2025-02-28",
    readTime: 5,
    category: "analysis",
    featured: false,
  },
  {
    id: "12",
    title: "The Global T20 Calendar: How Franchise Cricket Changed Everything",
    excerpt:
      "From one IPL to eleven leagues worldwide, franchise T20 cricket has reshaped the sport's economics, player careers, and fan engagement beyond recognition.",
    content: "Full article content here...",
    leagueTag: "Global",
    leagueId: "ipl",
    author: "Vivek Sharma",
    date: "2025-02-25",
    readTime: 12,
    category: "analysis",
    featured: true,
  },
];

export const getFeaturedArticles = (): Article[] =>
  articles.filter((a) => a.featured);

export const getArticlesByLeague = (leagueId: string): Article[] =>
  articles.filter((a) => a.leagueId === leagueId);

export const getArticleById = (id: string): Article | undefined =>
  articles.find((a) => a.id === id);

export const categories = [...new Set(articles.map((a) => a.category))];
