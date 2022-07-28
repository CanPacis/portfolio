import React from "react";
import { atom } from "recoil";
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
import { Text } from "@mantine/core";

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
  heroTitle: React.ReactNode;
  heroSubtitle: string;
  heroParagraph: string;
  contactList: ContactItem[];
  projects: Project[];
  languages: Language[];
  experiences: Experience[];
  tools: Tool[];
  skills: Skill[];
  siteKeys: {
    doubleClickToPreview: string;
    myMainSkills: string,
    programmingLanguages: string;
    spokenLanguages: string;
    projects: string;
    experience: string;
    languages: string;
    tools: string;
    skills: string;
    present: string;
    DateFormat: (from: string, to: string) => JSX.Element;
  };
}

export const enUS: Content = {
  heroTitle: React.createElement(React.Fragment, {}, [
    React.createElement("span", {}, "Hello There,"),
    React.createElement("br", {}),
    React.createElement("span", {}, "This is"),
    React.createElement("br", {}),
    React.createElement("span", {}, "Muhammed Ali"),
  ]),
  heroSubtitle: "I build stuff with web technologies.",
  heroParagraph:
    "I am a self-taught programmer with immense curiosity, not only a learner but also a lover of learning. I taught myself playing the guitar and the piano, I learned English almost all on my own and I taught myself programming. I still seek knowledge and try to learn new stuff in every front.",
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
      image: "/kasif.webp",
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
      title: "Sinope",
      description:
        "A simple integrated development environment for developing and transpiling nearley grammars. Developed with electron and Microsoft's monaco editor which is also used in VSCode.",
      image: "/sinope.webp",
      link: "https://github.com/CanPacis/nearley-editor",
      tags: ["Desktop App", "JavaScript", "React"],
      actionLabel: "See the repo",
    },
    {
      title: "Birlang",
      description:
        "Bir language where only one type exists. It is a simple language with only one type that is integer. Along with a parser and an implementor engine, I also developed a VSCode plugin for syntax highlighting. It is entirely written in TypeScript and Deno while having no dependencies.",
      image: "/birlang.webp",
      link: "https://github.com/CanPacis/bir",
      tags: ["Experimental", "TypeScript"],
      actionLabel: "See the repo",
    },
    {
      title: "Birlang Go",
      description:
        "Bir language where only one type exists. But written in Go. Using the the same parser I implemented in in Typescript, this language is the exact same as the other one, but the implementor engine is written in Go and has few dependencies. It was a nice experiment to learn Golang and its struct and interfaces.",
      image: "birlang-go.webp",
      link: "https://github.com/CanPacis/birlang",
      tags: ["Experimental", "Go"],
      actionLabel: "See the repo",
    },
    {
      title: "Betic",
      description:
        "Another programming language attempt of mine. Betic is one of my first attemps to create a programming language. It has a lot of design flaws as well as a lot of bugs. The lack of a callstack makes the language unusable but it taught me well. I also developed a VSCode plugin for syntax highlighting for this language.",
      image: "/betic.webp",
      link: "https://github.com/CanPacis/betic",
      tags: ["Experimental", "TypeScript"],
      actionLabel: "See the repo",
    },
    {
      title: "Mantine",
      description:
        "A fully featured React components library. Build fully functional accessible web applications faster than ever - Mantine includes more than 100 customizable components and 40 hooks to cover you in any situation. I basically made some small contributions.",
      image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/Hero.png",
      link: "https://mantine.dev",
      tags: ["Library", "Contribution"],
      actionLabel: "See the website",
    },
    {
      title: "Svelte UI",
      description:
        "Create applications in less time than ever before Regardless of design experience. I basically made some small contributions.",
      image: "/svelte-ui.webp",
      link: "https://www.svelteui.org/",
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
      to: new Date(2022, 7, 1),
    },
    {
      company: "Macellan",
      title: "Senior Frontend Developer",
      type: "Full-time",
      description:
        "I am building the company's main website and oversee the development of the company's internal tools.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      from: new Date(2022, 7, 1),
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
      name: "Next.js",
      logo: "nextjs-original",
      description: "The React Framework for Production",
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
      name: "Git",
      logo: "git-plain",
      description: "--distributed-is-the-new-centralized",
    },
    {
      name: "Github",
      logo: "github-original",
      description: "The complete developer platform to build, scale, and deliver secure software.",
    },
    {
      name: "Bitbucket",
      logo: "bitbucket-original",
      description: "Code & CI/CD, optimized for teams using Jira",
    },
    {
      name: "Socket.io",
      logo: "socketio-original",
      description: "Bidirectional and low-latency communication for every platform",
    },
    {
      name: "Firebase",
      logo: "firebase-plain",
      description: "Make your app the best it can be",
    },
    {
      name: "Deno",
      logo: "denojs-original",
      description: "A modern runtime for JavaScript and TypeScript",
    },
    {
      name: "Express",
      logo: "express-original",
      description: "Fast, unopinionated, minimalist web framework for Node.js",
    },
    {
      name: "Material-UI",
      logo: "materialui-plain",
      description: "Move faster with intuitive React UI tools",
    },
    {
      name: "VSCode",
      logo: "vscode-plain",
      description: "Code editing. Redefined.",
    },
    {
      name: "Yarn",
      logo: "yarn-plain-wordmark",
      description: "Safe, stable, reproducible projects",
    },
    {
      name: "npm",
      logo: "npm-original-wordmark",
      description: "Take your JavaScript development up a notch",
    },
    {
      name: "Markdown",
      logo: "markdown-original",
      description: "Lightweight markup language for creating formatted text",
    },
    {
      name: "Flutter",
      logo: "flutter-plain",
      description: "Build apps for any screen",
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

  siteKeys: {
    doubleClickToPreview: "Double click to preview image",
    myMainSkills: "My Main Skills",
    programmingLanguages: "Programming Languages",
    spokenLanguages: "Spoken Languages",
    projects: "Projects",
    experience: "Experience",
    languages: "Languages",
    tools: "Tools",
    skills: "Skills",
    present: "Present",
    DateFormat: (from: string, to: string) => {
      return React.createElement("span", null, [
        "From ",
        React.createElement(Text as React.ElementType<any>, { variant: "link", component: "span" }, [from]),
        " to ",
        React.createElement(Text as React.ElementType<any>, { variant: "link", component: "span" }, [to]),
      ]);
    },
  },
};

