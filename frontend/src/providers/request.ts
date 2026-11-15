import api from "@/providers/axios.ts";

interface FindSimilarMovieRequest {
  text: string;
}

interface FindSimilarMovieResponse {
  data: { metadata: SimilarMovie }[];
}

export interface SimilarMovie {
  overview: string;
  id: string;
  title: string;
  keywords: string;
  distance: number;
  'average score': string;
}

export const findSimilarMovie = async (text: string) => {
  return await api.post<FindSimilarMovieRequest, FindSimilarMovieResponse>('/', {text})
    .then(resp => resp.data.map(e => e.metadata));
};