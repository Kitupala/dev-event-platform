// Centralized constants for the app
// Events can be imported and passed to the EventCard component directly.
// Image paths reference files under /public/images, e.g. "/images/event1.png".

export type EventItem = {
  title: string;
  image: string; // path under /public
  slug: string; // url-friendly identifier
  location: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // 24h time string (HH:mm)
};

export const events: EventItem[] = [
  {
    title: "React Summit Amsterdam 2026",
    image: "/images/event1.png",
    slug: "react-summit-amsterdam-2026",
    location: "Amsterdam, NL",
    date: "2026-06-13",
    time: "09:00",
  },
  {
    title: "JSConf EU 2026",
    image: "/images/event2.png",
    slug: "jsconf-eu-2026",
    location: "Berlin, DE",
    date: "2026-05-23",
    time: "10:00",
  },
  {
    title: "PyCon US 2026",
    image: "/images/event3.png",
    slug: "pycon-us-2026",
    location: "Pittsburgh, PA, USA",
    date: "2026-04-18",
    time: "09:30",
  },
  {
    title: "KubeCon + CloudNativeCon Europe 2026",
    image: "/images/event4.png",
    slug: "kubecon-cloudnativecon-europe-2026",
    location: "Vienna, AT",
    date: "2026-03-18",
    time: "09:00",
  },
  {
    title: "Google I/O 2026",
    image: "/images/event5.png",
    slug: "google-io-2026",
    location: "Mountain View, CA, USA + Online",
    date: "2026-05-12",
    time: "10:00",
  },
  {
    title: "AWS re:Invent 2026",
    image: "/images/event6.png",
    slug: "aws-reinvent-2026",
    location: "Las Vegas, NV, USA",
    date: "2026-12-01",
    time: "09:00",
  },
  {
    title: "Next.js Conf 2026",
    image: "/images/event-full.png",
    slug: "nextjs-conf-2026",
    location: "San Francisco, CA, USA + Online",
    date: "2026-10-15",
    time: "09:00",
  },
  {
    title: "Hack the North 2026",
    image: "/images/event2.png",
    slug: "hack-the-north-2026",
    location: "Waterloo, ON, Canada",
    date: "2026-09-18",
    time: "18:00",
  },
  {
    title: "ETHGlobal London 2026",
    image: "/images/event3.png",
    slug: "ethglobal-london-2026",
    location: "London, UK",
    date: "2026-07-10",
    time: "17:00",
  },
  {
    title: "DjangoCon US 2026",
    image: "/images/event4.png",
    slug: "djangocon-us-2026",
    location: "Portland, OR, USA",
    date: "2026-10-12",
    time: "09:00",
  },
];
