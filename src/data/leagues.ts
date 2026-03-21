export interface Player {
  name: string;
  country: string;
  role: string;
  runs?: number;
  wickets?: number;
  rating: number;
  image?: string;
}

export interface Season {
  year: string;
  champion: string;
  runnerUp: string;
  playerOfTournament: string;
}

export interface League {
  id: string;
  name: string;
  shortName: string;
  country: string;
  flag: string;
  founded: number;
  format: string;
  teams: number;
  activeSeason: string;
  isActive: boolean;
  prizeMoneyUSD: number;
  avgViewershipMillion: number;
  playerQualityRating: number;
  color: string;
  accentColor: string;
  description: string;
  numberOfSeasons: number;
  mostRuns: { player: string; runs: number; season: string };
  mostWickets: { player: string; wickets: number; season: string };
  highestScore: { player: string; score: number; against: string; season: string };
  topPlayers: Player[];
  recentSeasons: Season[];
  teamsList: string[];
  continent: string;
}

export const leagues: League[] = [
  {
    id: "ipl",
    name: "Indian Premier League",
    shortName: "IPL",
    country: "India",
    flag: "🇮🇳",
    founded: 2008,
    format: "T20",
    teams: 10,
    activeSeason: "2025",
    isActive: true,
    prizeMoneyUSD: 12500000,
    avgViewershipMillion: 490,
    playerQualityRating: 98,
    color: "#004BA0",
    accentColor: "#FFD700",
    description:
      "The Indian Premier League is the world's most-watched and richest cricket league, featuring the biggest stars from across the globe competing in a high-octane franchise tournament every year.",
    numberOfSeasons: 17,
    continent: "Asia",
    mostRuns: { player: "Virat Kohli", runs: 8004, season: "Career" },
    mostWickets: { player: "Yuzvendra Chahal", wickets: 205, season: "Career" },
    highestScore: { player: "Chris Gayle", score: 175, against: "PWI", season: "2013" },
    topPlayers: [
      { name: "Virat Kohli", country: "India", role: "Batsman", runs: 8004, rating: 98 },
      { name: "Rohit Sharma", country: "India", role: "Batsman", runs: 6628, rating: 96 },
      { name: "MS Dhoni", country: "India", role: "WK-Batsman", runs: 5243, rating: 97 },
      { name: "Jasprit Bumrah", country: "India", role: "Bowler", wickets: 170, rating: 97 },
      { name: "AB de Villiers", country: "South Africa", role: "WK-Batsman", runs: 5162, rating: 95 },
    ],
    recentSeasons: [
      { year: "2024", champion: "Kolkata Knight Riders", runnerUp: "SunRisers Hyderabad", playerOfTournament: "Mitchell Starc" },
      { year: "2023", champion: "Chennai Super Kings", runnerUp: "Gujarat Titans", playerOfTournament: "Devon Conway" },
      { year: "2022", champion: "Gujarat Titans", runnerUp: "Rajasthan Royals", playerOfTournament: "Hardik Pandya" },
      { year: "2021", champion: "Chennai Super Kings", runnerUp: "Kolkata Knight Riders", playerOfTournament: "Faf du Plessis" },
      { year: "2020", champion: "Mumbai Indians", runnerUp: "Delhi Capitals", playerOfTournament: "Trent Boult" },
    ],
    teamsList: [
      "Mumbai Indians", "Chennai Super Kings", "Royal Challengers Bengaluru",
      "Kolkata Knight Riders", "Delhi Capitals", "SunRisers Hyderabad",
      "Punjab Kings", "Rajasthan Royals", "Lucknow Super Giants", "Gujarat Titans"
    ],
  },
  {
    id: "bbl",
    name: "Big Bash League",
    shortName: "BBL",
    country: "Australia",
    flag: "🇦🇺",
    founded: 2011,
    format: "T20",
    teams: 8,
    activeSeason: "2024-25",
    isActive: true,
    prizeMoneyUSD: 1600000,
    avgViewershipMillion: 35,
    playerQualityRating: 85,
    color: "#00843D",
    accentColor: "#FFD700",
    description:
      "Australia's premier T20 competition, the BBL features eight city-based franchises in a festive summer tournament known for its family-friendly atmosphere and cricketing flair.",
    numberOfSeasons: 13,
    continent: "Oceania",
    mostRuns: { player: "Chris Lynn", runs: 2803, season: "Career" },
    mostWickets: { player: "Andrew Tye", wickets: 119, season: "Career" },
    highestScore: { player: "Joe Burns", score: 115, against: "Brisbane Heat", season: "2017-18" },
    topPlayers: [
      { name: "David Warner", country: "Australia", role: "Batsman", runs: 2400, rating: 91 },
      { name: "Pat Cummins", country: "Australia", role: "Bowler", wickets: 85, rating: 93 },
      { name: "Chris Lynn", country: "Australia", role: "Batsman", runs: 2803, rating: 86 },
      { name: "Glenn Maxwell", country: "Australia", role: "All-rounder", runs: 2100, rating: 90 },
      { name: "Nathan Ellis", country: "Australia", role: "Bowler", wickets: 75, rating: 82 },
    ],
    recentSeasons: [
      { year: "2023-24", champion: "Brisbane Heat", runnerUp: "Melbourne Renegades", playerOfTournament: "Josh Brown" },
      { year: "2022-23", champion: "Brisbane Heat", runnerUp: "Melbourne Renegades", playerOfTournament: "Colin Munro" },
      { year: "2021-22", champion: "Perth Scorchers", runnerUp: "Sydney Sixers", playerOfTournament: "Ashton Turner" },
      { year: "2020-21", champion: "Sydney Sixers", runnerUp: "Perth Scorchers", playerOfTournament: "Dan Christian" },
      { year: "2019-20", champion: "Sydney Sixers", runnerUp: "Melbourne Stars", playerOfTournament: "Josh Philippe" },
    ],
    teamsList: [
      "Adelaide Strikers", "Brisbane Heat", "Hobart Hurricanes", "Melbourne Renegades",
      "Melbourne Stars", "Perth Scorchers", "Sydney Sixers", "Sydney Thunder"
    ],
  },
  {
    id: "psl",
    name: "Pakistan Super League",
    shortName: "PSL",
    country: "Pakistan",
    flag: "🇵🇰",
    founded: 2016,
    format: "T20",
    teams: 6,
    activeSeason: "2025",
    isActive: true,
    prizeMoneyUSD: 1000000,
    avgViewershipMillion: 80,
    playerQualityRating: 82,
    color: "#009B3A",
    accentColor: "#FFFFFF",
    description:
      "Pakistan Super League has grown into one of Asia's most exciting T20 leagues, developing world-class Pakistani talent while attracting top international players.",
    numberOfSeasons: 9,
    continent: "Asia",
    mostRuns: { player: "Babar Azam", runs: 3056, season: "Career" },
    mostWickets: { player: "Hasan Ali", wickets: 121, season: "Career" },
    highestScore: { player: "Kamran Akmal", score: 117, against: "Peshawar Zalmi", season: "2017" },
    topPlayers: [
      { name: "Babar Azam", country: "Pakistan", role: "Batsman", runs: 3056, rating: 95 },
      { name: "Shaheen Afridi", country: "Pakistan", role: "Bowler", wickets: 90, rating: 92 },
      { name: "Mohammad Rizwan", country: "Pakistan", role: "WK-Batsman", runs: 2400, rating: 90 },
      { name: "Shadab Khan", country: "Pakistan", role: "All-rounder", wickets: 85, rating: 86 },
      { name: "Fakhar Zaman", country: "Pakistan", role: "Batsman", runs: 2100, rating: 84 },
    ],
    recentSeasons: [
      { year: "2024", champion: "Islamabad United", runnerUp: "Multan Sultans", playerOfTournament: "Shadab Khan" },
      { year: "2023", champion: "Lahore Qalandars", runnerUp: "Multan Sultans", playerOfTournament: "Fakhar Zaman" },
      { year: "2022", champion: "Lahore Qalandars", runnerUp: "Multan Sultans", playerOfTournament: "Shaheen Afridi" },
      { year: "2021", champion: "Multan Sultans", runnerUp: "Peshawar Zalmi", playerOfTournament: "Sohaib Maqsood" },
      { year: "2020", champion: "Karachi Kings", runnerUp: "Lahore Qalandars", playerOfTournament: "Babar Azam" },
    ],
    teamsList: [
      "Karachi Kings", "Lahore Qalandars", "Peshawar Zalmi",
      "Quetta Gladiators", "Islamabad United", "Multan Sultans"
    ],
  },
  {
    id: "cpl",
    name: "Caribbean Premier League",
    shortName: "CPL",
    country: "West Indies",
    flag: "🏝️",
    founded: 2013,
    format: "T20",
    teams: 6,
    activeSeason: "2025",
    isActive: false,
    prizeMoneyUSD: 1000000,
    avgViewershipMillion: 25,
    playerQualityRating: 78,
    color: "#FF6B00",
    accentColor: "#FFD700",
    description:
      "The Caribbean Premier League brings together cricket, carnival culture, and stunning tropical venues for one of the most entertaining T20 tournaments in the world.",
    numberOfSeasons: 11,
    continent: "Americas",
    mostRuns: { player: "Chris Gayle", runs: 2718, season: "Career" },
    mostWickets: { player: "Sunil Narine", wickets: 154, season: "Career" },
    highestScore: { player: "Chris Gayle", score: 132, against: "Guyana Amazon Warriors", season: "2015" },
    topPlayers: [
      { name: "Chris Gayle", country: "West Indies", role: "Batsman", runs: 2718, rating: 88 },
      { name: "Kieron Pollard", country: "West Indies", role: "All-rounder", runs: 2300, rating: 86 },
      { name: "Sunil Narine", country: "West Indies", role: "All-rounder", wickets: 154, rating: 87 },
      { name: "Andre Russell", country: "West Indies", role: "All-rounder", runs: 1900, rating: 89 },
      { name: "Shimron Hetmyer", country: "West Indies", role: "Batsman", runs: 1600, rating: 82 },
    ],
    recentSeasons: [
      { year: "2024", champion: "Guyana Amazon Warriors", runnerUp: "Trinbago Knight Riders", playerOfTournament: "Shai Hope" },
      { year: "2023", champion: "Guyana Amazon Warriors", runnerUp: "Trinbago Knight Riders", playerOfTournament: "Shimron Hetmyer" },
      { year: "2022", champion: "Jamaica Tallawahs", runnerUp: "Trinbago Knight Riders", playerOfTournament: "Kennar Lewis" },
      { year: "2021", champion: "St Kitts & Nevis Patriots", runnerUp: "St Lucia Kings", playerOfTournament: "Evin Lewis" },
      { year: "2020", champion: "Trinbago Knight Riders", runnerUp: "St Lucia Zouks", playerOfTournament: "Kieron Pollard" },
    ],
    teamsList: [
      "Barbados Royals", "Guyana Amazon Warriors", "Jamaica Tallawahs",
      "St Kitts & Nevis Patriots", "St Lucia Kings", "Trinbago Knight Riders"
    ],
  },
  {
    id: "hundred",
    name: "The Hundred",
    shortName: "Hundred",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    founded: 2021,
    format: "100 balls",
    teams: 8,
    activeSeason: "2025",
    isActive: false,
    prizeMoneyUSD: 2200000,
    avgViewershipMillion: 22,
    playerQualityRating: 88,
    color: "#003087",
    accentColor: "#CF0A2C",
    description:
      "England's innovative 100-ball format competition bringing cricket to a new generation, featuring city-based teams and simultaneous men's and women's tournaments.",
    numberOfSeasons: 4,
    continent: "Europe",
    mostRuns: { player: "Dawid Malan", runs: 987, season: "Career" },
    mostWickets: { player: "Adil Rashid", wickets: 56, season: "Career" },
    highestScore: { player: "Jos Buttler", score: 101, against: "London Spirit", season: "2021" },
    topPlayers: [
      { name: "Jos Buttler", country: "England", role: "WK-Batsman", runs: 850, rating: 92 },
      { name: "Jofra Archer", country: "England", role: "Bowler", wickets: 48, rating: 90 },
      { name: "Dawid Malan", country: "England", role: "Batsman", runs: 987, rating: 85 },
      { name: "Tom Banton", country: "England", role: "WK-Batsman", runs: 750, rating: 80 },
      { name: "Pat Brown", country: "England", role: "Bowler", wickets: 42, rating: 79 },
    ],
    recentSeasons: [
      { year: "2024", champion: "Oval Invincibles", runnerUp: "Manchester Originals", playerOfTournament: "Will Jacks" },
      { year: "2023", champion: "Oval Invincibles", runnerUp: "Manchester Originals", playerOfTournament: "Sam Curran" },
      { year: "2022", champion: "Trent Rockets", runnerUp: "Birmingham Phoenix", playerOfTournament: "D'Arcy Short" },
      { year: "2021", champion: "Southern Brave", runnerUp: "Welsh Fire", playerOfTournament: "Devon Conway" },
    ],
    teamsList: [
      "Birmingham Phoenix", "London Spirit", "Manchester Originals", "Northern Superchargers",
      "Oval Invincibles", "Southern Brave", "Trent Rockets", "Welsh Fire"
    ],
  },
  {
    id: "sa20",
    name: "SA20",
    shortName: "SA20",
    country: "South Africa",
    flag: "🇿🇦",
    founded: 2023,
    format: "T20",
    teams: 6,
    activeSeason: "2025",
    isActive: true,
    prizeMoneyUSD: 3500000,
    avgViewershipMillion: 30,
    playerQualityRating: 86,
    color: "#007A3D",
    accentColor: "#FFB612",
    description:
      "South Africa's newest IPL-owned T20 league, SA20 has rapidly become one of the world's most competitive leagues, with major IPL franchise ownership bringing in top global talent.",
    numberOfSeasons: 3,
    continent: "Africa",
    mostRuns: { player: "Quinton de Kock", runs: 1456, season: "Career" },
    mostWickets: { player: "Ottneil Baartman", wickets: 52, season: "Career" },
    highestScore: { player: "Quinton de Kock", score: 140, against: "Durban Super Giants", season: "2024" },
    topPlayers: [
      { name: "Quinton de Kock", country: "South Africa", role: "WK-Batsman", runs: 1456, rating: 92 },
      { name: "Kagiso Rabada", country: "South Africa", role: "Bowler", wickets: 48, rating: 93 },
      { name: "Aiden Markram", country: "South Africa", role: "Batsman", runs: 1200, rating: 88 },
      { name: "David Miller", country: "South Africa", role: "Batsman", runs: 1100, rating: 87 },
      { name: "Marco Jansen", country: "South Africa", role: "All-rounder", wickets: 44, rating: 86 },
    ],
    recentSeasons: [
      { year: "2025", champion: "TBD", runnerUp: "TBD", playerOfTournament: "TBD" },
      { year: "2024", champion: "Sunrisers Eastern Cape", runnerUp: "MI Cape Town", playerOfTournament: "Quinton de Kock" },
      { year: "2023", champion: "Sunrisers Eastern Cape", runnerUp: "MI Cape Town", playerOfTournament: "Marco Jansen" },
    ],
    teamsList: [
      "Durban Super Giants", "Joburg Super Kings", "MI Cape Town",
      "Paarl Royals", "Pretoria Capitals", "Sunrisers Eastern Cape"
    ],
  },
  {
    id: "lpl",
    name: "Lanka Premier League",
    shortName: "LPL",
    country: "Sri Lanka",
    flag: "🇱🇰",
    founded: 2020,
    format: "T20",
    teams: 5,
    activeSeason: "2024",
    isActive: false,
    prizeMoneyUSD: 500000,
    avgViewershipMillion: 18,
    playerQualityRating: 73,
    color: "#8B0000",
    accentColor: "#FFD700",
    description:
      "The Lanka Premier League showcases Sri Lankan cricket talent alongside international stars in a vibrant domestic T20 competition set against breathtaking island venues.",
    numberOfSeasons: 4,
    continent: "Asia",
    mostRuns: { player: "Kusal Mendis", runs: 876, season: "Career" },
    mostWickets: { player: "Wanindu Hasaranga", wickets: 46, season: "Career" },
    highestScore: { player: "Avishka Fernando", score: 102, against: "Dambulla Aura", season: "2023" },
    topPlayers: [
      { name: "Wanindu Hasaranga", country: "Sri Lanka", role: "All-rounder", wickets: 46, rating: 88 },
      { name: "Kusal Mendis", country: "Sri Lanka", role: "WK-Batsman", runs: 876, rating: 85 },
      { name: "Dasun Shanaka", country: "Sri Lanka", role: "All-rounder", runs: 750, rating: 80 },
      { name: "Dhananjaya de Silva", country: "Sri Lanka", role: "All-rounder", runs: 680, rating: 79 },
      { name: "Maheesh Theekshana", country: "Sri Lanka", role: "Bowler", wickets: 38, rating: 83 },
    ],
    recentSeasons: [
      { year: "2024", champion: "Dambulla Thunders", runnerUp: "Galle Gladiators", playerOfTournament: "Zak Crawley" },
      { year: "2023", champion: "Colombo Strikers", runnerUp: "Kandy Falcons", playerOfTournament: "Kusal Mendis" },
      { year: "2022", champion: "Dambulla Aura", runnerUp: "Jaffna Kings", playerOfTournament: "Bhanuka Rajapaksa" },
      { year: "2020", champion: "Jaffna Stallions", runnerUp: "Galle Gladiators", playerOfTournament: "Shoaib Malik" },
    ],
    teamsList: [
      "Colombo Strikers", "Dambulla Thunders", "Galle Gladiators", "Jaffna Kings", "Kandy Falcons"
    ],
  },
  {
    id: "bpl",
    name: "Bangladesh Premier League",
    shortName: "BPL",
    country: "Bangladesh",
    flag: "🇧🇩",
    founded: 2012,
    format: "T20",
    teams: 7,
    activeSeason: "2024",
    isActive: false,
    prizeMoneyUSD: 600000,
    avgViewershipMillion: 20,
    playerQualityRating: 71,
    color: "#006A4E",
    accentColor: "#F42A41",
    description:
      "Bangladesh's flagship T20 franchise competition has become a crucial platform for developing local talent and attracting international stars to the vibrant cricket-crazy nation.",
    numberOfSeasons: 10,
    continent: "Asia",
    mostRuns: { player: "Tamim Iqbal", runs: 2467, season: "Career" },
    mostWickets: { player: "Al-Amin Hossain", wickets: 95, season: "Career" },
    highestScore: { player: "Chris Gayle", score: 146, against: "Barisal Burners", season: "2012-13" },
    topPlayers: [
      { name: "Shakib Al Hasan", country: "Bangladesh", role: "All-rounder", runs: 1800, rating: 90 },
      { name: "Tamim Iqbal", country: "Bangladesh", role: "Batsman", runs: 2467, rating: 86 },
      { name: "Mustafizur Rahman", country: "Bangladesh", role: "Bowler", wickets: 78, rating: 85 },
      { name: "Mushfiqur Rahim", country: "Bangladesh", role: "WK-Batsman", runs: 1900, rating: 82 },
      { name: "Mahmudullah", country: "Bangladesh", role: "All-rounder", runs: 1600, rating: 78 },
    ],
    recentSeasons: [
      { year: "2024", champion: "Comilla Victorians", runnerUp: "Fortune Barishal", playerOfTournament: "Towhid Hridoy" },
      { year: "2023", champion: "Comilla Victorians", runnerUp: "Fortune Barishal", playerOfTournament: "Shakib Al Hasan" },
      { year: "2022", champion: "Comilla Victorians", runnerUp: "Fortune Barishal", playerOfTournament: "Faf du Plessis" },
    ],
    teamsList: [
      "Comilla Victorians", "Fortune Barishal", "Chattogram Challengers",
      "Dhaka Dominators", "Khulna Tigers", "Rangpur Riders", "Sylhet Strikers"
    ],
  },
  {
    id: "ilt20",
    name: "ILT20",
    shortName: "ILT20",
    country: "UAE",
    flag: "🇦🇪",
    founded: 2023,
    format: "T20",
    teams: 6,
    activeSeason: "2025",
    isActive: true,
    prizeMoneyUSD: 2500000,
    avgViewershipMillion: 22,
    playerQualityRating: 82,
    color: "#C8102E",
    accentColor: "#00732F",
    description:
      "The International League T20 is the UAE's premier franchise competition, backed by major IPL franchise owners and rapidly growing into one of the most competitive T20 leagues globally.",
    numberOfSeasons: 3,
    continent: "Asia",
    mostRuns: { player: "Alex Hales", runs: 982, season: "Career" },
    mostWickets: { player: "Matheesha Pathirana", wickets: 44, season: "Career" },
    highestScore: { player: "Alex Hales", score: 110, against: "Gulf Giants", season: "2023" },
    topPlayers: [
      { name: "Alex Hales", country: "England", role: "Batsman", runs: 982, rating: 87 },
      { name: "Matheesha Pathirana", country: "Sri Lanka", role: "Bowler", wickets: 44, rating: 88 },
      { name: "Nicholas Pooran", country: "West Indies", role: "WK-Batsman", runs: 870, rating: 88 },
      { name: "Rovman Powell", country: "West Indies", role: "Batsman", runs: 750, rating: 83 },
      { name: "Gerhard Erasmus", country: "Namibia", role: "All-rounder", runs: 600, rating: 75 },
    ],
    recentSeasons: [
      { year: "2025", champion: "TBD", runnerUp: "TBD", playerOfTournament: "TBD" },
      { year: "2024", champion: "Desert Vipers", runnerUp: "MI Emirates", playerOfTournament: "Colin Munro" },
      { year: "2023", champion: "Desert Vipers", runnerUp: "MI Emirates", playerOfTournament: "Alex Hales" },
    ],
    teamsList: [
      "Abu Dhabi Knight Riders", "Desert Vipers", "Dubai Capitals",
      "Gulf Giants", "MI Emirates", "Sharjah Warriors"
    ],
  },
  {
    id: "mlc",
    name: "Major League Cricket",
    shortName: "MLC",
    country: "USA",
    flag: "🇺🇸",
    founded: 2023,
    format: "T20",
    teams: 6,
    activeSeason: "2025",
    isActive: false,
    prizeMoneyUSD: 3000000,
    avgViewershipMillion: 15,
    playerQualityRating: 80,
    color: "#002868",
    accentColor: "#BF0A30",
    description:
      "Major League Cricket is America's first professional T20 league, signaling cricket's ambitious expansion into the world's biggest sports market, with IPL-backed franchises.",
    numberOfSeasons: 2,
    continent: "Americas",
    mostRuns: { player: "Andries Gous", runs: 456, season: "Career" },
    mostWickets: { player: "Ali Khan", wickets: 22, season: "Career" },
    highestScore: { player: "Andries Gous", score: 94, against: "MI New York", season: "2023" },
    topPlayers: [
      { name: "Shakib Al Hasan", country: "Bangladesh", role: "All-rounder", runs: 400, rating: 88 },
      { name: "Rilee Rossouw", country: "South Africa", role: "Batsman", runs: 420, rating: 85 },
      { name: "Andries Gous", country: "USA", role: "WK-Batsman", runs: 456, rating: 78 },
      { name: "Aaron Jones", country: "USA", role: "Batsman", runs: 380, rating: 76 },
      { name: "Ali Khan", country: "USA", role: "Bowler", wickets: 22, rating: 75 },
    ],
    recentSeasons: [
      { year: "2024", champion: "San Francisco Unicorns", runnerUp: "LA Knight Riders", playerOfTournament: "Corey Anderson" },
      { year: "2023", champion: "MI New York", runnerUp: "Texas Super Kings", playerOfTournament: "Dewald Brevis" },
    ],
    teamsList: [
      "DC Defenders", "LA Knight Riders", "MI New York",
      "San Francisco Unicorns", "Seattle Orcas", "Texas Super Kings"
    ],
  },
  {
    id: "t20blast",
    name: "Vitality T20 Blast",
    shortName: "T20 Blast",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    founded: 2003,
    format: "T20",
    teams: 18,
    activeSeason: "2025",
    isActive: false,
    prizeMoneyUSD: 800000,
    avgViewershipMillion: 18,
    playerQualityRating: 83,
    color: "#CF0A2C",
    accentColor: "#FFDD00",
    description:
      "The oldest and most storied domestic T20 competition in the world, the Vitality T20 Blast features 18 county teams competing across England and Wales every summer.",
    numberOfSeasons: 21,
    continent: "Europe",
    mostRuns: { player: "Ian Bell", runs: 3900, season: "Career" },
    mostWickets: { player: "Imran Tahir", wickets: 112, season: "Career" },
    highestScore: { player: "Alex Hales", score: 147, against: "Hampshire", season: "2015" },
    topPlayers: [
      { name: "Ben Duckett", country: "England", role: "Batsman", runs: 2100, rating: 84 },
      { name: "Sam Curran", country: "England", role: "All-rounder", wickets: 75, rating: 87 },
      { name: "Liam Livingstone", country: "England", role: "All-rounder", runs: 1800, rating: 87 },
      { name: "Dawid Malan", country: "England", role: "Batsman", runs: 2400, rating: 84 },
      { name: "Tom Curran", country: "England", role: "Bowler", wickets: 90, rating: 82 },
    ],
    recentSeasons: [
      { year: "2024", champion: "Nottinghamshire", runnerUp: "Somerset", playerOfTournament: "Joe Clarke" },
      { year: "2023", champion: "Hampshire", runnerUp: "Essex", playerOfTournament: "Liam Dawson" },
      { year: "2022", champion: "Hampshire", runnerUp: "Lancashire", playerOfTournament: "Liam Dawson" },
      { year: "2021", champion: "Kent", runnerUp: "Somerset", playerOfTournament: "Daniel Bell-Drummond" },
      { year: "2020", champion: "Notts Outlaws", runnerUp: "Surrey", playerOfTournament: "Alex Hales" },
    ],
    teamsList: [
      "Derbyshire Falcons", "Durham", "Essex Eagles", "Glamorgan",
      "Gloucestershire", "Hampshire Hawks", "Kent Spitfires", "Lancashire Lightning",
      "Leicestershire Foxes", "Middlesex", "Northamptonshire Steelbacks",
      "Nottinghamshire Outlaws", "Somerset", "Surrey", "Sussex Sharks",
      "Warwickshire Bears", "Worcestershire Rapids", "Yorkshire Vikings"
    ],
  },
];

export const getLeagueById = (id: string): League | undefined =>
  leagues.find((l) => l.id === id);

export const getActiveLeagues = (): League[] =>
  leagues.filter((l) => l.isActive);

export const getLeaguesByContinent = (continent: string): League[] =>
  leagues.filter((l) => l.continent === continent);

export const continents = [...new Set(leagues.map((l) => l.continent))];
