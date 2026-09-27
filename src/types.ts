export interface SocialLinks {
  linkedin: string;
  twitter: string;
  website: string;
}

export interface EventStats {
  postsGenerated: number;
  impressions: string;
  shareRate: string;
}

export interface EventData {
  id: string;
  name: string;
  organizer: string;
  location: string;
  sessionDay: string;
  hashtags: string[];
  socialLinks: SocialLinks;
  stats: EventStats;
}

export interface PulsePost {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  reposts?: number;
  generatedWithEventPulse: boolean;
}

export interface MediaItem {
  id: string;
  name: string;
  size: string;
  url: string;
  caption?: string;
  isCustom?: boolean;
}

export type ToneType = 'professional' | 'grateful' | 'takeaways' | 'inspiring' | 'networking';

export interface ToneOption {
  id: ToneType;
  label: string;
  description: string;
}
