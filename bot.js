const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const COMMANDS = [
  {
    command: "program",
    description: "Show conference program",
  },
  {
    command: "speakers",
    description: "List of speakers",
  },
  {
    command: "partners",
    description: "List of partners",
  },
  {
    command: "sponsors",
    description: "List of sponsors",
  },
  {
    command: "location",
    description: "Location",
  },
  {
    command: "venue",
    description: "Venue",
  },
  {
    command: "tickets",
    description: "Buy tickets",
  },
  {
    command: "now",
    description: "Current events",
  },
  {
    command: "add",
    description: "Add something to the program",
  },
  {
    command: "help",
    description: "Show help/main menu",
  },
];

module.exports = COMMANDS;

const getHelp = () => {
  let helpText = `*Here's how I can help:*\n`;
  helpText += COMMANDS.map((command) => `*/${command.command}* ${command.description}`).join(`\n`);
  return helpText;
};

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.setMyCommands(COMMANDS);

bot.start((ctx) =>
  ctx.replyWithMarkdown(
    `Hi👋 \n\n\
I'm a chatbot *Barcelona IT Conf* and I'm here to help you spend time on \
conferences with benefit and pleasure.\n\n\
I will help you keep track of the schedule, find out information about speakers and partners,\
receive notifications from the organizers and ask them questions. \n\n\
Use the convenient menu to quickly find the information you need👇\n\n` + getHelp()
  )
);
bot.help((ctx) =>
  ctx.replyWithHTML(`Hi, ${ctx.message.from.username}
Here's how I can help:

/program - Show conference program
/speakers - List of speakers
/partners - List of partners
/sponsors - List of sponsors
/location - Location
/venue - Venue
/tickets - Buy tickets
/now - Current events
/add - Add something to the program
/help - Show help/main menu`)
);
bot.command("help", (ctx) => {
  return ctx.replyWithMarkdown(getHelp());
});

let partners_array = [
  {
    group: "Mission",
    name: "ETHBarcelona",
    type: "Main",
    title: "Explore Blockchain Technology can help build a sustainable world full of Human Potential.",
    subtitle: "Learn from the best in the crypto scene, and put those networking skills to use.",
    description:
      "ETHBarcelona brings together 4000 makers, developers, and blockchain enthusiasts for a three-day conference to focus on education, innovation, art, and creating positive social impact.",
    url: "https://ethbarcelona.com/",
    callback_data: "partners_1",
  },
  {
    group: "Launch Partners",
    name: "DAOist",
    type: "",
    title: "The era of DAOs has just begun.",
    subtitle: "A cultural vehicle for collaborative defiance",
    description:
      "More than just technical and organizational revolutions, DAOs are enabling a lifestyle characterized by purpose, ownership, collaboration, and openness. The DAOist supports the cultural revolution needed to enable a world of DAOists.",
    url: "https://www.thedaoist.co/",
    callback_data: "partners_2",
  },
  {
    group: "Launch Partners",
    name: "DoinGud",
    type: "NFT Platform",
    title: "DoinGud is an NFT ecosystem focused on inspiring creativity and positive social impact.",
    subtitle:
      "We pride ourselves on accessibility and sustainability, providing next-gen Web3 tools to empower our community to create, curate, collaborate, and connect with one another in the digital space.",
    description:
      "We are inviting creators from around the world to be featured in our next exhibitions. We aim to empower our community of creators, curators, and collectors to use their passion to create meaningful change in the world around them — and have fun doing it!",
    url: "https://doingud.com/",
    callback_data: "partners_3",
  },
  {
    group: "Launch Partners",
    name: "FLOC",
    type: "NFT Creative Agency",
    title:
      "FLOC is the first to provide design strategy leadership and design services via NFT drops to crypto start-ups.",
    subtitle:
      "FLOC is a professional freelancers decentralised collective teaming up to deliver the design boost needed for crypto start-ups.",
    description:
      "FLOC is a professional freelancers decentralised collective teaming up to deliver the design boost needed for crypto start-ups.",
    url: "https://wearefloc.com/",
    callback_data: "partners_4",
  },
  {
    group: "Launch Partners",
    name: "Polis Paral·lela Barcelona",
    type: "",
    title: "Join a tribe in Barcelona that cares about freedom, social good, decentralization.",
    subtitle: "We believe technology should free humanity, not enslave it. ",
    description: "",
    url: "https://twitter.com/PolisParallela",
    callback_data: "partners_5",
  },
  {
    group: "Launch Partners",
    name: "Shrine House",
    type: "Decentralized record label and artist tooling platform.",
    title: "The world's first decentralized community governed record label.",
    subtitle: "We use decentralized lending markets to reimagine the concept of a record deal.",
    description: "We democratize power to all token holders by giving them ownership by operating as a DAO.",
    url: "https://shrine.house/",
    callback_data: "partners_6",
  },
  {
    group: "Launch Partners",
    name: "Giant Cookie",
    type: "Creativity driven experiential agency",
    title: "Giant Cookie Creating new/ true/ meaningful content",
    subtitle: "We find the most authentic voice and unifying theme to build a story and connect with an audience.",
    description:
      "We are a network of creators, producers, thinkers, planners, designers, artists, makers, doers, with creative and production teams and partners all over Europe, Latin America and Asia.",
    url: "https://www.wildcookie.eu/",
    callback_data: "partners_7",
  },
  {
    group: "Media Partners",
    name: "Be[in]crypto",
    type: "Media platform",
    title: "ETHBarcelona: la primera conferencia sobre Ethereum en España",
    subtitle:
      "¡Estamos más que emocionados de invitarte a ETHBarcelona, la primera conferencia de Ethereum que tendrá lugar en España, Barcelona, ​​del 6 al 8 de julio!",
    description:
      "ETHBarcelona tendrá lugar del 6 al 8 de julio en el emblemático Centro de Convenciones Internacionales de Barcelona – CCIB. Este evento será la primera conferencia sobre Ethereum que se celebre en España y está llamada a convertirse en un evento mundial por el enfoque que tiene sobre el impacto social y Web3.",
    url: "https://es.beincrypto.com/ethbarcelona-la-primera-conferencia-sobre-ethereum-en-espana/",
    callback_data: "partners_8",
  },
  {
    group: "Media Partners",
    name: "Eclectic Method",
    type: "Video Remix & Musical Animations NFTs",
    title: "Video samples combined with music.",
    subtitle:
      "I am Jonny Wilson (Eclectic Method) and I make remix videos or video music. I make music using video samples combined with my own music. ",
    description: "",
    url: "https://www.eclecticmethod.net/",
    callback_data: "partners_9",
  },
  {
    group: "Media Partners",
    name: "DeFi Prime",
    type: "Finance Media platform",
    title: "DeFi and Open Finance",
    subtitle:
      "We want to shed some light on how DeFi products build and how the ecosystem evolves over time. Our blog features interviews with DeFi projects, analytics, and important news.",
    description:
      "Decentralized Finance (DeFi) is the movement that leverages decentralized networks to transform old financial products into trustless and transparent protocols that run without intermediaries. We are the largest and oldest media outlet, focused solely on DeFi and Open Finance space. ",
    url: "https://defiprime.com/",
    callback_data: "partners_10",
  },
  {
    group: "Media Partners",
    name: "Ethereum",
    type: "Ethereum",
    title: "Ethereum is a global, decentralized platform for money and new kinds of applications.",
    subtitle:
      "Ethereum is a technology that lets you send cryptocurrency to anyone for a small fee. It also powers applications that everyone can use and no one can take down.",
    description:
      "On Ethereum, you can write code that controls money, and build applications accessible anywhere in the world.",
    url: "https://ethereum.org/en/",
    callback_data: "partners_11",
  },
];

