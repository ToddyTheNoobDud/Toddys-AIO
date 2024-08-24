import dotenv from "dotenv";
dotenv.config();
import { Client, Partials, Collection, GatewayIntentBits } from "discord.js";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const rootPath = __dirname;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageTyping,
  ],
  partials: [Partials.Channel],
});

export default client;
client.events = new Collection();
client.slashCommands = new Collection();
client.buttonCommands = new Collection();
client.selectMenus = new Collection();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

await Promise.all([
    import("./src/handlers/Command.mjs").then(({ CommandHandler }) => CommandHandler(client, rootPath)),
    import("./src/handlers/Event.mjs").then(({ EventHandler }) => EventHandler(client, rootPath))
  ]);
client.login(process.env.TOKEN);


