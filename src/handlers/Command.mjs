import { REST, Routes } from "discord.js";
import { pathToFileURL } from "url";
import { Filereader } from "./filereader.mjs";

export const CommandHandler = async (client, rootPath) => {

    const AllFiles = await Filereader(`${rootPath}/src/commands`)

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    const commands = await Promise.all(AllFiles.map(async (CommandFile) => {
        const { Command } = await import(pathToFileURL(CommandFile));
        if (Command && !Command.ignore && Command.name && Command.description) {
            client.slashCommands?.set(Command.name, Command);
            return {
                name: Command.name,
                nsfw: Command.nsfw ?? false,
                description: Command.description,
                type: 1,
                options: Command.options ?? []
            };
        }
        return null;
    }));

    const CommandsArray = commands.filter(Boolean);

    try {
        console.log("Started refreshing application (/) commands.");
        await rest.put(
            Routes.applicationCommands(process.env.ID),
            { body: CommandsArray.flat() }
        );
        console.log("Successfully reloaded application (/) commands.");

    } catch (error) {
        console.error(error);
    }
};
