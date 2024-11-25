import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import pokemonService, { POKEDEXES } from "@/services/pokemonService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const typeColors = {
  plante: "bg-green-500 dark:bg-green-600",
  feu: "bg-red-500 dark:bg-red-600",
  eau: "bg-blue-500 dark:bg-blue-600",
  électrik: "bg-yellow-400 dark:bg-yellow-500",
  normal: "bg-gray-400 dark:bg-gray-500",
  combat: "bg-red-700 dark:bg-red-800",
  poison: "bg-purple-500 dark:bg-purple-600",
  sol: "bg-yellow-600 dark:bg-yellow-700",
  vol: "bg-blue-300 dark:bg-blue-400",
  psy: "bg-pink-500 dark:bg-pink-600",
  insecte: "bg-lime-500 dark:bg-lime-600",
  roche: "bg-yellow-800 dark:bg-yellow-900",
  spectre: "bg-purple-700 dark:bg-purple-800",
  dragon: "bg-indigo-600 dark:bg-indigo-700",
  ténèbres: "bg-gray-800 dark:bg-gray-900",
  acier: "bg-gray-500 dark:bg-gray-600",
  fée: "bg-pink-300 dark:bg-pink-400",
  glace: "bg-blue-200 dark:bg-blue-300",
};

const FILTER_OPTIONS = {
  ALL: "all",
  CAPTURED: "captured",
  UNCAPTURED: "uncaptured",
};