let sponsors_array = [
  {
    group: "Diamond Sponsors",
    name: "distrikt",
    type: "Social Media",
    title: "Welcome to distrikt, the world's first professional social media platform built entirely on blockchain.",
    subtitle: "distrikt is a decentralized social media network that empowers users. 100% on the blockchain.",
    description:
      "Our community is growing daily and publishing original content on distrikt. It’s amazing to see such a valuable community embracing distrikt’s vision!",
    url: "https://c7fao-laaaa-aaaae-aaa4q-cai.ic0.app/",
    callback_data: "sponsors_1",
  },
  {
    group: "Diamond Sponsors",
    name: "dCULT",
    type: "Investment Platform",
    title: "Investing in revolution",
    subtitle: "Empowre and funds those investing towards our decentrolised future",
    description:
      "The current financial system serves to keep the people poor. CULT serves to fast forward the collapse of the old financial system, to end the tyranny of sovereign nations and central banks. ",
    url: "https://cultdao.io/",
    callback_data: "sponsors_2",
  },
  {
    group: "Gold Sponsors",
    name: "1inch",
    type: "",
    title: "One-stop access to decentralized finance",
    subtitle: "Optimize your trades across hundreds of DEXes on multiple networks",
    description:
      "The 1inch Network unites decentralized protocols whose synergy enables the most lucrative, fastest and protected operations in the DeFi space.",
    url: "https://1inch.io/",
    callback_data: "sponsors_3",
  },
  {
    group: "Gold Sponsors",
    name: "Tenderly",
    type: "Developer Platform",
    title: "Tenderly | Ethereum Developer Platform",
    subtitle: "Step up your Smart Contract development",
    description: "Ethereum developer platform that enables you to build innovative blockchain products.",
    url: "https://tenderly.co/",
    callback_data: "sponsors_4",
  },
  {
    group: "Gold Sponsors",
    name: "Ripio",
    type: "",
    title: "Bienvenido a la nueva economía digital ",
    subtitle: "Descubrí el futuro de la economía digital",
    description:
      "Comprá y vendé bitcoins y otras criptomonedas de forma rápida y simple. Somos la puerta de acceso al futuro de la economía digital.",
    url: "https://www.ripio.com/",
    callback_data: "sponsors_5",
  },
  {
    group: "Silver Sponsors",
    name: "BOBA NETWORK",
    type: "Ethereum Network",
    title: "INTRODUCING THE ETHEREUM LAYER 2: BOBA NETWORK",
    subtitle: "Hybrid compute, lower gas, faster transactions, secured by Ethereum.",
    description:
      "Boba is an L2 Ethereum scaling & augmenting solution built by the Enya team as core contributors to the OMG Foundation",
    url: "https://boba.network/",
    callback_data: "sponsors_6",
  },
  {
    group: "Silver Sponsors",
    name: "Lido",
    type: "",
    title: "Liquidity for staked assets",
    subtitle: "Simplified and secure staking for digital assets.",
    description: "Lido lets you stake tokens from many networks. Choose a network below to get started.",
    url: "https://lido.fi/",
    callback_data: "sponsors_7",
  },
  {
    group: "Silver Sponsors",
    name: "SkillWallet",
    type: "NFT ID's",
    title: "Own your own Identity",
    subtitle: "SkillWallets are NFT IDs that unlock the true power of Web3 Communities.",
    description:
      "Users can immediately prove their Skills & Reputation cross-platform and cross-community – while DAOs can track real human in- teractions directly on-chain, to evaluate the health and growth of the community.",
    url: "https://skillwallet.id/",
    callback_data: "sponsors_8",
  },
  {
    group: "Silver Sponsors",
    name: "MetaMask",
    type: "",
    title: "A crypto wallet & gateway to blockchain apps",
    subtitle: "Start exploring blockchain applications in seconds. Trusted by over 30 million users worldwide.",
    description: "A safe crypto wallet for digital tokens & NFTs. Join the blockchain and DeFi world.",
    url: "https://metamask.io/",
    callback_data: "sponsors_9",
  },
  {
    group: "Silver Sponsors",
    name: "Neon",
    type: "Developer Platform",
    title: "Grow With the Best from Two Chains",
    subtitle: "Neon is an Ethereum Virtual Machine with the scalability and liquidity of Solana",
    description:
      "Neon Labs’s goal is to bring both Solana’s scalability and low transaction costs to the ecosystem of Ethereum dApps, developers, and end-users",
    url: "https://neon-labs.org/",
    callback_data: "sponsors_10",
  },
  {
    group: "Silver Sponsors",
    name: "QuickNode",
    type: "Developer Platform",
    title: "Blockchain infrastructure for everyone",
    subtitle:
      "We make it simple to build blockchain applications and scale up as you grow. From elastic APIs to powerful tools and analytics, all at your command through a simple control panel.",
    description:
      "We're a single platform for your production, staging, and testing environments. With reliability, performance and support only QuickNode can provide.",
    url: "https://www.quicknode.com/",
    callback_data: "sponsors_11",
  },
  {
    group: "Silver Sponsors",
    name: "Bit2Me",
    type: "Crypto Wallet",
    title: "Take back control of your money. The future is crypto.",
    subtitle: "Buy cryptocurrencies with maximum security and in the easiest way",
    description:
      "Buy, sell, exchange, receive, store and send cryptocurrencies in an extremely easy way! Bit2Me Wallet is your best wallet for cryptocurrencies and traditional currencies.",
    url: "https://bit2me.com/",
    callback_data: "sponsors_12",
  },
  {
    group: "Silver Sponsors",
    name: "Status",
    type: "Ethereum Network",
    title: "Private, Secure Communication",
    subtitle:
      "Status is a secure messaging app, crypto wallet, and Web3 browser built with state of the art technology.",
    description:
      "Status brings the power of Ethereum into your pocket by combining a messenger, crypto-wallet, and Web3 browser.",
    url: "https://status.im/",
    callback_data: "sponsors_13",
  },
  {
    group: "Silver Sponsors",
    name: "Zerion",
    type: "Web3 Smart Wallet",
    title: "Smart, Social Web3 Wallet",
    subtitle:
      "The first smart social wallet built for Web3. Track, trade  across 10+ networks and connect directly to  any dAPP in few taps.",
    description:
      "Manage your DeFi and NFT portfolios, trade across 10+ networks and connect to any decentralized application with one wallet",
    url: "https://zerion.io/",
    callback_data: "sponsors_14",
  },
  {
    group: "Silver Sponsors",
    name: "Moonbeam",
    type: "Smart Contract Platform",
    title: "The Future is Multi-Chain",
    subtitle:
      "Moonbeam is a new Polkadot smart contract platform that makes it easy to build natively interoperable blockchain applications",
    description:
      "Expand to new chains. Powered by Moonbeam, an Ethereum-compatible smart contract parachain on Polkadot.Expand to new chains. Powered by Moonbeam, an Ethereum-compatible smart contract parachain on Polkadot.",
    url: "https://moonbeam.network/",
    callback_data: "sponsors_15",
  },
  {
    group: "Silver Sponsors",
    name: "CetriK",
    type: "Blockchain Security Audit",
    title: "Web3 Security Leaderboard",
    subtitle:
      "CetriK is the leading security-focused ranking platform to analyze and monitor blockchain protocols and DeFI projects",
    description:
      "Identify and eliminate security vulnerabilities in blockchains, smart contracts, and Web3 apps using the most rigorous and thorough cybersecurity techniques.",
    url: "https://www.certik.com/",
    callback_data: "sponsors_16",
  },
  {
    group: "Silver Sponsors",
    name: "Pillar Wallet",
    type: "Web3 Smart Wallet",
    title: "Web3 Smart Wallet",
    subtitle:
      "The only community-run smart wallet with single address for all chains, low-to-no fees, and in-appcurated insights.",
    description:
      "Pillar empowers users in the DeFi space by supporting the democratization of finance. One way this is achieved is by giving users a say in how the wallet is run through the use of governance tokens.",
    url: "https://www.pillar.fi/",
    callback_data: "sponsors_17",
  },
  {
    group: "Silver Sponsors",
    name: "Giveth Docs",
    type: "Giveth Docs",
    title: "The Future of Giving, Documented",
    subtitle:
      "Comprehencive documentation for Contributors and Developers to the Giveth DApps and about Giveth as an organisation",
    description:
      "Support and reward the funding of public goods by creating open, transparent and free access to the revolutionary funding opportunities available within the Ethereum ecosystem.",
    url: "https://docs.giveth.io/",
    callback_data: "sponsors_18",
  },
  {
    group: "Bronze Sponsors",
    name: "Rungie",
    type: "",
    title: "Blockchain meets people",
    subtitle:
      "We create innovative products in the entertainment, arts, and culture sector by connecting artists, brands, franchises, and content creators with their audiences through blockchain technology.",
    description: "",
    url: "https://rungie.io/",
    callback_data: "sponsors_19",
  },
  {
    group: "Bronze Sponsors",
    name: "Toucan",
    type: "",
    title: "Carbon. On-Chained",
    subtitle:
      "Toucan’s infrastructure brings programmable carbon to Web3, unlocking its potential for a regenerative economy.",
    description: "Join an ecosystem leveraging composable carbon for DeFi, NFTs, DAOs, and the metaverse.",
    url: "https://toucan.earth/",
    callback_data: "sponsors_20",
  },
  {
    group: "Bronze Sponsors",
    name: "Attestant",
    type: "",
    title: "The Business Of Staking",
    subtitle: "",
    description:
      "Attestant is a company dedicated to the business of staking.  It provides a non-custodial Ethereum 2 managed staking service, giving customers the ability to stake their Ether using Attestant’s infrastructure while always retaining full control of their assets.",
    url: "https://www.attestant.io/",
    callback_data: "sponsors_21",
  },
  {
    group: "Bronze Sponsors",
    name: "Locastic",
    type: "",
    title: "Locastic web: an agile experiment",
    subtitle: "",
    description:
      "Software design and development agency helping clients to turn ideas into amazing web and mobile apps.",
    url: "https://locastic.com/",
    callback_data: "sponsors_22",
  },
  {
    group: "Bronze Sponsors",
    name: "IOSG",
    type: "",
    title: "Research & Thesis Driven Venture Capital",
    subtitle: "IOSG Ventures is a community-friendly and research-driven early-stage venture firm.",
    description: "We are crypto native BUIDLer and long-term HODLer to our early-stage developers & founders.",
    url: "https://iosg.vc/",
    callback_data: "sponsors_23",
  },
  {
    group: "Bronze Sponsors",
    name: "Cortex",
    type: "",
    title: "The Web3 Content Network",
    subtitle:
      "The Cortex App is the gateway to a new Web3 for content all built on the upcoming Cortex Network: a scalable, provable, private, user-centric and affordable network for publishing, finding and updating content.",
    description: "",
    url: "https://www.crtx.app/",
    callback_data: "sponsors_24",
  },
  {
    group: "Bronze Sponsors",
    name: "HACKEN",
    type: "",
    title: "HACKEN CYBERSECURITY SERVICES",
    subtitle: "Leading Security Consulting Company with an essential focus on blockchain security.",
    description: "",
    url: "https://hacken.io/",
    callback_data: "sponsors_25",
  },
  {
    group: "Bronze Sponsors",
    name: "Perpetual Protocol",
    type: "",
    title: "Perpetual Protocol",
    subtitle:
      "Perpetual Protocol is an on-chain perpetual futures DEX with deep liquidity and builder-ready composability.",
    description: "Build new protocols and projects on top of Perpetual Protocol",
    url: "https://perp.com/",
    callback_data: "sponsors_26",
  },
  {
    group: "Bronze Sponsors",
    name: "ShapeShift",
    type: "",
    title: "Explore the DeFi Universe",
    subtitle:
      "A free open source platform to trade, track, buy, and earn. Community-owned. Private. Non-custodial. Multi-chain. ",
    description:
      "Explore the Defi Universe with ShapeShift. A free open source platform to trade, track, buy, and earn. Community-owned. Private. Non-custodial. Multi-chain.",
    url: "https://shapeshift.com/",
    callback_data: "sponsors_27",
  },
  // //////////////////
  {
    group: "Bronze Sponsors",
    name: "ZK Rollup DEX Protocol",
    type: "DeGate",
    title: "A fairly launched, Dao-centric, Zero Knowledge based trading protocol built on Ethereum.",
    subtitle: "The ZK rollup DEX with fast speeds, low fees and maximum self-custody.",
    description: "We built a fast, safe and reliable trading exchange for DeFi users to trade effortlessly.",
    url: "https://www.degate.com/",
    callback_data: "sponsors_29",
  },
  {
    group: "Bronze Sponsors",
    name: "Dapp Server SDK",
    type: "Moralis",
    title: "Empowered Web3 Development",
    subtitle:
      "Moralis provides a singleworkflow for building high performance dapps. Fully compatible with your favourite web3 tools and srvices.",
    description:
      "Whether you are building your first blockchain project or are already a seasoned developer - Moralis will make your projects easier to build, maintain and improve.",
    url: "https://moralis.io/",
    callback_data: "sponsors_30",
  },
  {
    group: "Bronze Sponsors",
    name: "Smart Contracts, SDK and Design System",
    type: "Aragon",
    title: "Integrate DAO functionality into apps",
    subtitle: "Build your Decentralized Autonomous Organization on open-source infrastructure with governance plugins.",
    description: "Frictionless DAO creation and governance, povered by Aragon. Changing the world starts here.",
    url: "https://aragon.org/",
    callback_data: "sponsors_31",
  },
  {
    group: "Bronze Sponsors",
    name: " Decentralized Oracle Network",
    type: "Witnet",
    title: "Witnet connects smart contracts to the outer world.",
    subtitle:
      "Witnet is a next-generation decentralized oracle that leverages state-of-the-art cryptoeconomic techniques to provide smart contracts with secure data input and output.",
    description:
      "The Witnet network runs its own blockchain and relies on the WIT coin for incentivization of autonomous nodes that resolve data requests, agree on the results and deliver the results back to smart contracts.",
    url: "https://witnet.io/es/",
    callback_data: "sponsors_32",
  },
  {
    group: "Bronze Sponsors",
    name: "APWine",
    type: "",
    title: "Buy, Sell, Hedge and Trade Yield",
    subtitle:
      "Speculate on the evolution of the yield generated by different DeFi protocols. Hedge your risk on your passive revenue.",
    description:
      "The APWine protocol locks funds to generate interests which are tokenized as futures, enabling a DeFi user to trade unrealised yield.",
    url: "https://www.apwine.fi/",
    callback_data: "sponsors_33",
  },
  {
    group: "Bronze Sponsors",
    name: "Certora",
    type: "SMART CONTRACT SECURITY",
    title: "ENSURING SMART CONTRACT SECURITY",
    subtitle: "",
    description:
      "Certora’s technology helps to cover security on decentralized protocols, essentially finding vulnerabilities that are usually difficult to find in manual code reviews and audits. ",
    url: "https://www.certora.com/",
    callback_data: "sponsors_34",
  },
];

