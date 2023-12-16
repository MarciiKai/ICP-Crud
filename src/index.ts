class NoPromptsAvailableError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "NoPromptsAvailableError";
    }
  }
  
  class ImaginationVortex {
    private imaginativePrompts: string[];
  
    constructor() {
      this.imaginativePrompts = [
        "In a world where gravity is reversed...",
        "A mysterious door appears in the middle of a forest...",
        "The last person on Earth discovers a hidden library...",
      ];
    }
  
    getRandomPrompt(): string {
      if (this.imaginativePrompts.length === 0) {
        throw new NoPromptsAvailableError("No imaginative prompts available.");
      }
      const randomIndex = Math.floor(Math.random() * this.imaginativePrompts.length);
      return this.imaginativePrompts[randomIndex];
    }
  }
  
  // Example usage:
  const imaginationVortex = new ImaginationVortex();
  
  try {
    const randomPrompt = imaginationVortex.getRandomPrompt();
    console.log(`Imaginative Prompt: ${randomPrompt}`);
  } catch (error) {
    if (error instanceof NoPromptsAvailableError) {
      console.log(`Error: ${error.message}`);
    } else {
      console.error(error);
    }
  }
  