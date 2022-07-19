const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();
const { readFile, writeFile, unLink } = require("fs").promises;
let users = [];

const COMMANDS = [
  {
    command: "now",
    description: "Current events",
  },
  {
    command: "whatsup",
    description: "Current side events",
  },
  {
    command: "program",
    description: "Show conference program",
  },
  {
    command: "sideevents",
    description: "Side events",
  },
  {
    command: "ticket",
    description: "Buy tickets",
  },
  {
    command: "venue",
    description: "The Venue",
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

const rFile = () => {
  return readFile(`${__dirname}/users.json`, { encoding: "utf8" }).then((text) => JSON.parse(text));
};

const wFile = (users) => {
  writeFile(`${__dirname}/users.json`, JSON.stringify(users), { encoding: "utf8" });
  return false;
};

bot.telegram.setMyCommands(COMMANDS);

bot.start(async (ctx) => {
  const users = await rFile();
  const username = ctx.message.from.username;
  const chatId = ctx.message.chat.id;
  const newUser = {
    chatId: chatId,
    username: username,
  };
  if (!users[0]) {
    const newUsers = [{ userId: 1, ...newUser }];
    wFile(newUsers);
  } else {
    let findUser = false;
    users.filter((user) => {
      if (user.username === username) {
        findUser = true;
      }
    });
    if (!findUser) {
      const newArr = users.map((us) => {
        return us.userId;
      });
      userId = Math.max(...newArr) + 1;

      const newUsers = [...users, { userId, ...newUser }];
      wFile(newUsers);
    }
  }
  ctx.replyWithMarkdown(
    `Hi👋 \n\n\
I'm a chatbot *EthCC* and I'm here to help you spend time on \
conferences with benefit and pleasure.\n\n\

The Ethereum Community Conference (EthCC) is the largest annual European Ethereum event focused on technology and community. Three intense days of conferences, networking and learning. https://ethcc.io/

I will help you keep track of the schedule \n\n\
Use the convenient menu to quickly find the information you need👇\n\n` + getHelp()
  );
});
bot.command("getallusers", async (ctx) => {
  const users = await rFile();
  const res = users.map((user) => {
    return `Id: ${user.userId}
Username: @${user.username}
ChatId: ${user.chatId}`;
  });
  ctx.replyWithHTML(`All users ethparisbot:

${res.join(`

`)}

Total number of users: ${users.length}`);
});
bot.help((ctx) =>
  ctx.replyWithHTML(`Hi, ${ctx.message.from.username}
Here's how I can help:

/now - Current events
/program - Show conference program
/sideevents - Side events
/whatsup - Current side events
/ticket - Buy tickets
/venue - The Venue
/help - Show help/main menu

Contact developers @sashanoxon @Nasirdin1`)
);
bot.command("help", (ctx) => {
  return ctx.replyWithMarkdown(getHelp());
});

bot.command("ticket", (ctx) => {
  ctx.replyWithHTML(`To buy conference tickets follow the link below 👇

  https://ethcc.io/tickets`);
});

let programEvents = {
  july19: [
    {
      date: "July 19th",
      startTime: "10:00",
      endTime: "10:20",
      duation: "20 min",
      venue: "Main Stage",
      eventName: "Opening Ceremony",
      speaker: "EthCC Team - EthCC",
      type: "Talk | Other",
    },
    {
      date: "July 19th",
      startTime: "10:30",
      endTime: "10:55",
      duation: "25 min",
      venue: "Monge",
      eventName: "Should DAO's have Poison Pills and Other Protective Governance Questions",
      speaker: "Hilary Kivitz - Monument Labs",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "10:30",
      endTime: "10:55",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "Sybil Resistance for a more democratic web3",
      speaker: "Kevin Owocki - gitcoin",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 19th",
      startTime: "10:30",
      endTime: "10:55",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "The Soul of a New Machine: Next-Generation Optimistic Rollups with Cannon",
      speaker: "Nicolas Laurent - Optimism",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 19th",
      startTime: "10:30",
      endTime: "10:45",
      duation: "15min",
      venue: "Sorbanne",
      eventName: "How on-chain Forex can help onboarding more users",
      speaker: "Pascal Tallarida - Jarvis Network",
      type: "Talk | UX/UI",
    },
    {
      date: "July 19th",
      startTime: "10:30",
      endTime: "10:55",
      duation: "25 min",
      venue: "Bievre",
      eventName: "Decentralized Video Applications",
      speaker: "Eric Tang - Livepeer",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 19th",
      startTime: "10:30",
      endTime: "10:45",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "NFTs for supply chains: a hot potato protocol to stop losses and increase efficiency",
      speaker: "Quentin de Beauchesne - Ownest",
      type: "Talk | Etherprise",
    },
    {
      date: "July 19th",
      startTime: "10:45",
      endTime: "11:15",
      duation: "30 min",
      venue: "EthVc Room",
      eventName: "What entrepreneurs should do during a bear market",
      speaker: "Paul Veradittakit - Pantera",
      type: "Talk | EthVc",
    },
    {
      date: "July 19th",
      startTime: "10:50",
      endTime: "11:15",
      duation: "25 min",
      venue: "Sorbonne",
      eventName: "Self-regulate: Don't give governments a chance.",
      speaker: "Aleix Cerdà Cucó - Kleros",
      type: "Talk | UX/UI",
    },
    {
      date: "July 19th",
      startTime: "10:50",
      endTime: "11:05",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Self-sovereign business operations",
      speaker: "Francesco Renzi - Superfluid",
      type: "Talk | Etherprise",
    },
    {
      date: "July 19th",
      startTime: "11:00",
      endTime: "11:15",
      duation: "15 min",
      venue: "Monge",
      eventName: "Decentralized Governance at Scale",
      speaker: "Nimrod Talmon - Ben-Gurion University",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "11:00",
      endTime: "11:15",
      duation: "15 min",
      venue: "Bievre",
      eventName: "Building for the decentralized future using blockchain",
      speaker: "Chris Tse - Cardstack Foundation",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 19th",
      startTime: "11:00",
      endTime: "11:25",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "Infura",
      speaker: "Michael Wuehler - Infura",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 19th",
      startTime: "11:10",
      endTime: "11:25",
      duation: "15",
      venue: "Pontoise",
      eventName: "Talking NFT: how creators use have NFTs to have better conversations",
      speaker: "Luc Jodet - XAnge",
      type: "Talk | Etherprise",
    },
    {
      date: "July 19th",
      startTime: "11:20",
      endTime: "11:35",
      duation: "15 min",
      venue: "Monge",
      eventName: "Learning my way into web3 community building",
      speaker: "Reka .eth - guild.xyz",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "11:20",
      endTime: "11:35",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Music is the key to onboard the next million of crypto users",
      speaker: "William Bailey - Bolero Music",
      type: "Talk | UX/UI",
    },
    {
      date: "July 19th",
      startTime: "11:20",
      endTime: "11:45",
      duation: "25 min",
      venue: "Bievre",
      eventName: "Evolution of Web3 and Why Web3",
      speaker: "Richa Joshi - Ethereum Push Notifiaction Service (EPNS)",
      type: "Talk | Web3.0",
    },
    {
      date: "July 19th",
      startTime: "11:30",
      endTime: "11:55",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "OpenZeppelin Contract: Past and future roadmap",
      speaker: "Hadrien Croubois - OpenZeppelin",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 19th",
      startTime: "11:30",
      endTime: "11:55",
      duation: "25 min",
      venue: "Pontoise",
      eventName: "Account Model meets UTXO: a new paradigm for secure dApps & DeFi",
      speaker: "Cheng Wang - Alephium",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 19th",
      startTime: "11:30",
      endTime: "11:45",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "From Layer 2 to Layer 3",
      speaker: "Pierre Duperrin - Sorare",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 19th",
      startTime: "11:30",
      endTime: "12:00",
      duation: "30 min",
      venue: "EthVc Room",
      eventName: "Lessons from web2 to be implemented in web3, with a specific focus on hiring and go-to-market",
      speaker: "Bartosz Jakubowski - Alven",
      type: "Talk | EthVc",
    },
    {
      date: "July 19th",
      startTime: "11:40",
      endTime: "11:55",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "The Future of Web3UX - a paradigm shift for a better collaboration.",
      speaker: "Sasha Tanase - Threshold Network/tBTC",
      type: "Talk | UX/UI",
    },
    {
      date: "July 19th",
      startTime: "11:40",
      endTime: "12:05",
      duation: "25 min",
      venue: "Monge",
      eventName: "Moonbeam: Combining Ethereum-Compatibility and Polkadot’s Interoperability Across Ecosystems",
      speaker: "Derek Yoo - Moonbeam/PureStake",
      type: "Talk | Etherprise",
    },
    {
      date: "July 19th",
      startTime: "11:50",
      endTime: "12:15",
      duation: "25 min",
      venue: "Bievre",
      eventName: "Personal Data Backpacks for the Metaverse",
      speaker: "Evin McMullen - Disco",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 19th",
      startTime: "11:50",
      endTime: "12:05",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "DAO governance in the path to systemic change",
      speaker: "Cassidy Daly - Centrifuge",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "12:00",
      endTime: "12:15",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Blockchain Security/Privacy: dont keep it too simple!",
      speaker: "Fatemeh Shirazi - Anoma",
      type: "Talk | Secuity & Privacy",
    },
    {
      date: "July 19th",
      startTime: "12:00",
      endTime: "12:25",
      duation: "25 min",
      venue: "Sorbonne",
      eventName: "An architecture for User-Defined markets",
      speaker: "Awa Sun Yin - Anoma",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 19th",
      startTime: "12:00",
      endTime: "12:30",
      duation: "30 min",
      venue: "EthVC Room",
      eventName: "Fireside interview - Temasek’s crypto journey: real institutional adoption",
      speaker: "Antony Lewis - Temasek",
      type: "Talk | EthVC",
    },
    {
      date: "July 19th",
      startTime: "12:10",
      endTime: "12:25",
      duation: "15 min",
      venue: "Monge",
      eventName: "Crypto adoption, social media, and influencers",
      speaker: "Sacha Ghebali - The TIE",
      type: "Talk | Etherprise",
    },
    {
      date: "July 19th",
      startTime: "12:20",
      endTime: "12:35",
      duation: "15 min",
      venue: "Bievre",
      eventName: 'Unlocking new "x to earn" use cases with Data Unions',
      speaker: "Marlene Ronstedt - Data Union DAO",
      type: "Talk Web 3.0",
    },
    {
      date: "July 19th",
      startTime: "12:30",
      endTime: "12:55",
      duation: "25 min",
      venue: "Sorbonne",
      eventName: "AltLayer: Elastic and Versatile Scaling for Web3",
      speaker: "Yaoqi Jia - AltLayer",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 19th",
      startTime: "12:30",
      endTime: "12:45",
      duation: "15 min",
      venue: "Monge",
      eventName: "Distributed Identity for Patients in the Pharmaceutical industry",
      speaker: "Ali Habbabeh - Roche",
      type: "Talk | Etherprise",
    },
    {
      date: "July 19th",
      startTime: "12:50",
      endTime: "13:05",
      duation: "15 min",
      venue: "Monge",
      eventName: "Where’s the adoption? How to integrate real world assets into the crypto realm.",
      speaker: "Ella Cullen - Minespider",
      type: "Talk | Etherprise",
    },
    {
      date: "July 19th",
      startTime: "13:00",
      endTime: "13:25",
      duation: "15 min",
      venue: "Sainr-Germain",
      eventName: "Navigating the open metaverse",
      speaker: "Jonathan Brun - Lighthouse",
      type: "Talk | Gaming",
    },
    {
      date: "July 19th",
      startTime: "13:10",
      endTime: "13:35",
      duation: "25 min",
      venue: "Monge",
      eventName: "$2 Billion Liquidated: The Importance of robust Oracles for the next inflow of institutional players",
      speaker: "Alexander Coenegrachts - Kaiko",
      type: "Talk | Etherprise",
    },
    {
      date: "July 19th",
      startTime: "13:20",
      endTime: "13:35",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Connecting web2 with web3: Verifying private off chain data sources",
      speaker: "Adi Ben-Ari - Applied Blockchain",
      type: "Talk | Security",
    },
    {
      date: "July 19th",
      startTime: "13:30",
      endTime: "13:45",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Tackling NFT Metadata extreme heterogeneity",
      speaker: "Jerome de Tychey - Cometh - Ethereum-France",
      type: "Talk | Gaming",
    },
    {
      date: "July 19th",
      startTime: "13:30",
      endTime: "14:00",
      duation: "30 min",
      venue: "EthVC Room",
      eventName: "Underwriting in DeFi: Study of Current Practices",
      speaker: "Will Nuelle - Galaxy Digital",
      type: "Talk | EthVC",
    },
    {
      date: "July 19th",
      startTime: "13:35",
      endTime: "13:50",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "Biomimicry in DAOs",
      speaker: "Simona Pop - Status/Gitcoin",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "13:40",
      endTime: "14:05",
      duation: "@5 min",
      venue: "Pontoise",
      eventName: "Going mainstream -- is data sovereignty still a part of web3?",
      speaker: "Henri Stern - Privy",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 19th",
      startTime: "13:40",
      endTime: "14:05",
      duation: "25 min",
      venue: "Bievre",
      eventName: "Towards Support of Ethereum Equivalence on Different L1/L2 Blockchain Ecosystems",
      speaker: "Neo Yiu - Klaytn",
      type: "Talk Web 3.0",
    },
    {
      date: "July 19th",
      startTime: "13:50",
      endTime: "14:15",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "Building games in the Cronos ecosystem: dev tools and services",
      speaker: "Ken Timsit - Cronos",
      type: "Talk | Gaming",
    },
    {
      date: "July 19th",
      startTime: "13:55",
      endTime: "14:20",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "Regulation of DeFi Across the Globe",
      speaker: "Rebecca Rettig - Aave",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "14:00",
      endTime: "14:15",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "DAO Vulnerabilities & Resilience",
      speaker: "Kelsie Nabben - RMIT University / BlockScience",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "14:00",
      endTime: "14:30",
      duation: "30 min",
      venue: "EthVC Room",
      eventName: "Distilling 50 years of hard won lessons at Sequoia Capital, including how to survive market cycles",
      speaker: "Shaun Maguire & Pat Grady - Sequoia",
      type: "Talk | EthVC",
    },
    {
      date: "July 19th",
      startTime: "14:10",
      endTime: "14:35",
      duation: "25 min",
      venue: "Pontoise",
      eventName: "Why account abstraction on L2 is critical for mass adoption",
      speaker: "Julien Niset - Argent",
      type: "Talk | UX/UI",
    },
    {
      date: "July 19th",
      startTime: "14:10",
      endTime: "14:35",
      duation: "25 min",
      venue: "Bievre",
      eventName: "Security monitoring for on-chain attacks",
      speaker: "Christian Seifert - Forta Protocol",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 19th",
      startTime: "14:20",
      endTime: "14:45",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "Designing a Blockchain Ecosystem for Web2 Games",
      speaker: "Sam Seo - Klaytn",
      type: "Talk | Garming",
    },
    {
      date: "July 19th",
      startTime: "14:20",
      endTime: "14:35",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "You don't know NFTs (really!)",
      speaker: "Kevin Lambert - Ledger",
      type: "Talk | NFTs",
    },
    {
      date: "July 19th",
      startTime: "14:25",
      endTime: "14:40",
      duation: "15 min",
      venue: "Monge",
      eventName: "Rapid DApp Development with useDApp",
      speaker: "Justyna Broniszewska - TrueFi",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 19th",
      startTime: "14:25",
      endTime: "14:50",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "Beyond Market and State",
      speaker: "Griff Green - Giveth, Commons Stack & TEC",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 19th",
      startTime: "14:40",
      endTime: "15:05",
      duation: "25 min",
      venue: "Pontoise",
      eventName:
        "Crypto Couture: IRL Fashion and Other Physical Objects as a Blockchain Interface to Increase Adoption",
      speaker: "Ooli de Villele - Ooliverse",
      type: "Talk | UX/UI",
    },
    {
      date: "July 19th",
      startTime: "14:40",
      endTime: "14:55",
      duation: "15 min",
      venue: "Sorbonne",
      eventName:
        "Operations, Finance, & Accounting in Crypto - a crypto startup COO on how to run your organization effectively",
      speaker: "Ryan Lee - Propeller",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "14:40",
      endTime: "15:05",
      duation: "25 min",
      venue: "Bievre",
      eventName: "The Hardware for the Next Generation of the Internet",
      speaker: "Sam Cassatt - Aligned",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 19th",
      startTime: "14:45",
      endTime: "15:00",
      duation: "15 min",
      venue: "Monge",
      eventName: "Compatibility between TradFi and DeFi.",
      speaker: "Sylvain Prigent - Societe Generale - Forge",
      type: "Talk | Decentralised",
    },
    {
      date: "July 19th",
      startTime: "14:50",
      endTime: "15:15",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "How will composability disrupt Wall Street?",
      speaker: "Hsuan-Ting Chu - Furucombo",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 19th",
      startTime: "14:55",
      endTime: "15:20",
      duation: "25 min",
      venue: "Main Satge",
      eventName: "Diligence's Ground-breaking Transformation (placeholder title for big announcement)",
      speaker: "Gonçalo Sá - Diligence",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 19th",
      startTime: "15:00",
      endTime: "15:15",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Challenges in decentralized collaboration",
      speaker: "Ivan Fartunov - Aragon",
      type: "Talk | Govermance",
    },
    {
      date: "July 19th",
      startTime: "15:05",
      endTime: "15:20",
      duation: "15 min",
      venue: "Monge",
      eventName: "DeFi Derivatives Infrastructure",
      speaker: "Laura Vidiella - LedgerPrime",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 19th",
      startTime: "15:10",
      endTime: "16:35",
      duation: "15 min",
      venue: "Bievre",
      eventName: "Distributed validator technology & eth merge",
      speaker: "Alon Muroch - ssv.network",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 19th",
      startTime: "15:10",
      endTime: "15:25",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "What blocks people from entering DeFi ?",
      speaker: "Gauthier Vila - Ondefy",
      type: "Talk | UX/UI",
    },
    {
      date: "July 19th",
      startTime: "15:20",
      endTime: "15:35",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Reimagining Governance Primitives",
      speaker: "Evgeny Gaevoy - Wintermute",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "15:20",
      endTime: "15:35",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Designing DAOs for Ecosystem Governance",
      speaker: "Illia Polosukhin - Near Protocol",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "15:25",
      endTime: "15:40",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "The Security Trilemma",
      speaker: "Mudit Gupta - Polygon",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 19th",
      startTime: "15:25",
      endTime: "15:40",
      duation: "15 min",
      venue: "Monge",
      eventName: "Defi in LatAm: a ladder out of Emerging Status",
      speaker: "Mila Rioja - Celo",
      type: "Talk | Decentralised",
    },
    {
      date: "July 19th",
      startTime: "15:30",
      endTime: "15:45",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Better UX for non custodial multi-chain wallet",
      speaker: "Vidal Chriqui - Get Verso",
      type: "Talk | UX/UI",
    },
    {
      date: "July 19th",
      startTime: "15:40",
      endTime: "16:35",
      duation: "55 min",
      venue: "Bievre",
      eventName: "Optimism Bedrock: Upgraded optimistic rollups architecture",
      speaker: "Liam Horne & Joshua Gutow - Optimism",
      type: "Workshop | Ethereum Layers",
    },
    {
      date: "July 19th",
      startTime: "15:40",
      endTime: "15:55",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Governance Theory and Practice",
      speaker: "Doo Wan Nam - StableNode",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "15:45",
      endTime: "16:00",
      duation: "15 min",
      venue: "Monge",
      eventName: "Impermanent Loss - Angel of Death for AMMs",
      speaker: "Cyrille Pastour - Swaap.Finance",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 19th",
      startTime: "15:45",
      endTime: "16:00",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "Building a P2P DEX as a DAO",
      speaker: "Don Mosites - AirSwap",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "15:50",
      endTime: "16:15",
      duation: "25 min",
      venue: "Pontoise",
      eventName: "The Next Advancement in Cross-Chain UX",
      speaker: "Jaz Gulati - Catalog (A Ren Labs Company)",
      type: "Talk | UX/UI",
    },
    {
      date: "July 19th",
      startTime: "15:50",
      endTime: "16:05",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Metaverse does not need to be 3D: the value of on-chain gaming",
      speaker: "Ronan Sandford - Etherplay",
      type: "Talk | Gaming",
    },
    {
      date: "July 19th",
      startTime: "16:00",
      endTime: "16:15",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "First principles for DAO design",
      speaker: "Andrej Berlin - Deep Work",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "16:05",
      endTime: "16:30",
      duation: "25 min",
      venue: "Monge",
      eventName: "Morpho, the new gateway to decentralized lending",
      speaker: "Paul Frambot - Morpho",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 19th",
      startTime: "16:20",
      endTime: "16:45",
      duation: "25 min",
      venue: "Pontoise",
      eventName: "Ethereum staking for the masses",
      speaker: "stefaan ponnet - avado ag",
      type: "Talk | UX/UI",
    },
    {
      date: "July 19th",
      startTime: "16:35",
      endTime: "17:00",
      duation: "25 min",
      venue: "Main Satge",
      eventName: "Crossing the Chasm: Introduction to Cross-Chain DeFi",
      speaker: "Sebastien Couture - Epicenter Podcast / Interop Ventures",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 19th",
      startTime: "16:40",
      endTime: "17:05",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "Building DAO frameworks",
      speaker: "Gustav Arentoft - StableNode & 1inch",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "16:50",
      endTime: "17:15",
      duation: "25 min",
      venue: "Sorbonne",
      eventName: "Celestiums: Scaling Ethereum Rollups by using Celestia for Data Availability",
      speaker: "Evan Forbes - Celestia",
      type: "Talk Ethereum Layers",
    },
    {
      date: "July 19th",
      startTime: "17:05",
      endTime: "17:20",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "The Future is Multichain",
      speaker: "Jack O'Holleran - SKALE Labs",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 19th",
      startTime: "17:05",
      endTime: "17:30",
      duation: "15 min",
      venue: "Monge",
      eventName: "What regulatory compromises?",
      speaker: "Xavier Lavayssiere - haciendas.xyz",
      type: "Talk | Decenrtalised Finance",
    },
    {
      date: "July 19th",
      startTime: "17:10",
      endTime: "18:05",
      duation: "55 min",
      venue: "Bievre",
      eventName: "Building Minimal DeFi Applications",
      speaker: "Patrick Collins - Chainlink Labs",
      type: "Workshop | Developer Tools",
    },
    {
      date: "July 19th",
      startTime: "17:10",
      endTime: "17:35",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "Make your DAO sticky with Mochi!",
      speaker: "Gabriel Tumlos - Mochi!",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "17:20",
      endTime: "17:45",
      duation: "25 min",
      venue: "Pontoise",
      eventName: "The Gap Between DeFi and The Real World",
      speaker: "Fangting Liu - Coinbase",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 19th",
      startTime: "17:20",
      endTime: "17:35",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Multi-chain strategy for NFTs",
      speaker: "Nass Diba - Rarible",
      type: "Talk | NFTs",
    },
    {
      date: "July 19th",
      startTime: "17:25",
      endTime: "17:50",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "Foundry, a portable, fast and modular toolkit for Ethereum application development, written in Rust",
      speaker: "Georgios Konstantopoulos - Paradigm",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 19th",
      startTime: "17:35",
      endTime: "17:50",
      duation: "15 min",
      venue: "Monge",
      eventName: "DeFi 3.0 and Cega: Exotic Derivatives in DeFi",
      speaker: "Arisa Toyosaki - cega",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 19th",
      startTime: "17:40",
      endTime: "17:55",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "The Credential-Powered DAO and the Future of Work",
      speaker: "Alejandro Rios - Krebit",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "17:50",
      endTime: "18:05",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Beamer - an optimistic bridge",
      speaker: "Frederik Lührs - Beamer (Bridge)",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 19th",
      startTime: "17:50",
      endTime: "18:15",
      duation: "25 min",
      venue: "Pontoise",
      eventName: "Community Tooling",
      speaker: "Tangle 0x - LayerZero/Sushi",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 19th",
      startTime: "17:55",
      endTime: "18:20",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "Gnosis Chain: Extending Ethereum",
      speaker: "Friederike Ernst - Gnosis/ Epicenter",
      type: "Talk | Web  3.0",
    },
    {
      date: "July 19th",
      startTime: "17:55",
      endTime: "18:10",
      duation: "15 min",
      venue: "Monge",
      eventName:
        "Analysis of 1 year of CoWs, practical impact of batch auctions for MEV protection and price improvements",
      speaker: "Felix Leupold - CoW Protocol CowSwap",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 19th",
      startTime: "18:00",
      endTime: "18:25",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "DAO to DAO Governance",
      speaker: "Puncar - Gitcoin / Index Coop / Bankless Consulting",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "18:10",
      endTime: "19:05",
      duation: "55 min",
      venue: "Bievre",
      eventName: "The problem with Cross-Chain Governance",
      speaker: "Odysseas.eth - Radicle",
      type: "Workshop | Developer Tools",
    },
    {
      date: "July 19th",
      startTime: "18:15",
      endTime: "18:30",
      duation: "15 min",
      venue: "Monge",
      eventName: "Saving Gas without Rollups (The Easy Way)",
      speaker: "Green - Kleros",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 19th",
      startTime: "18:25",
      endTime: "18:50",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "Your Digital Identity Travels With You in Web3",
      speaker: "Sandy Carter - Unstoppable Domains",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 19th",
      startTime: "18:25",
      endTime: "18:50",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "How a below average programmer found his way into searching",
      speaker: "Kendrick Tan - DFX",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 19th",
      startTime: "18:30",
      endTime: "18:45",
      duation: "15 main",
      venue: "Saint-Germain",
      eventName: "Polygon-Hermez zkEVM BridgeL1-L2",
      speaker: "Jesus Ligero - polygon-hermez",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 19th",
      startTime: "18:30",
      endTime: "18:45",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Building DevDAOs with Radicle",
      speaker: "Abbey Titcomb - Radicle",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "16:50",
      endTime: "19:05",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Oracle of Ethereum: adding native Oracles to EVM",
      speaker: "Konstantin Kladko - SKALE Labs",
      type: "Talk Ethereum Layers",
    },
    {
      date: "July 19th",
      startTime: "18:50",
      endTime: "19:15",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "the (legal) laws of form",
      speaker: "Fatemeh Fannizadeh - legal advisor",
      type: "Talk | Governance",
    },
    {
      date: "July 19th",
      startTime: "19:05",
      endTime: "19:20",
      duation: "15 min",
      venue: "Monge",
      eventName: "Web3 and the Future of Banking",
      speaker: "Peter Grosskopf - Unstoppable Finance",
      type: "Talk | Web 3.0",
    },
  ],
  july20: [
    {
      date: "July 20th",
      startTime: "09:30",
      endTime: "10:25",
      duation: "55 min",
      venue: "Bievre",
      eventName: "Secure DeFi smart contract development on Ethereum",
      speaker: "Anton Permenev & Ioannis Sachinoglou - ChainSecurity",
      type: "Workshop | Security & Privacy",
    },
    {
      date: "July 20th",
      startTime: "09:30",
      endTime: "09:45",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Going from Know-Your-Customer to Know-Your-Neighbor",
      speaker: "Juan Diosdado - SolidarityCard",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 20th",
      startTime: "09:30",
      endTime: "09:45",
      duation: "15 min",
      venue: "Monge",
      eventName: "The Future of Cross-Chain Protocols or The Next Advancements in Cross-Chain Protocols",
      speaker: "Maximilan Roszko - Ren",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 20th",
      startTime: "09:30",
      endTime: "09:55",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "Navigating through the Open Metaverse together",
      speaker: "Nicolas Weber - MetaGameHub DAO",
      type: "Talk | Gaming",
    },
    {
      date: "July 20th",
      startTime: "09:40",
      endTime: "09:55",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "How to use DeFi to facilitate the fiat funding of crypto companies",
      speaker: "Victor Charpiat - Kolat",
      type: "Talk | Enterprise",
    },
    {
      date: "July 20th",
      startTime: "09:40",
      endTime: "09:55",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "Pushing Humanity Forward with a Better Web3",
      speaker: "Juan Benet - Protocol Labs",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 20th",
      startTime: "09:50",
      endTime: "10:15",
      duation: "25 min",
      venue: "Pontoise",
      eventName: "Reimagining DeFi for Good",
      speaker: "Xochitl Cazador - Celo Foundation",
      type: "Talk |  Blockchain for good",
    },
    {
      date: "July 20th",
      startTime: "09:50",
      endTime: "10:05",
      duation: "15 min",
      venue: "Monge",
      eventName: "Fixed rates in DeFi",
      speaker: "Kamel Aouane - Contango",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 20th",
      startTime: "10:00",
      endTime: "10:25",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "OpenVino + Kleros: BioDigital Certification",
      speaker: "Mike Tango Bravo - OpenVino",
      type: "Talk | Enterprise",
    },
    {
      date: "July 20th",
      startTime: "10:00",
      endTime: "10:15",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "Inclusivity over Exclusivity",
      speaker: "Phil Lucsok - ChainSafe Systems",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "10:00",
      endTime: " 10:25",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "Challenges & best practices for web3 gaming",
      speaker: "Aliaksandr Hudzilin - Human Guild",
      type: "Talk | Gaming",
    },
    {
      date: "July 20th",
      startTime: "10:10",
      endTime: "10:25",
      duation: "15 min",
      venue: "Monge",
      eventName: "State tree - Hermez zkEVM",
      speaker: "Carlos Matallana Espinar - Polygon Hermez",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 20th",
      startTime: "10:20",
      endTime: "10:45",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "CAST, The framework to open capital markets to digital assets",
      speaker: "Stéphane Blemus - SOCIETE GENERALE-FORGE",
      type: "Talk | Governance",
    },
    {
      date: "July 20th",
      startTime: "10:20",
      endTime: "10:45",
      duation: "25 min",
      venue: "Pontoise",
      eventName: "Tokenized Natural Capital and Regenerative Finance",
      speaker: "Slobodan Sudaric - cLabs",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 20th",
      startTime: "10:30",
      endTime: "10:55",
      duation: "25 min",
      venue: "Sorbonne",
      eventName: "Blockchains That Evolve with Your Business",
      speaker: "Gautam Dhameja - Polkadot / Parity",
      type: "Talk | Enterprise",
    },
    {
      date: "July 20th",
      startTime: "10:30",
      endTime: "10:45",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Building Web3 Gaming Tools for Web2 Natives",
      speaker: "Liesl Eichholz - ChainSafe",
      type: "Talk | Gaming",
    },
    {
      date: "July 20th",
      startTime: "10:30",
      endTime: "11:25",
      duation: "55 min",
      venue: "Bievre",
      eventName: "Gate your app without doxing your users: ZK Attestations",
      speaker: "Leo Sayous - Sismo",
      type: "Workshop | Developer Tools",
    },
    {
      date: "July 20th",
      startTime: "10:40",
      endTime: "11:05",
      duation: "25 min",
      venue: "Monge",
      eventName: "From LIBOR to IPOR: TradFi to DeFi credit market evolution",
      speaker: "Darren Camas - IPOR Labs",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 20th",
      startTime: "10:50",
      endTime: "11:05",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "How Big Brands Are Using NFTs",
      speaker: "Camilla McFarland - Mojito",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "10:50",
      endTime: "11:15",
      duation: "25 min",
      venue: "Pontoise",
      eventName:
        "Crossing the Political Chasm: Understanding the perceived ideologies of Web3 and Crypto and their impact on adoption.",
      speaker: "Brian Norton - MyEtherWallet",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 20th",
      startTime: "11:50",
      endTime: "11:15",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "Making sense of rollup economics",
      speaker: "Barnabé Monnot - Ethereum Foundation",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 20th",
      startTime: "11:00",
      endTime: "11:15",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Bridging multichain real-time data and centralised applications to push Web 3.0. adoption",
      speaker: "Marco De Rossi - HAL",
      type: "Talk | Enterprise",
    },
    {
      date: "July 20th",
      startTime: "11:10",
      endTime: "11:25",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "State of ENS",
      speaker: "Makoto Inoue - ENS",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "11:10",
      endTime: "11:35",
      duation: "25 min",
      venue: "Monge",
      eventName: "Ethereum L2 + multi-chain = the next step in DeFi UX",
      speaker: "Daniel Yanev - DeversiFi",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 20th",
      startTime: "11:20",
      endTime: "11:35",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Bots + Exchanges: A Perfect Storm",
      speaker: "Michael Feng - Hummingbot",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 20th",
      startTime: "11:20",
      endTime: "11:45",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "State of the Art of Ethereum Smart Contract Fuzzing in 2022",
      speaker: "Patrick Ventuzelo - FuzzingLabs",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 20th",
      startTime: "11:20",
      endTime: "11:35",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Building Regenerative Culture",
      speaker: "Beth McCarthy - Toucan",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 20th",
      startTime: "11:30",
      endTime: "11:45",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Using NFTs as DeFi collateral",
      speaker: "Robert Masiello - Arcade.xyz",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "11:30",
      endTime: "12:25",
      duation: "55 min",
      venue: "Bievre",
      eventName: "Native Interoperability on Moonbeam Through XCM",
      speaker: "Alberto Viera - Moonbeam",
      type: "Workshop | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "11:40",
      endTime: "12:05",
      duation: "25 min",
      venue: "Monge",
      eventName: "Stark Recursion",
      speaker: "Avihu Levy - StarkWare",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 20th",
      startTime: "11:40",
      endTime: "12:05",
      duation: "25 min",
      venue: "Pontoise",
      eventName: "Sustainability as a Crypto Superpower",
      speaker: "Alan Ransil - Filecoin Green - Protocol Labs",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 20th",
      startTime: "11:45",
      endTime: "12:10",
      duation: "25 min",
      venue: "Sorbonne",
      eventName: 'Exploring "Legal Wrappers" for DAOs',
      speaker: "Rodrigo Seira - Paradigm",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 20th",
      startTime: "11:50",
      endTime: "12:05",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "AI applications for Dynamic NFTS",
      speaker: "Audrey Akwenye - NanuPanda Labs",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "11:50",
      endTime: "12:05",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "The Gwei Forward for DeFi This Bear Market",
      speaker: "DeFi Dad - 4RC - Fourth Revolution Capital",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 20th",
      startTime: "12:10",
      endTime: "12:35",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "Building Community-First NFT Exchanges with the NFT Swap SDK",
      speaker: "Jessica Lin - 0x Labs",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "12:10 pm",
      endTime: "12:25",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Impact-driven social tokens",
      speaker: "Kristina Tauchmannova - Socialstack",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 20th",
      startTime: "12:10",
      endTime: "12:35",
      duation: "25 min",
      venue: "Monge",
      eventName: "Trustless bridges in the Ethereum Beaconverse",
      speaker: "Kirill Fedoseev - Gnosis Chain",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 20th",
      startTime: "12:15",
      endTime: "12:30",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Testing smart contracts with Waffle in 2022",
      speaker: "Bartłomiej Rutkowski - TrueFi / TrustToken",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 20th",
      startTime: "12:30",
      endTime: "12:45",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Blockchain development; a path to self sustainability in Africa",
      speaker: "Ayodeji Awosika - Web3bridge",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 20th",
      startTime: "12:35",
      endTime: "12:50",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Re-imagining the DevEx/Ux of Wallets & Dapps",
      speaker: "Gregory Markou - ChainSafe",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 20th",
      startTime: "12:40",
      endTime: "12:55",
      duation: "15 min",
      venue: "Monge",
      eventName: "Key IP aspects around NFT creation and ownership",
      speaker: "Yitzy Hammer - DLT LAW: Blockchain Legal Advisory Firm",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "12:50",
      endTime: "13:15",
      duation: "25 min",
      venue: "Pontoise",
      eventName: "Blockchain For Good",
      speaker: "Raj Kapoor - India Blockchain Alliance",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 20th",
      startTime: "12:55",
      endTime: "13:20",
      duation: "25 min",
      venue: "Sorbonne",
      eventName: "Building the Metaverse using modern Web 3.0 tools",
      speaker: "Ivan Liljeqvist - Moralis",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 20th",
      startTime: "13:00",
      endTime: "13:25",
      duation: "25 min",
      venue: "Monge",
      eventName: "Looking Into Your Neighbor’s Wallet: On-chain Ethics",
      speaker: "Isaac Zu - Nansen",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 20th",
      startTime: "13:10",
      endTime: "13:35",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "Polygon Hermez zkEVM testnet",
      speaker: "Jordi Baylina - Polygon Hermez",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 20th",
      startTime: "13:30",
      endTime: "14:25",
      duation: "55 min",
      venue: "Bievre",
      eventName: "🛠 Building Decentralized Apps",
      speaker: "Austin Griffith - EF",
      type: "Workshop | Developer Tools",
    },
    {
      date: "July 20th",
      startTime: "13:40",
      endTime: "14:05",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "The Cryptopunk Ethos and the Future of Freedom",
      speaker: "Dr. Steven Waterhouse - Orchid",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "13:40",
      endTime: "14:05",
      duation: "25 min",
      venue: "Sainr-Germain",
      eventName: "Technical and operational challenges of NFTs for mass adoption on the non-crypto community",
      speaker: "Daniel Heyman - Palm NFT Studio",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "14:10",
      endTime: "14:25",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "Retroactive Public Goods Funding - One Year In",
      speaker: "Karl Floersch - Optimism",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 20th",
      startTime: "14:10",
      endTime: "14:25",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Can mods do something? Decentralized content moderation for Web 3",
      speaker: "Shotaro Granzier-Nakajima - Kleros",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "14:20",
      endTime: "14:45",
      duation: "25 min",
      venue: "Monge",
      eventName: "Private smart contracts using homomorphic encryption",
      speaker: "Rand Hindi - Zama",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 20th",
      startTime: "14:20",
      endTime: "14:35",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Attestations as Web3 Cookies: Leverage your on-chain Data",
      speaker: "Hadrien Charlanes - Sismo",
      type: "Talk |Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "14:30",
      endTime: "15:25",
      duation: "55 min",
      venue: "Bievre",
      eventName: "Developing Smart Contracts in Sway",
      speaker: "Emily Herbert - Fuel Labs",
      type: "Workshop | Ethereum Layers",
    },
    {
      date: "July 20th",
      startTime: "14:30",
      endTime: "14:45",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "GasHawk - a cost-saver for the long tail of L1 Ethereum transactions",
      speaker: "Christoph Jentz - GasHawk",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 20th",
      startTime: "14:30",
      endTime: "14:45",
      duation: "15 min",
      venue: "Main Stage",
      eventName:
        "Anoma: an intent-centric, privacy-preserving protocol for automatic counterparty discovery and atomic multi-chain settlement",
      speaker: "Christopher Goes - Anoma",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "14:40",
      endTime: "14:55",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Hashchat -- wallet-to-wallet encrypted messaging",
      speaker: "Steve Derezinski - Hashchat",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "14:50",
      endTime: "15:15",
      duation: "25 min",
      venue: "Monge",
      eventName: "Automated Vulnerability Fixing in (DeFi) Smart Contracts",
      speaker: "Palina Tolmach - Nanyang Technological University, Singapore",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 20th",
      startTime: "14:50",
      endTime: "03:05",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Beyond the PFP: Engaging Your Users with NFTs",
      speaker: "Tom Borgers - 3mint",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "14:55",
      endTime: "15:10",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Owning Your Future: From Community to Identity.",
      speaker: "Anjali Young - Collab.Land",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "15:00",
      endTime: "15:25",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Cross-chain interoperability – The next wave for DeFi and NFTs",
      speaker: "Alex Smirnov - deBridge",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "15:10",
      endTime: "15:25",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "What’s Next for NFTs + GameFi & a documentary sneak peak",
      speaker: "Rahilla Zafar - Altered State Machine",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "15:15",
      endTime: "15:40",
      duation: "25 min",
      venue: "Sorbonne",
      eventName: "Human-friendly contract interactions with Sourcify verification",
      speaker: "Kaan Uzdogan - Ethereum Foundation",
      type: "Talk | UX / UI",
    },
    {
      date: "July 20th",
      startTime: "15:20",
      endTime: "15:45",
      duation: "25 min",
      venue: "Monge",
      eventName: "Personal On-line HSM for Ethereum assets",
      speaker: "Pascal Urien - Ethertrust",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 20th",
      startTime: "15:20",
      endTime: "15:35",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "WalletConnect multi-protocol messaging network",
      speaker: "Pedro Gomes - WalletConnect",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "15:30",
      endTime: "15:45",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Why ERC721 sucks and we need a new NFT standard",
      speaker: "Anett Rolikova - Ethereum Magicians",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "15:30",
      endTime: "15:30",
      duation: "25 min",
      venue: "Pontoise",
      eventName: "Social in Web3.0",
      speaker: "Evgeny Kuzyakov - Evgeny Kuzyakov",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "15:30",
      endTime: "16:25",
      duation: "55 min",
      venue: "Bievre",
      eventName: "Building secure contracts: How to use fuzzing like a pro",
      speaker: "Josselin Feist & Natalie Chin - Trail of Bits",
      type: "Workshop | Developer Tools",
    },
    {
      date: "July 20th",
      startTime: "15:40",
      endTime: "15:55",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "Uniswap v3, or How I Learned To Stop Worrying And Love Concentrated Liquidity",
      speaker: "Daniel Robinson - Paradigm",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 20th",
      startTime: "15:45 | ",
      endTime: "16:00",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "The future of crypto wallets and mass adoption",
      speaker: "Ouriel Ohayon - ZenGo",
      type: "Talk | UX / UI",
    },
    {
      date: "July 20th",
      startTime: "15:50",
      endTime: "16:05",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Decentralized Justice: Solving Disputes in NFT Markets",
      speaker: "Federico Ast - Kleros",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "15:50",
      endTime: "16:05",
      duation: "15 min",
      venue: "Monge",
      eventName: "Private access to decentralized data",
      speaker: "Will Scott - Protocol Labs",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 20th",
      startTime: "16:00",
      endTime: "16:15",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Web3 Marketing is already here. Where does it go next?",
      speaker: "Patrick Perlmutter - Lighthouse",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "16:35",
      endTime: "17:00",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "Cryptonative economy",
      speaker: "Josef Je - PWN",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 20th",
      startTime: "16:40",
      endTime: "17:05",
      duation: "15 min",
      venue: "Monge",
      eventName: "Cairo Security 101 - Let's have a look at Cairo attack vectors.",
      speaker: "Joran Honig - ConsenSys Diligence",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 20th",
      startTime: "16:40",
      endTime: "16:55",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Blockchain and Art Intertwine: Use Cases, Advantages, Flaws & Possible Solutions",
      speaker: "Sasha Shilina - Paradigm, Humanode",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "16:50",
      endTime: "17:05",
      duation: "15 min",
      venue: "Pontoise",
      eventName:
        "Lifting all boats: how messaging interoperability standards can make the new web truly belong to users",
      speaker: "Alex Van de Sande - ENS",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "16:55",
      endTime: "17:10",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "DeFi 2.0: use cases highlighting how Web3 actors can benefit from uncollateralized loans",
      speaker: "Alexis Masseron - Atlendis Labs",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 20th",
      startTime: "17:00",
      endTime: "17:15",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Building on Balancer protocol",
      speaker: "Fernando Martinelli - Balancer Labs",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 20th",
      startTime: "17:00",
      endTime: "17:55",
      duation: "55 min",
      venue: "Bievre",
      eventName: "Burnout is the easiest exploit",
      speaker: "Kris Decoodt - Gitcoin",
      type: "Workshop | Governance",
    },
    {
      date: "July 20th",
      startTime: "17:05",
      endTime: "17:30",
      duation: "25 min",
      venue: "Main Stage",
      eventName: `"Always Has Been" (or, "Wait, It's All Resource Pricing?" Part 2)`,
      speaker: "John Adler - Fuel Labs",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 20th",
      startTime: "17:10",
      endTime: "17:35",
      duation: "25 min",
      venue: "Pontoise",
      eventName: "If we think Web3 is about tech, we're ngmi",
      speaker: "Amer Ameen - ChainSafe",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "17:10",
      endTime: "10:25",
      duation: "15 min",
      venue: "Monge",
      eventName: "Hardening Blockchain Security with Formal Methods",
      speaker: "Isil Dillig - Veridise",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 20th",
      startTime: "17:15",
      endTime: "17:30",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "The Euro on Ethereum in 30 seconds",
      speaker: "Gisli Kristjansson - Monerium",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 20th",
      startTime: "17:20",
      endTime: "17:45",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "Intersection of NFTs, film and decentralisation",
      speaker: "Camila Russo & Alejandro Miranda - The Infinite Machine",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "17:30",
      endTime: "17:55",
      duation: "25 min",
      venue: "Monge",
      eventName: "Economic analysis of private defi",
      speaker: "Anish Mohammed - Panther Protocol",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 20th",
      startTime: "17:35",
      endTime: "15:50",
      duation: "15 min",
      venue: "Main Stage",
      eventName: 'What does "merge" look like?',
      speaker: "Terence Tsao - Prysmatic Labs",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 20th",
      startTime: "17:35",
      endTime: "18:00",
      duation: "25 min",
      venue: "Sorbonne",
      eventName: "Finding the secret recipe for on-chain markets data collection",
      speaker: "Anastasia Melachrinos - Kaiko",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 20th",
      startTime: "17:40",
      endTime: "18:05",
      duation: "25 min",
      venue: "Pontoise",
      eventName: "A year's progress in Sway, the smart contract language for the FuelVM.",
      speaker: "Alex Hansen - Fuel Labs",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 20th",
      startTime: "17:40",
      endTime: "17:55",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "The Stems protocol",
      speaker: "Haitham Mengad - StemsDAO",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "17:55",
      endTime: "18:20",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "Entering the era of Web3 Social",
      speaker: "Stani Kulechov - Aave / Lens",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "18:00",
      endTime: "18:35",
      duation: "35 min",
      venue: "Bievre",
      eventName: "The Future of Money: Surmounting Impediments to Adoption",
      speaker: "Teana Baker-Taylor - Circle",
      type: "Workshop | Web 3.0",
    },
    {
      date: "July 20th",
      startTime: "18:00",
      endTime: "18:25",
      duation: "25 min",
      venue: "Monge",
      eventName: "Never Send To Know For Whom The Bell Tolls",
      speaker: "Dr Laurence E. Day - Prometheus",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 20th",
      startTime: "18:05",
      endTime: "18:30",
      duation: "25 min",
      venue: "Sorbonne",
      eventName: "Possible Future of EVM",
      speaker: "Paweł Bylica - Ethereum Foundation / Ipsilon",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 20th",
      startTime: "18:10",
      endTime: "19:25",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Rolling Shutter",
      speaker: "Jannik Luhn - Shutter Network",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 20th",
      startTime: "18:20",
      endTime: "18:35",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Mapping the open metaverse",
      speaker: "Gwendall Esnault - Metahood",
      type: "Talk | NFTs",
    },
    {
      date: "July 20th",
      startTime: "18:25",
      endTime: "18:40",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "rotki: showcasing advantages of opensource local apps",
      speaker: "Lefteris Karapetsas - rotki",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 20th",
      startTime: "18:30",
      endTime: "18:55",
      duation: "25 min",
      venue: "Monge",
      eventName: "Move Fast and Break Nothing",
      speaker: "Mooly Sagiv - Certora",
      type: "Talk | Security & Privacy",
    },
    {
      date: "July 20th",
      startTime: "18:30",
      endTime: "18:45",
      duation: "15 min",
      venue: "Pontoise",
      eventName: "Applications of Transient Storage (EIP-1153)",
      speaker: "Moody Salem - Uniswap",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 20th",
      startTime: "18:35",
      endTime: "19:00",
      duation: "25 min",
      venue: "Sorbonne",
      eventName: "The Future of Blockchain Interoperability",
      speaker: "Federico Kunze Küllmer - Evmos",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 20th",
      startTime: "18:40",
      endTime: "18:55",
      duation: "15 min",
      venue: "Bievre",
      eventName: "Minimizing Dystopia with Large-scale Networks of Cooperation",
      speaker: "Stellar Magnet - Black Sky",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 20th",
      startTime: "18:45",
      endTime: "19:00",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "How aggregators help on scaling DeFi",
      speaker: "Mounir Benchemled - ParaSwap",
      type: "Talk | Decentralised Finance",
    },
  ],
  july21: [
    {
      date: "July 21th",
      startTime: "09:30",
      endTime: "09:45",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "DVT - Decentralized Validator Tech and mainnet launch",
      speaker: "Alon Muroch - SSV.Network",
      type: "Talk |  Ethereum Layers",
    },
    {
      date: "July 21th",
      startTime: "09:30",
      endTime: "09:45",
      duation: "15 min",
      venue: "Saint-Germain",
      eventName: "Boson Protocol - Trustless commerce infrastructure for Web3",
      speaker: "Justin Banon - Boson Protocol",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 21th",
      startTime: "09:30",
      endTime: "09:45",
      duation: "15 min",
      venue: "Monge",
      eventName: "New Applications for Quadratic Funding",
      speaker: "Connor O'Day - GitcoinDAO",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 21th",
      startTime: "09:30",
      endTime: "09:40",
      duation: "10 min",
      venue: "Pontoise",
      eventName: "What legal challenges the crypto is facing in 2022 ?",
      speaker: "William O'Rorke - ORWL",
      type: "Talk | Legal",
    },
    {
      date: "July 21th",
      startTime: "09:35",
      endTime: "09:50",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "State of CBDCs",
      speaker: "Mike Alonso - Bank for International Settlements",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 21th",
      startTime: "09:50",
      endTime: "10:25",
      duation: "35 min",
      venue: "Bievre",
      eventName: "Gamification of Utility-Building Public Goods",
      speaker: "Joshua Lapidus - Opolis / SporkDAO",
      type: "Workshop | Blockchain for good",
    },
    {
      date: "July 21th",
      startTime: "09:50",
      endTime: "10:05",
      duation: "15 min",
      venue: "Monge",
      eventName: "The participation economy",
      speaker: "Romain FIGUEREO - Paladin",
      type: "Talk | Governance",
    },
    {
      date: "July 21th",
      startTime: "09:50",
      endTime: "10:05",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Crossing the chasm for web2 devs",
      speaker: "Parker Feierbach - DataHub - Figment",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 21th",
      startTime: "09:50",
      endTime: "10:15",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "Reputation for machines",
      speaker: "Elias Simos - Rated Labs",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 21th",
      startTime: "09:55",
      endTime: "10:20",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "The Merge - Bringing Ethereum to Proof of Stake",
      speaker: "Sajida Zouarhi - Consensys / OnlyDust",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 21th",
      startTime: "10:00",
      endTime: "10;25",
      duation: "15 min",
      venue: "Monge",
      eventName: "Permissionless work: Are DAOs a new form of human coordination, or just bull-run fireworks?",
      speaker: "Hart Lambur - UMA",
      type: "Talk | Governance",
    },
    {
      date: "July 21th",
      startTime: "10:10",
      endTime: "10:25",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "How to use IPFS to securely serve your content",
      speaker: "Thibault Meunier - Cloudflare",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 21th",
      startTime: "10:20",
      endTime: "10:45",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "Incentive Aligned Liquidity Mining",
      speaker: "Violet Vienhage - Element Finance",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 21th",
      startTime: "10:25",
      endTime: "10:40",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "Why DeFi matters for everyone",
      speaker: "Oliver Yates - Aplo",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 21th",
      startTime: "10:30",
      endTime: "11:15",
      duation: "45 min",
      venue: "Bievre",
      eventName: "Not an option : Next wave of DeFi is derivatives.",
      speaker: "Julien Bouteloup , Kia Mosayeri, Arisa - Stake DAO, BlackPool, rekt.news, Stake Capital",
      type: "I have an idea for EthCC | Governance",
    },
    {
      date: "July 21th",
      startTime: "10:30",
      endTime: "10:45",
      duation: "15 min",
      venue: "Monge",
      eventName: "Optimistic Oracles: Why human-powered truth machines are inevitable oracle technology.",
      speaker: "Chris Maree - UMA",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 21th",
      startTime: "10:30",
      endTime: "10:45",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "The next generation of interoperable concurrent smart contract for wide-scale developer adoption",
      speaker: "Manfred Touron - Gno.land",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 21th",
      startTime: "10:30",
      endTime: "10:5",
      duation: "20 min",
      venue: "Pontoise",
      eventName: "Paladin project [AMA]",
      speaker: "Romain Figuereo - Paladin",
      type: "Talk | Legal",
    },
    {
      date: "July 21th",
      startTime: "10:45",
      endTime: "11:10",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "StarkNet - Next steps",
      speaker: "Eli Ben-Sasson - StarkWare",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 21th",
      startTime: "10:50",
      endTime: "11:15",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "Crypto - What does the court say?",
      speaker: "Mihaela Apostol - ArbTech",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 21th",
      startTime: "10:50",
      endTime: "11:05",
      duation: "15 min",
      venue: "Monge",
      eventName: "Growing as a DAO - MakerDAO Lessons Learned",
      speaker: "Nadia Alvarez - MakerDAO",
      type: "Talk | Governance",
    },
    {
      date: "July 21th",
      startTime: "10:50",
      endTime: "11:05",
      duation: "15 min",
      venue: "Sorbonne",
      eventName: "Moving from MVC to SACI - a development framework for modern DApps",
      speaker: "Madhavan Malolan - Questbook",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 21th",
      startTime: "10:55",
      endTime: "11:35",
      duation: "40 min",
      venue: "Pontoise",
      eventName: "Stablecoin: a new form of e-money?",
      speaker: "Victor Charpiat, Teana Taylor, Pablo Veyrat & Samuel Goldfaden -",
      type: "Talk | Legal",
    },
    {
      date: "July 21th",
      startTime: "11:10",
      endTime: "11:25",
      duation: "15 min",
      venue: "Monge",
      eventName: "The Smart Contracts Behind DAOs",
      speaker: "Juliette Chevalier - Aragon",
      type: "Talk | Governance",
    },
    {
      date: "July 21th",
      startTime: "11:10",
      endTime: "11:35",
      duation: "25 min",
      venue: "Sorbonne",
      eventName: "Don't Reinvent The Geth Wheel",
      speaker: "Kendrick Tan - DFX Finance",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 21th",
      startTime: "11:15",
      endTime: "11:40",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "cNFT, a toolbox for producing confidential NFT",
      speaker: "Gilles Fedak - iExec",
      type: "Talk | Web 3.0 ",
    },
    {
      date: "July 21th",
      startTime: "11:20",
      endTime: "11:45",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "How to use your TGE to supercharge your product",
      speaker: "Sanat Kapur - Spartan Group",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 21th",
      startTime: "11:20",
      endTime: "12:15",
      duation: "55 min",
      venue: "Bievre",
      eventName: "Building on Bentobox",
      speaker: "Sarang Parikh - Sushi",
      type: "Workshop | Decentralised Finance",
    },
    {
      date: "July 21th",
      startTime: "11:30",
      endTime: "11:55",
      duation: "25 min",
      venue: "Monge",
      eventName: "Disrupting ownership: towards more scalable societies",
      speaker: "Lukas Schor - Gnosis Safe",
      type: "Talk | Governance",
    },
    {
      date: "July 21th",
      startTime: "11:40",
      endTime: "12:05",
      duation: "25 min",
      venue: "Sorbonne",
      eventName: "BUIDLing DeFi protocol from perspective of compiler core dev",
      speaker: "Đorđe Mijović - Tempus",
      type: "Talk | Developer Tools",
    },
    {
      date: "July 21th",
      startTime: "11:45",
      endTime: "12:10",
      duation: "25 min",
      venue: "Main Stage",
      eventName: "The Future of DeFi and Chainlink",
      speaker: "Johann Eid - Chainlink Labs",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 21th",
      startTime: "11:50",
      endTime: "12:15",
      duation: "25 min",
      venue: "Saint-Germain",
      eventName: "An Overview of Voting in Cryptoeconomic Systems",
      speaker: "William George - Kleros Cooperative",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 21th",
      startTime: "11:50",
      endTime: "12:20",
      duation: "30 min",
      venue: "Pontoise",
      eventName: "Exploring NETs: how not to get fooled?",
      speaker: "Guillaume Tormo, Daniel Heyman & Jacob Martin",
      type: "Talk | Legal",
    },
    {
      date: "July 21th",
      startTime: "12:00",
      endTime: "12:25",
      duation: "25 min",
      venue: "Monge",
      eventName: "The power of NFT groups",
      speaker: "Stephen Song - Castle",
      type: "Talk | NFTs",
    },
    {
      date: "July 21th",
      startTime: "12:20",
      endTime: "12:55",
      duation: "35 min",
      venue: "Bievre",
      eventName: "How to build Web3 communication in your protocol (EPNS)",
      speaker: "Harsh Rajat - Ethereum Push Notification Service (EPNS)",
      type: "Workshop | UX/UI",
    },
    {
      date: "July 21th",
      startTime: "12:25",
      endTime: "12:45",
      duation: "20 min",
      venue: "Pontoise",
      eventName: "How to structure an Anon project without ending behind bars?",
      speaker: "Marc Zeller & Julien Bouteloup -",
      type: "Talk | Legal",
    },
    {
      date: "July 21th",
      startTime: "12:30",
      endTime: "12:55",
      duation: "25 min",
      venue: "Monge",
      eventName: "Identity Solutions for Web3",
      speaker: "Dan Kelleher - Civic",
      type: "Talk | NFTs",
    },
    {
      date: "July 21th",
      startTime: "13:15",
      endTime: "13:30",
      duation: "15 min",
      venue: "Main Stage",
      eventName: "Fintech  Blockchain are Merging: VC Perspectives",
      speaker: "Akshi Federici - Kraken Ventures",
      type: "Talk | Enterprise",
    },
    {
      date: "July 21th",
      startTime: "13:20",
      endTime: "13:35",
      duation: "15min",
      venue: "Saint-Germain",
      eventName: "The evolution of tokenomics: going from capturing value to creating lasting value for users",
      speaker: "Kaylee Bushell - Decentology",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 21th",
      startTime: "13:25",
      endTime: "13:40",
      duation: "15min",
      venue: "Pontoise",
      eventName: "How The Web 3 Community can help end humanitarian crisis's in Africa",
      speaker: "Michael Abraha - Tigray Art Collective",
      type: "Talk | Blockchain for good ",
    },
    {
      date: "July 21th",
      startTime: "13:35",
      endTime: "13:50",
      duation: "15min",
      venue: "Main Stage",
      eventName: "DEXs and Market Efficiency: Exploring the Decentralized Price Discovery Process",
      speaker: "Clara Medalie - Kaiko",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 21th",
      startTime: "13:40",
      endTime: "13:55",
      duation: "15min",
      venue: "Sorbonne",
      eventName: "Blockchain Education: Global Impact",
      speaker: "Antonio Gomes - Blockchain Education Network",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 21th",
      startTime: "13:40",
      endTime: "14:05",
      duation: "25min",
      venue: "Saint-Germain",
      eventName: "Agent-based modelling of lending market risks. A case study: 0VIX",
      speaker: "Daniele Pinna & Amit Chaudhary - 0VIX - Polygon",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 21th",
      startTime: "13:45",
      endTime: "14:00",
      duation: "15min",
      venue: "Pontoise",
      eventName: "NoFi to DeFi: Driving Financial Inclusion Through Digital Access",
      speaker: "Christian Duffus - Fonbnk Inc.",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 21th",
      startTime: "13:55",
      endTime: "14:20",
      duation: "25min",
      venue: "Main Stage",
      eventName: "The Age of Rollups",
      speaker: "A.J. Warner - Offchain Labs (Arbitrum)",
      type: " Talk | Ethereum Layers",
    },
    {
      date: "July 21th",
      startTime: "14:00",
      endTime: "14:15",
      duation: "15min",
      venue: "Sorbonne",
      eventName: "Onboarding 1 million people into crypto in Latam",
      speaker: "Pablo Sabbatella - Defy Education",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 21th",
      startTime: "14:00",
      endTime: "14:55",
      duation: "55min",
      venue: "Bievre",
      eventName: "Model your first dynamic system with cadCAD",
      speaker: "Bogdan-Radu Dumitru - Celo (cLabs)",
      type: "Workshop | Blockchain economics",
    },
    {
      date: "July 21th",
      startTime: "14:05",
      endTime: "14:20",
      duation: "15min",
      venue: "Pontoise",
      eventName: "Designing for the Future of Crypto Adoption & Diversity [Title TBD]",
      speaker: "Michael Gluzman - Thesis.co",
      type: "Talk | UX / UI",
    },
    {
      date: "July 21th",
      startTime: "14:10",
      endTime: "14:25",
      duation: "15min",
      venue: "Saint-Germain",
      eventName: "Quantifying financial risks of not diversifying consensus clients",
      speaker: "Freddy Zwanzger - Blockdaemon",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 21th",
      startTime: "14:20",
      endTime: "14:35",
      duation: "15min",
      venue: "Sorbonne",
      eventName: "Today's Web3 is Full of Trash",
      speaker: "Shannon Ewing - ETHDenver",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 21th",
      startTime: "14:20",
      endTime: "14:35",
      duation: "15min",
      venue: "Monge",
      eventName: "The new NFT-based Decentralized Finance",
      speaker: "Youssef El Allali - Jaypigs",
      type: "Talk | NFTs",
    },
    {
      date: "July 21th",
      startTime: "14:25",
      endTime: "14:50",
      duation: "25min",
      venue: "Pontoise",
      eventName: "DAO dos and don'ts: learnings from the community on how to get your DAO thriving",
      speaker: "Thibaut Sahaghian - Multis",
      type: "Talk | Governance",
    },
    {
      date: "July 21th",
      startTime: "14:25",
      endTime: "14:50",
      duation: "25min",
      venue: "Main Stage",
      eventName: "Intent-centric (intent-solver pattern) architectures for fully decentralized dApps",
      speaker: "Adrian Brink - Anoma",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 21th",
      startTime: "14:30",
      endTime: "14:55",
      duation: "25min",
      venue: "Saint-Germain",
      eventName: "Blockchains: A Data Scientist’s Dream",
      speaker: "Elizabeth Yeung & Daniel Khoo - Nansen",
      type: "Talk | Blockchain economics",
    },
    {
      date: "July 21th",
      startTime: "14:40",
      endTime: "14:55",
      duation: "15min",
      venue: "Monge",
      eventName: "Bringing institutions to Defi",
      speaker: "Martin Burgherr - Sygnum",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 21th",
      startTime: "14:40",
      endTime: "14:55",
      duation: "15min",
      venue: "Sorbonne",
      eventName: "DeFi Compliance Oracles",
      speaker: "Alex McFarlane - Keyring Network",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 21th",
      startTime: "14:55",
      endTime: "15:35",
      duation: "40min",
      venue: "Main Stage",
      eventName: "Ethereum Foundation",
      speaker: "Vitalik Buterin - Ethereum Foundation",
      type: "Talk | Other",
    },
    {
      date: "July 21th",
      startTime: "15:45",
      endTime: "16:00",
      duation: "15min",
      venue: "Saint-Germain",
      eventName: "How UX is fundamental to adoption: from education to web3 UI",
      speaker: "Maria Magenes - Oasis.app",
      type: "Talk | UX / UI",
    },
    {
      date: "July 21th",
      startTime: "15:45",
      endTime: "16:10",
      duation: "25min",
      venue: "Pontoise",
      eventName: "DAO Legal Framework: International Crypto Planning",
      speaker: "Maria Milagros Santamaria Sederino - One Big Lab",
      type: "Talk | Governance",
    },
    {
      date: "July 21th",
      startTime: "15:45",
      endTime: "16:10",
      duation: "25min",
      venue: " Monge",
      eventName: "Make money long after you re dead",
      speaker: "Vincent Danos - Mangrove",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 21th",
      startTime: "15:45",
      endTime: "16;00",
      duation: "15min",
      venue: "Main Stage",
      eventName: "Maximal Decentralization On All Axes",
      speaker: "Evan Van Ness - Starbloom Ventures",
      type: "Talk | Ethereum Layers",
    },
    {
      date: "July 21th",
      startTime: "15:45",
      endTime: "16:40",
      duation: "55min",
      venue: "Bievre",
      eventName: "Staking-Farming-Security for beginners",
      speaker: "uliana Passos - It's Encrypted!",
      type: "Workshop | UX / UI",
    },
    {
      date: "July 21th",
      startTime: "16:05",
      endTime: "16:20",
      duation: "15min",
      venue: "Saint-Germain",
      eventName: "Building the First Crypto State with KONG Land",
      speaker: "Cameron Robertson - KONG Land",
      type: "Talk | UX / UI",
    },
    {
      date: "July 21th",
      startTime: "16:05",
      endTime: "16:20",
      duation: "15min",
      venue: "Sorbonne",
      eventName: "Science as a Public Good",
      speaker: "Philipp Koellinger - DeSci Foundation",
      type: "Talk | Blockchain for good",
    },
    {
      date: "July 21th",
      startTime: "16:15",
      endTime: "16:30",
      duation: "15min",
      venue: "Monge",
      eventName: "Why your yield is not sustainable.",
      speaker: "Frank Brinkkemper - Oasis.app",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 21th",
      startTime: "16:05",
      endTime: "16:40",
      duation: "15min",
      venue: "Saint-Germain",
      eventName: "How To Simplify UX Flows In A Complex DeFi Product",
      speaker: "Ulysse Ramage - APWine",
      type: "Talk | UX / UI",
    },
    {
      date: "July 21th",
      startTime: "16:35",
      endTime: "17:00",
      duation: "25min",
      venue: "Main Stage",
      eventName: " Why builders are flocking to interchain DeFi and how users can reap the benefits",
      speaker: "Sunny Aggarwal - Osmosis",
      type: "Talk | Decentralised Finance",
    },
    {
      date: "July 21th",
      startTime: "16:45",
      endTime: "17:00",
      duation: "15min",
      venue: "Pontoise",
      eventName: "Research and Development of Sustainable Defi Ecosystems",
      speaker: "Windra Thio - Element Finance",
      type: "Talk | UX / UI",
    },
    {
      date: "July 21th",
      startTime: "16:55",
      endTime: "17:10",
      duation: "15min",
      venue: "Sorbonne",
      eventName: "Crypto / Web3 in Europe ; what happened, what's next?",
      speaker: "Simon Polrot , Marina Markezic & Florian Glatz - European Crypto Initiative",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 21th",
      startTime: "17:05",
      endTime: "17:30",
      duation: "25min",
      venue: "Main Stage",
      eventName:
        "Web3 Won’t Be The Money Layer of the Internet if Consumers Think It’s an Earth-Destroying Scam: Four Ways to Change the Narrative.",
      speaker: "James Beck - ConsenSys",
      type: "Talk | Web 3.0",
    },
    {
      date: "July 21th",
      startTime: "17:30",
      endTime: "18:00",
      duation: "30min",
      venue: "Main Stage",
      eventName: "Closing Ceremony",
      speaker: "EthCC Team - EthCC",
      type: "Talk | Other",
    },
  ],
};

let sideEvents = {
  july15: [
    {
      eventsName: "Meet The Builders - with NGC Ventures",
      organizer: "NGC Ventures",
      date: "7/15/2022",
      startTime: "09:00",
      endTime: "19:00pm",
      location: "Paris - Latin Quarter",
      price: "FREE",
      link: "https://t.me/ethccParis2022",
      description:
        "NGC Ventures would love to meet builders during our time at EthCC week. If you are project interested in fundraising or talking to investors, check us out.",
      eventType: "Meetup",
    },
    {
      eventsName: "Metaverse Summit",
      organizer: "Metaverse Summit",
      date: "2022-07-15",
      startTime: "09:00",
      endTime: "",
      location: "STATION F 5 Parv. Alan Turing, 75013 Paris",
      price: "€199.00 - €1,299.00",
      link: "https://guts.events/sxg830/c445d2",
      description: "-",
      eventType: "Conference",
    },
    {
      eventsName: "⚡ fuze.life 💗 launch @ EthCC Week",
      organizer: "",
      date: "2022-07-15",
      startTime: "09:00",
      endTime: "19:00",
      location: "Paris - Latin Quarter",
      price: "FREE",
      link: "https://twitter.com/0xFuzeLife/status/1544578695142449153",
      description:
        "fuze.life 💗 is launching at the Metaverse summit & EthCC in Paris! To celebrate, we're giving away 10 valuable gen 0 tokens to our Twitter followers & fellow attendees. To enter, just follow https://twitter.com/0xFuzeLife ! See you in the city of love! 💙🤍❤️",
      eventType: "Conference",
    },
  ],
  july16: [
    {
      eventsName: "Metaverse Summit",
      organizer: "Metaverse Summit",
      date: "2022-07-16",
      startTime: "9:00",
      endTime: "",
      location: "STATION F 5 Parv. Alan Turing, 75013 Paris",
      price: "€199.00 - €1,299.00",
      link: "https://guts.events/sxg830/c445d2",
      description: "",
      eventType: "Conference",
    },
    {
      eventsName: "The Ark",
      organizer: "",
      date: "2022-07-16",
      startTime: "10:00",
      endTime: "21:00",
      location: "Quai Henri IV, Paris, Paris, France",
      price: "FREE",
      link: "",
      description:
        'Crypto Bible Genesis 7 : "And The Herd did all that the LORD commanded. The Herd was six hundred years old when the floodwaters came on the earth. And the Elephant and the Ape and the Frog and all degens entered the ark to escape the waters of the flood. male and female, came to the Herd and entered the ark, as God had commanded them." After the flood thanks to the herd all safe degens were blessed to wear their NFTs, make their game items financial weapons and carry a piece of the metaverse in their everyday life. TLDR - Herd MetaMerch is now available in The Ark (Very limited edition - we are not accepting reservations, first come first served)',
      eventType: "Meetup",
    },
    {
      eventsName: "FUTUR OF GAMING #2",
      organizer: "",
      date: "2022-07-16",
      startTime: "18:00",
      endTime: "00:00",
      location: `Péniche "L'atelier", Quai Henri IV \n\ Quai Henri IV, Péniche "L'atelier", 75004 Paris`,
      price: "",
      link: "",
      description:
        "We welcome you on the 16th of July on our barge Quai Henri IV to our second meet up: Futur of Gaming. On the line-up we will have Jérôme De Tychey (COMETH), Gregory Marko (CHAINSAFE), Jonathan Brun (LIGHTHOUSE) and Ken Timsit (CRONOS) to tell you about their experiences and their vision of the future of video gaming in the WEB 3. Afterwards there will be a cocktail where you can drop by the pop up area and see our different collaborations.",
      eventType: "Meetup",
    },
  ],
  july17: [
    {
      eventsName: "Pulic Goods in the Bear Market",
      organizer: "",
      date: "2022-07-22",
      startTime: "15:00",
      endTime: "17:00",
      location: "5 Paris Alan Turing 75013 Paris France",
      price: "FREE",
      link: "https://www.eventbrite.com/e/public-goods-in-the-bear-market-tickets-375664451487",
      description: "-",
      eventType: "Meetup",
    },
    {
      eventsName: "✨ DeFiweek Paris ✨",
      organizer: "",
      date: "2022-07-17",
      startTime: "",
      endTime: "",
      location: "Palais Brogniart, 16 place de la Bourse, 75002 Paris, France",
      price: "FREE",
      link: "https://defiweek.org/",
      description:
        "Where the DeFi industry display their latest innovation to the crypto community, mainstream and media. Organized by GL Events.",
      eventType: "Conference",
    },
    {
      eventsName: "VC House by Stake Capital Group",
      organizer: "",
      date: "2022-07-17",
      startTime: "10:00",
      endTime: "19:00",
      location: "Saint-Germain-des-Prés, Paris, France",
      price: "FREE",
      link: "https://docs.google.com/forms/d/e/1FAIpQLScUZi8zMIE7-SNYv08MK1-qO-FRerDkexBNn6BmjfSErLn1Iw/closedform",
      description:
        "Stake Capital Investment Board will be in Paris for a week to review start-ups/projects looking for investments.",
      eventType: "Meetup",
    },
    {
      eventsName: "DeFi Dev VIP Party",
      organizer: "",
      date: "2022-07-17",
      startTime: "18:00",
      endTime: "21:00",
      location: "Secret Location",
      price: "This is a member-only event.",
      link: "https://www.eventbrite.com/e/defi-dev-vip-party-tickets-374529466717",
      description:
        "Join RAILGUN DAO from 6pm-9pm DAO for a DeFi Dev VIP party to kick off the festivities in Paris around ETH CC. We'll have live swing jazz, hip hop dancers and other live entertainment!",
      eventType: "Party",
    },
  ],
  july18: [
    {
      eventsName: "StarkNet Paris Hack",
      organizer: "",
      date: "2022-07-18",
      startTime: "09:00",
      endTime: "00:00",
      location: "27 Boulevard Jules Ferry, Paris",
      price: "$25 deposit",
      link: "https://www.encode.club/starknet-paris-hack",
      description:
        "The Starknet Paris Hack is a 24h hackathon taking place in Le Marais on Monday 18th and Tuesday 19th July. Learn from workshops on how Starknet works and how to write in Cairo, then build your project and win prizes from a pool of over 20k euros.",
      eventType: "Hackathon",
    },
    {
      eventsName: "Archway: Paris Hacker House",
      organizer: "",
      date: "2022-07-18",
      startTime: "17:00",
      endTime: "FREE",
      location: "Val-de-Marne, France",
      price: "",
      link: "https://lu.ma/archway-paris-hacker-house",
      description: `The Archway Hacker House is hosting a coding experience with in-person guidance and mentorship from core contributors to the Archway protocol.`,
      eventType: "Hackathon",
    },
    {
      eventsName: "Crypto & Finance Forum 2022",
      organizer: "",
      date: "202-07-18",
      startTime: "08:30",
      endTime: "18:00",
      location: "Maison de la Mutualité - 24 Rue Saint-Victor, 75005 Paris",
      price: "€99",
      link: "https://cryptofinanceforum.fr/",
      description:
        "After a very successful first edition, the Crypto Finance Forum opens its doors again for an exceptional day on Monday 18 July at the Maison de la Mutualité in Paris.",
      eventType: "Conference",
    },
    {
      eventsName: "StarkCon Mixer",
      organizer: "",
      date: "2022-07-18",
      startTime: "21:00",
      endTime: "01:00",
      location: "Espace 56, Tour Montparnasse, 33 Avenue du Maine, 75015 Paris",
      price: "",
      link: "https://www.eventbrite.com/e/starkcon-mixer-paris-tickets-368741514797",
      description: "StarkCon invites you to a casual evening with the StarkNet community on the eve of EthCC Paris!",
      eventType: "Party",
    },
    {
      eventsName: "NFT IMPACT : Are NFTs destroying the planet?",
      organizer: "",
      date: "2022-07-18",
      startTime: "09:00",
      endTime: "22:00",
      location: "La Caserne, 12 Rue Philippe de Girard, 10eme Paris",
      price: "-",
      link: "https://www.eventbrite.com/e/billets-nft-impact-are-nfts-destroying-the-planet-370450305837",
      description:
        "We are excited to invite you to the NFT Factory Pop Up event on July 18 in Paris at la Caserne. \n Topic: NFT Impact / Are NFTs destroying the planet?",
      eventType: "Conference",
    },
    {
      eventsName: "Polygon Connect Paris",
      organizer: "",
      date: "2022-07-18",
      startTime: "10:00",
      endTime: "19:00",
      location: "Institut du Monde Arabe, 1 Rue des Fossés Saint-Bernard 75005 Paris France",
      price: "FREE",
      link: "https://www.eventbrite.com/e/polygon-connect-paris-tickets-376138358957",
      description:
        "Polygon Connect—Paris is our latest global initiative to sync builders together from across our ecosystem at a live event featuring panels,",
      eventType: "Conference",
    },
    {
      eventsName: "Web3 Equality Lounge in Paris",
      organizer: "",
      date: "2022-07-18",
      startTime: "10:00",
      endTime: "",
      location: "coming soon",
      price: "-",
      link: "https://www.eventbrite.com/e/web3-equality-lounge-in-paris-registration-367617693417",
      description:
        "Join us for the Web3 Equality Lounge® with Unstoppable Women of Web3 and The Female Quotient in Paris. We are thrilled to come together to host THE gathering for women in Web3, or interested in getting more involved. Please join us on July 18 at 10AM to hear from leading women across Web3 and for the ultimate relationship-building experience. All are welcome and we can’t wait to see you there!",
      eventType: "Meetup",
    },
    {
      eventsName: "Celo Connect Salon - Day 1",
      organizer: "",
      date: "2022-07-18",
      startTime: "13:00",
      endTime: "18:00",
      location: "8 Rue Frederic Sauton",
      price: "FREE",
      link: "https://www.ethccweek.fr/events/celoconnect.com/ethcc2022",
      description:
        "Celo Connect Salon is an intimate community space to dive deep into the topics aligned with Celo’s mission of prosperity for everyone. On our first floor, engage in panel conversations, workshops, and interactive experiences with community members who are building for real world use cases and ReFi. ",
      eventType: "Workshop",
    },
    {
      eventsName: "Future of Content in Web3 | A Paris Salon",
      organizer: "",
      date: "2022-07-18",
      startTime: "13:30",
      endTime: "16:30",
      location: "Les Jardins du Pont Neuf Quai de l'Horloge 75001 Paris France",
      price: "-",
      link: "https://www.eventbrite.com/e/future-of-content-in-web3-a-paris-salon-tickets-383583547717",
      description:
        "An interactive salon to discuss decentralized technology's role in the future of content creation, ownership, and community.",
      eventType: "Meetup",
    },
    {
      eventsName: "Web3cowork",
      organizer: "",
      date: "2022-07-18",
      startTime: "14:00",
      endTime: "22:00",
      location: "Cyclone Le Studio, 16 Rue Vulpian, 75013 Paris",
      price: "FREE",
      link: "https://web3cowork.org/",
      description:
        "A space with workdesks where participants can spend their working time. Every evening we will hold meetups and workshops with experts for pumping Hard Skills. Challenges from partners will be presented at meetups and people or teams will join the hacking. And a space where people can chill and hang out. There will be a special area in the garden for communication.",
      eventType: "Meetup",
    },
    {
      eventsName: "Crypto Carbon Ecosystem",
      organizer: "",
      date: "2022-07-18",
      startTime: "15:00",
      endTime: "19:00",
      location: "Learning Planet Institute 8 bis Rue Charles V 75004 Paris",
      price: "FREE",
      link: "https://www.eventbrite.de/e/crypto-carbon-ecosystem-paris-tickets-374384152077",
      description: `Who is it for?
  Are you a web3 participant who wants to learn more about crypto carbon ecosystem, regenerative finance, incentives - specifically for distributed solar power and energy efficient use of it?`,
      eventType: "Worksop",
    },
    {
      eventsName: "ETHCC Rooftop Opening Party 2022 by DeFiYield",
      organizer: "",
      date: "2022-07-18",
      startTime: "18:00",
      endTime: "",
      location: "La Terrasse de Paris 45 Rue Jussieu 75005 Paris",
      price: "FREE",
      link: "https://www.eventbrite.com/e/ethcc-rooftop-opening-party-2022-unofficial-by-defiyield-tickets-368652117407",
      description:
        "Join an incredible opportunity to connect with thought leaders, investors, and leading Founders in the DeFi, Crypto, Blockchain and Web3 space.",
      eventType: "Party",
    },
    {
      eventsName: "Are you a Crypto Sagepunk?",
      organizer: "",
      date: "2022-07-18",
      startTime: "19:00",
      endTime: "20:00",
      location: "French Theory 18 Rue Cujas, 75005 Paris, France",
      price: "FREE",
      link: "https://twitter.com/thesis_co",
      description:
        "As the crypto industry continues to go mainstream, it’s still possible to be a sagepunk: intelligently anti-establishment, rigorously researched and a DIY nonconformist who wants to disrupt and diverge for the greater good.",
      eventType: "Meetup",
    },
    {
      eventsName: '"Future of France"',
      organizer: "",
      date: "2022-07-18",
      startTime: "19:00",
      endTime: "00:00",
      location: "Paris Latin Quarter",
      price: "FREE",
      link: "https://www.eventbrite.com/e/the-future-of-france-uniting-the-vibrant-french-blockchain-ecosystem-tickets-353883102887?aff=",
      description:
        'Celebrate the "Future of France"! Enjoy cocktails in the garden and live DJ music with partners in the French blockchain ecosystem. Hosted by Aleph.im, Atlendis, Morpho, Paladin, ADAN, Angle, APWine, Jarvis, Mangrove, ParaSwap, Sismo and Synaps. Vive the "Future of France" !',
      eventType: "Party",
    },
    {
      eventsName: "Once Upon A Time ...",
      organizer: "",
      date: "2022-07-18",
      startTime: "19:00",
      endTime: "",
      location: `Boat "L'Atelier" Quai Henry IV Paris`,
      price: "FREE",
      link: "https://stakedao.org/event/onceupon-atime",
      description:
        "After many red candles and market collapses, it is time to sit around those who have been through many cycles in the past. Punctuated by industry anecdotes and secrets, this fireside chat will introduce you to the French DeFi OGs as you have never seen them before.",
      eventType: "Meetup",
    },
    {
      eventsName: "Protocol Labs Launchpad Social Hour Paris",
      organizer: "",
      date: "2022-07-18",
      startTime: "19:00",
      endTime: "22:00",
      location: "Morning, 6 Rue de Penthièvre, 75008 Paris, France",
      price: "FREE",
      link: "https://lu.ma/launchpad2",
      description:
        "​Join the PL Launchpad Social Hour at Morning Penthièvre. We are excited to meet all of you, share our latest updates, more about the future cohorts happening in the next months, meet the team and our current residents.",
      eventType: "Party",
    },
    {
      eventsName: "Maison Thesis* Happy Hour",
      organizer: "",
      date: "2022-07-18",
      startTime: "20:00",
      endTime: "22:00",
      location: "French Theory 18 Rue Cujas, 75005 Paris, France",
      price: "FREE",
      link: "https://twitter.com/thesis_co",
      description:
        "Following our panel on being a crypto sagepunk, Thesis* invites you to join us for a pre-EthCC happy hour!",
      eventType: "Party",
    },
  ],
  july19: [
    {
      eventsName: "Tuesdao",
      organizer: "",
      date: "2022-07-19",
      startTime: "00:00",
      endTime: "00:00",
      location: "London, UK",
      price: "This is a member-only event.",
      link: "https://www.tuesdao.xyz/",
      description: " ",
      eventType: "Social",
    },
    {
      eventsName: "Ethereum Community Conference",
      organizer: "",
      date: "2022-07-19",
      startTime: "08:00",
      endTime: "19-00",
      location: "Maison de la Mutualité 22 rue Saint Victor 75005 Paris",
      price: "FREE",
      link: "https://ethcc.io/",
      description:
        "EthCC (Ethereum Community Conference) will take place in Paris at the Maison de la Mutualité from the 19th to the 21st of July 2022.",

      eventType: "Conference",
    },
    {
      eventsName: "EthCC (Ethereum Community Conference) - Day 1",
      organizer: "",
      date: "2022-07-19",
      startTime: "08:00",
      endTime: "",
      location: "Maison de la Mutualité 22 rue Saint Victor 75005 Paris",
      price: "FREE",
      link: "https://ethcc.io/",
      description:
        "EthCC (Ethereum Community Conference) will take place in Paris at the Maison de la Mutualité from the 19th to the 21st of July 2022.",

      eventType: "Conference",
    },
    {
      eventsName: "ZK Circuit",
      organizer: "",
      date: "2022-07-19",
      startTime: "08:00",
      endTime: "23:59",
      location: "Maison de la Mutualité, 24 Rue Saint-Victor, 75005 Paris, France",
      price: "FREE",
      link: "https://www.eventbrite.com/e/zk-circuit-tickets-378117097417",
      description:
        "Hackers meet at each day at a new world renown location in Paris. Hackers can win up too $5,000 in prizes for building Privacy applications on Findora.",

      eventType: "Hackathon",
    },
    {
        eventsName: "Eth Comics Cards",
        organizer: "",
        date: "2022-07-19",
        startTime: "09:00",
        endTime: "",
        location: "Pris France",
        price: "FREE",
        link: "https://blackpool.finance/events",
        description: "Don't miss your swag bag.",
  
        eventType: "Meetup",
      },
      {
        eventsName: "NEAR SPACE - Day 1",
        organizer: "",
        date: "2022-07-19",
        startTime: "09:00",
        endTime: "17:00",
        location: "La Péniche Paris. 2 Quai de la Tournelle, 75005 Paris, France",
        price: "FREE",
        link: "https://www.eventbrite.ie/e/near-space-powered-by-near-ua-ethcc-2022-tickets-377552819647",
        description:
          "Immerse yourself in three days of networking, workshops, and more hosted by the NEAR ecosystem and its community.",
  
        eventType: "Conference",
      },
      {
        eventsName: "Celo Connect Salon @ EthCC Week - Day 2",
        organizer: "",
        date: "2022-07-19",
        startTime: "10:00",
        endTime: "17:00",
        location: "8 Rue Frederic Sauton",
        price: "FREE",
        link: "https://www.ethccweek.fr/events/celoconnect.com/ethcc2022",
        description:
          "Celo Connect Salon is a community space to discuss topics aligned with Celo’s mission of prosperity for everyone.",
  
        eventType: "Workshop",
      },
      {
        eventsName: "Web3 Retreat",
        organizer: "",
        date: "2022-07-19",
        startTime: "10:00",
        endTime: "17:00",
        location: "Cucina Mutualité, 20 Rue Saint-Victor, 75005 Paris, France",
        price: "FREE",
        link: "https://www.eventbrite.co.uk/e/web3-retreat-le-passage-join-us-for-food-coffee-co-work-chill-tickets-378149704947",
        description:" ",
        eventType: "Conference",
      },
    {
      eventsName: "Cafe du Voyageur: An EthCC Cafe for All - Day 1",
      organizer: "",
      date: "2022-07-19",
      startTime: "08:00",
      endTime: "18:00",
      location: "Nuage Café 14 Rue des Carmes 75005 Paris",
      price: "FREE",
      link: "https://www.eventbrite.com/e/eth-cc-oasis-tickets-378332150647?aff=Metrika",
      description:
        "Join us during ETH CC at our workspace cafe, a low-key space for working, meetings, talks, food, drinks, and friendship.",

      eventType: "Meetup",
    },
    {
      eventsName: "Ledger for Developers Boat 🇫🇷 😎⛵",
      organizer: "",
      date: "2022-07-19",
      startTime: "09:00",
      endTime: "20:00",
      location: "Bateau Daphné Address: 11 Quai de Montebello 75005 Paris",
      price: "FREE",
      link: "https://www.eventbrite.fr/e/ledger-for-developers-boat-tickets-374133311807",
      description:
        "Meet the Ledger Developer Relations team, join or workshops, learn how to secure your users and integrate your projects with us.",

      eventType: "Meetup",
    },
    {
      eventsName: "ZK Circuit Hackathon",
      organizer: "",
      date: "2022-07-19",
      startTime: "09:00",
      endTime: "00:00",
      location:
        "Event brite locations have several area to meet at. July 19th we will be meeting at the Massion at 9am-12pm for in person registration.",
      price: "FREE",
      link: "https://www.eventbrite.com/e/zk-circuit-tickets-378117097417",
      description:
        "Hackers meet at each day at a new world renown location in Paris. Hackers can win up too $5,000 in prizes for building Privacy applications on Findora.",

      eventType: "Hackathon",
    },
    {
      eventsName: "NFT Builders & Collectors Meetup",
      organizer: "",
      date: "2022-07-19",
      startTime: "10:00",
      endTime: "12:00",
      location: "Will be shared with confirmed attendees",
      price: "FREE",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdd2Pg86-Z5FjD1XuZ3uy-tAoLiBNlWsADZPERS3Fo-lgEJ9Q/viewform",
      description: "This is a meetup for builders and collectors in the NFT space during ETH CC",

      eventType: "Meetup",
    },
    {
      eventsName: "CHETH MATE",
      organizer: "",
      date: "2022-07-19",
      startTime: "11:00",
      endTime: "16:30",
      location: `Boat "L'Atelier", Quai Henri IV, 75004 Paris, France`,
      price: "FREE",
      link: "https://lu.ma/chethmate",
      description:
        "Attention all Chess players!! Vega.xyz and Immortal.game are joining forces to bring you a very special opportunity to face off against one of the world’s greatest Chess players, certified GRANDMASTER Rustem Dautov! Those who create the most interesting positions will be awarded prizes by Grandmaster Rustem himself.",

      eventType: "Meetup",
    },
    {
      eventsName: "The Emperor’s New Clothes",
      organizer: "",
      date: "2022-07-19",
      startTime: "12:00",
      endTime: "13:00",
      location: "French Theory - 18 Rue Cujas, 75005 Paris, France",
      price: "FREE",
      link: "https://twitter.com/thesis_co",
      description: "The argument for and against full transparency on the blockchain.",

      eventType: "Meetup",
    },
    {
      eventsName: "ParisDotComm Day 1",
      organizer: "",
      date: "2022-07-19",
      startTime: "12:00",
      endTime: "20:00",
      location: "Institut du monde arabe - 1 Rue des Fossés Saint-Bernard, 75005 Paris",
      price: "€60",
      link: "https://parisdotcomm.org/",
      description: "3 days conferences and workshops around Polkadot ecosystem and cross chain interoperability",

      eventType: "Conference",
    },
    {
      eventsName: "Web3 Gaming and Metaverse Fireside Chats",
      organizer: "",
      date: "2022-07-19",
      startTime: "13:00",
      endTime: "17:00",
      location: "Ed3n House @ 4 Rue Laromiguiere, Paris, France",
      price: "FREE",
      link: "https://www.eventbrite.com/e/web3-gaming-and-metaverse-fireside-chats-limited-slots-only-tickets-374436980087",
      description:
        "Catch Web3 industry pioneers as they discuss the current state of the space, and how they are creating a global impact through the Metaverse",

      eventType: "Meetup",
    },
    {
      eventsName: "Interoperable SBTs",
      organizer: "",
      date: "2022-07-19",
      startTime: "14:00",
      endTime: "16:00",
      location: "French Theory - 18 Rue Cujas, 75005 Paris, France",
      price: "FREE",
      link: "https://www.ethccweek.fr/events/cooperation.org",
      description:
        "For enthusiasts of Soul-Bound Tokens, how can the different implementations of them usefully interoperate? Are there common schemas folks are using?",

      eventType: "Workshop",
    },
    {
      eventsName: "Web3 Start-up Pitch - Venturi Studio x PitchDAO",
      organizer: "",
      date: "2022-07-19",
      startTime: "15:00",
      endTime: "18:00",
      location: "The French Flair 75 Bis Bd de Clichy 75009 Paris",
      price: "FREE",
      link: "https://www.eventbrite.com/e/billets-web3-start-up-pitch-venturi-x-pitchdao-373232708077",
      description: "Start-up Pitch & Networking",

      eventType: "Meetup",
    },
    {
      eventsName: "Filecoin Meetup",
      organizer: "",
      date: "2022-07-19",
      startTime: "15:00",
      endTime: "",
      location: "Le Cercle LeBrun 47 Rue du Cardinal Lemoine 75005 Paris, France",
      price: "FREE",
      link: "https://www.eventbrite.com/e/filecoin-meetup-tickets-343436286177",
      description: "Join us for an exciting Filecoin meetup at ETHCC!",

      eventType: "Meetup",
    },
    {
      eventsName: "Real-world asset NFTs at Eiffel Tower",
      organizer: "",
      date: "2022-07-19",
      startTime: "17:30",
      endTime: "22:00",
      location: "Eiffel Tower, 5 Avenue Anatole France, 75007 Paris, France",
      price: "FREE",
      link: "Eiffel Tower, 5 Avenue Anatole France, 75007 Paris, France",
      description:
        "An event for decentralized pioneers, leaders, builders, and investors to talk about the future of NFTs and the tokenization of RWAs.",
      eventType: "Meetup",
    },
    {
      eventsName: "Voulez-vous DeFi avec moi ce soir?",
      organizer: "",
      date: "2022-07-19",
      startTime: "19;30",
      endTime: "02:00",
      location: "La Démesure sur Seine - 69 Port de la Rapée – 75012, Paris, France",
      price: "FREE",
      link: "https://www.eventbrite.fr/e/voulez-vous-defi-avec-moi-ce-soir-tickets-371264069827",
      description: "Launch event of our analytics and investment platform, with a panel, followed by a party.",
      eventType: "Meetup",
    },
    {
      eventsName: "ApérO - La crème de la crème of Polygon's ⛵️",
      organizer: "",
      date: "2022-07-19",
      startTime: "17:00",
      endTime: "21:00",
      location: "Les Maquereaux - Rive Gauche, 66 Quai d'Austerlitz, 75013 - Paris",
      price: "FREE",
      link: "https://www.eventbrite.ch/e/apero-on-la-seine-with-la-creme-de-la-creme-of-polygons-defi-protocols-tickets-382431401617",
      description:
        "No tickets for EthCC? No problem! Join us for a traditional Apéro on la Seine with « La crème de la crème » of Polygon’s DeFi protocols",

      eventType: "Party",
    },
    {
      eventsName: "DeFi Boat Apero",
      organizer: "",
      date: "2022-07-19",
      startTime: "18:00",
      endTime: "02:00",
      location: "La Péniche + 2 Port de la Tournelle, 75005 Paris, France",
      price: "FREE",
      link: "https://www.eventbrite.ch/e/defi-boat-apero-tickets-367540983977",
      description:
        "At the end of EthCC day 1, an exclusive event gathering crypto lovers co-organized by Ondefy, Jarvis Network and Mt Pelerin.",
      eventType: "Party",
    },
    {
      eventsName: "Cross-chain builders' meetup 👾 deBridge х Aurora",
      organizer: "",
      date: "2022-07-19",
      startTime: "18:00",
      endTime: "23:00",
      location: "STATION F, 5 Parvis Alan Turing",
      price: "FREE",
      link: "https://lu.ma/cross-chain-paris",
      description:
        "Talks about the current state of cross-chain development, challenges, and the road to seamless interoperability with the greatest builders of bridges + chill networking party",
      eventType: "Meetup",
    },
    {
      eventsName: "The New DeversiFi - Drinks Reception",
      organizer: "",
      date: "2022-07-19",
      startTime: "19:00",
      endTime: "22:00",
      location: "vIlvolo Bar Rooftop 257 Rue de Vaugirard, 75015 Paris",
      price: "FREE",
      link: "https://www.eventbrite.com/e/the-new-deversifi-private-drinks-reception-tickets-367464394897",
      description: "Join us for a night you won't forget!",
      eventType: "Party",
    },
    {
      eventsName: "Crypto Badies Talks: Crypto Money & NFT's talks by Womxn for Womxn",
      organizer: "",
      date: "2022-07-19",
      startTime: "19:00",
      endTime: "22:00",
      location: "8, rue de Candie 75008 Paris",
      price: "FREE",
      link: "https://www.eventbrite.fr/e/crypto-badies-talks-crypto-money-nfts-talks-by-womxn-for-womxn-tickets-377468256717",
      description:
        "Let's build a Web3 that looks like us. The badies raise their voices and will give insights and a different point of view about Web3. LFG",
      eventType: "Party",
    },
    {
      eventsName: "Sunset Mirage - Yacht Party",
      organizer: "",
      date: "2022-07-19",
      startTime: "19:00",
      endTime: "23:00",
      location: "Port de Grenelle, 75015 Parigi",
      price: "FREE",
      link: "https://www.eventbrite.com/e/sunset-mirage-yacht-party-tickets-379628407787",
      description: "Enjoy the sunset during a cruise on the Seine on the first night of ETHCC, Tuesday July 19th!",
      eventType: "Meetup",
    },
    {
      eventsName: "EthSécurité",
      organizer: "",
      date: "2022-07-19",
      startTime: "20:00",
      endTime: "02:00",
      location: "Secret (disclosed before the event)",
      price: "FREE",
      link: "",
      description:
        "Join Code4rena for an intimate night of cocktails and French house music in a secret subterranean location située in the Latin Quarter.",
      eventType: "Party",
    },
    {
      eventsName: "DAIvinity",
      organizer: "",
      date: "2022-07-19",
      startTime: "21:00",
      endTime: "",
      location: "The Bridge Club",
      price: "Follow sponsors on Twitter for tix",
      link: "https://twitter.com/Daivinity",
      description: "Network/Dance/Drink",
      eventType: "Party",
    },
    {
      eventsName: "Masquerade by Sismo",
      organizer: "",
      date: "2022-07-19",
      startTime: "22:00",
      endTime: "03:00",
      location: "Private Rooftop, view on the Eiffel Tower and Zikies",
      price: "Invite only",
      link: "https://twitter.com/SismoMasquerade",
      description: "Private Masquerade Ball organized by Sismo",
      eventType: "Party",
    },
    {
      eventsName: "Rekt Hopium 365",
      organizer: "",
      date: "2022-07-19",
      startTime: "22:00",
      endTime: "02:00",
      location: "Paris",
      price: "FREE",
      link: "https://rekt.news/rekt-event-rekt-hopium-ethcc5/",
      description: "We told you. we'll always have Paris.",
      eventType: "Party",
    },
  ],
  july20: [
    {
      eventsName: "Cafe du Voyageur: An EthCC Cafe for All - Day 2",
      organizer: "",
      date: "2022-07-20",
      startTime: "08:00",
      endTime: "18:00",
      location: "Nuage Café 14 Rue des Carmes 75005 Paris",
      price: "FREE",
      link: "https://www.eventbrite.com/e/eth-cc-oasis-tickets-378332150647?aff=Metrika",
      description:
        "Join us during ETH CC at our workspace cafe, a low-key space for working, meetings, talks, food, drinks, and friendship.",
      eventType: "Meetup",
    },
    {
      eventsName: "NEAR SPACE - Day 2",
      organizer: "",
      date: "2022-07-20",
      startTime: "09:00",
      endTime: "18:00",
      location: "La Péniche Paris. 2 Quai de la Tournelle, 75005 Paris, France",
      price: "FREE",
      link: "https://www.eventbrite.ie/e/near-space-powered-by-near-ua-ethcc-2022-tickets-377552819647",
      description:
        "Immerse yourself in three days of networking, workshops, and more hosted by the NEAR ecosystem and its community.",
      eventType: "Conference",
    },
    {
      eventsName: "Celo Connect Salon @ EthCC Week - Day 3",
      organizer: "",
      date: "2022-07-20",
      startTime: "10:00",
      endTime: "17:00",
      location: "8 Rue Frederic Sauton",
      price: "FREE",
      link: "https://www.ethccweek.fr/events/celoconnect.com/ethcc2022",
      description:
        "Celo Connect Salon is a community space to discuss topics aligned with Celo’s mission of prosperity for everyone.",
      eventType: "Conference",
    },
    {
      eventsName: "Talent Brunch @ Talent House Paris",
      organizer: "",
      date: "2022-07-20",
      startTime: "10:30",
      endTime: "",
      location: "18 Rue Lécuyer, 75018 Paris, France",
      price: "FREE",
      link: "https://lu.ma/talentbrunch",
      description:
        "Join us for brunch at Talent House where talented new builders from all around the world will have the chance to meet more experienced web3 founders and makers.",
      eventType: "Meetup",
    },
    {
      eventsName: "ConsenSys Connect Paris",
      organizer: "",
      date: "2022-07-20",
      startTime: "11:00",
      endTime: "18:00",
      location: "Les Salons de l'Architecte 47 Rue du Cardinal Lemoine 75005 Paris",
      price: "FREE",
      link: "https://www.eventbrite.com/e/consensys-connect-paris-tickets-377654022347",
      description:
        "Meet with MetaMask, Infura, and Truffle teams for talks, panels, and workshops on scaling, DAOs, permissionless innovation, and more.",
      eventType: "Meetup",
    },
    {
      eventsName: "ParisDotComm Day 2",
      organizer: "",
      date: "2022-07-20",
      startTime: "12:00",
      endTime: "20:00",
      location: "Institut du monde arabe - 1 Rue des Fossés Saint-Bernard, 75005 Paris",
      price: "FREE",
      link: "https://parisdotcomm.org/",
      description: "3 days conferences and workshops around Polkadot ecosystem and cross chain interoperability",
      eventType: "Conference",
    },
    {
      eventsName: "The 100% on chain Meetup",
      organizer: "",
      date: "2022-07-20",
      startTime: "13:00",
      endTime: "18:00",
      location: "To be decided",
      price: "FREE",
      link: "",
      description: "A meetup of like-minded people to talk about the future which should be 100% decentralized",
      eventType: "Meetup",
    },
    {
      eventsName: " Ecosystem Building with the Climate Collective",
      organizer: "",
      date: "2022-07-20",
      startTime: "14:00",
      endTime: "",
      location: "https://espacefutur.fr/ - 16 rue de la Corderie, 75003, Paris",
      price: "FREE",
      link: "https://www.eventbrite.com/e/ecosystem-building-with-the-climate-collective-tickets-378109133597",
      description:
        "Join us for a 2-part workshop where we will review ecosystem maps of Regenerative Finance (ReFi) projects, and discuss investments in the web3 x climate space!",
      eventType: "Workshop",
    },
    {
      eventsName: "BlueYard x EthCC — (On|Off) Chain",
      organizer: "",
      date: "2022-07-20",
      startTime: "15:00",
      endTime: "18:30",
      location: "Shared upon registration",
      price: "FREE",
      link: "https://blueyard.medium.com/blueyard-x-ethcc-on-off-chain-52f45b09611",
      description:
        "Join a small, curated group of experts and curious thinkers in an engaging set of sessions addressing questions about self-sovereign identity, zero knowledge technology, and decentralized computation.",
      eventType: "Workshop",
    },
    {
      eventsName: "DAOs and Builders à Paris",
      organizer: "",
      date: "2022-07-20",
      startTime: "16:00",
      endTime: "20:00",
      location: "La Terrasse de Paris 45 Rue Jussieu 75005 Paris",
      price: "€60",
      link: "https://www.eventbrite.pt/e/daos-and-builders-a-paris-tickets-367589639507",
      description:
        "Gnosis Chain and our friends DXdao and GitPOAP will be in Paris to discuss with you important topics in the web3 space.",
      eventType: "Meetup",
    },
    {
      eventsName: "Chainflip Livestream DJ Set (& AMA)",
      organizer: "",
      date: "2022-07-20",
      startTime: "16:00",
      endTime: "",
      location: "Secret location - address will be sent around 48 hours in advance",
      price: "FREE",
      link: "https://docs.google.com/forms/d/e/1FAIpQLScZ6wx6PZL-l3UfOSWk3HUCVXloS08iGvsYAjYRzeVHZSDA1Q/viewform",
      description:
        "An exclusive DJ livestream event (and AMA) from Chainflip for the cross-chain DEX curious. An opportunity to mix with Chainflip investors/supporters/friends at a small, intimate, and exclusive session.",
      eventType: "Party",
    },
    {
      eventsName: "Privacy Evolution with Aleo and Anoma",
      organizer: "",
      date: "2022-07-20",
      startTime: "16:00",
      endTime: "",
      location: "Pont Alexandre III, 75008 Paris The Bridge @ Pont Alexandre III",
      price: "FREE",
      link: "https://www.privacyevolution.paris/",
      description:
        "Join Aleo, Anoma and friends at ETHCC[5] to learn about about zero-knowledge cryptography and the future of individual privacy in Web3.",
      eventType: "Conference",
    },
    {
      eventsName: "EthCC (Ethereum Community Conference) - Day 2",
      organizer: "",
      date: "2022-07-20",
      startTime: "09:00",
      endTime: "",
      location: "Maison de la Mutualité 22 rue Saint Victor 75005 Paris",
      price: "FREE",
      link: "https://ethcc.io/",
      description:
        "EthCC (Ethereum Community Conference) will take place in Paris at the Maison de la Mutualité from the 19th to the 21st of July 2022.",
      eventType: "Conference",
    },
    {
      eventsName: "Neon Talk for devs",
      organizer: "",
      date: "2022-07-18",
      startTime: "17:00",
      endTime: "21:00",
      location: "Cyclone le studio 16 Rue Vulpian 75013 Paris France",
      price: "Free",
      link: " https://neon-labs.org/",
      description:
        " ",
      eventType: "Event",
    },
    {
      eventsName: "Kiln x Flowdesk Boat Party",
      organizer: "",
      date: "2022-07-20",
      startTime: "18:00",
      endTime: "",
      location: "La Péniche Paris - Location Péniche Paris, 2 Quai de la Tournelle, 75005 Paris",
      price: "FREE",
      link: "https://www.eventbrite.fr/e/ethcc-2022-kiln-x-flowdesk-boat-party-tickets-373258655687",
      description: "Flowdesk and Kiln are delighted to welcome you for a chill and casual boat party!",
      eventType: "Party",
    },
    {
      eventsName: "Archway & Frens @ EthCC Paris 2022",
      organizer: "",
      date: "2022-07-20",
      startTime: "18:00",
      endTime: "",
      location: "Sacré, 142 Rue Montmartre, 75002 Paris, France",
      price: "FREE",
      link: "https://lu.ma/archway-frens-ethcc-paris",
      description: "An evening of drinks at Sacre with Archway, Figment, Nomad & Connext",
      eventType: "Party",
    },
    {
      eventsName: "Alephium Meet-up",
      organizer: "",
      date: "2022-07-20",
      startTime: "18:00",
      endTime: "20:00",
      location: "Les Petite Fleches (dart bar) 49 rue Jean-Pierre Timbaud 75011 Paris  ",
      price: "FREE",
      link: "https://www.eventbrite.com/e/alephium-meet-up-tickets-382836222447",
      description: "Alephium's meet-up - meet the team, enjoy some nice food, drinks and a game of darts.",
      eventType: "Meetup",
    },
    {
      eventsName: "Exactly Finance Presentation and Testnet Demo @ EthCC Week",
      organizer: "",
      date: "2022-07-20",
      startTime: "19:00",
      endTime: "21:00",
      location: "11 Rue Portefoin, 75003 Paris, France",
      price: "FREE",
      link: "https://www.eventbrite.com.ar/e/exactly-finance-presentation-and-testnet-demo-ethcc-week-tickets-373312376367",
      description: "Exactly Finance Workshop in Paris",
      eventType: "Meetup",
    },
    {
      eventsName: "L'apéro UNgHOSTED - Meet-up",
      organizer: "",
      date: "2022-07-20",
      startTime: "19:00",
      endTime: "",
      location: "Le Carlie - 177 Rue Saint-Martin, 75003 Paris",
      price: "FREE",
      link: "https://www.eventbrite.com/e/billets-unghosted-meet-up-lapero-373548201727",
      description: "Join the ghosties meet-up / drink party for the first time in Paris",
      eventType: "Party",
    },
    {
      eventsName: "Born to Build",
      organizer: "",
      date: "2022-07-20",
      startTime: "19:00",
      endTime: "",
      location: "The Long Hop Pub Paris 25 Rue Frédéric Sauton 75005",
      price: "FREE",
      link: "https://twitter.com/MassaLabs/status/1542923424624005122",
      description: "Beers, Blockchain & Builders - an event by Massa x KYVE x Axelar.",
      eventType: "Party",
    },
    {
      eventsName: "Kleros x API3 | Bear Beers & Beats",
      organizer: "",
      date: "2022-07-20",
      startTime: "19:00",
      endTime: "01:00",
      location: "Le Hasard Ludique 128 Avenue de Saint-Ouen, 75018 Paris",
      price: "FREE",
      link: "https://www.eventbrite.com/e/kleros-x-api3-bear-beers-beats-tickets-381800895757",
      description: "Bullish on Beers & Beats: Party w/ KLEROS & API3",
      eventType: "Party",
    },
    {
      eventsName: "Crypto Comedy Club",
      organizer: "",
      date: "2022-07-20",
      startTime: "20:00",
      endTime: "",
      location: "Le Piano Vache - 5 rue Laplace 75005",
      price: "FREE",
      link: "https://www.eventbrite.fr/e/billets-crypto-comedy-club-ethcc-edition-379235933887",
      description:
        "Humor is coming to web3 ! Come laugh in the company of comedians on the first stand-up comedy show dedicated to crypto and NFT !",
      eventType: "Party",
    },
    {
      eventsName: "Cirque Du 1pouce",
      organizer: "",
      date: "2022-07-20",
      startTime: "20:00",
      endTime: "01:00",
      location: "Musee des Arts Forains - Museum of Fairground Arts 53 Avenue des Terroirs de France, 75012 Paris",
      price: "FREE",
      link: "https://www.eventbrite.co.uk/e/cirque-du-1pouce-tickets-379879498807",
      description: "Circus party from 1inch Network",
      eventType: "Party",
    },
    {
      eventsName: "Upgrade DAOs with Autonomous Services: Autonolas Protocol Launch Party",
      organizer: "",
      date: "2022-07-20",
      startTime: "20:00",
      endTime: "23:00",
      location: "WAB: We Are Brewers 16 Boulevard Jules Ferry, 75011 Paris",
      price: "FREE",
      link: "https://www.eventbrite.ch/e/upgrade-daos-with-autonomous-services-autonolas-protocol-launch-party-tickets-380979659417",
      description:
        "Join us for beers, networking and demos, including an introduction to Autonolas, the launch of our protocol and more.",
      eventType: "Party",
    },
    {
      eventsName: " Future of Money",
      organizer: "",
      date: "2022-07-20",
      startTime: "20:30",
      endTime: "",
      location: "Paris, France",
      price: "FREE",
      link: "https://www.eventbrite.com/e/futuremoney-paris-tickets-380572401297",
      description: "Meet up with the Web3.0 investors and researchers from FutureMoney Group!",
      eventType: "Meetup",
    },
    {
      eventsName: "La Degen",
      organizer: "",
      date: "2022-07-20",
      startTime: "22:00",
      endTime: "",
      location: "Paris",
      price: "FREE",
      link: "https://twitter.com/La_Degen",
      description: "Ooh La La !",
      eventType: "Party",
    },
  ],
  july21: [
    {
      eventsName: "rAAVE",
      organizer: "",
      date: "2022-07-21",
      startTime: "21:00",
      endTime: "",
      location: "Élysée Montmartre",
      price: "FREE",
      link: "https://www.eventbrite.co.uk/e/raave-paris-tickets-375122580737",
      description:
        "A ticketed event, join us for rAAVE Paris, an epic fête with music by Anstascia, Henri Bergmann, Parallells (Hybrid), and Veronika Fleyta b2b Xinobi, featuring lights by Tansen. LFGlow ✨",
      eventType: "Party",
    },
    {
      eventsName: "Private Traders Champagne Lounge",
      organizer: "",
      date: "2022-07-21",
      startTime: "18:00",
      endTime: "21:00",
      location: "Secret Location",
      price: "FREE",
      link: "https://www.eventbrite.com/e/private-traders-champagne-lounge-tickets-378539581077",
      description: "Small social event for investors and traders in DeFi",
      eventType: "Party",
    },
    {
      eventsName: "Cafe du Voyageur: An EthCC Cafe for All - Day 3",
      organizer: "",
      date: "2022-07-21",
      startTime: "08:00",
      endTime: "18:00",
      location: "Nuage Café 14 Rue des Carmes 75005 Paris",
      price: "FREE",
      link: "https://www.eventbrite.com/e/eth-cc-oasis-tickets-378332150647?aff=Metrika",
      description:
        "Join us during ETH CC at our workspace cafe, a low-key space for working, meetings, talks, food, drinks, and friendship.",
      eventType: "Meetup",
    },
    {
      eventsName: "Formal Verification for Fun and Profit",
      organizer: "",
      date: "2022-07-21",
      startTime: "09:00",
      endTime: "16:00",
      location: "Ecole Normale Superior, Amphitheater Evariste Galois, 45 Rue d’Ulm, Paris",
      price: "FREE",
      link: "https://www.certora.com/events/certora-prover-3-day-workshop/",
      description: "A workshop on the Certora Prover for beginners and experts alike",
      eventType: "Workshop",
    },
    {
      eventsName: "NEAR SPACE - Day 3",
      organizer: "",
      date: "2022-07-21",
      startTime: "09:00",
      endTime: "19:00",
      location: "La Péniche Paris. 2 Quai de la Tournelle, 75005 Paris, France",
      price: "FREE",
      link: "https://www.eventbrite.ie/e/near-space-powered-by-near-ua-ethcc-2022-tickets-377552819647",
      description:
        "Immerse yourself in three days of networking, workshops, and more hosted by the NEAR ecosystem and its community.",
      eventType: "Conference",
    },
    {
      eventsName: "Decentralized Breakfast x EthCC",
      organizer: "",
      date: "2022-07-21",
      startTime: "09:00",
      endTime: "10:00",
      location: "TBC, in the cafe nearby EthCC conference venue",
      price: "FREE",
      link: "https://www.eventbrite.com/e/decentralized-breakfast-x-ethcc-tickets-381790845697",
      description: "Welcome to network and discuss web3 ecosystem ",
      eventType: "Meetup",
    },
    {
      eventsName: "TezDev Paris",
      organizer: "",
      date: "2022-07-21",
      startTime: "09:30",
      endTime: "",
      location: "TFabrique Événementielle 52 ter Rue des Vinaigriers 75010 Paris",
      price: "FREE",
      link: "https://www.eventbrite.com/e/tezdev-paris-2022-developer-conference-web3-blockchain-tickets-348081309567",
      description: "Developer Conference",
      eventType: "Conference",
    },
    {
      eventsName: "Celo Connect Salon - Community & DAOs",
      organizer: "",
      date: "2022-07-21",
      startTime: "09:00",
      endTime: "16:30",
      location: "8 rue Frederic Sauton",
      price: "FREE",
      link: "https://www.ethccweek.fr/events/celoconnect.com/ethcc2022",
      description: "Join us on Thursday, 21 July to connect, learn, and discuss Community and DAOs",
      eventType: "Conference",
    },
    {
      eventsName: "Celo Connect Salon @ EthCC Week - Day 4",
      organizer: "",
      date: "2022-07-21",
      startTime: "10:00",
      endTime: "17:00",
      location: "8 rue Frederic Sauton",
      price: "FREE",
      link: "https://www.ethccweek.fr/events/celoconnect.com/ethcc2022",
      description:
        "Celo Connect Salon is a community space to discuss topics aligned with Celo’s mission of prosperity for everyone.",
      eventType: "Workshop",
    },
    {
      eventsName: "Crypto Brunch",
      organizer: "",
      date: "2022-07-21",
      startTime: "10:30",
      endTime: "13:00",
      location: "French Theory 18 Rue Cujas, 75005 Paris, France",
      price: "FREE",
      link: "https://twitter.com/thesis_co",
      description: "Hosted by Thesis*, builders of Tally Wallet, Keep/tBTC, Saddle, and Fold",
      eventType: "Meetup",
    },
    {
      eventsName: "CryptoEconDay @ EthCC",
      organizer: "",
      date: "2022-07-21",
      startTime: "11:00",
      endTime: "20:30",
      location: "La Terrasse de Paris → 45 Rue Jussieu 75005 Paris, France",
      price: "FREE",
      link: "https://www.cryptoeconday.io/",
      description:
        "CryptoEconDay is a gathering of Web 3 researchers and practitioners sharing findings, lessons learned, and our most challenging questions around the topic of cryptoeconomics.",
      eventType: "Conference",
    },
    {
      eventsName: "DeFi, Not Degen",
      organizer: "",
      date: "2022-07-21",
      startTime: "12:00",
      endTime: "113:00",
      location: "French Theory 18 Rue Cujas, 75005 Paris, France",
      price: "FREE",
      link: "https://twitter.com/thesis_co",
      description: "Flipping DeFi from degen to regen",
      eventType: "Meetup",
    },
    {
      eventsName: "ParisDotComm Day 3",
      organizer: "",
      date: "2022-07-21",
      startTime: "12:00",
      endTime: "20:00",
      location: "Institut du monde arabe - 1 Rue des Fossés Saint-Bernard, 75005 Paris",
      price: "€60",
      link: "https://parisdotcomm.org/",
      description: "3 days conferences and workshops around Polkadot ecosystem and cross chain interoperability",
      eventType: "Conference",
    },
    {
      eventsName: '"The Merge is coming" panel',
      organizer: "",
      date: "2022-07-21",
      startTime: "14:00",
      endTime: "16:30",
      location: "Kiln, 14 avenue Trudaine, 75009, Paris",
      price: "FREE",
      link: "https://www.eventbrite.fr/e/ethcc-2022-the-ethereum-merge-is-coming-panel-tickets-374319779537",
      description:
        "Ethereum experts (Ethereum Foundation, Paradigm, Flashbots, Rated, Lido) discussing the coming Merge update, hosted and moderated by Kiln.",
      eventType: "Conference",
    },
    {
      eventsName: "🔥IOSG ETHCC Dataverse Day🔥",
      organizer: "",
      date: "2022-07-21",
      startTime: "14:00",
      endTime: "18:00",
      location: "Les Salons de l’Architecte (47, rue du Cardinal Lemoine 75005 Paris - France)",
      price: "FREE",
      link: "https://www.eventbrite.hk/e/ethcc-paris-iosg-dataverse-day-tickets-380125895787?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=cp&aff=escb",
      description: "Empowering Web3 Data",
      eventType: "Meetup",
    },
    {
      eventsName: "Tigray Art Collective in Paris",
      organizer: "",
      date: "2022-07-21",
      startTime: "16:00",
      endTime: "20:00",
      location: "Galerie Les Cerisier 42 Quai des célestins 75004 Paris, France",
      price: "FREE",
      link: "https://www.tigrayartcollective.org/events-1",
      description:
        "We have a series of artists from all over the world depicting the genocidal war in Tigray Ethiopia. We are displaying NFTs, prints, and original pieces for sale. All proceeds are going to help refugees suffering from the ethnic cleansing taking place.",
      eventType: "Meetup",
    },
    {
      eventsName: "EthCC (Ethereum Community Conference) - Day 3",
      organizer: "",
      date: "2022-07-21",
      startTime: "09:00",
      endTime: "",
      location: "Maison de la Mutualité 22 rue Saint Victor 75005 Paris",
      price: "FREE",
      link: "https://ethcc.io/",
      description:
        "EthCC (Ethereum Community Conference) will take place in Paris at the Maison de la Mutualité from the 19th to the 21st of July 2022.",
      eventType: "Conference",
    },
    {
      eventsName: "Spearbit & L1 Digital: Pop Up Party!",
      organizer: "",
      date: "2022-07-21",
      startTime: "17:00",
      endTime: "20:00",
      location: "14 Rue Abel 75012 Paris France",
      price: "FREE",
      link: "https://www.eventbrite.com/e/spearbit-l1-digital-ethcc-paris-pop-up-party-tickets-377365419127",
      description: "Join us in Paris during ETH CC for an evening of networking accompanied by a live performance.",
      eventType: "Party",
    },
    {
      eventsName: "Beer & Web3",
      organizer: "",
      date: "2022-07-21",
      startTime: "18:00",
      endTime: "21:00",
      location: "Chez Camille - (Gare de Lyon / Bastille) 8 Place d'Aligre, 75012 Paris",
      price: "FREE",
      link: "https://www.eventbrite.fr/e/beer-web3-ethcc-2022-tickets-380231421417",
      description: "✨✨Join us for the 5th of Beer & Web3 ✨✨",
      eventType: "Meetup",
    },
    {
      eventsName: "Web3conferences - Build in Bear Market",
      organizer: "",
      date: "2022-07-21",
      startTime: "18:30",
      endTime: "",
      location: "Deskopolitan Voltaire",
      price: "FREE",
      link: "https://workinblockchain.io/event/web3-conferences-wib/",
      description:
        "Come meet the Web3 community and builders, and learn their tips on how to build a product in a bear market. We invite 3 main players from the French ecosystem!",
      eventType: "Meetup",
    },
    {
      eventsName: "Invest, Collab & Research | Web3 Builder Party",
      organizer: "",
      date: "2022-07-21",
      startTime: "19:00",
      endTime: "22:30",
      location: "Gustave + Port de Suffren, 75007 Paris",
      price: "€99.99 - €999.99",
      link: "https://www.eventbrite.com/e/invest-collab-research-web3-builder-party-tickets-377176283417?aff=ebdssbdestsearch",
      description:
        "An exclusive Web3 Builder Party hosted by Cipholio Ventures and BitMart on the last day of EthCC Paris, with a spectacular view of Eiffel Tower, and Crypto Lovers to connect with.",
      eventType: "Party",
    },
    {
      eventsName: "The Cross Chain Cocktail Party",
      organizer: "",
      date: "2022-07-21",
      startTime: "20:00",
      endTime: "02:00",
      location: "Venue: Mademoiselle Mouche Address: Pont de l'Alma, Port de la Conférence, 75008 Paris, France",
      price: "FREE",
      link: "https://www.eventbrite.com/e/cross-chain-cocktail-party-tickets-368452008877",
      description:
        "Didn't get tickets to EthCC Paris? We feel you... Join the Cross Chain Coalition for a night filled with live DJs, unique cocktails, and fantastic rooftop views of the Eiffel Tower at the iconic Mademoiselle Mouche. Swing by and network with our partners, builders, and investors as we take this party cross chain.",
      eventType: "Party",
    },
    {
      eventsName: "EthCC official After Party",
      organizer: "",
      date: "2022-07-21",
      startTime: "20:30",
      endTime: "04:00",
      location: "https://www.eventbrite.com/e/cross-chain-cocktail-party-tickets-368452008877",
      price: "FREE",
      link: "",
      description: "Come join us for the official EthCC afterparty!",
      eventType: "Party",
    },
  ],
  july22: [
    {
      eventsName: "Solidity 0 to 1 for Developers",
      organizer: "",
      date: "2022-07-22",
      startTime: "08:45",
      endTime: "18:00",
      location: "Ecole Supérieure d'Ingénieurs Léonard de Vinci",
      price: "FREE",
      link: "https://cryptocurrencyworkshop.github.io/",
      description: "An educational workshop for bystander developers who want to break into the cryptocurrency space.",
      eventType: "Meetup",
    },
    {
      eventsName: "StarknetCC",
      organizer: "",
      date: "2022-07-22",
      startTime: "09:30",
      endTime: "",
      location: "Comet - Bourse",
      price: "FREE",
      link: "https://www.starknet.cc/",
      description: "A celebration of the StarkNet Ecosystem",
      eventType: "Conference",
    },
    {
      eventsName: "Nebular Summit Paris",
      organizer: "",
      date: "2022-07-22",
      startTime: "10:00",
      endTime: "19:00",
      location: "La Caserne Paris, 12 rue philippe de girard 75010 paris",
      price: "FREE",
      link: "https://nebular.paris/",
      description: "An event to celebrate the Cosmos & Interchain Ecosystem",
      eventType: "Conference",
    },
    {
      eventsName: "Sustainable Blockchain Summit and Hackathon",
      organizer: "",
      date: "2022-07-22",
      startTime: "10:00",
      endTime: "19:00",
      location: "Le 28 George V, 28 Avenue George V, Paris, France",
      price: "$99",
      link: "https://sbs.tech/",
      description:
        "Two days of talks, workshops and discussions on how we can work together to develop and build greener blockchain solutions.",
      eventType: "Conference",
    },
    {
      eventsName: "BrunchPool Ink",
      organizer: "",
      date: "2022-07-22",
      startTime: "11:00",
      endTime: "",
      location: `Boat "L'Atelier" Quai Henry IV Paris`,
      price: "FREE",
      link: "https://blackpool.finance/events",
      description: '"a coffee, a croissant and a tattoo please"',
      eventType: "Party",
    },
    {
      eventsName: "Web3TalentFair",
      organizer: "",
      date: "2022-07-22",
      startTime: "14:00",
      endTime: "21:00",
      location: "Maison de la Mutualité, Paris",
      price: "FREE",
      link: "https://web3talentfair.tech/",
      description:
        "Explore the Futur of Work through a set of panel discussions, workshops and many jobs offered by our co-builders",
      eventType: "Meetup",
    },
    {
      eventsName: "EthCC Hack 2022",
      organizer: "",
      date: "2022-07-22",
      startTime: "14:00",
      endTime: "20:00",
      location: "10th arrondissement, Paris, France",
      price: "FREE",
      link: "https://ethcchack.com/",
      description:
        "Dive into regen summer with EthCC Hack 2022. We are excited to bring together 300 developers, creators, product managers, designer and experts to work on the future of finance in Paris!",
      eventType: "Hackathon",
    },
    {
      eventsName: "Web 3.0 Chess Meetup",
      organizer: "",
      date: "2022-07-22",
      startTime: "14:00",
      endTime: "17:00",
      location: "BlitzSociety 4 rue du Sabot 75006 Paris",
      price: "FREE",
      link: "https://www.eventbrite.com/e/web-30-chess-meetup-ethcc-tickets-383587649987",
      description:
        "Chess meet-up for the crypto community coming to ETHCC in Paris. - All skill levels welcomed - Boards and pieces provided",
      eventType: "Meetup",
    },
    {
      eventsName: "Non Fungible Auction - 1st Anniversary",
      organizer: "",
      date: "2022-07-22",
      startTime: "17:00",
      endTime: "",
      location: "Quai Henry IV - Bateau l'Atelier",
      price: "FREE",
      link: "https://www.eventcreate.com/e/nfa-anniversary",
      description: "1 YEAR OF CHARITY ...",
      eventType: "Meetup",
    },
    {
      eventsName: "Scroll Meetup @Paris 2022",
      organizer: "",
      date: "2022-07-22",
      startTime: "18:00",
      endTime: "00:00",
      location: "Avenue des Champs-Élysées",
      price: "FREE",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSeHqa_zudhtUtMb0gf7DENyHRcKRV4TO3QppHHa9XIYq_Wkqw/viewform?usp=send_form",
      description:
        "Scroll Meetup à Paris - hear the latest development of Scroll and meet some team members + ecosystem partners here with culinary delights, cocktails, Eiffel Tower view, and good music.",
      eventType: "Meetup",
    },
    {
      eventsName: "Shooting Starks | StarkNet Party",
      organizer: "",
      date: "2022-07-22",
      startTime: "21:00",
      endTime: "02:00",
      location: "Comet Bourse: 35 Rue Saint-Marc, 75002 Paris, France",
      price: "FREE",
      link: "https://www.eventbrite.com/e/shooting-starks-starknet-party-tickets-371024182317",
      description:
        "An evening of music, drinks, and dad jokes to close out EthCC and StarkNet CC week with fellow Starkies.",
      eventType: "Party",
    },
  ],
  july23: [
    {
      eventsName: "Sustainable Blockchain Submmit",
      organizer: "",
      date: "2022-07-23",
      startTime: "10:00",
      endTime: "19:00",
      location: "Le 28 Geirge V 28 Avenue Groege V 75008 Paris France",
      price: "$99 - $199",
      link: "https://www.eventbrite.com/e/paris-web3-week-and-ethcc-hackathon-closing-party-tickets-380231852707",
      description: "-",
      eventType: "Conference",
    },
  ],
  july24: [
    {
      eventsName: "Paris Web3 Week and EthCC Hackathon Closing Party",
      organizer: "",
      date: "2022-07-24",
      startTime: "20:00",
      endTime: "02:00",
      location: "Secret location - 1st arrondissement",
      price: "FREE",
      link: "https://www.eventbrite.com/e/paris-web3-week-and-ethcc-hackathon-closing-party-tickets-380231852707",
      description:
        "Celebrate the closing of Paris Web3 Week and Ethcc Hackathon participants and winners with Zora, Aglaé Ventures and all the Hackathon Sponsors - Secret location to be disclosed soon",
      eventType: "Party",
    },
  ],
};

const program_by_day_keyboard = [
  [
    {
      text: "19-July",
      callback_data: "program_by_day_19",
    },
  ],
  [
    {
      text: "20-July",
      callback_data: "program_by_day_20",
    },
  ],
  [
    {
      text: "21-July",
      callback_data: "program_by_day_21",
    },
  ],
];
const type_con_by_day_keyboard_19 = [
  [
    {
      text: "Talk",
      callback_data: "type_talk_19",
    },
    {
      text: "Workshop",
      callback_data: "type_workshop_19",
    },
  ],
  [
    {
      text: "↩ Back to selection",
      callback_data: "back_to_selection_program",
    },
  ],
];
const type_con_by_day_keyboard_20 = [
  [
    {
      text: "Talk",
      callback_data: "type_talk_20",
    },
    {
      text: "Workshop",
      callback_data: "type_workshop_20",
    },
  ],
  [
    {
      text: "↩ Back to selection",
      callback_data: "back_to_selection_program",
    },
  ],
];
const type_con_by_day_keyboard_21 = [
  [
    {
      text: "Talk",
      callback_data: "type_talk_21",
    },
    {
      text: "Workshop",
      callback_data: "type_workshop_21",
    },
  ],
  [
    {
      text: "I have an idea for EthCC",
      callback_data: "type_idea_21",
    },
  ],
  [
    {
      text: "↩ Back to selection",
      callback_data: "back_to_selection_program",
    },
  ],
];

bot.command("program", (ctx) => {
  try {
    ctx.reply(`Choose a day:                 .`, {
      reply_markup: {
        inline_keyboard: program_by_day_keyboard,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

bot.action("program_by_day_19", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  ctx.reply(`Select conference type:`, {
    reply_markup: {
      inline_keyboard: type_con_by_day_keyboard_19,
    },
  });
});
bot.action("program_by_day_20", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  ctx.reply(`Select conference type:`, {
    reply_markup: {
      inline_keyboard: type_con_by_day_keyboard_20,
    },
  });
});
bot.action("program_by_day_21", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  ctx.reply(`Select conference type:`, {
    reply_markup: {
      inline_keyboard: type_con_by_day_keyboard_21,
    },
  });
});

const lastResFunc = (res, count) => {
  return res[count].map((event) => {
    return `
📌 <b>${event.eventName}</b>
🗣 ${event.speaker}
🕒 ${event.date} | ${event.startTime} - ${event.endTime} | ${event.duation}
📍 ${event.venue}
📢 ${event.type}`;
  });
};

const programViewFunc = (res, count) => {
  if (res.length > 0 && res.length < 11) {
    const lastResult = lastResFunc([res], count);
    return [lastResult];
  } else if (res.length > 10) {
    const arr = [];
    for (let i = 0; i < res.length; i += 10) {
      const chunk = res.slice(i, i + 10);
      arr.push(chunk);
    }
    const lastResult = lastResFunc(arr, count);
    return [lastResult];
  } else {
    console.log("error");
  }
};
// Talk Talk Talk
bot.action("type_talk_19", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july19.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 0);
  ctx.replyWithHTML(
    `<b>Tuesday, July 19th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("➡ Next", "next_talk_by_day_19_1")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});

bot.action("next_talk_by_day_19_1", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july19.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 1);
  ctx.replyWithHTML(
    `<b>Tuesday, July 19th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "type_talk_19")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_19_2")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_19_2", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july19.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 2);
  ctx.replyWithHTML(
    `<b>Tuesday, July 19th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_19_1")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_19_3")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_19_3", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july19.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 3);
  ctx.replyWithHTML(
    `<b>Tuesday, July 19th</b>
${newRes[0].join(`
`)}
@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_19_2")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_19_4")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_19_4", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july19.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 4);
  ctx.replyWithHTML(
    `<b>Tuesday, July 19th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_19_3")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_19_5")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_19_5", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july19.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 5);
  ctx.replyWithHTML(
    `<b>Tuesday, July 19th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_19_4")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_19_6")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_19_6", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july19.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 6);
  ctx.replyWithHTML(
    `<b>Tuesday, July 19th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_19_5")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_19_7")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_19_7", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july19.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 7);
  ctx.replyWithHTML(
    `<b>Tuesday, July 19th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_19_6")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_19_8")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_19_8", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july19.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 8);
  ctx.replyWithHTML(
    `<b>Tuesday, July 19th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_19_7")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_19_9")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_19_9", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july19.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 9);
  ctx.replyWithHTML(
    `<b>Tuesday, July 19th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_19_8")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("type_workshop_19", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july19.filter((event) => {
    return event.type[0] == "W";
  });
  const newRes = programViewFunc(res, 0);
  ctx.replyWithHTML(
    `<b>Tuesday, July 19th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([[Markup.button.callback("↩ Bact to select", "back_to_selection_program")]])
  );
});

bot.action("type_talk_20", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july20.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 0);
  ctx.replyWithHTML(
    `<b>Wednesday, July 20th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("➡ Next", "next_talk_by_day_20_1")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_20_1", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july20.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 1);
  ctx.replyWithHTML(
    `<b>Wednesday, July 20th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "type_talk_20")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_20_2")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_20_2", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july20.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 2);
  ctx.replyWithHTML(
    `<b>Wednesday, July 20th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_20_1")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_20_3")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_20_3", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july20.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 3);
  ctx.replyWithHTML(
    `<b>Wednesday, July 20th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_20_2")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_20_4")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_20_4", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july20.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 4);
  ctx.replyWithHTML(
    `<b>Wednesday, July 20th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_20_3")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_20_5")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_20_5", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july20.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 5);
  ctx.replyWithHTML(
    `<b>Wednesday, July 20th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_20_4")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_20_6")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_20_6", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july20.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 6);
  ctx.replyWithHTML(
    `<b>Wednesday, July 20th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_20_5")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_20_7")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_20_7", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july20.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 7);
  ctx.replyWithHTML(
    `<b>Wednesday, July 20th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_20_6")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_20_8")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_20_8", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july20.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 8);
  ctx.replyWithHTML(
    `<b>Wednesday, July 20th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_20_7")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_20_9")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_20_9", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july20.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 9);
  ctx.replyWithHTML(
    `<b>Wednesday, July 20th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_20_8")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("type_workshop_20", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july20.filter((event) => {
    return event.type[0] == "W";
  });
  const newRes = programViewFunc(res, 0);
  ctx.replyWithHTML(
    `<b>Wednesday, July 20th</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([[Markup.button.callback("↩ Bact to select", "back_to_selection_program")]])
  );
});

bot.action("type_talk_21", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july21.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 0);
  ctx.replyWithHTML(
    `<b>Thursday, July 21st</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("➡ Next", "next_talk_by_day_21_1")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_21_1", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july21.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 1);
  ctx.replyWithHTML(
    `<b>Thursday, July 21st</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "type_talk_21")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_21_2")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_21_2", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july21.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 2);
  ctx.replyWithHTML(
    `<b>Thursday, July 21st</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_21_1")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_21_3")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_21_3", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july21.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 3);
  ctx.replyWithHTML(
    `<b>Thursday, July 21st</b>
  ${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_21_2")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_21_4")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_21_4", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july21.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 4);
  ctx.replyWithHTML(
    `<b>Thursday, July 21st</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_21_3")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_21_5")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_21_5", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july21.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 5);
  ctx.replyWithHTML(
    `<b>Thursday, July 21st</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_21_4")],
      [Markup.button.callback("➡ Next", "next_talk_by_day_21_6")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("next_talk_by_day_21_6", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july21.filter((event) => {
    return event.type[0] == "T";
  });
  const newRes = programViewFunc(res, 6);
  ctx.replyWithHTML(
    `<b>Thursday, July 21st</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⬅ Prev", "next_talk_by_day_21_5")],
      [Markup.button.callback("↩ Bact to select", "back_to_selection_program")],
    ])
  );
});
bot.action("type_workshop_21", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july21.filter((event) => {
    return event.type[0] == "W";
  });
  const newRes = programViewFunc(res, 0);
  ctx.replyWithHTML(
    `<b>Thursday, July 21st</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([[Markup.button.callback("↩ Bact to select", "back_to_selection_program")]])
  );
});
bot.action("type_idea_21", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  const res = programEvents.july21.filter((event) => {
    return event.type[0] == "I";
  });
  const newRes = programViewFunc(res, 0);
  ctx.replyWithHTML(
    `<b>Thursday, July 21st</b>
${newRes[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
    Markup.inlineKeyboard([[Markup.button.callback("↩ Bact to select", "back_to_selection_program")]])
  );
});

const zeroTime = (date) => {
  if (date.toString().length == 1 && date !== 0) {
    return `0${date}`;
  } else if (date == 0) {
    return `0${date}`;
  } else {
    return date;
  }
};

bot.command("now", async (ctx) => {
  const nDate = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Paris",
  });
  const newDate = nDate.split(" ");
  const newTime = newDate[1].split(":");
  const getTime = `${zeroTime(newTime[0])}:${zeroTime(newTime[1])}`;
  const newGetDate = newDate[0].split(".");
  const getDate = newGetDate[0];
  const getMonth = newGetDate[1];
  const newEvents = () => {
    if (getDate == 19 && getMonth == 7) {
      const events = programEvents.july19;
      const nowArrayEvents = events.filter((event) => {
        if (getTime >= event.startTime && getTime <= event.endTime) {
          return event;
        }
      });
      return nowArrayEvents;
    } else if (getDate == 20 && getMonth == 7) {
      const events = programEvents.july20;
      const nowArrayEvents = events.filter((event) => {
        if (getTime >= event.startTime && getTime <= event.endTime) {
          return event;
        }
      });
      return nowArrayEvents;
    } else if (getDate == 21 && getMonth == 7) {
      const events = programEvents.july21;
      const nowArrayEvents = events.filter((event) => {
        if (getTime >= event.startTime && getTime <= event.endTime) {
          return event;
        }
      });
      return nowArrayEvents;
    } else {
      return false;
    }
  };

  const newEventsArr = newEvents();
  if (newEventsArr.length <= 0 || !newEventsArr) {
    ctx.replyWithHTML("Porgram list is empty");
    return false;
  }
  const nowEvents = newEventsArr.map((event) => {
    return `
📌 <b>${event.eventName}</b>
🗣 ${event.speaker}
🕒 ${event.date} | ${event.startTime} - ${event.endTime} | ${event.duation}
📍 ${event.venue}
📢 ${event.type}`;
  });
  ctx.replyWithHTML(`Now:
${nowEvents.join(`

`)}`);
});

bot.action("back_to_selection_program", async (ctx) => {
  await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  ctx.reply(`Choose a day:                 .`, {
    reply_markup: {
      inline_keyboard: program_by_day_keyboard,
    },
  });
});

const sideEvents_by_day_keyboard = [
  [
    {
      text: "15-July",
      callback_data: "sideEvents_by_day_15",
    },
    {
      text: "16-July",
      callback_data: "sideEvents_by_day_16",
    },
    {
      text: "17-July",
      callback_data: "sideEvents_by_day_17",
    },
  ],
  [
    {
      text: "18-July",
      callback_data: "sideEvents_by_day_18",
    },
    {
      text: "19-July",
      callback_data: "sideEvents_by_day_19",
    },
    {
      text: "20-July",
      callback_data: "sideEvents_by_day_20",
    },
  ],
  [
    {
      text: "21-July",
      callback_data: "sideEvents_by_day_21",
    },
    {
      text: "22-July",
      callback_data: "sideEvents_by_day_22",
    },
    {
      text: "23-July",
      callback_data: "sideEvents_by_day_23",
    },
  ],
  [
    {
      text: "24-July",
      callback_data: "sideEvents_by_day_24",
    },
  ],
];


const sideEventsFunc = (sideEventsArray) => {
  if (!sideEventsArray || sideEventsArray.length === 0) {
    ctx.replyWithHTML("Side Events are empty");
  } else if (sideEventsArray.length > 10) {
    const res = [];
    for (let i = 0; i < sideEventsArray.length; i += 10) {
      const chunk = sideEventsArray.slice(i, i + 10);
      res.push(chunk);
    }
    return res.map((arr) => {
      return arr.map((events) => {
        return `
📌 <b>${events.eventsName}</b>
🕓 ${events.date} | ${events.startTime} ${!events.endTime ? "" : `- ${events.endTime}`}
📍 ${events.location}
💶 ${events.price}
📢 ${events.eventType}
${!events.link ? "" : `<i><a href='${events.link}'>Website</a></i> ↗`}
`;
      });
    });
  } else {
    const res = sideEventsArray.map((events) => {
      return `
📌 <b>${events.eventsName}</b>
🕓 ${events.date} | ${events.startTime} ${!events.endTime ? "" : `- ${events.endTime}`}
📍 ${events.location}
💶 ${events.price}
📢 ${events.eventType}
${!events.link ? "" : `<i><a href='${events.link}'>Website</a></i> ↗`}
`;
    });
    return [res];
  }
};

bot.command("sideevents", (ctx) => {
  try {
    ctx.reply(`Choose a day:                 .`, {
      reply_markup: {
        inline_keyboard: sideEvents_by_day_keyboard,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

bot.action("sideEvents_by_day_15", async (ctx) => {
  try {
    const sideEventsArray = sideEvents.july15;
    const res = sideEventsFunc(sideEventsArray);
    res.map((events) => {
      ctx.replyWithHTML(
        `Friday, July 15
      
  ${events.join(``)}
  
  @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_selection")]]),
        {
          disable_web_page_preview: true,
        }
      );
    });
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  } catch (error) {
    console.error(error);
  }
});
bot.action("sideEvents_by_day_16", async (ctx) => {
  try {
    const sideEventsArray = sideEvents.july16;
    const res = sideEventsFunc(sideEventsArray);
    res.map((events) => {
      ctx.replyWithHTML(
        `Saturday, July 16
      
  ${events.join(``)}
  
  @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_selection")]]),
        {
          disable_web_page_preview: true,
        }
      );
    });
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  } catch (error) {
    console.error(error);
  }
});
bot.action("sideEvents_by_day_17", async (ctx) => {
  try {
    const sideEventsArray = sideEvents.july17;
    const res = sideEventsFunc(sideEventsArray);
    res.map((events) => {
      ctx.replyWithHTML(
        `Sunday, July 17
      
${events.join(``)}

@ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_selection")]]),
        {
          disable_web_page_preview: true,
        }
      );
    });
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  } catch (error) {
    console.error(error);
  }
});
bot.action("sideEvents_by_day_18", async (ctx) => {
  try {
    const sideEventsArray = sideEvents.july18;
    const res = sideEventsFunc(sideEventsArray);
    if (res.length === 2) {
      ctx.replyWithHTML(
        `Monday, July 18
        
${res[0].join(``)}
    
@ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("➡ Next", "next_18")],
          [Markup.button.callback("↩ Back to selection", "back_to_selection")],
        ])
      );
    } else {
      res.map((events) => {
        ctx.replyWithHTML(
          `Monday, July 18
        
${events.join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
          Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_selection")]]),
          {
            disable_web_page_preview: true,
          }
        );
      });
    }

    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  } catch (error) {
    console.error(error);
  }
});
bot.action("sideEvents_by_day_19", async (ctx) => {
  try {
    const sideEventsArray = sideEvents.july19;
    const res = sideEventsFunc(sideEventsArray);
    if (res.length >= 2) {
      ctx.replyWithHTML(
        `Tuesday, July 19
        
${res[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("➡ Next", "next_19")],
          [Markup.button.callback("↩ Back to selection", "back_to_selection")],
        ])
      );
    } else {
      res.map((events) => {
        ctx.replyWithHTML(
          `Tuesday, July 19
        
${events.join(``)}

@ethparisbot stay tuned without leaving telegram.`,
          Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_selection")]]),
          {
            disable_web_page_preview: true,
          }
        );
      });
    }
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  } catch (error) {
    console.error(error);
  }
});
bot.action("sideEvents_by_day_20", async (ctx) => {
  try {
    const sideEventsArray = sideEvents.july20;
    const res = sideEventsFunc(sideEventsArray);
    if (res.length >= 2) {
      ctx.replyWithHTML(
        `Wednesday, July 20
        
${res[0].join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("➡ Next", "next_20")],
          [Markup.button.callback("↩ Back to selection", "back_to_selection")],
        ])
      );
    } else {
      res.map((events) => {
        ctx.replyWithHTML(
          `Wednesday, July 20
        
${events.join(``)}

@ethparisbot stay tuned without leaving telegram.`,
          Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_selection")]]),
          {
            disable_web_page_preview: true,
          }
        );
      });
    }
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  } catch (error) {
    console.error(error);
  }
});
bot.action("sideEvents_by_day_21", async (ctx) => {
  try {
    const sideEventsArray = sideEvents.july21;
    const res = sideEventsFunc(sideEventsArray);

    if (res.length >= 2) {
      ctx.replyWithHTML(
        `Thursday, July 21
        
${res[0].join(``)}

@ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("➡ Next", "next_21")],
          [Markup.button.callback("↩ Back to selection", "back_to_selection")],
        ])
      );
    } else {
      res.map((events) => {
        ctx.replyWithHTML(
          `Thursday, July 21
        
    ${events.join(`
    `)}
@ethparisbot stay tuned without leaving telegram.`,
          Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_selection")]]),
          {
            disable_web_page_preview: true,
          }
        );
      });
    }
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  } catch (error) {
    console.error(error);
  }
});
bot.action("sideEvents_by_day_22", async (ctx) => {
  try {
    const sideEventsArray = sideEvents.july22;
    const res = sideEventsFunc(sideEventsArray);

    if (res.length >= 2) {
      ctx.replyWithHTML(
        `Friday, July 22
        
${res[0].join(``)}

@ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("➡ Next", "next_22")],
          [Markup.button.callback("↩ Back to selection", "back_to_selection")],
        ])
      );
    } else {
      res.map((events) => {
        ctx.replyWithHTML(
          `Friday, July 22
        
${events.join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
          Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_selection")]]),
          {
            disable_web_page_preview: true,
          }
        );
      });
    }
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  } catch (error) {
    console.error(error);
  }
});
bot.action("sideEvents_by_day_23", async (ctx) => {
  try {
    const sideEventsArray = sideEvents.july23;
    const res = sideEventsFunc(sideEventsArray);
    if (res.length >= 2) {
      ctx.replyWithHTML(
        `Saturday, July 23
        
${res[0].join(``)}

@ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_selection")]]),
        Markup.inlineKeyboard([
          [Markup.button.callback("➡ Next", "next_23")],
          [Markup.button.callback("↩ Back to selection", "back_to_selection")],
        ])
      );
    } else {
      res.map((events) => {
        ctx.replyWithHTML(
          `Saturday, July 23
        
${events.join(`
`)}

@ethparisbot stay tuned without leaving telegram.`,
          Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_selection")]]),
          {
            disable_web_page_preview: true,
          }
        );
      });
    }
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  } catch (error) {
    console.error(error);
  }
});
bot.action("sideEvents_by_day_24", async (ctx) => {
  try {
    const sideEventsArray = sideEvents.july24;
    const res = sideEventsFunc(sideEventsArray);
    if (res.length >= 2) {
      ctx.replyWithHTML(
        `Sunday, July 24
        
${res[0].join(``)}

@ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("➡ Next", "next_24")],
          [Markup.button.callback("↩ Back to selection", "bact_to_selection")],
        ])
      );
    } else {
      res.map((events) => {
        ctx.replyWithHTML(
          `Sunday, July 24
        
    ${events.join(`
    `)}

    @ethparisbot stay tuned without leaving telegram.`,
          Markup.inlineKeyboard([[Markup.button.callback("↩️ Back to selection", "back_to_selection")]]),
          {
            disable_web_page_preview: true,
          }
        );
      });
    }
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  } catch (error) {
    console.error(error);
  }
});

bot.action("next_18", async (ctx) => {
  try {
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    const sideEventsArray = sideEvents.july18;
    const res = sideEventsFunc(sideEventsArray);
    if (res.length > 3) {
      ctx.replyWithHTML(
        `Monday, July 18
        
    ${res[1].join(`
    `)}
    
    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          ,
          [Markup.button.callback("⬅ Prev", "sideEvents_by_day_18")],
          [Markup.button.callback("➡ Next", "next_two_18")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    } else {
      ctx.replyWithHTML(
        `Monday, July 18
        
    ${res[1].join(`
    `)}

    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "sideEvents_by_day_18")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
});
bot.action("next_19", async (ctx) => {
  try {
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    const sideEventsArray = sideEvents.july19;
    const res = sideEventsFunc(sideEventsArray);
    if (res.length >= 3) {
      ctx.replyWithHTML(
        `Tuesday, July 19
        
    ${res[1].join(``)}
    
    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "sideEvents_by_day_19")],
          [Markup.button.callback("➡ Next", "next_two_19")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    } else {
      ctx.replyWithHTML(
        `Tuesday, July 19
        
    ${res[1].join(`
    `)}

    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "sideEvents_by_day_19")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
});
bot.action("next_20", async (ctx) => {
  try {
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    const sideEventsArray = sideEvents.july20;
    const res = sideEventsFunc(sideEventsArray);
    if (res.length === 3) {
      ctx.replyWithHTML(
        `Wednesday, July 20
        
    ${res[1].join(`
    `)}
    
    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "sideEvents_by_day_20")],
          [Markup.button.callback("➡ Next", "next_two_20")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    } else {
      ctx.replyWithHTML(
        `Wednesday, July 20
        
    ${res[1].join(`
    `)}

    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "sideEvents_by_day_20")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
});
bot.action("next_21", async (ctx) => {
  try {
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    const sideEventsArray = sideEvents.july21;
    const res = sideEventsFunc(sideEventsArray);
    if (res.length === 3) {
      ctx.replyWithHTML(
        `Thursday, July 21
        
    ${res[1].join(`
    `)}
    
    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "sideEvents_by_day_21")],
          [Markup.button.callback("➡ Next", "next_two_21")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    } else {
      ctx.replyWithHTML(
        `Thursday, July 21
        
    ${res[1].join(`
    `)}

    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "sideEvents_by_day_21")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
});
bot.action("next_22", async (ctx) => {
  try {
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    const sideEventsArray = sideEvents.july22;
    const res = sideEventsFunc(sideEventsArray);
    if (res.length > 3) {
      ctx.replyWithHTML(
        `Fiday, July 22
        
    ${res[1].join(`
    `)}
    
    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "sideEvents_by_day_22")],
          [Markup.button.callback("➡ Next", "next_22")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    } else {
      ctx.replyWithHTML(
        `Friday, July 22
        
    ${res[1].join(`
    `)}

    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "sideEvents_by_day_22")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
});

bot.action("next_two_19", async (ctx) => {
  try {
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    const sideEventsArray = sideEvents.july19;
    const res = sideEventsFunc(sideEventsArray);
    if (res.length > 4) {
      ctx.replyWithHTML(
        `Tuesday, July 19
        
    ${res[2].join(`
    `)}
    
    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          ,
          [Markup.button.callback("⬅ Prev", "next_19")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    } else {
      ctx.replyWithHTML(
        `Tuesday, July 19
        
    ${res[2].join(`
    `)}
    
    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "next_19")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
});
bot.action("next_two_20", async (ctx) => {
  try {
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    const sideEventsArray = sideEvents.july20;
    const res = sideEventsFunc(sideEventsArray);
    if (res.length > 4) {
      ctx.replyWithHTML(
        `Wednesday, July 20
        
    ${res[2].join(`
    `)}
    
    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "next_20")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    } else {
      ctx.replyWithHTML(
        `Wednesday, July 20
        
    ${res[2].join(`
    `)}

    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "next_20")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
});
bot.action("next_two_21", async (ctx) => {
  try {
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
    const sideEventsArray = sideEvents.july21;
    const res = sideEventsFunc(sideEventsArray);
    if (res.length > 3) {
      ctx.replyWithHTML(
        `Thursday, July 21
        
    ${res[1].join(`
    `)}
    
    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "next_21")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    } else {
      ctx.replyWithHTML(
        `Thursday, July 21
        
    ${res[2].join(`
    `)}

    @ethparisbot stay tuned without leaving telegram.`,
        Markup.inlineKeyboard([
          [Markup.button.callback("⬅ Prev", "next_21")],
          [Markup.button.callback("↩ Bact to select", "back_to_selection")],
        ]),
        {
          disable_web_page_preview: true,
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("whatsup", (ctx) => {
  const nDate = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Paris",
  });

  const newDate = nDate.split(" ");
  const newTime = newDate[1].split(":");
  const getTime = `${zeroTime(newTime[0])}:${zeroTime(newTime[1])}`;
  const newGetDate = newDate[0].split(".");
  const getDate = newGetDate[0];
  const getMonth = newGetDate[1];
  const newEvents = () => {
    if (getDate == 15 && getMonth == 7) {
      const events = sideEvents.july15;
      const nowArrayEvents = events.filter((event) => {
        if (getTime >= event.startTime && getTime <= (!event.endTime ? "00:00" : event.endTime)) {
          return event;
        }
        return false;
      });
      return nowArrayEvents;
    } else if (getDate == 16 && getMonth == 7) {
      const events = sideEvents.july16;
      const nowArrayEvents = events.filter((event) => {
        if (getTime >= event.startTime && getTime <= (!event.endTime ? "00:00" : event.endTime)) {
          return event;
        }
      });
      return nowArrayEvents;
    } else if (getDate == 17 && getMonth == 7) {
      const events = sideEvents.july17;
      const nowArrayEvents = events.filter((event) => {
        if (getTime >= event.startTime && getTime <= (!event.endTime ? "00:00" : event.endTime)) {
          return event;
        }
      });
      return nowArrayEvents;
    } else if (getDate == 18 && getMonth == 7) {
      const events = sideEvents.july18;
      const nowArrayEvents = events.filter((event) => {
        if (getTime >= event.startTime && getTime <= (!event.endTime ? "00:00" : event.endTime)) {
          return event;
        }
      });
      return nowArrayEvents;
    } else if (getDate == 19 && getMonth == 7) {
      const events = sideEvents.july19;
      const nowArrayEvents = events.filter((event) => {
        if (getTime >= event.startTime && getTime <= (!event.endTime ? "00:00" : event.endTime)) {
          return event;
        }
      });
      return nowArrayEvents;
    } else if (getDate == 20 && getMonth == 7) {
      const events = sideEvents.july20;
      const nowArrayEvents = events.filter((event) => {
        if (getTime >= event.startTime && getTime <= (!event.endTime ? "00:00" : event.endTime)) {
          return event;
        }
      });
      return nowArrayEvents;
    } else if (getDate == 21 && getMonth == 7) {
      const events = sideEvents.july21;
      const nowArrayEvents = events.filter((event) => {
        if (getTime >= event.startTime && getTime <= (!event.endTime ? "00:00" : event.endTime)) {
          return event;
        }
      });
      return nowArrayEvents;
    } else if (getDate == 22 && getMonth == 7) {
      const events = sideEvents.july22;
      const nowArrayEvents = events.filter((event) => {
        if (getTime >= event.startTime && getTime <= (!event.endTime ? "00:00" : event.endTime)) {
          return event;
        }
      });
      return nowArrayEvents;
    } else if (getDate == 23 && getMonth == 7) {
      const events = sideEvents.july23;
      const nowArrayEvents = events.filter((event) => {
        if (getTime >= event.startTime && getTime <= (!event.endTime ? "00:00" : event.endTime)) {
          return event;
        }
      });
      return nowArrayEvents;
    } else if (getDate == 24 && getMonth == 7) {
      const events = sideEvents.july24;
      const nowArrayEvents = events.filter((event) => {
        if (getTime >= event.startTime && getTime <= (!event.endTime ? "00:00" : event.endTime)) {
          return event;
        }
      });
      return nowArrayEvents;
    } else {
      return false;
    }
  };
  const newEventsArr = newEvents();
  if (newEventsArr.length <= 0 || !newEventsArr) {
    ctx.replyWithHTML("Porgram list is empty");
    return false;
  }
  const nowEvents = newEventsArr.map((events) => {
    return `📌 <b>${events.eventsName}</b>
🕓 ${events.date} | ${events.startTime} ${!events.endTime ? "" : `- ${events.endTime}`}
📍 ${events.location}
💶 ${events.price}
📢 ${events.eventType}
${!events.link ? "" : `<i><a href='${events.link}'>Website</a></i> ↗`}
    `;
  });
  ctx.replyWithHTML(
    `Now:
${nowEvents.join(`

`)}

@ethparisbot stay tuned without leaving telegram.`,
    {
      disable_web_page_preview: true,
    }
  );
});

bot.action("back_to_selection", async (ctx) => {
  try {
    ctx.reply(`Choose a day:                 .`, {
      reply_markup: {
        inline_keyboard: sideEvents_by_day_keyboard,
      },
    });
    await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  } catch (error) {
    console.error(error);
  }
});

bot.command("venue", async (ctx) => {
  ctx.replyWithHTML(`<b>The Venue</b>
The Maison de la Mutualité will be accessible from 09 AM to 07 PM all three days.

Maison de la Mutualité
22 Rue Saint Victor,
75005 Paris.

<a href="https://www.google.com/maps/place/Maison+de+la+Mutualit%C3%A9/@48.848713,2.350635,17z/data=!3m1!4b1!4m5!3m4!1s0x47e671e4331ed5b5:0x2a595de9d6bf634b!8m2!3d48.848713!4d2.350635">Open with Google Maps</a>`);
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
