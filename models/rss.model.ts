interface RSSImage {
  url: string;
  title: string;
  link: string;
}

interface RSSEnclosure {
  //
}

interface RSSItem {
  title: string;
  guid: string;
  description: {
    __cdata: string;
  };
  encoded: {
    __cdata: string;
  };
  pubDate: string;
  enclosure: RSSEnclosure;
  link: string;
  author: string[];
  explicit: string[];
  keywords: string;
  duration: string | number;
  episodeType: string;
  season?: number[];
  episode?: number[];
  subtitle: string;
  image: string[];
  chapters: string;
}

interface RSSChannel {
  item: Partial<RSSItem[]>;
}

interface RSS {
  rss: {
    channel: RSSChannel;
  };
}
