import { UserContext, Question, ExploreResponse } from "@/types";

interface APIRequest {
  query: string;
  userContext: UserContext;
}

class APIClient {
  private async fetchAPI<T>(endpoint: string, data: APIRequest): Promise<T> {
    const response = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "API request failed");
    }

    return response.json();
  }

  async explore(query: string, userContext: UserContext): Promise<ExploreResponse> {
    return this.fetchAPI<ExploreResponse>("explore", { query, userContext });
  }

  async getQuestion(query: string, userContext: UserContext): Promise<Question> {
    return this.fetchAPI<Question>("question", { query, userContext });
  }
}

export const apiClient = new APIClient();
