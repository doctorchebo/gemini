import { Movie } from "./movie.model";

export type MovieRequestData = {
  quantity: number;
  genre: string;
  minYear: string;
  maxYear: string;
  characteristic: string;
};

export type MovieRequest = {
  contents: [
    {
      parts: [
        {
          text: string;
        }
      ];
    }
  ];
  generation_config?: {
    max_output_tokens?: number;
    temperature?: number;
  };
};

// TypeScript type for the response
export type MovieCompleteResponse = {
  candidates: [
    {
      content: {
        parts: [
          {
            text: string; // JSON string of the response containing movie details
          }
        ];
        role: string; // Role of the responder (e.g., "model")
      };
      finishReason: string; // Reason why the generation stopped (e.g., "STOP")
      index: number; // Candidate index (e.g., 0 for the first candidate)
      safetyRatings: {
        category: string; // Category of potential harm (e.g., "HARM_CATEGORY_SEXUALLY_EXPLICIT")
        probability: string; // Probability of harm (e.g., "NEGLIGIBLE")
      }[];
    }
  ];
  usageMetadata: {
    promptTokenCount: number; // Number of tokens in the prompt
    candidatesTokenCount: number; // Number of tokens in the generated response
    totalTokenCount: number; // Total token count
  };
  modelVersion: string; // Version of the model used for generation
};

export interface MovieResponse {
  recommendations: Movie[];
}
