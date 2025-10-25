"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GalaxyBackground from "@/components/GalaxyBackground";
import GalaxyDecorations from "@/components/GalaxyDecorations";

export default function GDDGeneratorPage() {
  const [gameTitle, setGameTitle] = useState("");
  const [gameGenre, setGameGenre] = useState("");
  const [gamePlatform, setGamePlatform] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGDD, setGeneratedGDD] = useState("");
  const router = useRouter();

  const genres = [
    "Action", "Adventure", "RPG", "Strategy", "Simulation", "Puzzle", 
    "Racing", "Sports", "Fighting", "Horror", "Platformer", "Shooter"
  ];

  const platforms = [
    "PC", "PlayStation 5", "Xbox Series X/S", "Nintendo Switch", 
    "Mobile (iOS/Android)", "Web Browser", "VR/AR"
  ];

  const audiences = [
    "Children (6-12)", "Teenagers (13-17)", "Young Adults (18-25)", 
    "Adults (26-40)", "Mature (40+)", "All Ages"
  ];

  const handleGenerateGDD = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate API call - trong thực tế sẽ gọi API backend
    setTimeout(() => {
      const mockGDD = `
# Game Design Document: ${gameTitle}

## 1. Game Overview
**Genre:** ${gameGenre}
**Platform:** ${gamePlatform}
**Target Audience:** ${targetAudience}

## 2. Game Concept
${gameDescription}

## 3. Core Gameplay Mechanics
- Primary gameplay loop involving exploration and combat
- Character progression system with skill trees
- Resource management and crafting systems
- Dynamic weather and day/night cycles

## 4. Story & Setting
- Rich narrative with multiple branching storylines
- Immersive world with detailed lore and history
- Memorable characters with deep backstories
- Environmental storytelling through level design

## 5. Art & Audio Direction
- Stylized 3D graphics with vibrant color palette
- Dynamic music system that adapts to gameplay
- High-quality voice acting for main characters
- Particle effects and visual feedback for actions

## 6. Technical Requirements
- Minimum 8GB RAM, DirectX 11 compatible graphics card
- 50GB storage space required
- Internet connection for online features
- Controller support for enhanced gameplay

## 7. Monetization Strategy
- Premium game with optional DLC content
- Cosmetic items and character customization
- Seasonal events and limited-time content
- Community features and social integration

## 8. Development Timeline
- Pre-production: 3 months
- Production: 18 months
- Testing & Polish: 6 months
- Total: 27 months

## 9. Success Metrics
- Target 1M+ downloads in first year
- 4.5+ star rating on platforms
- 70%+ completion rate for main story
- Strong community engagement and retention

---
*This GDD was generated using AI and should be reviewed and customized for your specific project needs.*
      `;
      setGeneratedGDD(mockGDD);
      setIsGenerating(false);
    }, 3000);
  };

  const handleSaveGDD = () => {
    // In real app, save to backend
    console.log("Saving GDD:", generatedGDD);
    alert("GDD saved successfully!");
  };

  const handleDownloadGDD = () => {
    // Only execute on client side
    if (typeof window === 'undefined') return;
    
    const element = document.createElement("a");
    const file = new Blob([generatedGDD], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${gameTitle.replace(/\s+/g, '_')}_GDD.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <GalaxyBackground>
      <div className="min-h-screen relative">
        <GalaxyDecorations />
        
        {/* Header */}
        <header className="bg-galaxy-primary/80 backdrop-blur-md shadow-galaxy border-b border-galaxy-cyan/20 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="text-galaxy-cyan hover:text-galaxy-pink transition-colors duration-200 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className="text-2xl font-bold galaxy-text">
                  AI GDD Generator
                </h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {!generatedGDD ? (
            <div className="bg-galaxy-primary/60 backdrop-blur-md rounded-lg shadow-galaxy p-8 galaxy-border">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4 galaxy-text">
                  Generate Your Game Design Document
                </h2>
                <p className="text-galaxy-silver">
                  Fill in the details below and our AI will create a comprehensive Game Design Document for your game project.
                </p>
              </div>

              <form onSubmit={handleGenerateGDD} className="space-y-6">
                <div>
                  <label htmlFor="gameTitle" className="block text-sm font-medium text-galaxy-silver mb-2">
                    Game Title *
                  </label>
                  <input
                    type="text"
                    id="gameTitle"
                    value={gameTitle}
                    onChange={(e) => setGameTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-galaxy-cyan/30 rounded-md shadow-sm focus:outline-none focus:ring-galaxy-cyan focus:border-galaxy-cyan bg-galaxy-secondary/50 text-white placeholder-galaxy-silver/60 galaxy-glow-soft"
                    placeholder="Enter your game title"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="gameGenre" className="block text-sm font-medium text-galaxy-silver mb-2">
                      Genre *
                    </label>
                    <select
                      id="gameGenre"
                      value={gameGenre}
                      onChange={(e) => setGameGenre(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-galaxy-cyan/30 rounded-md shadow-sm focus:outline-none focus:ring-galaxy-cyan focus:border-galaxy-cyan bg-galaxy-secondary/50 text-white galaxy-glow-soft"
                    >
                      <option value="">Select a genre</option>
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="gamePlatform" className="block text-sm font-medium text-galaxy-silver mb-2">
                      Platform *
                    </label>
                    <select
                      id="gamePlatform"
                      value={gamePlatform}
                      onChange={(e) => setGamePlatform(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-galaxy-cyan/30 rounded-md shadow-sm focus:outline-none focus:ring-galaxy-cyan focus:border-galaxy-cyan bg-galaxy-secondary/50 text-white galaxy-glow-soft"
                    >
                      <option value="">Select a platform</option>
                      {platforms.map((platform) => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="targetAudience" className="block text-sm font-medium text-galaxy-silver mb-2">
                    Target Audience *
                  </label>
                  <select
                    id="targetAudience"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-galaxy-cyan/30 rounded-md shadow-sm focus:outline-none focus:ring-galaxy-cyan focus:border-galaxy-cyan bg-galaxy-secondary/50 text-white galaxy-glow-soft"
                  >
                    <option value="">Select target audience</option>
                    {audiences.map((audience) => (
                      <option key={audience} value={audience}>{audience}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="gameDescription" className="block text-sm font-medium text-galaxy-silver mb-2">
                    Game Description *
                  </label>
                  <textarea
                    id="gameDescription"
                    value={gameDescription}
                    onChange={(e) => setGameDescription(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-galaxy-cyan/30 rounded-md shadow-sm focus:outline-none focus:ring-galaxy-cyan focus:border-galaxy-cyan bg-galaxy-secondary/50 text-white placeholder-galaxy-silver/60 galaxy-glow-soft"
                    placeholder="Describe your game concept, story, and key features..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-galaxy-cyan to-galaxy-purple hover:from-galaxy-purple hover:to-galaxy-pink disabled:from-galaxy-secondary disabled:to-galaxy-secondary text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center galaxy-glow-soft hover:scale-105 disabled:hover:scale-100 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Generate GDD
                      </>
                    )}
                  </button>
                </div>
              </form>
          </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-galaxy-primary/60 backdrop-blur-md rounded-lg shadow-galaxy p-6 galaxy-border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white galaxy-text">
                    Generated Game Design Document
                  </h2>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSaveGDD}
                      className="bg-gradient-to-r from-galaxy-gold to-galaxy-pink hover:from-galaxy-pink hover:to-galaxy-purple text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center galaxy-glow-soft hover:scale-105 cursor-pointer"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      Save
                    </button>
                    <button
                      onClick={handleDownloadGDD}
                      className="bg-gradient-to-r from-galaxy-cyan to-galaxy-purple hover:from-galaxy-purple hover:to-galaxy-pink text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center galaxy-glow-soft hover:scale-105 cursor-pointer"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download
                    </button>
                    <button
                      onClick={() => setGeneratedGDD("")}
                      className="bg-gradient-to-r from-galaxy-secondary to-galaxy-accent hover:from-galaxy-accent hover:to-galaxy-secondary text-galaxy-silver font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center galaxy-glow-soft hover:scale-105 cursor-pointer"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Generate New
                    </button>
                  </div>
                </div>
                <div className="bg-galaxy-secondary/50 rounded-lg p-6 galaxy-glow-soft">
                  <pre className="whitespace-pre-wrap text-sm text-galaxy-silver font-mono">
                    {generatedGDD}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </GalaxyBackground>
  );
}