let speakers_array = [
  {
    group: "Speakers",
    name: "Ale Borda",
    type: "Fifty Years",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/Aleborda21",
    url: "",
    callback_data: "speakers_1",
  },
  {
    group: "Speakers",
    name: "Alex P",
    type: "",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/jabylS",
    url: "",
    callback_data: "speakers_2",
  },
  {
    group: "Speakers",
    name: "Alexander Guy",
    type: "Zerion",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/AlexanderGuy19",
    url: "",
    callback_data: "speakers_3",
  },
  {
    group: "Speakers",
    name: "Aleksandra Smilek",
    type: "Existential Hope",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/jed_voras",
    url: "",
    callback_data: "speakers_4",
  },
  {
    group: "Speakers",
    name: "Andrej Berlin",
    type: "Deep Work",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/kischiman",
    url: "",
    callback_data: "speakers_5",
  },
  {
    group: "Speakers",
    name: "Andy Tudhope",
    type: "Kernel",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/cryptowanderer",
    url: "",
    callback_data: "speakers_6",
  },
  {
    group: "Speakers",
    name: "Anna Kryukova",
    type: "Celo Foundation",
    title: ``,
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/annaalexak",
    url: "",
    callback_data: "speakers_7",
  },
  {
    group: "Speakers",
    name: "Ashley Taylor Buck",
    type: "ReSource",
    title: ``,
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/ashtaybuck",
    url: "",
    callback_data: "speakers_8",
  },
  {
    group: "Speakers",
    name: "Beth McCarthy",
    type: "Toucan Protocol",
    title: ``,
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/ontologymachine",
    url: "",
    callback_data: "speakers_9",
  },
  {
    group: "Speakers",
    name: "Camila Ramos",
    type: "Edge & Node",
    title: ``,
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/camiinthisthang",
    url: "",
    callback_data: "speakers_10",
  },
  {
    group: "Speakers",
    name: "Camilla McFarland",
    type: "Camilla McFarlandMojito",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/camillionaire_m",
    url: "",
    callback_data: "speakers_11",
  },
  {
    group: "Speakers",
    name: "Colin Reynolds",
    type: "Learning Economy Foundation",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/misterreynolds",
    url: "",
    callback_data: "speakers_12",
  },
  {
    group: "Speakers",
    name: "Cris Carrascosa",
    type: "ATH21",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/CarrascosaCris_",
    url: "",
    callback_data: "speakers_13",
  },
  {
    group: "Speakers",
    name: "Dave KrugmanALLSHIPS.co",
    type: "ALLSHIPS.co",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/dave_krugman",
    url: "",
    callback_data: "speakers_14",
  },
  {
    group: "Speakers",
    name: "Diego Mazo",
    type: "Tropykus",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/dmazorosete",
    url: "",
    callback_data: "speakers_15",
  },
  {
    group: "Speakers",
    name: "Dyma Budorin",
    type: "Hacken",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/buda_kyiv",
    url: "",
    callback_data: "speakers_16",
  },
  {
    group: "Speakers",
    name: "Francesco Renzi",
    type: "Superfluid",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/FrancescoRenziA",
    url: "",
    callback_data: "speakers_17",
  },
  {
    group: "Speakers",
    name: "Gabriel Gruber",
    type: "Exactly Finance",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/GabrielGruber",
    url: "",
    callback_data: "speakers_18",
  },
  {
    group: "Speakers",
    name: "Guy Pirelli",
    type: "Shrine House",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/iloveguypirelli",
    url: "",
    callback_data: "speakers_19",
  },
  {
    group: "Speakers",
    name: "Haitham Mengad",
    type: "StemsDAO",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/haithamengad",
    url: "",
    callback_data: "speakers_20",
  },
  {
    group: "Speakers",
    name: "Jahed Momand",
    type: "PrimeDAO, DAOist",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/againstutopia",
    url: "",
    callback_data: "speakers_21",
  },
  {
    group: "Speakers",
    name: "James Beck",
    type: "ConsenSys (Metamask)",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/JamesJohnBeck",
    url: "",
    callback_data: "speakers_22",
  },
  {
    group: "Speakers",
    name: "James Farrell",
    type: "Toucan",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/positonic",
    url: "",
    callback_data: "speakers_23",
  },
  {
    group: "Speakers",
    name: "Jordan Spence",
    type: "MetaMask/ ConsenSys",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/spencecoin",
    url: "",
    callback_data: "speakers_24",
  },
  {
    group: "Speakers",
    name: "Jori Armbruster",
    type: "EthicHub",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/jori_armbruster",
    url: "",
    callback_data: "speakers_25",
  },
  {
    group: "Speakers",
    name: "Juan SES",
    type: "MakerDAO",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/0x7u4n",
    url: "",
    callback_data: "speakers_26",
  },
  {
    group: "Speakers",
    name: "Kelsie Nabben",
    type: "RMIT University",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/kelsiemvn",
    url: "",
    callback_data: "speakers_27",
  },
  {
    group: "Speakers",
    name: "Lauren Luz",
    type: "Giveth",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/karmaticacid",
    url: "",
    callback_data: "speakers_28",
  },
  {
    group: "Speakers",
    name: "Lefteris Karapetsas",
    type: "Rotki",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/LefterisJP",
    url: "",
    callback_data: "speakers_29",
  },
  {
    group: "Speakers",
    name: "Livia deschermayer",
    type: "Commons Stack",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/_liviade",
    url: "",
    callback_data: "speakers_30",
  },
  {
    group: "Speakers",
    name: "Louis Giroux",
    type: "Twoplus",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/albiverse",
    url: "",
    callback_data: "speakers_31",
  },
  {
    group: "Speakers",
    name: "Maliha Abidi",
    type: "Women Rise NFT",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/Maliha_z_Art",
    url: "",
    callback_data: "speakers_32",
  },
  {
    group: "Speakers",
    name: "Marc Johnson",
    type: "Protocol Labs",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/marcjohnson518",
    url: "",
    callback_data: "speakers_33",
  },
  {
    group: "Speakers",
    name: "MArta Poblet",
    type: "BlockScience & RMIT University",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/mpoblet",
    url: "",
    callback_data: "speakers_34",
  },
  {
    group: "Speakers",
    name: "Michelle Thuy",
    type: "Swarm.city",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/MichellePlur",
    url: "",
    callback_data: "speakers_35",
  },
  {
    group: "Speakers",
    name: "Miguel Piedrafita",
    type: "Worldcoin",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/m1guelpf",
    url: "",
    callback_data: "speakers_36",
  },
  {
    group: "Speakers",
    name: "Mona El Isa",
    type: "Avantgarde Finance",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/Mona_El_Isa",
    url: "",
    callback_data: "speakers_37",
  },
  {
    group: "Speakers",
    name: "Naomie Abergel",
    type: "Friday Night Dinner",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/itsmarkjohns",
    url: "",
    callback_data: "speakers_38",
  },
  {
    group: "Speakers",
    name: "Oriol Caba",
    type: "Catalan DAO",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/comercallejero",
    url: "",
    callback_data: "speakers_39",
  },
  {
    group: "Speakers",
    name: "Patrick McCorry",
    type: "",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/stonecoldpat0",
    url: "",
    callback_data: "speakers_40",
  },
  {
    group: "Speakers",
    name: "Sergio Garcia",
    type: "",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/esdotge",
    url: "",
    callback_data: "speakers_41",
  },
  {
    group: "Speakers",
    name: "Shaoku Tien",
    type: "",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/tienshaoku",
    url: "",
    callback_data: "speakers_42",
  },
  {
    group: "Speakers",
    name: "Steph Orpilla",
    type: "",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/0ceans404",
    url: "",
    callback_data: "speakers_43",
  },
  {
    group: "Speakers",
    name: "Sunny Satva",
    type: "",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/sunny4earth",
    url: "",
    callback_data: "speakers_44",
  },
  {
    group: "Speakers",
    name: "Vittorio Rivabella",
    type: "",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/VittoStack",
    url: "",
    callback_data: "speakers_45",
  },
  {
    group: "Speakers",
    name: "Willy Ogorzaly",
    type: "",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/WillyOgo",
    url: "",
    callback_data: "speakers_46",
  },
  {
    group: "Speakers",
    name: "Griff Green",
    type: "",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/thegriff",
    url: "",
    callback_data: "speakers_47",
  },
  {
    group: "Speakers",
    name: "Amir Taaki",
    type: "",
    title: "",
    subtitle:
      '"The society that separates its scholars from its warriors will have its thinking done by cowards and its fighting by fools"  (c)',
    description: "",
    socialUrl: "https://twitter.com/Narodism",
    url: "http://dark.fi/",
    callback_data: "speakers_48",
  },
  {
    group: "Speakers",
    name: "Alona Shevchenko",
    type: "UkraineDAO",
    title: "Co-Founder & Operational Lead of @Ukraine_DAO",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/cryptodrftng",
    url: "https://twitter.com/Ukraine_DAO",
    callback_data: "speakers_49",
  },
  {
    group: "Speakers",
    name: "Rahilla Zafar",
    type: "Altered State Machine",
    title: "Documentary producer of an upcoming NFT 🎥 | Advisor/investor in @flufworld",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/rahilla",
    url: "https://aseelapp.com/",
    callback_data: "speakers_50",
  },
  {
    group: "Speakers",
    name: "Sasha Shilina",
    type: "PhD, Paradigm, Humanode",
    title: "PhD • Researcher • Writer • Philosophy • Arts • http://defiinether.substack.com",
    subtitle: '"I will be speaking about all things #NFTs"',
    description: "",
    socialUrl: "https://twitter.com/sshshln",
    url: "https://defiinether.substack.com/",
    callback_data: "speakers_51",
  },
  {
    group: "Speakers",
    name: "Griff Green",
    type: "Giveth",
    title:
      "In love w/ @CommonsStack, @Givethio, @generalmagicio, @TECmns, @dappnode, @identhree, @0xPolygonHermez, WhiteHatGroup, DECENTRAL (Burn Camp) & @BrightIDProject",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/thegrifft",
    url: "https://giveth.io/",
    callback_data: "speakers_52",
  },
  {
    group: "Speakers",
    name: "Mona El Isa",
    type: "Avantgarde Finance",
    title: "@enzymefinance @avantgardefi @MAMA_global monaelisa.eth",
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/Mona_El_Isa",
    url: "http://www.enzyme.finance/",
    callback_data: "speakers_53",
  },
  {
    group: "Speakers",
    name: "Camila Ramos",
    type: "Edge & Node",
    title: `Developer Relations Engineer 
@edgeandnode @womenbuildweb3 @developer_dao`,
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/camiinthisthang",
    url: "https://www.youtube.com/channel/UCyEnr-lcCUavJzh0uodvG3w/videos",
    callback_data: "speakers_54",
  },
  {
    group: "Speakers",
    name: "Scott Moore",
    type: "Gitcoin",
    title: `pixel art and open source enthusiast; co-founder 
@gitcoin @kernel0x, sometimes @ensdomains
@seedclubhq @pleasrdao; all opinions are gpt3.`,
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/notscottmoore",
    url: "https://scott.mirror.xyz/",
    callback_data: "speakers_55",
  },
  {
    group: "Speakers",
    name: "Nader Dabit",
    type: "The Graph Protocol",
    title: `Developer Relations Engineer
@edgeandnode @graphprotocol | founder
@developer_dao | building web3 | 🧪 @arweaveteam`,
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/dabit3",
    url: "https://www.youtube.com/c/naderdabit",
    callback_data: "speakers_56",
  },
  {
    group: "Speakers",
    name: "Simona Pop",
    type: "Gitcoin & Status.im",
    title: `Balance in all things. DAO Engagement strategy
@gitcoin | @schellingpoint_ ✨ | Community strategy
@ethstatus | @ethBounties | @0xliscon (not ETHLisbon) orga`,
    subtitle: "",
    description: "",
    socialUrl: "https://twitter.com/Sim_Pop",
    url: "https://status.im/",
    callback_data: "speakers_57",
  },
  {
    group: "Speakers",
    name: "Clara Pardo",
    type: "dOrg",
    title: "",
    subtitle: "",
    description: "",
    socialUrl: "",
    url: "",
    callback_data: "speakers_58",
  },
  {
    group: "Speakers",
    name: "Evin McMullen",
    type: "Disco",
    title: "CEO @discoxyz 🪩💊 get discopilled, anon | Making Web3 Fun for Everyone with DIDs + VCs",
    subtitle: "",
    description: "",
    socialUrl: "",
    url: "",
    callback_data: "speakers_59",
  },
];