const PokemonCard = ({ 
  pokemon, 
  isSelected, 
  isDragging, 
  isDragSelectEnabled, 
  onSelect, 
  onInfoClick,
  onMouseDown,
  onMouseEnter 
}) => {
  // Ajouter un état pour tracker si on est en train de faire un clic simple ou un drag
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const moveThreshold = 5; // Nombre de pixels avant de considérer que c'est un drag

  return (
    <Card
      className={`relative transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
      } ${isDragging && isDragSelectEnabled ? 'cursor-pointer select-none' : ''} ${
        isDragSelectEnabled ? 'cursor-pointer' : ''
      }`}
      onMouseDown={(e) => {
        if (e.button === 0) {  // Clic gauche uniquement
          setIsMouseDown(true);
          setStartPos({ x: e.clientX, y: e.clientY });
          
          if (isDragSelectEnabled) {
            onMouseDown(e);
          }
        }
      }}
      onMouseUp={(e) => {
        if (isMouseDown && e.button === 0) {
          const dx = Math.abs(e.clientX - startPos.x);
          const dy = Math.abs(e.clientY - startPos.y);
          
          // Si le mouvement est minimal, c'est un clic
          if (dx < moveThreshold && dy < moveThreshold && !isDragging) {
            onSelect(pokemon);
          }
        }
        setIsMouseDown(false);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        setIsMouseDown(false);
      }}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{pokemon.name}</span>
          <span className="text-muted-foreground">#{pokemon.id.toString().padStart(3, '0')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center group">
          <img 
            src={pokemon.sprite} 
            alt={pokemon.name}
            className="w-32 h-32 object-contain transition-transform group-hover:scale-110"
            draggable="false"
          />
        </div>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map(type => (
            <span 
              key={type} 
              className={`px-2 py-1 rounded text-sm text-white ${typeColors[type.toLowerCase()]}`}
            >
              {type}
            </span>
          ))}
        </div>
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-2 right-2"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onInfoClick(pokemon);
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <Info className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const getStorageKey = (pokedexKey) => `captured-pokemon-${pokedexKey}`;

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPokedex, setCurrentPokedex] = useState('red-blue');
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [locations, setLocations] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPokemon, setDragStartPokemon] = useState(null);
  const [dragAction, setDragAction] = useState(null); // 'select' ou 'deselect'
  // Référence pour garder une trace de la dernière action
  const lastProcessedPokemon = useRef(null);
  // Vérifie si le drag-select est autorisé
  const isDragSelectEnabled = filter === FILTER_OPTIONS.ALL;
  // Fonction pour gérer le début du glissement
  const handleDragStart = (pokemon, initialAction) => {
    if (!isDragSelectEnabled) return;
    
    setIsDragging(true);
    setDragStartPokemon(pokemon);
    setDragAction(initialAction);
    lastProcessedPokemon.current = pokemon.id;
    document.body.style.userSelect = 'none';
    window.getSelection()?.empty();
  };

  // Fonction pour gérer le glissement sur un Pokémon
  const handleDragOver = (pokemon) => {
    if (isDragging && lastProcessedPokemon.current !== pokemon.id) {
      lastProcessedPokemon.current = pokemon.id;
      
      const newSelectedIds = new Set(selectedIds);
      if (dragAction === 'select') {
        newSelectedIds.add(pokemon.id);
      } else {
        newSelectedIds.delete(pokemon.id);
      }
      setSelectedIds(newSelectedIds);
    }
  };

  // Fonction pour terminer le glissement
  const handleDragEnd = () => {
    setIsDragging(false);
    setDragStartPokemon(null);
    setDragAction(null);
    lastProcessedPokemon.current = null;
    document.body.style.userSelect = '';
    window.getSelection()?.empty();
  };

  // Gestionnaire pour le mouvement de la souris
  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        handleDragEnd();
      }
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  const [selectedIds, setSelectedIds] = useState(() => {
    const saved = localStorage.getItem(getStorageKey(currentPokedex)); // changé de currentGen
    try {
      return new Set(JSON.parse(saved) || []);
    } catch {
      return new Set();
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const openPokemonDetails = async (pokemon) => {
    setSelectedPokemon(pokemon);
    setLoadingLocations(true);
    try {
      const locationData = await pokemonService.fetchPokemonLocations(
        pokemon.id,
        POKEDEXES[currentPokedex].version
      );
      setLocations(locationData);
    } catch (error) {
      console.error("Error loading locations:", error);
      setLocations(["Erreur lors du chargement des locations"]);
    } finally {
      setLoadingLocations(false);
    }
  };
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const data = await pokemonService.fetchPokedexEntries(currentPokedex);
        setPokemon(data);
      } catch (err) {
        setError("Erreur lors du chargement des Pokémon");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
    
    const savedIds = localStorage.getItem(getStorageKey(currentPokedex));
    try {
      setSelectedIds(new Set(JSON.parse(savedIds) || []));
    } catch {
      setSelectedIds(new Set());
    }
  }, [currentPokedex]);

  // Sauvegarder dans localStorage quand selectedIds change
  useEffect(() => {
    localStorage.setItem(getStorageKey(currentPokedex), JSON.stringify(Array.from(selectedIds)));
  }, [selectedIds, currentPokedex]);

  const filteredPokemon = pokemon.filter((p) => {
    // Filtre par recherche
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toString().includes(search);

    // Filtre par état de capture
    const isCaptured = selectedIds.has(p.id);
    switch (filter) {
      case FILTER_OPTIONS.CAPTURED:
        return matchesSearch && isCaptured;
      case FILTER_OPTIONS.UNCAPTURED:
        return matchesSearch && !isCaptured;
      default:
        return matchesSearch;
    }
  });

  const progressPercentage =
    (selectedIds.size / pokemon.length) * 100 || 0;

  const togglePokemonSelection = (id) => {
    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }
    setSelectedIds(newSelectedIds);
  };

  const handleReset = () => {
    setSelectedIds(new Set());
    localStorage.removeItem(getStorageKey(currentPokedex));
  };

  const handlePokemonSelect = (pokemon) => {
    if (isDragging) return;
    
    const newSelectedIds = new Set(selectedIds);
    if (selectedIds.has(pokemon.id)) {
      newSelectedIds.delete(pokemon.id);
    } else {
      newSelectedIds.add(pokemon.id);
    }
    setSelectedIds(newSelectedIds);
  };

  return (


      <main className="container mx-auto p-4">
        {/* En-tête avec filtres */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
          <Select 
  value={currentPokedex}
  onValueChange={(value) => {
    setSearch("");
    setFilter(FILTER_OPTIONS.ALL);
    setCurrentPokedex(value);
  }}
>
  <SelectTrigger className="w-[280px]">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {Object.entries(pokemonService.POKEDEXES).map(([key, { name }]) => (
      <SelectItem key={key} value={key}>
        <div className="flex flex-col">
          <span>{name}</span>
        </div>
      </SelectItem>
    ))}
  </SelectContent>
</Select>
          </div>
          <div className="flex flex-wrap gap-2">
          <Button
              variant={filter === FILTER_OPTIONS.ALL ? "default" : "secondary"}
              onClick={() => {
                setFilter(FILTER_OPTIONS.ALL);
                // Arrête le drag si en cours lors du changement de filtre
                if (isDragging) {
                  handleDragEnd();
                }
              }}
              size="sm"
              className="min-w-24"
            >
              Tous
              {filter !== FILTER_OPTIONS.ALL && (
                <span className="ml-2 text-xs">(activer sélection multiple)</span>
              )}
            </Button>
            <Button
              variant={filter === FILTER_OPTIONS.CAPTURED ? "default" : "secondary"}
              onClick={() => {
                setFilter(FILTER_OPTIONS.CAPTURED);
                if (isDragging) {
                  handleDragEnd();
                }
              }}
              size="sm"
              className="min-w-24"
            >
              Capturés
              <span className="ml-2 text-xs">
                ({selectedIds.size})
              </span>
            </Button>
            <Button
              variant={filter === FILTER_OPTIONS.UNCAPTURED ? "default" : "secondary"}
              onClick={() => {
                setFilter(FILTER_OPTIONS.UNCAPTURED);
                if (isDragging) {
                  handleDragEnd();
                }
              }}
              size="sm"
              className="min-w-24"
            >
              Non capturés
              <span className="ml-2 text-xs">
                ({pokemon.length - selectedIds.size})
              </span>
            </Button>
            {selectedIds.size > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="min-w-24"
                >
                  Réinitialiser
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-lg font-bold">
                    Réinitialiser la progression
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    Êtes-vous sûr de vouloir réinitialiser votre progression pour{" "}
                    <span className="font-medium text-foreground">
                    {POKEDEXES[currentPokedex].name}
                    </span>
                    {" "}? Cette action est irréversible.
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground flex justify-between items-center">
                        <span>Pokémon capturés</span>
                        <span className="font-medium text-foreground">
                          {selectedIds.size} / {pokemon.length}
                        </span>
                      </div>
                      <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel 
                    className="hover:bg-secondary/80"
                  >
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleReset}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Réinitialiser
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher par nom ou numéro..."
            className="w-full pl-8 p-2 rounded-lg border bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Barre de progression */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-muted-foreground">
              Pokémon capturés
              {filter !== FILTER_OPTIONS.ALL && (
                <span className="ml-2 text-xs">
                  ({filteredPokemon.length} affichés)
                </span>
              )}
            </div>
            <div className="text-sm font-medium flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span>{selectedIds.size}</span>
                <span className="text-muted-foreground">/</span>
                <span>{pokemon.length}</span>
              </div>
              <span className="text-muted-foreground text-xs">
                ({Math.round(progressPercentage)}%)
              </span>
            </div>
          </div>
          <div className="w-full h-4 bg-secondary rounded-full overflow-hidden dark:bg-secondary/50">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Message d'état en fonction des filtres */}
        {!loading && !error && filteredPokemon.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {search
              ? "Aucun Pokémon ne correspond à votre recherche"
              : filter === FILTER_OPTIONS.CAPTURED
              ? "Vous n'avez pas encore capturé de Pokémon"
              : filter === FILTER_OPTIONS.UNCAPTURED
              ? "Félicitations ! Vous avez capturé tous les Pokémon !"
              : "Aucun Pokémon trouvé"}
          </div>
        )}

        {/* États de chargement et d'erreur */}
        {loading && (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {error && <div className="text-red-500 text-center py-4">{error}</div>}

        {/* Grid de Pokémon */}
        {!loading && !error && (
  <div 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    onMouseLeave={() => {
      if (isDragging) {
        handleDragEnd();
      }
    }}
  >
    {filteredPokemon.map(p => (
      <PokemonCard
      key={p.id}
      pokemon={p}
      isSelected={selectedIds.has(p.id)}
      isDragging={isDragging}
      isDragSelectEnabled={isDragSelectEnabled}
      onSelect={handlePokemonSelect}
      onInfoClick={openPokemonDetails}
      onMouseDown={(e) => {
        if (isDragSelectEnabled && e.button === 0 && !e.defaultPrevented) {
          e.preventDefault();
          const initialAction = selectedIds.has(p.id) ? 'deselect' : 'select';
          handleDragStart(p, initialAction);
          
          const newSelectedIds = new Set(selectedIds);
          if (initialAction === 'select') {
            newSelectedIds.add(p.id);
          } else {
            newSelectedIds.delete(p.id);
          }
          setSelectedIds(newSelectedIds);
        }
      }}
      onMouseEnter={() => {
        if (isDragging && isDragSelectEnabled) {
          handleDragOver(p);
        }
      }}
    />
    ))}
  </div>
)}

        {/* Modal détails du Pokémon */}
        {selectedPokemon && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{selectedPokemon.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedPokemon(null)}
                  >
                    ✕
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col items-center">
                    <img
                      src={selectedPokemon.sprite}
                      alt={selectedPokemon.name}
                      className="w-48 h-48 object-contain"
                    />
                    <div className="flex gap-2 mt-4">
                      {selectedPokemon.types.map((type) => (
                        <span
                          key={type}
                          className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                            typeColors[type.toLowerCase()]
                          }`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <h3 className="font-medium text-lg mb-2">
                        Localisations
                      </h3>
                      {loadingLocations ? (
                        <div className="flex justify-center py-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {locations.map((location, index) => (
                            <div
                              key={index}
                              className="bg-secondary/50 rounded-lg p-3 text-sm"
                            >
                              {location}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-lg mb-2">Statistiques</h3>
                      <div className="space-y-2">
                        {Object.entries(selectedPokemon.stats).map(
                          ([stat, value]) => (
                            <div key={stat} className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground w-32 capitalize">
                                {stat.replace(/([A-Z])/g, " $1").trim()}
                              </span>
                              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-all duration-300"
                                  style={{ width: `${(value / 255) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-8">
                                {value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedPokemon.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-2">Capacités</h3>
                      <div className="space-y-2">
                        {selectedPokemon.abilities.map((ability) => (
                          <div key={ability.name} className="text-sm">
                            <span className="font-medium">{ability.name}</span>
                            {ability.isHidden && (
                              <span className="ml-2 text-xs text-muted-foreground">
                                (Talent caché)
                              </span>
                            )}
                            <p className="text-muted-foreground mt-1">
                              {ability.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Taille
                        </span>
                        <p className="font-medium">
                          {selectedPokemon.height / 10}m
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Poids
                        </span>
                        <p className="font-medium">
                          {selectedPokemon.weight / 10}kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
  );
};

export default App;
