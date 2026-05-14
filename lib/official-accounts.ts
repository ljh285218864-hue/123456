const firstNames = ['Mia','Emma','Olivia','Sophia','Ava','Grace','Ella','Noah','Liam','Daniel','Lucas','James','Henry','Ethan'];
const storeSuffixes = ['Home Picks','Daily Finds','Essentials','Smart Living','Home Store','Kitchen Finds','Daily Goods','Home Choice','Living Co','Market Picks'];
const bios = [
  'Curated daily home essentials and useful lifestyle products.',
  'Simple, practical, and reliable picks for everyday living.',
  'A storefront focused on useful home and lifestyle items.',
  'Helpful product selections for modern daily routines.'
];

export function generateOfficialAccountSeed(index: number) {
  const first = firstNames[index % firstNames.length];
  const suffix = storeSuffixes[index % storeSuffixes.length];
  return {
    nickname: `${first} ${suffix}`,
    title: `${first} ${suffix}`,
    bio: bios[index % bios.length],
    email: `official${index + 1}@sharemall.local`,
    invitationCode: `OFFICIAL${String(index + 1).padStart(4, '0')}`
  };
}

export function generateOfficialAccountSeeds(count: number) {
  return Array.from({ length: Math.max(0, count) }, (_, index) => generateOfficialAccountSeed(index));
}