const partners_keyboard = () => {
  return partners_array.map((partner) => {
    const keyboard = [
      {
        text: partner.name,
        callback_data: partner.callback_data,
      },
    ];
    return keyboard;
  });
};

bot.command("partners", async (ctx) => {
  try {
    updatePartners();
    if (!partners_array.length) {
      ctx.replyWithHTML("Partners list is empty");
      return false;
    }
    ctx.reply("Partners :                                          .", {
      reply_markup: {
        inline_keyboard: partners_keyboard(),
      },
    });
    await ctx.deleteMessage(ctx.update.message.message_id);
  } catch (error) {
    console.error(error);
  }
});

function updatePartners() {
  bot.action(
    partners_array.map((partner) => {
      return partner.callback_data;
    }),
    async (ctx) => {
      const callback_query_data = ctx.update.callback_query.data;
      const partners = partners_array.filter((partner) => {
        return partner.callback_data === callback_query_data;
      });
      partners.map((e) => {
        ctx.replyWithHTML(
          `
  ${e.name}
  ${e.title}
  ${!e.description ? e.subtitle : e.description}
  ${e.url}`,
          Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_partners")]])
        );
      });
      await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
  );
}

updatePartners();

bot.action("back_to_partners", async (ctx) => {
  ctx.reply("Partners :                                          .", {
    reply_markup: {
      inline_keyboard: partners_keyboard(),
    },
  });
  await ctx.deleteMessage(ctx.update.callback_query.message.message_id);
});

let venues = [
  {
    name: "Impact Area",
    description: "In this area, social impact organizations meet, show their work and join the giving economy. ",
    map: "",
    callback_data: "venue_1",
  },
  {
    name: "Coffee Shop",
    description: "This is where you come in to drink coffee. A lot. ",
    map: "",
    callback_data: "venue_2",
  },
  {
    name: "Co-Working Area",
    description:
      "Our coworking area is an inclusive space for all attendees who are looking to create change by working together and innovating as a team.",
    map: "",
    callback_data: "venue_3",
  },
  {
    name: "Wellness Area",
    description:
      "We know that working in tech is stressful. Staying on top of your mental health is essential. Wellness area helping techs change for the better.",
    map: "",
    callback_data: "venue_4",
  },
  {
    name: "Cultural Spaces",
    description:
      "Artists and creators performing and showcasing their art. There's nothing better than freeing our minds through the power of art and creativity.",
    map: "",
    callback_data: "venue_5",
  },
  {
    name: "Food Station",
    description: "Food areas of ETHBarcelona are making the Earth a little greener by going plastic-free.",
    map: "",
    callback_data: "venue_6",
  },
];

const venue_keyboard = venues.map((venue) => {
  const keyboard = [
    {
      text: venue.name,
      callback_data: venue.callback_data,
    },
  ];
  return keyboard;
});

bot.command("venue", async (ctx) => {
  try {
    if (!venues) {
      ctx.replyWithHTML("Venue not yet determined");
      return false;
    }
    ctx.reply("Venue :                                             .", {
      reply_markup: {
        inline_keyboard: venue_keyboard,
      },
    });
    await ctx.deleteMessage(ctx.update.message.message_id);
  } catch (error) {
    console.error(error);
  }
});
bot.action(
  venues.map((venue) => {
    return venue.callback_data;
  }),
  async (ctx) => {
    const callback_query_data = ctx.update.callback_query.data;
    const venue = venues.filter((venue) => {
      return venue.callback_data === callback_query_data;
    });
    venue.map((element) => {
      ctx.replyWithHTML(
        `📢 <b>${element.name}</b>
✏ ${element.description}
${element.map}`,
        Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_venue")]])
      );
    });
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  }
);
bot.action("back_to_venue", async (ctx) => {
  ctx.reply("Venue :                                             .", {
    reply_markup: {
      inline_keyboard: venue_keyboard,
      resize_keyboard: true,
    },
  });
  await ctx.deleteMessage(ctx.update.callback_query.message.message_id);
});

bot.command("location", (ctx) => {
  ctx.replyWithHTML(
    `📌 <b>Centre Convencions Internacional Barcelona (CCIB)</b>

📢 SOON YOU WILL BE ABLE TO LIVE THE SOLARPUNK EXPERIENCE AT Centre Convencions Internacional Barcelona (CCIB 

✏ ETHBarcelona takes place in one of the most beautiful and innovative cities in the world. It’s half-conference, half-culture and music festival, with opportunities to connect with the most forward-thinking individuals in the blockchain industry. 

📍 International Barcelona Convention Center
11-14 Plaça de Willy Brandt
08019 Barcelona
https://goo.gl/maps/2neYyS3cEKYJyiAQ8
`,
    Markup.inlineKeyboard([[Markup.button.callback("📍 View the conference venue", "back_to_venue")]])
  );
});

bot.command("tickets", (ctx) => {
  ctx.replyWithHTML(`<b>Eventbrite</b>
📌 ETHBarcelona is an experience for web3 builders, leaders, thinkers, artists and creators in general that celebrate the values of decentralization, public goods and social impact.
  
💵 General Admission - $499.00

📢 The tickets include a 3-day pass for ETHBarcelona.
Sales end on Jul 6, 2022

To buy a ticket follow the link 👇

https://www.eventbrite.com/e/ethbarcelona-tickets-344163862377?aff=ebdssbdestsearch#listings-root__event-location-map
`)
})

let events_program = [];

const program_by_day_keyboard = [
  [
    {
      text: "6-July",
      callback_data: "program_by_day_6",
    },
    {
      text: "7-July",
      callback_data: "program_by_day_7",
    },
  ],
  [
    {
      text: "8-July",
      callback_data: "program_by_day_8",
    },
    {
      text: "All day",
      callback_data: "program_by_all_day",
    },
  ],
];

const zeroTime = (date) => {
  if (date.toString().length == 1) {
    return `0:${date}`;
  } else {
    return date;
  }
};

bot.command("now", (ctx) => {
  try {
    if (events_program.length <= 0) {
      ctx.replyWithHTML("Porgram list is empty");
      return false;
    }
    const date = new Date();
    const getTime = `${zeroTime(date.getHours())}:${zeroTime(date.getMinutes())}`;
    const getDate = date.getDate();
    const getMonth = date.getMonth();
    const nowEvents = events_program.filter((events) => {
      const startTime = events.time;
      const finishTime = () => {
        const timeArr = startTime.split(":");
        return `${timeArr[0] * 1 + 1}:${timeArr[1]}`;
      };
      if (getTime >= startTime && getTime <= finishTime() && getDate == events.date && getMonth == 6) {
        return events;
      }
    });
    if (nowEvents.length <= 0) {
      ctx.replyWithHTML(`There are currently no active events
Dial this command /program to see when the exhibition starts`);
      return false;
    }
    const events = nowEvents.map((events) => {
      return `
⏳ <b>${events.time}</b>
📎 ${events.title}
🗣 ${events.speaker}
📍 ${events.room}`;
    });
    ctx.replyWithHTML(`Now:
${events.join(`
`)}
  `);
  } catch (error) {
    console.error(error);
  }
});

bot.command("program", (ctx) => {
  if (!events_program) {
    ctx.replyWithHTML("Porgram list is empty");
    return false;
  }
  ctx.reply("Choose a day:", {
    reply_markup: {
      inline_keyboard: program_by_day_keyboard,
    },
  });
});

const sponsors_keyboard = () => {
  return sponsors_array.map((sponsor) => {
    const keyboard = [
      {
        text: sponsor.name,
        callback_data: sponsor.callback_data,
      },
    ];
    return keyboard;
  });
};

bot.command("sponsors", async (ctx) => {
  try {
    updateSponors();
    if (!sponsors_array.length) {
      ctx.replyWithHTML("Sponsor list is empty");
      return false;
    }
    ctx.reply("Sponsors :", {
      reply_markup: {
        inline_keyboard: sponsors_keyboard(),
      },
    });
    await ctx.deleteMessage(ctx.update.message.message_id);
  } catch (error) {
    console.error(error);
  }
});

function updateSponors() {
  bot.action(
    sponsors_array.map((sponsors) => {
      return sponsors.callback_data;
    }),
    async (ctx) => {
      const callback_query_data = ctx.update.callback_query.data;
      const sponsor = sponsors_array.filter((sponsor) => {
        return sponsor.callback_data === callback_query_data;
      });
      sponsor.map((element) => {
        ctx.replyWithHTML(
          `
  🔹 <b>${element.name}</b>
  📎 ${element.title}
  ${element.description || element.subtitleTitle}
  ${element.url}
        `,
          Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_sponsors")]])
        );
      });
      await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    }
  );
}
updateSponors();
bot.action("back_to_sponsors", async (ctx) => {
  ctx.reply("Sponsors :", {
    reply_markup: {
      inline_keyboard: sponsors_keyboard(),
    },
  });
  await ctx.deleteMessage(ctx.update.callback_query.message.message_id);
});

bot.command("speakers", (ctx) => {
  try {
    if (!speakers_array.length) {
      ctx.replyWithHTML("Speaker list is empty");
      return false;
    }
    const getSpeakers = speakers_array.map((speaker) => {
      return `
🔹<b>${speaker.name}</b> | ${speaker.socialUrl !== "" ? `<a href='${speaker.socialUrl}'>Twitter</a>` : ""}
${speaker.title || speaker.subtitle || speaker.type}
${
  speaker.url !== ""
    ? `${speaker.url} 
`
    : speaker.url
}`;
    });
    ctx.replyWithHTML(getSpeakers.join(``), {
      disable_web_page_preview: true,
    });
  } catch (error) {
    console.error(error);
  }
});
bot.action("program_by_day_6", (ctx) => {
  try {
    if (events_program.length <= 0) {
      ctx.reply("Schedule not ready yet");
      return false;
    }
    const getEvents = events_program.filter((events) => {
      if (events.date == 6) {
        return events;
      }
    });

    const events = getEvents.map((events) => {
      if (events.date == 6) {
        return `
⏳ <b>${events.time}</b>
📎 ${events.title}
🗣 ${events.speaker}
📍 ${events.room}`;
      }
    });
    ctx.replyWithHTML(`<b>6-July</b>
    ${events.join(`
`)}
  `);
  } catch (error) {
    console.error(error);
  }
});
bot.action("program_by_day_7", (ctx) => {
  try {
    if (events_program.length <= 0) {
      ctx.reply("Schedule not ready yet");
      return false;
    }
    const getEvents = events_program.filter((events) => {
      if (events.date == 7) {
        return events;
      }
    });
    const events = getEvents.map((events) => {
      return `
⏳ <b>${events.time}</b>
📎 ${events.title}
🗣 ${events.speaker}
📍 ${events.room}`;
    });
    ctx.replyWithHTML(`<b>7-July</b>
    ${events.join(`
`)}
  `);
  } catch (error) {
    console.error(error);
  }
});
bot.action("program_by_day_8", (ctx) => {
  try {
    if (events_program.length <= 0) {
      ctx.reply("Schedule not ready yet");
      return false;
    }
    const getEvents = events_program.filter((events) => {
      if (events.date == 8) {
        return events;
      }
    });

    const events = getEvents.map((events) => {
      return `
⏳ <b>${events.time}</b>
📎 ${events.title}
🗣 ${events.speaker}
📍 ${events.room}`;
    });
    ctx.replyWithHTML(`<b>8-July</b>
    ${events.join(`
`)}
  `);
  } catch (error) {
    console.error(error);
  }
});

bot.action("program_by_all_day", (ctx) => {
  try {
    if (events_program.length <= 0) {
      ctx.reply("Schedule not ready yet");
      return false;
    }
    const getEvents = events_program.map((events) => {
      return `
<b>${events.date}-${events.month}</b>
⏳ <b>${events.time}</b>
📎 ${events.title}
🗣 ${events.speaker}
📍 ${events.room}`;
    });
    ctx.replyWithHTML(`
      ${getEvents.join(`
`)}
    `);
  } catch (error) {
    console.error(error);
  }
});

const add_program = [
  [
    {
      text: "Speaker", // текст на кнопке
      callback_data: "add_speaker", // данные для обработчика событий
    },
    {
      text: "Program",
      callback_data: "add_program",
    },
  ],
  [
    {
      text: "Partner",
      callback_data: "add_partner",
    },
    {
      text: "Sponsors",
      callback_data: "add_sponsor",
    },
  ],
];

bot.command("add", (ctx) => {
  if (ctx.from.username !== "Nasirdin1") {
    ctx.reply("If you want to add something to the program, please contact @Nasirdin1");
    return false;
  }
  ctx.reply("What do you want to add:", {
    reply_markup: {
      inline_keyboard: add_program,
    },
  });
});

bot.action("add_speaker", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  ctx.replyWithHTML(`<b>Send the full name of the speaker</b>
Exapmle: <i>/addspeakername "Andry Jordan"</i>`);
});

