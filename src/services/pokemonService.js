const BASE_URL = 'https://pokeapi.co/api/v2';

const versionMapping = {
  'Rouge/Bleu': ['red', 'blue'],
  'Jaune': ['yellow'],
  'Or/Argent': ['gold', 'silver'],
  'Cristal': ['crystal'],
  'Rubis/Saphir': ['ruby', 'sapphire'],
  'Émeraude': ['emerald'],
  'Rouge Feu/Vert Feuille': ['firered', 'leafgreen'],
  'Diamant/Perle': ['diamond', 'pearl'],
  'Platine': ['platinum'],
  'HeartGold/SoulSilver': ['heartgold', 'soulsilver'],
  'Noir/Blanc': ['black', 'white'],
  'Noir 2/Blanc 2': ['black-2', 'white-2'],
  'X/Y': ['x', 'y'],
  'Rubis Oméga/Saphir Alpha': ['omega-ruby', 'alpha-sapphire'],
  'Soleil/Lune': ['sun', 'moon'],
  'Ultra-Soleil/Ultra-Lune': ['ultra-sun', 'ultra-moon'],
  'Épée/Bouclier': ['sword', 'shield'],
  'Écarlate/Violet': ['scarlet', 'violet']
};

const getTypeTranslation = (englishType) => {
  const types = {
    normal: "Normal",
    fighting: "Combat",
    flying: "Vol",
    poison: "Poison",
    ground: "Sol",
    rock: "Roche",
    bug: "Insecte",
    ghost: "Spectre",
    steel: "Acier",
    fire: "Feu",
    water: "Eau",
    grass: "Plante",
    electric: "Électrik",
    psychic: "Psy",
    ice: "Glace",
    dragon: "Dragon",
    dark: "Ténèbres",
    fairy: "Fée"
  };
  return types[englishType.toLowerCase()] || englishType;
};

