export const links = [
  {
    name: "Domů",
    to: "/",
  },
  {
    name: "Projekty",
    to: "/projekty",
  },
  {
    name: "Tender",
    collapse: false,
    to: "/tender",
  },
  {
    name: "Objednávky",
    collapse: true,
    data: [
      {
        name: "Nová objednávka",
        to: "/objednavky?action=new",
      },
      {
        name: "Objednávky",
        to: "/objednavky",
      },
      {
        name: "Vyhledávač",
        to: "/objednavky?action=finder",
      },
      {
        name: "Archiv objednávek",
        to: "/objednavky?action=archive",
      },
    ],
  },
  {
    name: "Materiály",
    collapse: true,
    data: [
      {
        name: "Přehled materiálů",
        to: "/",
      },
    ],
  },
];