const add_callback_data = (arr) => {
  const lasElement = arr[arr.length - 1];
  const lasElementCallBack = lasElement.callback_data.split("_");
  return lasElementCallBack[1] * 1 + 1;
};

bot.action("add_program", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  ctx.replyWithHTML(`<b>What month?</b>
Example: <i>/addeventmonth "July"</i>`);
});

let newPartner = {
  name: "",
  title: "",
  subtitle: "",
  description: "",
  url: "",
  callback_data: "",
};

bot.action("add_partner", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  ctx.replyWithHTML(`<b>Enter partner name *: </b>
Example: <i>/addpartnername "Launch Partners"</i>`);
});

bot.command("addpartnername", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Exapmle:  <i>/addpartnergroup "Giant Cookie"</i>`);
    } else {
      newPartner = {
        name: `${message[1]}`,
        title: `${newPartner.title}`,
        subtitle: `${newPartner.subtitle}`,
        description: `${newPartner.description}`,
        url: `${newPartner.url}`,
        callback_data: `partners_${add_callback_data(partners_array)}`,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter title *:</b>
Example: <i>/addpartnertitle "Join a tribe in Barcelona that cares about freedom"</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addpartnertitle", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
      Example: <i>/addpartnertitle "Join a tribe in Barcelona that cares about freedom"</i>`);
    } else {
      newPartner = {
        name: `${newPartner.name}`,
        title: `${message[1]}`,
        subtitle: `${newPartner.subtitle}`,
        description: `${newPartner.description}`,
        url: `${newPartner.url}`,
        callback_data: `${newPartner.callback_data}`,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter subtitle:</b>
Example: <i>/addpartnersubtitle "We believe technology should free humanity, not enslave it."</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addpartnersubtitle", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Exapmle:  <i>/addpartnersubtitle "We believe technology should free humanity, not enslave it. "</i>`);
      return false;
    } else {
      newPartner = {
        name: `${newPartner.name}`,
        title: `${newPartner.title}`,
        subtitle: `${message[1]}`,
        description: `${newPartner.description}`,
        url: `${newPartner.url}`,
        callback_data: `${newPartner.callback_data}`,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter discription:</b>
Example: <i>/addpartnerdiscription "We believe technology should free humanity, not enslave it."</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addpartnerdiscription", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Exapmle: <i>/addpartnerdiscription "We believe technology should free humanity, not enslave it."</i>`);
      return false;
    }
    if (!newPartner.description && message.length <= 1) {
      ctx.replyWithHTML(`❌Your subtitle is empty although fill in the description.
Exapmle: <i>/addpartnerdiscription "We believe technology should free humanity, not enslave it."</i>`);
    } else {
      newPartner = {
        name: `${newPartner.name}`,
        title: `${newPartner.title}`,
        subtitle: `${newPartner.subtitle}`,
        description: `${message[1]}`,
        url: `${newPartner.url}`,
        callback_data: `${newPartner.callback_data}`,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter url:</b>
Example: <i>/addpartnerurl "https://telegram.org/"</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addpartnerurl", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Exapmle: <i>/addpartnerurl "https://telegram.org/"</i>`);
      return false;
    }
    newPartner = {
      name: `${newPartner.name}`,
      title: `${newPartner.title}`,
      subtitle: `${newPartner.subtitle}`,
      description: `${newPartner.description}`,
      url: `${message[1]}`,
      callback_data: `${newPartner.callback_data}`,
    };
    ctx.replyWithHTML(
      `✅Success!
    
<b>Check the data:</b>

<b>Name</b>: <i>${newPartner.name}</i>

<b>Title</b>: <i>${newPartner.title}</i>

<b>Subtitle</b>: <i>${newPartner.subtitle}</i>

<b>Description</b>: <i>${newPartner.description}</i>

<b>Url</b>: <i>${message[1]}</i>
`,
      Markup.inlineKeyboard([
        [Markup.button.callback("✅ Save", "partnersave"), Markup.button.callback("🗑 Delete", "delete")],
      ])
    );
  } catch (error) {
    console.error(error);
  }
});

