import { EventData, MediaItem, PulsePost, ToneOption } from '../types';

export const INITIAL_EVENT_DATA: EventData = {
  id: 'cloudai-2025',
  name: 'Global Cloud & AI Summit 2025',
  organizer: 'CloudTech Innovations',
  location: 'Moscone Center, SF',
  sessionDay: 'Day 1 of 3 • Live in San Francisco',
  hashtags: ['#CloudAI2025', '#DevInnovate', '#TechPulse'],
  socialLinks: {
    linkedin: 'cloudtech-innovations',
    twitter: '@CloudTechGlobal',
    website: 'https://cloudai2025.org',
  },
  stats: {
    postsGenerated: 1420,
    impressions: '84.2K',
    shareRate: '18.5%',
  },
};

export const INITIAL_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'media-1',
    name: 'Keynote_Stage.jpg',
    size: '2.4 MB',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgioFud2R0cRuXNM8qu7lexatB_35IHMJ5VjEWfvR2lGa1qH6eYnfIG0WTNC-MnV7N-V5Y_k7EnNEaMIFhjsBYXKw9jLtfMmv2B23FtXIHKKEjHV9BNEVdusT1VU3PaABwuYyT9v8IWVTC7nAdPeKtQWzYXC4OSpw57Yfv7j2npQO9Igrt8U5HfOv0pRBaA5hKB3AZzmOjk9cg_tvQ7wCOKs2zboVxVTPNDpCFWoZLkAI4I-jtnpPSNQ',
    caption: 'Keynote Stage • SF',
  },
  {
    id: 'media-2',
    name: 'Badge_Checkin.jpg',
    size: '1.1 MB',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvHzvBrR22jtROtHpV3Q4K66LWoLtkjO_mIEFDIpzHJpCbKORQPugu0CJFW8RoZ8d5eYzTbb3C_qmqUt6zm9St6NTzTiIVohspe8n1ncRVwae_cAwPwSeBkRttJlLXZXLnIOyZ5TqAybZqLyJPswG5NR7v5j2ePwdSymob1pFBtiM_8guTG08pmbCHTSVtz-JJBFBMGmvLjcOXEuO0kWWEJhzueN-kDMHHjUYojwyPvz_ib45e5vcidQ',
    caption: 'Registration Badge Station',
  },
  {
    id: 'media-3',
    name: 'Architecture_Diagram.jpg',
    size: '3.2 MB',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb2yzu90iYyWihUjWCXMFSUQHx2LZvrTCnl2YqYKR7Qj2EXMxV-Krdwvar9ZY6k423l7bF7BU_dza6fzcYhOeKY-9l2Peg94CICHODRpMrxWIQUZvlXEqgEuTb5qkqk1ChoKiqxgPeWTjY_gRyddTK-T7jcFb0uyYX__VCHDKCftIk4hkv_czqo2TaFg-8JdgMLU94Ij9nz6qE-Kvus50MTG3nOCD3RLJCVSuOkpPCj9rvr9UdhXNM_Q',
    caption: 'Systems Architecture Session',
  },
  {
    id: 'media-4',
    name: 'Team_Booth.png',
    size: '1.8 MB',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYYT76a1XJios-K2yRsOZeBrpZjrxqFGQlxusHx9CW4EWImOKelPgpAaVS36NzG__PzeoIB5jelLBBXwq6RPFk9-cP_N8ETbC7HTehq4wO10z5sD54EVs6_lU9VdpfhLm_GKik_qCVOjJoufFa4KO7qldTSx-OOSOKqQ1weisGDpg4_A55kb9lOFbcfmfRwsZhQ6Buc3h7llxT8cQgw-PEiD4p8irRHh2jJEDtRY_d6mCTJZPIxkbpsg',
    caption: 'Expo Pavilion & Booth',
  },
];