export const tr: Content = {
  heroTitle: React.createElement(React.Fragment, {}, [
    React.createElement("span", {}, "Merhabalar,"),
    React.createElement("br", {}),
    React.createElement("span", {}, "Ben"),
    React.createElement("br", {}),
    React.createElement("span", {}, "Muhammed Ali"),
  ]),
  heroSubtitle: "Web teknolojilerini kullanarak uygulamalar yazıyorum.",
  heroParagraph:
    "Kendi kendini yetiştirmiş ve meraklı bir yazılımcıyım. Sadece öğrenen değil, öğrenmeyi seven biriyim. Gitarı ve piyanoyu çalmayı kendi kendime öğrendim, neredeyse hiç yardım almadan İngilizce öğrendim ve en önemlisi, kendime yazılımı öğrettim. Hâlâ her alanda yeni şeyler öğrenmeye çalışıyor ve bilgiyi arıyorum.",
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
      image: "/kasif.webp",
      link: "https://github.com/Kasif-The-Explorer/kasif-the-explorer",
      tags: ["React", "Masaüstü Uygulaması"],
      actionLabel: "Repo'yu incele",
    },
    {
      title: "Affixi",
      description:
        "A helper library for Turkish noun suffixes written in typescript. Because Turkish is an agglutinative language and vowel harmony is a challenge, Affixi approaches the problem in a functional way and provides the primitives to create appropriate suffixes. An extensive documentation is available on the GitHub repository.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      link: "https://canpacis.github.io/affixi/",
      tags: ["Kütüphane", "TypeScript"],
      actionLabel: "Dokümantasyonu incele",
    },
    {
      title: "Sinope",
      description:
        "A simple integrated development environment for developing and transpiling nearley grammars. Developed with electron and Microsoft's monaco editor which is also used in VSCode.",
      image: "/sinope.webp",
      link: "https://github.com/CanPacis/nearley-editor",
      tags: ["Masaüstü Uygulaması", "JavaScript"],
      actionLabel: "Repo'yu incele",
    },
    {
      title: "Birlang",
      description:
        "Bir language where only one type exists. It is a simple language with only one type that is integer. Along with a parser and an implementor engine, I also developed a VSCode plugin for syntax highlighting. It is entirely written in TypeScript and Deno while having no dependencies.",
      image: "/birlang.webp",
      link: "https://github.com/CanPacis/bir",
      tags: ["Deneysel", "TypeScript"],
      actionLabel: "Repo'yu incele",
    },
    {
      title: "Birlang Go",
      description:
        "Bir language where only one type exists. But written in Go. Using the the same parser I implemented in in Typescript, this language is the exact same as the other one, but the implementor engine is written in Go and has few dependencies. It was a nice experiment to learn Golang and its struct and interfaces.",
      image: "birlang-go.webp",
      link: "https://github.com/CanPacis/birlang",
      tags: ["Deneysel", "Go"],
      actionLabel: "Repo'yu incele",
    },
    {
      title: "Betic",
      description:
        "Another programming language attempt of mine. Betic is one of my first attemps to create a programming language. It has a lot of design flaws as well as a lot of bugs. The lack of a callstack makes the language unusable but it taught me well. I also developed a VSCode plugin for syntax highlighting for this language.",
      image: "/betic.webp",
      link: "https://github.com/CanPacis/betic",
      tags: ["Deneysel", "TypeScript"],
      actionLabel: "Repo'yu incele",
    },
    {
      title: "Mantine",
      description:
        "A fully featured React components library. Build fully functional accessible web applications faster than ever - Mantine includes more than 100 customizable components and 40 hooks to cover you in any situation. I basically made some small contributions.",
      image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/Hero.png",
      link: "https://mantine.dev",
      tags: ["Kütüphane", "Katkı"],
      actionLabel: "Websitesini incele",
    },
    {
      title: "Svelte UI",
      description:
        "Create applications in less time than ever before Regardless of design experience. I basically made some small contributions.",
      image: "/svelte-ui.webp",
      link: "https://www.svelteui.org/",
      tags: ["Kütüphane", "Katkı"],
      actionLabel: "Websitesini incele",
    },
  ],

  experiences: [
    {
      company: "Çeşitli",
      title: "Freelance Geliştirici",
      type: "Kontratlı",
      description: "Küçük işletmeler için web siteleri geliştirdim ve deploy işlemlerini yaptım.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      from: new Date(2020, 0, 1),
      to: new Date(2021, 1, 1),
    },
    {
      company: "Viavis",
      title: "Arayüz Geliştiricisi",
      type: "Tam zamanlı",
      description:
        "Kurumsal seviyedeki web uygulamalarının geliştirmesini ve refaktör işlemlerini yaptım, eski teknolojilerden yeni teknolojilere migration işlerini sürdürdüm ve power user ve admin araç gereçlerini geliştirdim.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      from: new Date(2021, 1, 1),
      to: new Date(2022, 7, 1),
    },
    {
      company: "Macellan",
      title: "Kıdemli Arayüz Geliştiricisi",
      type: "Tam zamanlı",
      description:
        "Ürünlerin kurumsal web sitelerini geliştiriyor ve şirkette kullanılan araçların geliştirilmesini izliyorum.",
      image:
        "https://opengraph.githubassets.com/ac11ecea9786cc632fbe114d80ed42a3d47ac1dd2f397f9cbbb3ba57ffaecb19/CanPacis/affixi",
      from: new Date(2022, 7, 1),
      to: null,
    },
  ],

  languages: [
    {
      color: "orange",
      type: "programming",
      name: "JavaScript",
      level: 6,
      description: "Uzman",
    },
    {
      color: "orange",
      type: "programming",
      name: "TypeScript",
      level: 6,
      description: "Uzman",
    },
    { color: "orange", type: "programming", name: "Go", level: 3, description: "Deneyimli" },
    { color: "orange", type: "programming", name: "Dart", level: 1, description: "Çırak" },
    { color: "orange", type: "programming", name: "Rust", level: 0, description: "Çırak" },
    { color: "teal", type: "spoken", name: "Türkçe", level: 6, description: "Anadil" },
    { color: "teal", type: "spoken", name: "İngilizce", level: 6, description: "C2" },
    { color: "teal", type: "spoken", name: "Fransızca", level: 1, description: "A1" },
    { color: "teal", type: "spoken", name: "İsveççe", level: 1, description: "A1" },
  ],

  tools: enUS.tools,

  skills: [
    {
      name: "Performans Optimizasyonu",
      icon: Speedboat,
      description: "",
      color: "violet",
    },
    {
      name: "Hata Ayıklama",
      icon: Bug,
      description: "",
      color: "indigo",
    },
    {
      name: "Analitik Düşünce",
      icon: ReportAnalytics,
      description: "",
      color: "orange",
    },
    {
      name: "Takım Oyuncusu",
      icon: Users,
      description: "",
      color: "red",
    },
    {
      name: "Yazılım Tasarımı ve Mimarisi",
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

  siteKeys: {
    doubleClickToPreview: "Resmi önizlemek için çift tıklayın",
    myMainSkills: "Başlıca Yeteneklerim",
    programmingLanguages: "Yazılım Dilleri",
    spokenLanguages: "Konuşulan Diller",
    projects: "Projeler",
    experience: "Deneyim",
    languages: "Diller",
    tools: "Araçlar",
    skills: "Yetenekler",
    present: "Günümüz",
    DateFormat: (from: string, to: string) => {
      return React.createElement("span", null, [
        React.createElement(Text as React.ElementType<any>, { variant: "link", component: "span" }, [from]),
        " ve ",
        React.createElement(Text as React.ElementType<any>, { variant: "link", component: "span" }, [to]),
        " arası",
      ]);
    },
  },
};

export function getContent(language: string): Content {
  switch (language) {
    case "en-US":
      return enUS;
    case "tr":
      return tr;
    default:
      return enUS;
  }
}

export const languageState = atom({
  key: "languageState",
  default: "en-US",
});
