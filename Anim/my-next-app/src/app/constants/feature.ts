import { Availability } from "../components/features/availibility";
import Color from "../components/features/color";
import Music from "../components/features/music";
import { SchedulingLinks } from "../components/features/schedule-link";
import { Team } from "../components/features/team";
import { Todo } from "../components/features/todo";
import { MusicVisual, OtherVisual } from "../components/features/visual";

export const features = [
  {
    title: "Use your calendar as a todo list",
    id: "todo-list",
    card: Todo,
    visual: OtherVisual,
  },
  {
    title: "Color your calendar to organize",
    id: "colors",
    card: Color,
    visual: OtherVisual,
  },
  {
    title: "Instantly know if someone is available",
    id: "availability",
    card: Availability,
    visual: OtherVisual,
  },
  {
    title: "Track what you listened to when",
    id: "music",
    card: Music,
    visual: MusicVisual,
  },
  {
    title: "Send scheduling links guests love",
    id: "scheduling-links",
    card: SchedulingLinks,
    visual: OtherVisual,
  },
  {
    title: "Always know what your team is up to",
    id: "team",
    card: Team,
    visual: OtherVisual,
  },
];
