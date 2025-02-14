import { UserContext, Question, ExploreResponse, Message } from "@/types";

interface APIRequest {
  query: string;
  userContext: UserContext;
  messages?: Message[];
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

  async explore(query: string, userContext: UserContext, messages: Message[] = []): Promise<ExploreResponse> {
    try {
      const response = await fetch('/api/explore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, userContext, messages }),
      });

      if (!response.ok) {
        throw new Error('Failed to explore topic');
      }

      return response.json();
    } catch (error) {
      console.error('Explore API error:', error);
      throw error;
    }
  }

  async getQuestion(query: string, userContext: UserContext): Promise<Question> {
    return this.fetchAPI<Question>("question", { query, userContext });
  }
}

export const apiClient = new APIClient();