bot.action("partnersave", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  partners_array = [...partners_array, newPartner];
  ctx.replyWithHTML(`✅Success!`);
});

let newSponsor = {
  name: "",
  title: "",
  subtitle: "",
  description: "",
  url: "",
  callback_data: "",
};

bot.action("add_sponsor", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  ctx.replyWithHTML(`<b>Enter sponsor name *: </b>
Example: <i>/addsponsorname "Launch Sponsors"</i>`);
});

bot.command("addsponsorname", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Exapmle:  <i>/addsponsorgroup "Giant Cookie"</i>`);
    } else {
      newSponsor = {
        name: `${message[1]}`,
        title: `${newSponsor.title}`,
        subtitle: `${newSponsor.subtitle}`,
        description: `${newSponsor.description}`,
        url: `${newSponsor.url}`,
        callback_data: `sponsors_${add_callback_data(sponsors_array)}`,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter title *:</b>
Example: <i>/addsponsortitle "Join a tribe in Barcelona that cares about freedom"</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addsponsortitle", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
      Example: <i>/addsponsortitle "Join a tribe in Barcelona that cares about freedom"</i>`);
    } else {
      newSponsor = {
        name: `${newSponsor.name}`,
        title: `${message[1]}`,
        subtitle: `${newSponsor.subtitle}`,
        description: `${newSponsor.description}`,
        url: `${newSponsor.url}`,
        callback_data: `${newSponsor.callback_data}`,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter subtitle:</b>
Example: <i>/addsponsorsubtitle "We believe technology should free humanity, not enslave it."</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addsponsorsubtitle", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Exapmle:  <i>/addsponsorsubtitle "We believe technology should free humanity, not enslave it. "</i>`);
      return false;
    } else {
      newSponsor = {
        name: `${newSponsor.name}`,
        title: `${newSponsor.title}`,
        subtitle: `${message[1]}`,
        description: `${newSponsor.description}`,
        url: `${newSponsor.url}`,
        callback_data: `${newSponsor.callback_data}`,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter discription:</b>
Example: <i>/addsponsordiscription "We believe technology should free humanity, not enslave it."</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addsponsordiscription", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Exapmle: <i>/addsponsordiscription "We believe technology should free humanity, not enslave it."</i>`);
      return false;
    }
    if (!newSponsor.description && message.length <= 1) {
      ctx.replyWithHTML(`❌Your subtitle is empty although fill in the description.
Exapmle: <i>/addsponsordiscription "We believe technology should free humanity, not enslave it."</i>`);
    } else {
      newSponsor = {
        name: `${newSponsor.name}`,
        title: `${newSponsor.title}`,
        subtitle: `${newSponsor.subtitle}`,
        description: `${message[1]}`,
        url: `${newSponsor.url}`,
        callback_data: `${newSponsor.callback_data}`,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter url:</b>
Example: <i>/addsponsorurl "https://telegram.org/"</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addsponsorurl", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Exapmle: <i>/addsponsorurl "https://telegram.org/"</i>`);
      return false;
    }
    newSponsor = {
      name: `${newSponsor.name}`,
      title: `${newSponsor.title}`,
      subtitle: `${newSponsor.subtitle}`,
      description: `${newSponsor.description}`,
      url: `${message[1]}`,
      callback_data: `${newSponsor.callback_data}`,
    };
    ctx.replyWithHTML(
      `✅Success!
    
<b>Check the data:</b>

<b>Name</b>: <i>${newSponsor.name}</i>

<b>Title</b>: <i>${newSponsor.title}</i>

<b>Subtitle</b>: <i>${newSponsor.subtitle}</i>

<b>Description</b>: <i>${newSponsor.description}</i>

<b>Url</b>: <i>${message[1]}</i>
`,
      Markup.inlineKeyboard([
        [Markup.button.callback("✅ Save", "sponsorsave"), Markup.button.callback("🗑 Delete", "delete")],
      ])
    );
  } catch (error) {
    console.error(error);
  }
});

