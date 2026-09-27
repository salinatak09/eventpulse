import { EventData, ToneType } from '../types';

interface GenerateOptions {
  notes: string;
  tone: ToneType;
  authorName: string;
  authorHeadline: string;
  event: EventData;
}

export function generatePostContent(options: GenerateOptions): string {
  const { notes, tone, event } = options;
  const hashtagsFormatted = event.hashtags.join(' ');
  const hostMention = event.socialLinks.twitter.startsWith('@')
    ? event.socialLinks.twitter
    : `@${event.socialLinks.twitter}`;

  // Clean raw user notes into readable points if available
  const cleanNotes = notes.trim();
  const rawLines = cleanNotes
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // If user entered custom points, format them into bullets
  const bulletLines = rawLines.map((line, idx) => {
    let clean = line.replace(/^[•\-\*\d+\.\)]\s*/, '');
    return `${idx + 1}️⃣ ${clean}`;
  });

  const customPointsBlock =
    bulletLines.length > 0
      ? bulletLines.join('\n')
      : `1️⃣ Distributed inference at the edge is no longer theoretical—it is delivering 60% latency reductions today.\n2️⃣ Agentic systems require strict observability guardrails and real-time trace pipelines.\n3️⃣ Collaborative, multi-region clustering outperforms isolated compute silos.`;

  switch (tone) {
    case 'professional':
      return `Day 1 at the ${event.name} delivered incredible breakthroughs! 🚀\n\nThe discussions around enterprise compute and scalable agent orchestration made one thing unmistakably clear: real-time reliability is the next competitive moat.\n\nKey takeaways from today's sessions:\n${customPointsBlock}\n\nHuge credit to ${event.organizer} for curating a world-class gathering of engineers, operators, and founders. Looking forward to day 2!\n\n${hashtagsFormatted} ${hostMention}`;

    case 'grateful':
      return `Still processing the immense energy from day one at the ${event.name} in San Francisco! 💙\n\nHuge shoutout to ${event.organizer} and all organizers for putting together such an electric, welcoming gathering of builders.\n\nDeeply grateful for the thought-provoking hallway discussions and new connections made today:\n${customPointsBlock}\n\nConferences are only as memorable as the people who show up—and this community delivered in full force.\n\n${hashtagsFormatted} #Gratitude #CommunityFirst ${hostMention}`;

    case 'takeaways':
      return `Three major takeaways from the keynote stage at ${event.name}:\n\n${customPointsBlock}\n\nWhat was your biggest insight from today's presentations? Would love to hear how other teams are tackling these architectural challenges.\n\nBrilliant execution by ${event.organizer}!\n\n${hashtagsFormatted} #Architecture #EngineeringExcellence ${hostMention}`;

    case 'inspiring':
      return `Walking away from ${event.name} with immense optimism for what's next. ✨\n\nThe convergence of local inference, autonomous workflows, and distributed edge intelligence will redefine how we build software over the next 18 months.\n\nWhat resonated most with me:\n${customPointsBlock}\n\nThe future isn't something we wait for—it's being actively built right now in ${event.location}.\n\nExcited to build with everything learned here!\n\n${hashtagsFormatted} #FutureOfTech #AIInnovation ${hostMention}`;

    case 'networking':
      return `Incredible day connecting with fellow engineers, architects, and founders at ${event.name}! 🤝\n\nToday's top insights from the floor:\n${customPointsBlock}\n\nIf you're also at ${event.location} for the summit, let's grab coffee tomorrow morning before the main keynote. Always eager to swap notes on enterprise reliability and systems design.\n\nDrop a comment or DM!\n\n${hashtagsFormatted} #Networking #TechCommunity ${hostMention}`;

    default:
      return `Attending ${event.name}! 💡\n\n${cleanNotes}\n\nThank you to ${event.organizer} for hosting an inspiring summit.\n\n${hashtagsFormatted} ${hostMention}`;
  }
}