const locationTranslations = {
  // Kanto (Gen 1, 3)
  "route": "Route",
  "kanto-route": "Route",
  "viridian-city": "Jadielle",
  "pewter-city": "Argenta",
  "cerulean-city": "Azuria",
  "vermilion-city": "Carmin sur Mer",
  "lavender-town": "Lavande",
  "celadon-city": "Céladopole",
  "fuchsia-city": "Parmanie",
  "saffron-city": "Safrania",
  "cinnabar-island": "Cramois'Île",
  "indigo-plateau": "Plateau Indigo",
  "viridian-forest": "Forêt de Jade",
  "mt-moon": "Mont Sélénite",
  "rock-tunnel": "Grotte",
  "power-plant": "Centrale",
  "pokemon-tower": "Tour Pokémon",
  "pokemon-mansion": "Manoir Pokémon",
  "safari-zone": "Parc Safari",
  "seafoam-islands": "Îles Écumes",
  "victory-road": "Route Victoire",
  "cerulean-cave": "Grotte Azurée",
  "digletts-cave": "Grotte Taupiqueur",
  "mt-silver": "Mont Argenté",

  // Johto (Gen 2, 4)
  "johto-route": "Route",
  "new-bark-town": "Bourg Geon",
  "cherrygrove-city": "Ville Griotte",
  "violet-city": "Mauville",
  "azalea-town": "Écorcia",
  "goldenrod-city": "Doublonville",
  "ecruteak-city": "Rosalia",
  "olivine-city": "Oliville",
  "cianwood-city": "Irisia",
  "mahogany-town": "Acajou",
  "blackthorn-city": "Ébènelle",
  "sprout-tower": "Tour Chetiflor",
  "ruins-of-alph": "Ruines Alpha",
  "union-cave": "Caves Jumelles",
  "slowpoke-well": "Puits Ramoloss",
  "ilex-forest": "Bois aux Chênes",
  "national-park": "Parc Naturel",
  "burned-tower": "Tour Cendrée",
  "tin-tower": "Tour Carillon",
  "whirl-islands": "Îles Tourbillon",
  "mt-mortar": "Mont Creuset",
  "ice-path": "Route de Glace",
  "dark-cave": "Antre Noir",
  "dragons-den": "Antre du Dragon",

  // Hoenn (Gen 3, 6)
  "hoenn-route": "Route",
  "littleroot-town": "Bourg-en-Vol",
  "oldale-town": "Rosyères",
  "petalburg-city": "Clémenti-Ville",
  "rustboro-city": "Mérouville",
  "dewford-town": "Cimetronelle",
  "slateport-city": "Poivressel",
  "mauville-city": "Lavandia",
  "verdanturf-town": "Vergazon",
  "fallarbor-town": "Autéquia",
  "lavaridge-town": "Cellapolis",
  "fortree-city": "Cimetronelle",
  "lilycove-city": "Nénucrique",
  "mossdeep-city": "Algatia",
  "sootopolis-city": "Atalanopolis",
  "ever-grande-city": "Éternara",
  "petalburg-woods": "Bois Clémenti",
  "rusturf-tunnel": "Tunnel Mérazon",
  "granite-cave": "Grotte Granite",
  "mt-chimney": "Mont Chimnée",
  "meteor-falls": "Site Météore",
  "mt-pyre": "Mont Mémoria",
  "shoal-cave": "Grotte Tréfonds",
  "seafloor-cavern": "Caverne Fondmer",
  "sky-pillar": "Pilier Céleste",
  "cave-of-origin": "Grotte Origine",

  // Sinnoh (Gen 4)
  "sinnoh-route": "Route",
  "twinleaf-town": "Bonaugure",
  "sandgem-town": "Littorella",
  "jubilife-city": "Jubilation",
  "oreburgh-city": "Charbourg",
  "floaroma-town": "Floraville",
  "eterna-city": "Vestigion",
  "hearthome-city": "Unionpolis",
  "solaceon-town": "Bonville",
  "veilstone-city": "Voilaroc",
  "pastoria-city": "Rivamar",
  "celestic-town": "Célestia",
  "canalave-city": "Joliberges",
  "snowpoint-city": "Frimapic",
  "sunyshore-city": "Rivamar",
  "oreburgh-gate": "Porte Charbourg",
  "valley-windworks": "Éolienne",
  "eterna-forest": "Forêt Vestigion",
  "fuego-ironworks": "Forge Fuego",
  "mt-coronet": "Mont Couronné",
  "great-marsh": "Grand Marais",
  "solaceon-ruins": "Ruines Bonville",
  "iron-island": "Île de Fer",
  "old-chateau": "Vieux Château",
  "snowpoint-temple": "Temple Frimapic",
  "stark-mountain": "Mont Abrupt",
  "sendoff-spring": "Source Adieu",
  "turnback-cave": "Grotte Retour",
  "spear-pillar": "Pilier Lancé",
  "distortion-world": "Monde Distorsion",

  // Unys (Gen 5)
  "unova-route": "Route",
  "nuvema-town": "Renouet",
  "accumula-town": "Arabelle",
  "striaton-city": "Ogoesse",
  "nacrene-city": "Maillard",
  "castelia-city": "Volucité",
  "nimbasa-city": "Méanville",
  "driftveil-city": "Volucité",
  "mistralton-city": "Parsemille",
  "icirrus-city": "Flocombe",
  "opelucid-city": "Janusia",
  "dreamyard": "Vestiges du Rêve",
  "pinwheel-forest": "Forêt d'Empoigne",
  "desert-resort": "Désert Délassant",
  "relic-castle": "Château Enfoui",
  "cold-storage": "Entrepôt Frigorifique",
  "chargestone-cave": "Grotte Électrolithe",
  "twist-mountain": "Mont Foré",
  "dragonspiral-tower": "Tour Dragospire",
  "giant-chasm": "Grotte Cyclopéenne",
  "abundant-shrine": "Temple Abundancia",
  "victory-road-unova": "Route Victoire",
  "n-castle": "Château de N",

  // Kalos (Gen 6)
  "kalos-route": "Route",
  "vaniville-town": "Bourg Croquis",
  "aquacorde-town": "Quarellis",
  "santalune-city": "Neuvartault",
  "lumiose-city": "Illumis",
  "camphrier-town": "Cromlac'h",
  "cyllage-city": "Relifac-le-Haut",
  "ambrette-town": "Roche-sur-Gliffe",
  "geosenge-town": "Géosenge",
  "shalour-city": "Yantreizh",
  "coumarine-city": "Port Tempères",
  "laverre-city": "Auffrac-les-Congères",
  "dendemille-town": "Mozheim",
  "anistar-city": "Flusselles",
  "couriway-town": "Romant-sous-Bois",
  "snowbelle-city": "Batisques",
  "santalune-forest": "Forêt de Neuvartault",
  "glittering-cave": "Grotte Miroitante",
  "reflection-cave": "Grotte Miroir",
  "frost-cavern": "Caverne Gelée",
  "terminus-cave": "Grotte Coda",
  "pokemon-village": "Village Pokémon",

  // Alola (Gen 7)
  "alola-route": "Route",
  "iki-town": "Lili'i",
  "hau-oli-city": "Ohana",
  "heahea-city": "Ekaeka",
  "paniola-town": "Paniola",
  "konikoni-city": "Konikoni",
  "malie-city": "Malié",
  "seafolk-village": "Village Flottant",
  "exeggutor-island": "Île Noadkoko",
  "vast-poni-canyon": "Canyon de Poni",
  "altar-of-the-sunne": "Autel du Soleil",
  "altar-of-the-moone": "Autel de la Lune",
  "mount-lanakila": "Mont Lanakila",
  "verdant-cavern": "Grotte Verdoyante",
  "melemele-meadow": "Jardin de Melemele",
  "seaward-cave": "Grotte Marine",
  "ten-carat-hill": "Colline Dicarat",
  "hano-beach": "Plage Hano",
  "lush-jungle": "Jungle Touffue",
  "diglett-tunnel": "Tunnel Taupiqueur",
  "memorial-hill": "Colline du Souvenir",
  "malie-garden": "Jardin de Malié",
  "mount-hokulani": "Mont Hokulani",
  "blush-mountain": "Mont Rougeoie",
  "ultra-space": "Ultra-Dimension",

  // Galar (Gen 8)
  "galar-route": "Route",
  "postwick": "Paddoxton",
  "wedgehurst": "Greenham",
  "motostoke": "Motorby",
  "turffield": "Kickenham",
  "hulbury": "Brasswick",
  "hammerlocke": "Hammourabi",
  "stow-on-side": "Corrifey",
  "ballonlea": "Ludster",
  "circhester": "Ludester",
  "spikemuth": "Stow-on-Side",
  "wyndon": "Winscor",
  "slumbering-weald": "Bois de Clairjour",
  "galar-mine": "Mine de Galar",
  "watchtower-ruins": "Ruines des Guetteurs",
  "glimwood-tangle": "Forêt de Lumirinth",
  "dusty-bowl": "Pleine Recouverte",
  "giants-cap": "Mont du Gigamax",
  "hammerlocke-hills": "Collines d'Hammourabi",
  "lake-of-outrage": "Lac Ouragan",

  // Paldea (Gen 9)
  "paldea-route": "Route",
  "poco-path": "Chemin Poco",
  "mesagoza": "Mesagoza",
  "cortondo": "Cortondo",
  "artazon": "Artazon",
  "levincia": "Levincia",
  "cascarrafa": "Cascarrafa",
  "porto-marinada": "Porto Marinada",
  "alfornada": "Alfornada",
  "medali": "Medali",
  "zapapico": "Zapapico",
  "los-platos": "Los Platos",
  "montenevera": "Montenevera",
  "area-zero": "Zone Zéro",
  "inlet-grotto": "Grotte du Rivage",
  "south-province": "Province Sud",
  "west-province": "Province Ouest",
  "east-province": "Province Est",
  "north-province": "Province Nord",
  "asado-desert": "Désert Asado",
  "glaseado-mountain": "Mont Glaseado",

  // Termes génériques
  "area": "Zone",
  "cave": "Grotte",
  "cavern": "Caverne",
  "city": "Ville",
  "forest": "Forêt",
  "grass": "Herbe",
  "lake": "Lac",
  "meadow": "Prairie",
  "mountain": "Montagne",
  "pond": "Étang",
  "road": "Route",
  "route": "Route",
  "sea": "Mer",
  "town": "Ville",
  "tunnel": "Tunnel",
  "village": "Village",

  // Directions
  "north": "Nord",
  "south": "Sud",
  "east": "Est",
  "west": "Ouest",
  "area": "Zone",
};

