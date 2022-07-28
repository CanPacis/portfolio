import React from "react";
import {
  BrandLinkedin,
  BrandGithub,
  BrandDiscord,
  BrandStackoverflow,
  Speedboat,
  Bug,
  ReportAnalytics,
  BuildingBridge,
  Code,
  Icon,
  Users,
} from "tabler-icons-react";

export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  actionLabel: string;
}

export interface Experience {
  company: string;
  title: string;
  description: string;
  type: string;
  image: string;
  from: Date;
  to: Date | null;
}

export interface Language {
  name: string;
  level: number;
  description: string;
  type: "programming" | "spoken";
  color: string;
}

export interface Tool {
  name: string;
  // image: string
  logo: string;
  description: string;
}

export interface Skill {
  name: string;
  icon: Icon;
  description: string;
  color: string;
}

export interface ContactItem {
  label: string;
  url: string;
  icon: React.ReactElement;
}

export interface Content {
  heroTitle: string;
  heroSubtitle: string;
  heroParagraph: string;
  contactList: ContactItem[];
  projects: Project[];
  languages: Language[];
  experiences: Experience[];
  tools: Tool[];
  skills: Skill[];
}

const content: Content = {
  heroTitle: "The Hero",
  heroSubtitle: "The Subtitle",
  heroParagraph: "The Paragraph",
  contactList: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/muhammed-ali-can-45761a206/",
      icon: React.createElement(BrandLinkedin),
    },
    { label: "Github", url: "https://github.com/CanPacis/", icon: React.createElement(BrandGithub) },
    { label: "Discord", url: "https://discordapp.com/users/0944/", icon: React.createElement(BrandDiscord) },
    {
      label: "Stackoverflow",
      url: "https://stackoverflow.com/users/12360941/can-pacis/",
      icon: React.createElement(BrandStackoverflow),
    },
  ],
  projects: [
    {
      title: "Kâşif",
      description:
        "Kâşif; Turkish noun Explorer, A person who travels to places where few people have been before or places that are unknown to them, in order to find out more about them. Kâşif is a web based file explorer designed for every platform. If done, all major operating systems and web will be supported.",
      image: "/kasif.png",
      link: "https://github.com/Kasif-The-Explorer/kasif-the-explorer",
      tags: ["React", "Desktop App"],
      actionLabel: "See the repo",
    },
    {
      title: "Affixi",
      description:
        "A helper library for Turkish noun suffixes written in typescript. Because Turkish is an agglutinative language and vowel harmony is a challenge, Affixi approaches the problem in a functional way and provides the primitives to create appropriate suffixes. An extensive documentation is available on the GitHub repository.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      link: "https://canpacis.github.io/affixi/",
      tags: ["Library", "TypeScript"],
      actionLabel: "See the docs",
    },
    {
      title: "Birlang",
      description: "Bir language where only one type exists.",
      image: "/birlang.png",
      link: "https://github.com/CanPacis/bir",
      tags: ["Experimental", "TypeScript"],
      actionLabel: "See the repo",
    },
    {
      title: "Birlang Go",
      description: "Bir language where only one type exists. But written in Go.",
      image: "birlang-go.png",
      link: "https://github.com/CanPacis/birlang",
      tags: ["Experimental", "Go"],
      actionLabel: "See the repo",
    },
    {
      title: "Betic",
      description: "Another programming language attempt",
      image: "/betic.png",
      link: "https://github.com/CanPacis/betic",
      tags: ["Experimental", "TypeScript"],
      actionLabel: "See the repo",
    },
    {
      title: "Mantine",
      description:
        "A fully featured React components library. Build fully functional accessible web applications faster than ever - Mantine includes more than 100 customizable components and 40 hooks to cover you in any situation",
      image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/Hero.png",
      link: "https://mantine.dev",
      tags: ["Library", "Contribution"],
      actionLabel: "See the website",
    },
  ],

  experiences: [
    {
      company: "Various",
      title: "Freelance Developer",
      type: "Contracted",
      description: "I created small websites for small businesses and deployed them.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      from: new Date(2020, 0, 1),
      to: new Date(2021, 1, 1),
    },
    {
      company: "Viavis",
      title: "Frontend Developer",
      type: "Full-time",
      description:
        "I built and refactored large webapp architectures, migrated from old technologies to new ones and built admin and power user tools for the company.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      from: new Date(2021, 1, 1),
      to: new Date(2022, 6, 1),
    },
    {
      company: "Macellan",
      title: "Senior Frontend Developer",
      type: "Full-time",
      description:
        "I am building the company's main website and oversee the development of the company's internal tools.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      from: new Date(2022, 6, 1),
      to: null,
    },
  ],

  languages: [
    {
      color: "orange",
      type: "programming",
      name: "JavaScript",
      level: 6,
      description: "Expert",
    },
    {
      color: "orange",
      type: "programming",
      name: "TypeScript",
      level: 6,
      description: "Expert",
    },
    { color: "orange", type: "programming", name: "Go", level: 3, description: "Experienced" },
    { color: "orange", type: "programming", name: "Dart", level: 1, description: "Beginner" },
    { color: "orange", type: "programming", name: "Rust", level: 0, description: "Beginner" },
    { color: "teal", type: "spoken", name: "Turkish", level: 6, description: "Native" },
    { color: "teal", type: "spoken", name: "English", level: 6, description: "C2" },
    { color: "teal", type: "spoken", name: "French", level: 1, description: "A1" },
    { color: "teal", type: "spoken", name: "Swedish", level: 1, description: "A1" },
  ],

  tools: [
    {
      name: "React",
      logo: "react-original",
      description: "A JavaScript library for building user interfaces",
    },
    {
      name: "Svelte",
      logo: "svelte-plain",
      description: "Cybernetically enhanced web apps",
    },
    {
      name: "Electron",
      logo: "electron-original",
      description: "Build cross-platform desktop apps with web technologies",
    },
    {
      name: "NodeJS",
      logo: "nodejs-plain",
      description: "A JavaScript runtime built on V8 engine",
    },
    {
      name: "MongoDB",
      logo: "mongodb-plain",
      description: "Build faster. Build smarter.",
    },
    {
      name: "Socket.io",
      logo: "socketio-original",
      description: "Bidirectional and low-latency communication for every platform",
    },
    {
      name: "Deno",
      logo: "denojs-original",
      description: "A modern runtime for JavaScript and TypeScript",
    },
  ],

  skills: [
    {
      name: "Performance Optimization",
      icon: Speedboat,
      description: "",
      color: "violet",
    },
    {
      name: "Troubleshooting",
      icon: Bug,
      description: "",
      color: "indigo",
    },
    {
      name: "Analytical Thinking",
      icon: ReportAnalytics,
      description: "",
      color: "orange",
    },
    {
      name: "Team Player",
      icon: Users,
      description: "",
      color: "red",
    },
    {
      name: "Software Design and Architecture",
      icon: BuildingBridge,
      description: "",
      color: "teal",
    },
    {
      name: "Scripting",
      icon: Code,
      description: "",
      color: "pink",
    },
  ],
};

export default content;
