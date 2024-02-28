interface Enclosure {
  link: string;
  type: string;
  length: number;
  duration: number;
  rating?: {
    scheme: string;
    value: string;
  };
}

interface ItunePodcast {
  author: string;
  duration: string;
  episode: string;
  episodeType: string;
  explicit: string;
  image: string;
  keywords: string;
  season: string;
  subtitle: string;
  summary: string;
  title: string;
}

export interface Podcast {
  title: string;
  guid: string;
  author: string;
  description: string;
  duration: string;
  saison: string;
  episode: string;
  createdAt: any;
  itunes?: Partial<ItunePodcast>;
}

export interface PodcastLiteFormated {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  duration: string;
  saison: string;
}

export interface Movie {
  idTmdb: number;
  title: string;
  originalTitle: string;
  poster: string;
  releaseDate: string;
  sagaIdTmdb?: number;
  directorsName: string[];
}