bot.action("sponsorsave", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  sponsors_array = [...sponsors_array, newSponsor];
  ctx.replyWithHTML(`✅Success!`);
});

let newSpeaker = {
  name: "",
  title: "",
  description: "",
  url: "",
};

bot.command("addspeakername", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Exapmle: <i>/addspeakername "Andry Jordan"</i>`);
    } else {
      newSpeaker = {
        name: `${message[1]}`,
        title: `${newSpeaker.title}`,
        description: `${newSpeaker.description}`,
        url: `${newSpeaker.url}`,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter title *:</b>
Example: <i>/addspeakertitle "Lead Mobile Application Developer"</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addspeakertitle", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
      Example: <i>/addspeakertitle "Lead Mobile Application Developer"</i>`);
    } else {
      newSpeaker = {
        name: `${newSpeaker.name}`,
        title: `${message[1]}`,
        description: `${newSpeaker.description}`,
        url: `${newSpeaker.url}`,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter discription:</b>
Example: <i>/addspeakerdiscription "I am working on a mobile application for smart home control."</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addspeakerdiscription", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
<i>Example: <i>/addspeakerdiscription "I am working on a mobile application for smart home control."i>`);
    } else {
      newSpeaker = {
        name: `${newSpeaker.name}`,
        title: `${newSpeaker.title}`,
        description: `${message[1]}`,
        url: `${newSpeaker.url}`,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter url:</b>
Example: <i>/addspeakerurl "https://www.linkedin.com/"</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addspeakerurl", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Example: <i>/addspeakerurl "https://www.linkedin.com/"</i>`);
      return false;
    }
    newSpeaker = {
      name: `${newSpeaker.name}`,
      title: `${newSpeaker.title}`,
      description: `${newSpeaker.description}`,
      url: `${message[1]}`,
    };
    ctx.replyWithHTML(
      `✅Success!
    
<b>Check the data:</b>

<b>Name</b>: <i>${newSpeaker.name}</i>

<b>Title</b>: <i>${newSpeaker.title}</i>

<b>Description</b>: <i>${newSpeaker.description}</i>

<b>Url</b>: <i>${message[1]}</i>
`,
      Markup.inlineKeyboard([
        [Markup.button.callback("✅ Save", "speakersave"), Markup.button.callback("🗑 Delete", "delete")],
      ])
    );
  } catch (error) {
    console.error(error);
  }
});
bot.action("speakersave", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  speakers_array = [...speakers_array, newSpeaker];
  ctx.replyWithHTML(`✅Success!`);
});

