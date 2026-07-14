export type Rating = 1 | 2 | 3 | 4 | 5;

export type Review = {
  id: string;
  name: string;
  rating: Rating;
  date: string; // ISO date
  body: string;
  verified?: boolean;
};

export const seedReviews: Record<string, Review[]> = {
  day: [
    {
      id: "day-1",
      name: "Priya K.",
      rating: 5,
      date: "2026-05-02",
      body: "No jitters, no crash at 3pm. I still drink my one coffee but I don't need three anymore.",
      verified: true,
    },
    {
      id: "day-2",
      name: "Marcus T.",
      rating: 5,
      date: "2026-04-18",
      body: "Took about three weeks to notice the focus difference, but it's real and it stuck.",
      verified: true,
    },
    {
      id: "day-3",
      name: "Aiko S.",
      rating: 4,
      date: "2026-03-27",
      body: "Citrus flavor is light and pleasant. Docking one star only because I wish the box had 45 packets instead of 30.",
      verified: true,
    },
  ],
  night: [
    {
      id: "night-1",
      name: "Devon R.",
      rating: 5,
      date: "2026-05-11",
      body: "Finally a sleep product that doesn't leave me groggy. Melatonin always wrecked my mornings — this doesn't.",
      verified: true,
    },
    {
      id: "night-2",
      name: "Lena M.",
      rating: 5,
      date: "2026-04-30",
      body: "The warm chamomile taste is half the ritual at this point. Asleep within 20 minutes most nights.",
      verified: true,
    },
    {
      id: "night-3",
      name: "Sam O.",
      rating: 4,
      date: "2026-03-09",
      body: "Works well. Wish it came in a bigger box since I go through it fast once I'm actually sleeping through the night.",
      verified: true,
    },
  ],
  "reset-duo": [
    {
      id: "duo-1",
      name: "Jordan F.",
      rating: 5,
      date: "2026-05-20",
      body: "Bought this as a couple's gift and we're both hooked. One box, one ritual, way simpler than juggling two subscriptions.",
      verified: true,
    },
    {
      id: "duo-2",
      name: "Camille B.",
      rating: 5,
      date: "2026-04-25",
      body: "The full system is genuinely better than either half alone — better sleep makes the Day packet hit different.",
      verified: true,
    },
  ],
};
