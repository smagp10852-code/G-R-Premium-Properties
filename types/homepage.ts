export interface HeroSlide {
  title: string;
  subtitle: string;
  title_hi?: string;
  title_ar?: string;
  title_ru?: string;
  subtitle_hi?: string;
  subtitle_ar?: string;
  subtitle_ru?: string;
  active: boolean;
  image: {
    asset: {
      url: string;
    };
  };
  linkedProperty?: {
    _id: string;
    title: string;
    slug: string;
    developer?: {
      name: string;
      slug: string;
    };
  };
  [key: string]: any;
}

export interface HomepageData {
  heroSlides: HeroSlide[];
  heroCTA: string;
  heroCTA_hi?: string;
  heroCTA_ar?: string;
  heroCTA_ru?: string;
  supportedLanguages?: string[];
}