const specialLocations = {
  "digletts-cave": "Grotte Taupiqueur",
  "mt-moon": "Mont Sélénite",
  "rock-tunnel": "Grotte",
  "victory-road": "Route Victoire",
  "cerulean-cave": "Grotte Azurée",
  "seafoam-islands": "Îles Écumes",
  "pokemon-tower": "Tour Pokémon",
  "pokemon-mansion": "Manoir Pokémon",
  "union-cave": "Caves Jumelles",
  "slowpoke-well": "Puits Ramoloss",
  "ilex-forest": "Bois aux Chênes",
  "mt-mortar": "Mont Creuset",
  "ice-path": "Route de Glace",
  "dark-cave": "Antre Noir",
  "dragons-den": "Antre du Dragon",
  "meteor-falls": "Site Météore",
  "shoal-cave": "Grotte Tréfonds",
  "mt-pyre": "Mont Mémoria",
  "sky-pillar": "Pilier Céleste",
  "sealed-chamber": "Chambre Scellée",
  "crystal-cave": "Grotte de Cristal",
  "mt-coronet": "Mont Couronné",
  "great-marsh": "Grand Marais",
  "oreburgh-gate": "Porte Charbourg",
  "iron-island": "Île de Fer",
  "stark-mountain": "Mont Abrupt",
  "turnback-cave": "Grotte Retour",
  "spear-pillar": "Pilier Lancé",
  "spring-path": "Chemin Printanier",
  "chargestone-cave": "Grotte Électrolithe",
  "dragonspiral-tower": "Tour Dragospire",
  "relic-castle": "Château Enfoui",
  "giant-chasm": "Grotte Cyclopéenne",
  "abundant-shrine": "Temple Abundancia",
  "glittering-cave": "Grotte Miroitante",
  "reflection-cave": "Grotte Miroir",
  "frost-cavern": "Caverne Gelée",
  "terminus-cave": "Grotte Coda",
  "verdant-cavern": "Grotte Verdoyante",
  "diglett-tunnel": "Tunnel Taupiqueur",
  "lush-jungle": "Jungle Touffue",
  "mount-hokulani": "Mont Hokulani",
  "mount-lanakila": "Mont Lanakila",
};

