export interface ColorDefinition {
  id: string;
  name: string;
  hex: string;
  description: string;
  hint: string;
}

/** Curated palette — ~40 interesting everyday hues. */
export const COLORS: ColorDefinition[] = [
  {
    id: 'saffron',
    name: 'Saffron',
    hex: '#F4C430',
    description: 'A luminous spice-gold between warm yellow and orange.',
    hint: 'Look for it in food, clothing, signs, or late-afternoon light.',
  },
  {
    id: 'terracotta',
    name: 'Terracotta',
    hex: '#E2725B',
    description: 'Earthy clay warmth with a soft reddish glow.',
    hint: 'Pots, bricks, tiles, and sun-baked surfaces love this hue.',
  },
  {
    id: 'cobalt',
    name: 'Cobalt',
    hex: '#0047AB',
    description: 'A deep, confident blue with quiet intensity.',
    hint: 'Try doors, ceramics, ink, or a clear stretch of sky.',
  },
  {
    id: 'moss',
    name: 'Moss',
    hex: '#8A9A5B',
    description: 'Soft forest green, calm and grounded.',
    hint: 'Leaves, fabric, paint chips, or a shadowed garden corner.',
  },
  {
    id: 'ultramarine',
    name: 'Ultramarine',
    hex: '#3F00FF',
    description: 'Electric royal blue with a painterly past.',
    hint: 'Signs, sports gear, packaging, or bold street art.',
  },
  {
    id: 'apricot',
    name: 'Apricot',
    hex: '#FBCEB1',
    description: 'A gentle peachy warmth, almost edible.',
    hint: 'Blush walls, fruit, soft textiles, or morning light on skin-toned surfaces.',
  },
  {
    id: 'teal',
    name: 'Teal',
    hex: '#008080',
    description: 'Balanced blue-green, fresh and steady.',
    hint: 'Bottles, tiles, jackets, or water-adjacent objects.',
  },
  {
    id: 'indigo',
    name: 'Indigo',
    hex: '#4B0082',
    description: 'Night-deep violet-blue with quiet drama.',
    hint: 'Denim shadows, notebooks, night sky posters, or ink.',
  },
  {
    id: 'ochre',
    name: 'Ochre',
    hex: '#CC7722',
    description: 'Ancient earth pigment — warm, dusty gold-brown.',
    hint: 'Soil, leather, autumn leaves, or weathered wood.',
  },
  {
    id: 'lavender',
    name: 'Lavender',
    hex: '#B57EDC',
    description: 'Soft floral purple with a powdery calm.',
    hint: 'Flowers, soaps, packaging, or pastel interiors.',
  },
  {
    id: 'coral',
    name: 'Coral',
    hex: '#FF7F50',
    description: 'Lively orange-pink, cheerful without shouting.',
    hint: 'Lip colors, toys, flowers, or summer accessories.',
  },
  {
    id: 'pistachio',
    name: 'Pistachio',
    hex: '#93C572',
    description: 'A pale nutty green, soft and playful.',
    hint: 'Snacks, kitchenware, plants, or minty interiors.',
  },
  {
    id: 'cerulean',
    name: 'Cerulean',
    hex: '#2A52BE',
    description: 'Sky-adjacent blue with clear depth.',
    hint: 'Umbrellas, stationery, tiles, or open-air reflections.',
  },
  {
    id: 'plum',
    name: 'Plum',
    hex: '#8E4585',
    description: 'Rich fruit-purple, elegant and full.',
    hint: 'Berries, scarves, wine labels, or evening fashion.',
  },
  {
    id: 'amber',
    name: 'Amber',
    hex: '#FFBF00',
    description: 'Honeyed golden light trapped in color.',
    hint: 'Glass, resin, street lamps, or sticky-sweet packaging.',
  },
  {
    id: 'mint',
    name: 'Mint',
    hex: '#98FF98',
    description: 'Cool, airy green with a fresh finish.',
    hint: 'Toothpaste, plants, sneakers, or pastel signage.',
  },
  {
    id: 'slate',
    name: 'Slate',
    hex: '#708090',
    description: 'Quiet blue-gray, architectural and calm.',
    hint: 'Stone, office objects, roofs, or metal fixtures.',
  },
  {
    id: 'rosewood',
    name: 'Rosewood',
    hex: '#65000B',
    description: 'Deep wine-red with wooden warmth.',
    hint: 'Furniture, leather goods, dark flowers, or lacquer.',
  },
  {
    id: 'periwinkle',
    name: 'Periwinkle',
    hex: '#CCCCFF',
    description: 'Pale violet-blue, soft as twilight.',
    hint: 'Stationery, kids’ clothes, flowers, or painted fences.',
  },
  {
    id: 'seafoam',
    name: 'Seafoam',
    hex: '#93E9BE',
    description: 'Watery mint-green with a coastal breeze.',
    hint: 'Glass bottles, towels, ceramics, or bathroom tiles.',
  },
  {
    id: 'cinnabar',
    name: 'Cinnabar',
    hex: '#E34234',
    description: 'Vivid mineral red with ancient energy.',
    hint: 'Lacquer, seals, warning marks, or ripe fruit.',
  },
  {
    id: 'chartreuse',
    name: 'Chartreuse',
    hex: '#DFFF00',
    description: 'Electric yellow-green, impossible to ignore.',
    hint: 'Sports gear, highlighters, neon signs, or bike accents.',
  },
  {
    id: 'aubergine',
    name: 'Aubergine',
    hex: '#614051',
    description: 'Muted eggplant purple with quiet richness.',
    hint: 'Produce, textiles, shadows on fabric, or wine boxes.',
  },
  {
    id: 'sand',
    name: 'Sand',
    hex: '#C2B280',
    description: 'Neutral warm beige, soft underfoot.',
    hint: 'Linen, beaches, cardboard, or sunlit concrete.',
  },
  {
    id: 'verdigris',
    name: 'Verdigris',
    hex: '#43B3AE',
    description: 'Copper-aged teal with a living patina.',
    hint: 'Old metal, roofs, jewelry, or garden ornaments.',
  },
  {
    id: 'blush',
    name: 'Blush',
    hex: '#DE5D83',
    description: 'Warm rose pink with a gentle flush.',
    hint: 'Flowers, makeup, textiles, or bakery packaging.',
  },
  {
    id: 'navy',
    name: 'Navy',
    hex: '#000080',
    description: 'Deep maritime blue, classic and strong.',
    hint: 'Uniforms, notebooks, night clothing, or deep shadows.',
  },
  {
    id: 'honey',
    name: 'Honey',
    hex: '#EB9605',
    description: 'Golden amber-orange, sweet and dense.',
    hint: 'Jars, wood grain, pastries, or autumn leaves.',
  },
  {
    id: 'sage',
    name: 'Sage',
    hex: '#9CAF88',
    description: 'Dusty herbal green, restful and matte.',
    hint: 'Herbs, walls, ceramics, or quiet clothing.',
  },
  {
    id: 'burgundy',
    name: 'Burgundy',
    hex: '#800020',
    description: 'Deep wine red with formal elegance.',
    hint: 'Labels, leather, curtains, or late-season leaves.',
  },
  {
    id: 'sky',
    name: 'Sky',
    hex: '#87CEEB',
    description: 'Open daylight blue, light and free.',
    hint: 'Windows, balloons, ceramics, or open air reflections.',
  },
  {
    id: 'copper',
    name: 'Copper',
    hex: '#B87333',
    description: 'Warm metallic brown with a soft shine.',
    hint: 'Pipes, cookware, coins, or autumn hardware.',
  },
  {
    id: 'lilac',
    name: 'Lilac',
    hex: '#C8A2C8',
    description: 'Powdery purple with spring softness.',
    hint: 'Blooms, soaps, packaging, or pastel walls.',
  },
  {
    id: 'olive',
    name: 'Olive',
    hex: '#808000',
    description: 'Muted yellow-green, earthy and mature.',
    hint: 'Military-ish fabrics, jars, leaves, or kitchen oil bottles.',
  },
  {
    id: 'ruby',
    name: 'Ruby',
    hex: '#E0115F',
    description: 'Jewel-bright red-pink with sharp clarity.',
    hint: 'Jewelry, nails, flowers, or candy wrappers.',
  },
  {
    id: 'turquoise',
    name: 'Turquoise',
    hex: '#40E0D0',
    description: 'Vivid blue-green like tropical water.',
    hint: 'Jewelry, tiles, swim gear, or glossy ceramics.',
  },
  {
    id: 'mustard',
    name: 'Mustard',
    hex: '#FFDB58',
    description: 'Bold yellow with a slightly earthy edge.',
    hint: 'Condiment labels, scarves, taxis, or kitchenware.',
  },
  {
    id: 'charcoal',
    name: 'Charcoal',
    hex: '#36454F',
    description: 'Near-black gray with cool depth.',
    hint: 'Asphalt, electronics, graphite, or dark clothing.',
  },
  {
    id: 'peach',
    name: 'Peach',
    hex: '#FFE5B4',
    description: 'Soft pale orange, sunny and light.',
    hint: 'Fruit, walls, towels, or creamy packaging.',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    hex: '#50C878',
    description: 'Lush jewel green, vivid and alive.',
    hint: 'Plants, gemstones, bottles, or bold fashion accents.',
  },
];

export function getColorById(id: string): ColorDefinition | undefined {
  return COLORS.find((c) => c.id === id);
}

/** Deterministic daily color from a YYYY-MM-DD key. */
export function pickDailyColor(dateKey: string): ColorDefinition {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  }
  const index = hash % COLORS.length;
  return COLORS[index]!;
}