export const INITIAL_PULSE_POSTS: PulsePost[] = [
  {
    id: 'pulse-1',
    authorName: 'Marcus Vance • Staff Engineer at DataStack',
    authorRole: 'Staff Engineer at DataStack',
    authorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvPOh3dzD1kuo7xn0ykKGJt3mjB69e-nrzrehqtoft4cI9zJbNmIRgTMT30clZc56TirAnEgUwml-60mijFODvQgTYEztyyX0FGKIg1qTN5soP8IuchSL7i2kW6jWWOZHqUjibKT4Kv5fjkJudPhUal1Q5jkNJyNKqFMWUOnImLh3VskYBI0ed5vupprwJohaWYZYNRYpTjH22BkuL9ffI1cHvGwyBrBpnfKvTJ2W9drFtaVxdS45keg',
    timeAgo: '3m ago',
    content:
      '"Mind blown by the keynote on zero-latency model deployments at #CloudAI2025! Here are 3 lessons from the session that changed my perspective on hybrid clustering..."',
    likes: 48,
    comments: 12,
    generatedWithEventPulse: true,
  },
  {
    id: 'pulse-2',
    authorName: 'Chloe Lin • Head of Developer Relations',
    authorRole: 'Head of Developer Relations',
    authorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCasu5GM-PbfsFT_vybhgqo33o4dMHxT1ONVGOmmfblXP5Z2gSk2kIbC5Qnf84X3QzS9WnZiCIq5mlWLhjNXGbcNs3r3ZofFpnrX6A_sT5Mb5KYIixDDyXIZLoOvG7Wbg9EPlmmyK_MOulvlYrhtVwOFbY4w4Mx_TJtKDTM2KJc8vz8cp5gx7JEU8fGlGrHvCGs7AMbzlhR8xK-fgfdBLXjLjE8AGbfu0yX01DwBHQ9AsAsuqxbH6JnKw',
    timeAgo: '14m ago',
    content:
      '"Honored to participate in the panel today. Incredible energy from this vibrant builder community! The hallway conversations alone were worth the trip. #DevInnovate"',
    likes: 116,
    comments: 27,
    generatedWithEventPulse: true,
  },
  {
    id: 'pulse-3',
    authorName: 'David Kim • VP of Infrastructure',
    authorRole: 'VP of Infrastructure',
    authorAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGd_Pgb1ZjE9pg5gusWsnzBv10mMH9tWcUFV_A58ixkLh6Dw-nofn5GkzItUOOQzXew9MudbMKUCZ4-ld3f_CxGsW6mlWdRwrFm4Iqihv1cfu4x6jfzW6eiDORhkoqr0vO7COD8Z4flwWkkDaNZVRjcbYYjeHV1JiGJPOrpGRdCVaiiY5CzRRoXJrnJ20RkCn7oDst8XlcHdiV-CyWcslYnjN7tawISwIlijBR6iSWqwbyogmVqsbeUQ',
    timeAgo: '28m ago',
    content:
      '"San Francisco is definitely the center of gravity for AI compute. Key takeaway: scale requires simpler abstractions, not heavier frameworks. Kudos CloudTech!"',
    likes: 89,
    comments: 9,
    generatedWithEventPulse: true,
  },
];

export const TONE_OPTIONS: ToneOption[] = [
  {
    id: 'professional',
    label: 'Professional',
    description: 'Structured, authoritative insight with enterprise context',
  },
  {
    id: 'grateful',
    label: 'Grateful Attendee',
    description: 'Warm appreciation for hosts, speakers, and community energy',
  },
  {
    id: 'takeaways',
    label: 'Key Takeaways',
    description: 'Actionable numbered lessons and high-impact takeaways',
  },
  {
    id: 'inspiring',
    label: 'Inspiring & Visionary',
    description: 'Forward-looking perspective on the future of the industry',
  },
  {
    id: 'networking',
    label: 'Networking Focus',
    description: 'Inviting attendees to connect, meet up, or discuss findings',
  },
];

export const HOST_USER = {
  name: 'Elena Vance',
  role: 'TechSummit 2025 Host',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAHsnQ8VVMl4hLYlHxFy-73mVTvfm5KgYAa5oglIzmxH6HcwVamfDLhfrOBKA7NioC5xOCT0cBrgTRZYE_fzjxsTY6XZUFk31rv5ZfQdUOYYL09YpyzS-Tt0_m8O7P-cxj3vSY4vJ2vaj3NVGnb6xHvpRJyp2ZlGnapYB3XK-HtJnEiE4ErNQ6eRmuAXTP96Fuc1dJ-sz6l22eNOLe2dhbTPbG0sYtCDRkTpVESQYNVylrs3ATKlFIT6A',
};

export const ATTENDEE_PRESET_USER = {
  name: 'Sarah Jenkins',
  headline: 'Senior Cloud Architect @ ScaleAI | AI Infrastructure',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDbpJlOgxSxtKzQv_kUhNGB2bJFxqiy7FTpZfic34eJ3OFTDTtYDUlZ26gW0X2OPLaiI_fpRqsQexAahIRsInW_Md9Wnp40rSoCtuY19VSgDROQBYzfBgUHb41w7yJWTKyU8_6C7m3S5GJe-N8lIeat1pGgm4r72RJzsYEDoDaAd7a4yubhM4N9adE4U9fyycULfxU-huH1ZM6GV5_vK6pmWI2r0G7PWOnxQKIaWWxJf6-sNcHVB_YsxA',
};