const translateLocation = (englishName) => {
  // Normaliser complètement le nom d'entrée
  const normalizedName = englishName
    .toLowerCase()
    .replace(/\s+/g, '-')        // Remplacer les espaces par des tirets
    .replace(/'s/g, 's')         // Normaliser les possessifs
    .replace(/['']/g, '')        // Enlever les apostrophes
    .replace(/--+/g, '-')        // Éviter les tirets multiples
    .replace(/\bdigletts?\b/gi, 'diglett') // Normaliser les variations de Diglett
    .replace(/\bcave\b/gi, 'cave')         // Normaliser "cave" et ses variations
    .replace(/\barea\b/gi, '')             // Supprimer "area"
    .replace(/\bzone\b/gi, '')             // Supprimer "zone"
    .trim()
    .replace(/-+$/g, '');        // Enlever les tirets à la fin

  // Console.log pour le debugging
  //console.log('Original:', englishName);
  //console.log('Normalized:', normalizedName);

  // Vérifier les cas spéciaux avec le nom normalisé
  if (normalizedName.includes('diglett') && normalizedName.includes('cave')) {
    return "Grotte Taupiqueur";
  }

  // Vérifier les autres cas spéciaux
  if (specialLocations[normalizedName]) {
    return specialLocations[normalizedName];
  }

  // Le reste de la logique de traduction...
  const parts = normalizedName.split('-')
    .filter(part => part && !['area', 'zone', 'section'].includes(part));

  // Traduction spéciale pour les routes
  if (parts.includes('route')) {
    const number = parts.find(part => part.match(/^\d+$/));
    if (number) {
      return `Route ${number}`;
    }
  }

  const translatedParts = parts.map(part => locationTranslations[part] || part);

  let translatedName = translatedParts
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ');

  // Première lettre en majuscule
  translatedName = translatedName.charAt(0).toUpperCase() + translatedName.slice(1);

  return translatedName;
};
const POKEDEXES = {
  'red-blue': { 
    id: 2,
    name: "Pokédex de Kanto (Rouge/Bleu)", 
    region: "Kanto",
    version: "Rouge/Bleu",
    generation: 1,
    totalPokemon: 151
  },
  'yellow': { 
    id: 2,
    name: "Pokédex de Kanto (Jaune)", 
    region: "Kanto",
    version: "Jaune",
    generation: 1,
    totalPokemon: 151
  },
  'gold-silver': { 
    id: 3,
    name: "Pokédex de Johto (Or/Argent)", 
    region: "Johto",
    version: "Or/Argent",
    generation: 2,
    totalPokemon: 251
  },
  'crystal': { 
    id: 3,
    name: "Pokédex de Johto (Cristal)", 
    region: "Johto",
    version: "Cristal",
    generation: 2,
    totalPokemon: 251
  },
  'ruby-sapphire': { 
    id: 4,
    name: "Pokédex de Hoenn (Rubis/Saphir)", 
    region: "Hoenn",
    version: "Rubis/Saphir",
    generation: 3,
    totalPokemon: 202
  },
  'emerald': { 
    id: 4,
    name: "Pokédex de Hoenn (Émeraude)", 
    region: "Hoenn",
    version: "Émeraude",
    generation: 3,
    totalPokemon: 202
  },
  'firered-leafgreen': { 
    id: 2,
    name: "Pokédex de Kanto (Rouge Feu/Vert Feuille)", 
    region: "Kanto",
    version: "Rouge Feu/Vert Feuille",
    generation: 3,
    totalPokemon: 151
  },
  'diamond-pearl': { 
    id: 5,
    name: "Pokédex de Sinnoh (Diamant/Perle)", 
    region: "Sinnoh",
    version: "Diamant/Perle",
    generation: 4,
    totalPokemon: 151
  },
  'platinum': { 
    id: 6,
    name: "Pokédex de Sinnoh (Platine)", 
    region: "Sinnoh",
    version: "Platine",
    generation: 4,
    totalPokemon: 210
  },
  'heartgold-soulsilver': { 
    id: 7,
    name: "Pokédex de Johto (Or HeartGold/Argent SoulSilver)", 
    region: "Johto",
    version: "HeartGold/SoulSilver",
    generation: 4,
    totalPokemon: 256
  },
  'black-white': { 
    id: 8,
    name: "Pokédex d'Unys (Noir/Blanc)", 
    region: "Unys",
    version: "Noir/Blanc",
    generation: 5,
    totalPokemon: 156
  },
  'black2-white2': { 
    id: 9,
    name: "Pokédex d'Unys (Noir 2/Blanc 2)", 
    region: "Unys",
    version: "Noir 2/Blanc 2",
    generation: 5,
    totalPokemon: 301
  },
  'x-y': { 
    id: 12,
    name: "Pokédex de Kalos (X/Y)", 
    region: "Kalos",
    version: "X/Y",
    generation: 6,
    totalPokemon: 150
  },
  'omega-ruby-alpha-sapphire': { 
    id: 15,
    name: "Pokédex de Hoenn (Rubis Oméga/Saphir Alpha)", 
    region: "Hoenn",
    version: "Rubis Oméga/Saphir Alpha",
    generation: 6,
    totalPokemon: 211
  },
  'sun-moon': { 
    id: 16,
    name: "Pokédex d'Alola (Soleil/Lune)", 
    region: "Alola",
    version: "Soleil/Lune",
    generation: 7,
    totalPokemon: 302
  },
  'ultra-sun-ultra-moon': { 
    id: 21,
    name: "Pokédex d'Alola (Ultra-Soleil/Ultra-Lune)", 
    region: "Alola",
    version: "Ultra-Soleil/Ultra-Lune",
    generation: 7,
    totalPokemon: 403
  },
  'sword-shield': { 
    id: 27,
    name: "Pokédex de Galar (Épée/Bouclier)", 
    region: "Galar",
    version: "Épée/Bouclier",
    generation: 8,
    totalPokemon: 400
  },
  'scarlet-violet': { 
    id: 31,
    name: "Pokédex de Paldea (Écarlate/Violet)", 
    region: "Paldea",
    version: "Écarlate/Violet",
    generation: 9,
    totalPokemon: 400
  },
};

const fetchVersionPokedex = async (pokedexKey) => {
  try {
    const pokedex = POKEDEXES[pokedexKey];
    if (!pokedex) {
      throw new Error('Pokédex invalide');
    }

    // Récupérer les entrées du Pokédex régional
    const response = await fetch(`${BASE_URL}/pokedex/${pokedex.id}`);
    const data = await response.json();

    //console.log(`Fetching Pokédex entries for ${pokedex.name}`);

    // Récupérer les détails de chaque Pokémon
    const pokemonPromises = data.pokemon_entries.map(async (entry) => {
      try {
        const dexNum = entry.entry_number;
        const speciesUrl = entry.pokemon_species.url;
        const pokemonId = parseInt(speciesUrl.split('/').slice(-2, -1)[0]);
        const pokemon = await fetchPokemonDetails(pokemonId, pokedex.version);
        // Ajouter le numéro du Pokédex régional
        return pokemon ? { ...pokemon, dexNum } : null;
      } catch (error) {
        console.error(`Error fetching pokemon details:`, error);
        return null;
      }
    });

    const results = await Promise.all(pokemonPromises);
    return results
      .filter(p => p !== null)
      .sort((a, b) => a.dexNum - b.dexNum); // Trier par numéro du Pokédex régional

  } catch (error) {
    console.error('Error fetching pokedex:', error);
    throw error;
  }
};

const fetchPokemonDetails = async (id, version) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    const speciesResponse = await fetch(data.species.url);
    if (!speciesResponse.ok) {
      throw new Error(`HTTP error! status: ${speciesResponse.status}`);
    }
    const speciesData = await speciesResponse.json();
    
    const frenchName = speciesData.names.find(
      name => name.language.name === 'fr'
    )?.name || data.name;

    let frenchFlavorText = speciesData.flavor_text_entries.find(
      text => text.language.name === 'fr'
    )?.flavor_text || '';

    if (frenchFlavorText) {
      frenchFlavorText = frenchFlavorText.replace(/\f/g, ' ').replace(/\n/g, ' ');
    }

    const versionFlavorText = speciesData.flavor_text_entries.find(
      text => text.language.name === 'fr' && 
        text.version?.name?.toLowerCase().includes(version?.toLowerCase?.() || '')
    )?.flavor_text;

    return {
      id: data.id,
      name: frenchName,
      types: data.types.map(type => getTypeTranslation(type.type.name)),
      height: data.height,
      weight: data.weight,
      sprite: data.sprites.front_default,
      stats: {
        hp: data.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0,
        attack: data.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0,
        defense: data.stats.find(stat => stat.stat.name === 'defense')?.base_stat || 0,
        specialAttack: data.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat || 0,
        specialDefense: data.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat || 0,
        speed: data.stats.find(stat => stat.stat.name === 'speed')?.base_stat || 0,
      },
      abilities: await Promise.all(
        data.abilities.map(async (ability) => {
          const abilityResponse = await fetch(ability.ability.url);
          const abilityData = await abilityResponse.json();
          const frenchAbility = abilityData.names.find(
            name => name.language.name === 'fr'
          )?.name || ability.ability.name;
          const frenchDescription = abilityData.flavor_text_entries.find(
            text => text.language.name === 'fr'
          )?.flavor_text || '';
          return {
            name: frenchAbility,
            description: frenchDescription,
            isHidden: ability.is_hidden
          };
        })
      ),
      description: versionFlavorText || frenchFlavorText,
      locations: [], // Tableau vide pour les locations qui seront chargées séparément
    };
  } catch (error) {
    console.error(`Error fetching pokemon ${id}:`, error);
    return null;
  }
};

