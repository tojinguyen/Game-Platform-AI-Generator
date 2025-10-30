"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GalaxyBackground from "@/components/GalaxyBackground";
import GalaxyDecorations from "@/components/GalaxyDecorations";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import FormTextarea from "@/components/ui/FormTextarea";
import Button from "@/components/ui/Button";
import { GAME_GENRES, GAME_PLATFORMS, TARGET_AUDIENCES, ROUTES } from "@/constants";

export default function GDDGeneratorPage() {
  const [gameTitle, setGameTitle] = useState("");
  const [gameGenre, setGameGenre] = useState("");
  const [gamePlatform, setGamePlatform] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGDD, setGeneratedGDD] = useState("");
  const router = useRouter();

  const genreOptions = GAME_GENRES.map(genre => ({ value: genre, label: genre }));
  const platformOptions = GAME_PLATFORMS.map(platform => ({ value: platform, label: platform }));
  const audienceOptions = TARGET_AUDIENCES.map(audience => ({ value: audience, label: audience }));

  const handleGenerateGDD = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate API call - in production, call backend API
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
      <div className="h-full overflow-y-auto">

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                    <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 galaxy-text">
              AI GDD Generator
            </h1>
            <p className="text-galaxy-silver">
              Generate comprehensive Game Design Documents using AI.
            </p>
          </div>

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
                <FormInput
                  id="gameTitle"
                  label="Game Title *"
                  value={gameTitle}
                  onChange={(e) => setGameTitle(e.target.value)}
                  required
                  placeholder="Enter your game title"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSelect
                    id="gameGenre"
                    label="Genre *"
                    value={gameGenre}
                    onChange={(e) => setGameGenre(e.target.value)}
                    required
                    placeholder="Select a genre"
                    options={genreOptions}
                  />

                  <FormSelect
                    id="gamePlatform"
                    label="Platform *"
                    value={gamePlatform}
                    onChange={(e) => setGamePlatform(e.target.value)}
                    required
                    placeholder="Select a platform"
                    options={platformOptions}
                  />
                </div>

                <FormSelect
                  id="targetAudience"
                  label="Target Audience *"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  required
                  placeholder="Select target audience"
                  options={audienceOptions}
                />

                <FormTextarea
                  id="gameDescription"
                  label="Game Description *"
                  value={gameDescription}
                  onChange={(e) => setGameDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe your game concept, story, and key features..."
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    isLoading={isGenerating}
                    rightIcon={
                      !isGenerating && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )
                    }
                  >
                    Generate GDD
                  </Button>
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
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleSaveGDD}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                      }
                    >
                      Save
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleDownloadGDD}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      }
                    >
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGeneratedGDD("")}
                      leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      }
                    >
                      Generate New
                    </Button>
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
