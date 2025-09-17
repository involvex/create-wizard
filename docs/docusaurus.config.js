// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See https://docusaurus.io/docs/api/docusaurus-config/

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '@involvex/create-wizard Documentation',
  tagline: 'Streamline your JavaScript project setup with ease.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://involvex.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<'projectName'>/'
  baseUrl: '/create-wizard/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'involvex', // Usually your GitHub org/user name.
  projectName: 'create-wizard', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/involvex/create-wizard/tree/main/docs/',
        },
        blog: false, // Disable blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '@involvex/create-wizard',
        logo: {
          alt: 'My Project Logo',
          src: 'img/logo.svg', // You might want to create a custom logo
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/involvex/create-wizard',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Installation',
                to: '/docs/installation',
              },
              {
                label: 'Usage',
                to: '/docs/usage',
              },
              {
                label: 'Contribution',
                to: '/docs/contribution',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/involvex/create-wizard',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Involvex. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'YOUR_APP_ID', // Replace with your Algolia App ID
        // Public API key: it is safe to commit it
        apiKey: 'YOUR_SEARCH_API_KEY', // Replace with your Algolia Search API Key
        indexName: 'YOUR_INDEX_NAME', // Replace with your Algolia Index Name
        // Optional: path for search page that renders nothing at /search
        // searchPagePath: 'search',
      },
    }),
};

export default config;