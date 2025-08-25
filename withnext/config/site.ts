import { Metadata, Viewport } from "next";

export const siteMetadata: Metadata = {
  applicationName: "KanBan - Projeto de Pedro Estevão",
  title: {
    default: "KanBan",
    template: "%s - KanBan",
  },
  description: "",
  authors: [
    {
      name: "Pedro Estevão",
      url: "https://www.pedroestevao.com",
    },
  ],
  generator: "Next.js",
  keywords: ["KanBan", "Task Management", "Productivity"],
  creator: "Pedro Estevão",
  publisher: "Pedro Estevão",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.pedroestevao.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export const siteViewport: Viewport = {
  colorScheme: "light dark",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  userScalable: true,
  width: "device-width",
};
