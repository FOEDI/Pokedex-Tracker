import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, ChevronRight } from "lucide-react";
import pokemonService from "@/services/pokemonService";
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
  } from "@/components/ui/alert-dialog";
  import { Trash2 } from "lucide-react";

// Type colors from your original App.jsx
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

const CaptureStats = ({ totalPokemon, capturedPokemon }) => {
  const percentage = ((capturedPokemon / totalPokemon) * 100) || 0;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-muted-foreground">
          Total des Pokémon capturés
        </div>
        <div className="text-sm font-medium flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span>{capturedPokemon}</span>
            <span className="text-muted-foreground">/</span>
            <span>{totalPokemon}</span>
          </div>
          <span className="text-muted-foreground text-xs">
            ({Math.round(percentage)}%)
          </span>
        </div>
      </div>
      <div className="w-full h-4 bg-secondary rounded-full overflow-hidden dark:bg-secondary/50">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const GameCard = ({ pokedexKey, capturedIds, onClick }) => {
  const pokedex = pokemonService.POKEDEXES[pokedexKey];
  
  return (
    <Card 
      className="hover:bg-accent cursor-pointer transition-colors"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium text-lg">{pokedex.name}</h3>
            <p className="text-sm text-muted-foreground">Génération {pokedex.generation}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Capturés</span>
            <span className="font-medium">
              {capturedIds.length} / {pokedex.totalPokemon}
              <span className="text-muted-foreground ml-2">
                ({Math.round((capturedIds.length / pokedex.totalPokemon) * 100)}%)
              </span>
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(capturedIds.length / pokedex.totalPokemon) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PokemonList = ({ pokedexKey, capturedIds, onClose }) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pokedex = pokemonService.POKEDEXES[pokedexKey];

  useEffect(() => {
    const loadCapturedPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const loadedPokemon = [];
        for (const id of capturedIds) {
          try {
            const pokemon = await pokemonService.fetchPokemonDetails(id, pokedex.version);
            if (pokemon) {
              loadedPokemon.push(pokemon);
            }
          } catch (err) {
            console.error(`Error loading pokemon ${id}:`, err);
          }
        }
        
        setPokemon(loadedPokemon.sort((a, b) => a.id - b.id));
      } catch (error) {
        console.error('Error loading pokemon:', error);
        setError("Erreur lors du chargement des Pokémon");
      } finally {
        setLoading(false);
      }
    };

    if (capturedIds && capturedIds.length > 0) {
      loadCapturedPokemon();
    } else {
      setLoading(false);
    }
  }, [pokedexKey, capturedIds, pokedex.version]);

  if (!pokedex) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-background rounded-lg border shadow-lg">
        <div className="sticky top-0 bg-background z-10 p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{pokedex.name}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            ✕
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"/>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">
              {error}
            </div>
          ) : pokemon.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              Aucun Pokémon capturé dans ce Pokédex
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pokemon.map(p => (
                <Card key={p.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={p.sprite} 
                        alt={p.name}
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <h4 className="font-medium">
                          {p.name}
                          <span className="ml-2 text-sm text-muted-foreground">
                            #{p.id.toString().padStart(3, '0')}
                          </span>
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {p.types.map(type => (
                            <span 
                              key={type} 
                              className={`px-2 py-0.5 rounded text-xs text-white flex items-center gap-1 ${typeColors[type.toLowerCase()]}`}
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MyPokemonPage = () => {
  const [selectedPokedex, setSelectedPokedex] = useState(null);
  const [pokedexStats, setPokedexStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = () => {
      const stats = Object.entries(pokemonService.POKEDEXES).map(([key, pokedex]) => {
        const savedIds = localStorage.getItem(`captured-pokemon-${key}`);
        const capturedIds = JSON.parse(savedIds || '[]');
        
        return {
          key,
          capturedIds,
        };
      });
      
      setPokedexStats(stats);
      setLoading(false);
    };

    loadStats();
  }, []);

  const totalPokemon = Object.values(pokemonService.POKEDEXES).reduce(
    (acc, pokedex) => acc + pokedex.totalPokemon, 
    0
  );
  
  const totalCaptured = pokedexStats.reduce(
    (acc, stat) => acc + stat.capturedIds.length, 
    0
  );

  const handleDownloadSave = () => {
    const saveData = {};
    Object.keys(pokemonService.POKEDEXES).forEach(key => {
      const data = localStorage.getItem(`captured-pokemon-${key}`);
      if (data) {
        saveData[key] = JSON.parse(data);
      }
    });

    const blob = new Blob([JSON.stringify(saveData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pokemon-save.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoadSave = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const saveData = JSON.parse(e.target.result);
        Object.entries(saveData).forEach(([key, data]) => {
          localStorage.setItem(`captured-pokemon-${key}`, JSON.stringify(data));
        });
        window.location.reload();
      } catch (error) {
        console.error('Error loading save:', error);
        alert('Erreur lors du chargement de la sauvegarde');
      }
    };
    reader.readAsText(file);
  };

  const handleResetAll = () => {
    // Supprimer toutes les sauvegardes
    Object.keys(pokemonService.POKEDEXES).forEach(key => {
      localStorage.removeItem(`captured-pokemon-${key}`);
    });
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Pokémon</h1>
        <div className="flex gap-2">
  <Button
    variant="outline"
    onClick={handleDownloadSave}
    className="flex items-center gap-2"
  >
    <Download className="h-4 w-4" />
    Sauvegarder
  </Button>
  <div 
    className="relative group"
  >
    <Button
      variant="outline"
      className="flex items-center gap-2 group-hover:bg-accent group-hover:text-accent-foreground"
    >
      <Upload className="h-4 w-4" />
      Charger
    </Button>
    <input
      type="file"
      accept=".json"
      onChange={handleLoadSave}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
  </div>
          {totalCaptured > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Tout réinitialiser
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-lg font-bold">
                    Réinitialiser toute la progression
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    Êtes-vous sûr de vouloir réinitialiser votre progression pour tous les Pokédex ?
                    Cette action est irréversible.
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <div className="space-y-3">
                        <div className="text-sm text-muted-foreground flex justify-between items-center">
                          <span>Total des Pokémon capturés</span>
                          <span className="font-medium text-foreground">
                            {totalCaptured} / {totalPokemon}
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${(totalCaptured / totalPokemon) * 100}%` }}
                          />
                        </div>
                        <div className="space-y-2">
                          {pokedexStats.map(({ key, capturedIds }) => {
                            const pokedex = pokemonService.POKEDEXES[key];
                            if (capturedIds.length === 0) return null;
                            return (
                              <div 
                                key={key} 
                                className="text-xs text-muted-foreground flex justify-between items-center"
                              >
                                <span>{pokedex.name}</span>
                                <span>
                                  {capturedIds.length} / {pokedex.totalPokemon}
                                </span>
                              </div>
                            );
                          })}
                        </div>
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
                    onClick={handleResetAll}
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

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"/>
        </div>
      ) : (
        <>
          <CaptureStats 
            totalPokemon={totalPokemon} 
            capturedPokemon={totalCaptured} 
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pokedexStats.map(({ key, capturedIds }) => (
              <GameCard
                key={key}
                pokedexKey={key}
                capturedIds={capturedIds}
                onClick={() => setSelectedPokedex({ key, capturedIds })}
              />
            ))}
          </div>

          {selectedPokedex && (
            <PokemonList
              pokedexKey={selectedPokedex.key}
              capturedIds={selectedPokedex.capturedIds}
              onClose={() => setSelectedPokedex(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MyPokemonPage;