const fetchPokemonLocations = async (pokemonId, gameVersion) => {
  try {
    const apiVersionNames = versionMapping[gameVersion] || [];
    const response = await fetch(`${BASE_URL}/pokemon/${pokemonId}/encounters`);
    const locations = await response.json();
    
    if (locations.length === 0) {
      return ["Non disponible à l'état sauvage"];
    }

    const gameLocations = locations.filter(loc => 
      loc.version_details.some(detail => 
        apiVersionNames.includes(detail.version.name)
      )
    );

    if (gameLocations.length === 0) {
      return ["Non disponible dans cette version"];
    }

    const uniqueLocations = [...new Set(gameLocations.map(loc => {
      const locationName = loc.location_area.name;
      const translatedName = translateLocation(locationName);
      
      const versionDetail = loc.version_details.find(detail => 
        apiVersionNames.includes(detail.version.name)
      );
      
      let minLevel = null;
      let maxLevel = null;
      let chance = null;

      if (versionDetail?.encounter_details?.length > 0) {
        const levels = versionDetail.encounter_details.map(e => e.min_level);
        const maxLevels = versionDetail.encounter_details.map(e => e.max_level || e.min_level);
        minLevel = Math.min(...levels);
        maxLevel = Math.max(...maxLevels);
        chance = versionDetail.max_chance;
      }

      return {
        name: translatedName,
        levels: minLevel !== null && maxLevel !== null 
          ? minLevel === maxLevel 
            ? `Nv. ${minLevel}`
            : `Nv. ${minLevel}-${maxLevel}`
          : null,
        chance: chance ? `${chance}%` : null
      };
    }))];

    // Trier et formater les locations
    return uniqueLocations
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(loc => {
        const parts = [];
        parts.push(loc.name);
        if (loc.levels) parts.push(`(${loc.levels})`);
        if (loc.chance) parts.push(`- ${loc.chance}`);
        return parts.join(' ');
      });

  } catch (error) {
    console.error('Error fetching location areas:', error);
    return ["Informations non disponibles"];
  }
};

export { POKEDEXES, versionMapping };

export default {
  fetchPokedexEntries: fetchVersionPokedex,
  fetchPokemonLocations,
  fetchPokemonDetails,  // Ajouter cette ligne pour exporter la fonction existante
  POKEDEXES
};