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
    command: "now",
    description: "Current events",
  },
  {
    command: "add",
    description: "Add",
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
  ctx.reply(
    `Hi, ${ctx.message.from.username}.\nHere's how I can help:\n\n/program - conference program\n/stop - stop\n/help - Show help/main menu`
  )
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
  },
  {
    group: "Launch Partners",
    name: "Polis Paral·lela Barcelona",
    type: "",
    title: "Join a tribe in Barcelona that cares about freedom, social good, decentralization.",
    subtitle: "We believe technology should free humanity, not enslave it. ",
    description: "",
    url: "https://twitter.com/PolisParallela",
  },
  {
    group: "Launch Partners",
    name: "Shrine House",
    type: "Decentralized record label and artist tooling platform.",
    title: "The world's first decentralized community governed record label.",
    subtitle: "We use decentralized lending markets to reimagine the concept of a record deal.",
    description: "We democratize power to all token holders by giving them ownership by operating as a DAO.",
    url: "https://shrine.house/",
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
  },
  // {
  //   group: 'Mission',
  //   name: '',
  //   type: '',
  //   title: '',
  //   subtitle: '',
  //   description: '',
  //   url: ''
  // },
];

let speakers_array = [];

bot.command("partners", (ctx) => {
  partners_array.map((e) => {
    ctx.replyWithMarkdown(
      `*${e.name}*\n\
${e.title}\
${!e.description ? e.subtitle : e.description}\n\
${e.url}`
    );
  });
});

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
bot.command("now", (ctx) => {
  try {
    if (events_program.length <= 0) {
      ctx.replyWithHTML("Porgram list is empty");
      return false;
    }
    
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

bot.command("speakers", (ctx) => {
  try {
    if (!speakers_array.length) {
      ctx.replyWithHTML("Speaker list is empty");
      return false;
    }
    const getSpeakers = speakers_array.map((speaker) => {
      return `
🔹<b>${speaker.name}</b>
${speaker.title}
${speaker.description}
${speaker.url}`;
    });
    ctx.replyWithHTML(
      getSpeakers.join(`
  `)
    );
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
📎 <b>${events.time}</b> ${events.title}
🗣 ${events.speaker}
📍 ${events.room}`;
    });
    ctx.replyWithHTML(`<b>07-06-2022</b>
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
    {
      text: "Partner",
      callback_data: "add_partner",
    },
  ],
];

bot.command("add", (ctx) => {
  if (ctx.from.username !== "Nasirdin1") {
    ctx.reply("Oh you're not an admin");
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
<b>Enter time:</b>
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
        time: message[1],
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