let newEvent = {
  date: "",
  month: "",
  time: "",
  title: "",
  speaker: "",
  room: "",
  callback_data: "",
};

bot.command("addeventmonth", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Example: <i>/addprogrammonth "July"</i>`);
    } else {
      newEvent = {
        date: `${newEvent.date}`,
        month: message[1],
        time: newEvent.time,
        title: newEvent.title,
        speaker: newEvent.speaker,
        room: newEvent.room,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter date *:</b>
Example: <i>/addeventdate "23"</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addeventdate", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Example: <i>/addeventdate "23"</i>`);
    } else {
      newEvent = {
        date: message[1],
        month: newEvent.month,
        time: newEvent.time,
        title: newEvent.title,
        speaker: newEvent.speaker,
        room: newEvent.room,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter time (GMT+2):</b>
Example: <i>/addeventtime "14:00"</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addeventtime", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Example: <i>/addeventtime "14:00"</i>`);
    } else {
      newEvent = {
        date: newEvent.date,
        month: newEvent.month,
        time: `${message[1]}(GMT+2)`,
        title: newEvent.title,
        speaker: newEvent.speaker,
        room: newEvent.room,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter title:</b>
Example: <i>/addeventtitle "Blockchain"</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addeventtitle", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Example: <i>/addeventtitle "Blockchain"</i>`);
    } else {
      newEvent = {
        date: newEvent.date,
        month: newEvent.month,
        time: newEvent.time,
        title: message[1],
        speaker: newEvent.speaker,
        room: newEvent.room,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter speaker:</b>
Example: <i>/addeventspeaker "Andry Jonrdan"</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addeventspeaker", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message.length < 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Example: <i>/addeventspeaker "Andry Jonrdan"</i>`);
    } else {
      newEvent = {
        date: newEvent.date,
        month: newEvent.month,
        time: newEvent.time,
        title: newEvent.title,
        speaker: message[1],
        room: newEvent.room,
      };
      ctx.replyWithHTML(`✅Success!
<b>Enter room:</b>
Example: <i>/addeventroom "Online"</i>`);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("addeventroom", (ctx) => {
  try {
    const message = ctx.message.text.split('"');
    if (message.length > 3 || message[2] !== "") {
      ctx.replyWithHTML(`❌ Check your spelling and try again
Example: <i>/addeventroom "Online"</i>`);
      return false;
    }
    newEvent = {
      date: newEvent.date,
      month: newEvent.month,
      time: newEvent.time,
      title: newEvent.title,
      speaker: newEvent.speaker,
      room: message[1],
    };
    ctx.replyWithHTML(
      `✅Success!
    
<b>Check the data:</b>

<b>Date</b>: <i>${newEvent.date}-${newEvent.month}</i>

<b>Time</b>: <i>${newEvent.time}</i>

<b>Title</b>: <i>${newEvent.title}</i>

<b>speaker</b>: <i>${newEvent.speaker}</i>

<b>Room</b>: <i>${message[1]}</i>
`,
      Markup.inlineKeyboard([
        [Markup.button.callback("✅ Save", "eventsave"), Markup.button.callback("🗑 Delete", "delete")],
      ])
    );
  } catch (error) {
    console.error(error);
  }
});

bot.action("eventsave", async (ctx) => {
  events_program = [...events_program, newEvent];
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  ctx.replyWithHTML(`✅Success!`);
});

bot.action("delete", async (ctx) => {
  newSpeaker = {
    name: "",
    title: "",
    description: "",
    url: "",
  };
  newEvent = {
    date: "",
    month: "",
    time: "",
    title: "",
    speaker: "",
    room: "",
  };
  newPartner = {
    name: "",
    title: "",
    subtitle: "",
    description: "",
    url: "",
  };
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  ctx.reply("✅ Deleted successfully");
});

bot.launch();

module.exports.handler = async function (event, context) {
  const message = JSON.parse(event.body);
  await bot.handleUpdate(message);
  return {
    statusCode: 200,
    body: "",
  };
};
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
