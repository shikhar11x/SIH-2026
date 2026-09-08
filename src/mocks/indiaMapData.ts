export interface StateTrend {
  state: string;
  code: string;
  trending: string[];
  volume: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export const indiaStateTrends: Record<string, StateTrend> = {
  'IN-MH': { state: 'Maharashtra', code: 'MH', trending: ['#MumbaiFlood', '#MahavikasSena', '#StartupMumbai'], volume: 842000, sentiment: 'neutral' },
  'IN-DL': { state: 'Delhi', code: 'DL', trending: ['#DelhiAirQuality', '#AAP', '#YamunaClean'], volume: 620000, sentiment: 'negative' },
  'IN-KA': { state: 'Karnataka', code: 'KA', trending: ['#BengaluruTraffic', '#TechBengaluru', '#IndiaAI'], volume: 512000, sentiment: 'positive' },
  'IN-TN': { state: 'Tamil Nadu', code: 'TN', trending: ['#TamilFilm', '#ChennaiRains', '#DMK'], volume: 390000, sentiment: 'neutral' },
  'IN-UP': { state: 'Uttar Pradesh', code: 'UP', trending: ['#RamMandir', '#KumbhMela', '#UPPolice'], volume: 710000, sentiment: 'positive' },
  'IN-GJ': { state: 'Gujarat', code: 'GJ', trending: ['#GaneshChaturthi', '#G20India', '#AhmedabadDev'], volume: 280000, sentiment: 'positive' },
  'IN-RJ': { state: 'Rajasthan', code: 'RJ', trending: ['#PinkCity', '#RajasthanElection', '#DroughtAlert'], volume: 195000, sentiment: 'neutral' },
  'IN-WB': { state: 'West Bengal', code: 'WB', trending: ['#DurgaPuja', '#KolkataKnightRiders', '#TMC'], volume: 340000, sentiment: 'neutral' },
  'IN-AP': { state: 'Andhra Pradesh', code: 'AP', trending: ['#AndhraPolitics', '#TirumalaTirupati', '#TDP'], volume: 215000, sentiment: 'neutral' },
  'IN-TS': { state: 'Telangana', code: 'TS', trending: ['#HyderabadTech', '#TSIT', '#BRS'], volume: 298000, sentiment: 'positive' },
  'IN-KL': { state: 'Kerala', code: 'KL', trending: ['#KeralaFloods', '#GodsOwnCountry', '#CPM'], volume: 178000, sentiment: 'negative' },
  'IN-MP': { state: 'Madhya Pradesh', code: 'MP', trending: ['#BhopalGas', '#MPTiger', '#BJP'], volume: 132000, sentiment: 'neutral' },
  'IN-BR': { state: 'Bihar', code: 'BR', trending: ['#ChhathPuja', '#BiharElection', '#JDU'], volume: 265000, sentiment: 'positive' },
  'IN-PB': { state: 'Punjab', code: 'PB', trending: ['#FarmersProtest', '#PunjabPolice', '#AAP'], volume: 188000, sentiment: 'negative' },
  'IN-HR': { state: 'Haryana', code: 'HR', trending: ['#HaryanaElections', '#JatReservation', '#GurgaonDev'], volume: 142000, sentiment: 'neutral' },
  'IN-OD': { state: 'Odisha', code: 'OD', trending: ['#JagannathTemple', '#OdishaRains', '#BJD'], volume: 98000, sentiment: 'neutral' },
  'IN-JH': { state: 'Jharkhand', code: 'JH', trending: ['#JharkhandMining', '#TribalRights', '#JMM'], volume: 76000, sentiment: 'negative' },
  'IN-AS': { state: 'Assam', code: 'AS', trending: ['#AssamFlood', '#CAA', '#BodoLand'], volume: 94000, sentiment: 'negative' },
  'IN-HP': { state: 'Himachal Pradesh', code: 'HP', trending: ['#HPFlash', '#ShimlaRain', '#AppleFarmer'], volume: 52000, sentiment: 'negative' },
  'IN-UK': { state: 'Uttarakhand', code: 'UK', trending: ['#ChardhamYatra', '#HaridwarGhat', '#UttarakhandForest'], volume: 64000, sentiment: 'positive' },
  'IN-GA': { state: 'Goa', code: 'GA', trending: ['#GoaTourism', '#GoaMining', '#BeachFest'], volume: 38000, sentiment: 'positive' },
  'IN-CG': { state: 'Chhattisgarh', code: 'CG', trending: ['#NaxalAlert', '#CG2026', '#Mining'], volume: 48000, sentiment: 'negative' },
  'IN-JK': { state: 'Jammu and Kashmir', code: 'JK', trending: ['#JKElections', '#KashmirTourism', '#GulmargSnow'], volume: 185000, sentiment: 'neutral' },
  'IN-LA': { state: 'Ladakh', code: 'LA', trending: ['#LadakhProtest', '#ClimateFast', '#PangongLake'], volume: 42000, sentiment: 'neutral' },
  'IN-AR': { state: 'Arunachal Pradesh', code: 'AR', trending: ['#ArunachalBorder', '#TawangMonastery', '#NortheastDev'], volume: 31000, sentiment: 'positive' },
  'IN-SK': { state: 'Sikkim', code: 'SK', trending: ['#SikkimTourism', '#OrganicFarming', '#NathuLa'], volume: 29000, sentiment: 'positive' },
  'IN-TR': { state: 'Tripura', code: 'TR', trending: ['#TripuraSundari', '#AgartalaSmartCity', '#IndigenousRights'], volume: 27000, sentiment: 'neutral' },
  'IN-ML': { state: 'Meghalaya', code: 'ML', trending: ['#ShillongMusic', '#LivingRootBridges', '#CleanestVillage'], volume: 35000, sentiment: 'positive' },
  'IN-MN': { state: 'Manipur', code: 'MN', trending: ['#ManipurPeace', '#ImphalValley', '#TribalCouncil'], volume: 82000, sentiment: 'negative' },
  'IN-NL': { state: 'Nagaland', code: 'NL', trending: ['#HornbillFestival', '#NagaPeaceTalks', '#Kohima'], volume: 39000, sentiment: 'positive' },
  'IN-MZ': { state: 'Mizoram', code: 'MZ', trending: ['#ChapcharKut', '#AizawlClean', '#MizoYouth'], volume: 22000, sentiment: 'positive' },
  'IN-CH': { state: 'Chandigarh', code: 'CH', trending: ['#ChandigarhTraffic', '#SukhnaLake', '#CityBeautiful'], volume: 45000, sentiment: 'positive' },
  'IN-PY': { state: 'Puducherry', code: 'PY', trending: ['#PondicherryTourism', '#Auroville', '#FrenchColony'], volume: 28000, sentiment: 'positive' },
  'IN-AN': { state: 'Andaman and Nicobar', code: 'AN', trending: ['#AndamanTourism', '#HavelockIsland', '#PortBlair'], volume: 19000, sentiment: 'positive' },
  'IN-LD': { state: 'Lakshadweep', code: 'LD', trending: ['#ExploreIndianIslands', '#LakshadweepTourism', '#CoralReefs'], volume: 68000, sentiment: 'positive' },
  'IN-DH': { state: 'Dadra & Nagar Haveli', code: 'DH', trending: ['#DamanBeach', '#SilvassaIndustry', '#DiuFort'], volume: 15000, sentiment: 'neutral' },
};

export const PLATFORM_FILTERS = [
  { id: 'all', label: 'All Platforms', emoji: '🌐', color: '#6366f1' },
  { id: 'twitter', label: 'X / Twitter', emoji: '𝕏', color: '#000000' },
  { id: 'youtube', label: 'YouTube', emoji: '▶', color: '#FF0000' },
  { id: 'telegram', label: 'Telegram', emoji: '✈', color: '#0088cc' },
  { id: 'reddit', label: 'Reddit', emoji: '👾', color: '#FF4500' },
  { id: 'instagram', label: 'Instagram', emoji: '📸', color: '#E1306C' },
  { id: 'linkedin', label: 'LinkedIn', emoji: 'in', color: '#0A66C2' },
];

export const PLATFORM_STATS: Record<string, {
  posts: number; users: number; sentiment: number; trending: string[]; growth: number; topTopic: string;
}> = {
  all: { posts: 2400000, users: 420000, sentiment: 68, trending: ['#IndiaAI', '#DigitalBharat', '#GovTech'], growth: 14.8, topTopic: '#IndiaAI Mission' },
  twitter: { posts: 1020000, users: 184000, sentiment: 62, trending: ['#IndiaAI', '#BJP', '#INDIA_Alliance'], growth: 22.4, topTopic: '#IndiaAI Mission' },
  youtube: { posts: 270000, users: 98000, sentiment: 74, trending: ['#TechReview', '#IndianStartup', '#GovSchemes'], growth: 18.2, topTopic: '#TechReview India' },
  telegram: { posts: 350000, users: 68000, sentiment: 55, trending: ['#BreakingNews', '#CryptoIndia', '#CyberAlert'], growth: 34.1, topTopic: '#TelegramNews' },
  reddit: { posts: 520000, users: 52000, sentiment: 71, trending: ['#IndiaTech', '#DevDiscuss', '#StudyAbroad'], growth: 12.6, topTopic: '#IndiaStack Dev' },
  instagram: { posts: 70000, users: 38000, sentiment: 82, trending: ['#IndiaReels', '#Bollywood', '#Festivals'], growth: 8.9, topTopic: '#IndiaFestival' },
  linkedin: { posts: 170000, users: 24000, sentiment: 78, trending: ['#StartupIndia', '#HiringNow', '#GovtJobs'], growth: 6.4, topTopic: '#StartupIndia 2026' },
};
