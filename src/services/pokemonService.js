const BASE_URL = 'https://pokeapi.co/api/v2';

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
  // Routes
  "route": "Route",
  "kanto-route": "Route",
  
  // Villes
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
  
  // Lieux spéciaux
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
  
  // Zones d'eau
  "sea": "Mer",
  "pond": "Étang",
  "lake": "Lac",
  
  // Herbe
  "area": "Zone",
  "grass": "Herbe",
  
  // Directions
  "north": "Nord",
  "south": "Sud",
  "east": "Est",
  "west": "Ouest",
};

const translateLocation = (englishName) => {
  const parts = englishName.toLowerCase().split('-');
  
  const translatedParts = parts.map(part => {
    if (part.match(/^\d+$/)) {
      return part;
    }
    return locationTranslations[part] || part;
  });

  if (translatedParts.includes("Route")) {
    const number = translatedParts.find(part => part.match(/^\d+$/));
    if (number) {
      return `Route ${number}`;
    }
  }

  let translatedName = translatedParts
    .filter(part => part)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

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
    totalPokemon: 454
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

    console.log(`Fetching Pokédex entries for ${pokedex.name}`);

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

const fetchPokemonLocations = async (pokemonId) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${pokemonId}/encounters`);
    const locations = await response.json();
    
    if (locations.length === 0) {
      return ["Non disponible à l'état sauvage"];
    }

    const uniqueLocations = [...new Set(locations.map(loc => {
      const locationName = loc.location_area.name;
      return translateLocation(locationName);
    }))];

    return uniqueLocations.sort();

  } catch (error) {
    console.error('Error fetching location areas:', error);
    return ["Informations non disponibles"];
  }
};

export default {
  fetchPokedexEntries: fetchVersionPokedex,
  fetchPokemonLocations,
  fetchPokemonDetails,  // Ajouter cette ligne pour exporter la fonction existante
  POKEDEXES
};