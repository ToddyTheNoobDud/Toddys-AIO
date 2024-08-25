export const Event = {
    name: "interactionCreate",
    run: async (client, interaction) => {
        try {
            const { buttonCommands, selectMenus, slashCommands } = client;
            const { customId } = interaction;
            const command = interaction.isChatInputCommand() ? slashCommands.get(interaction.commandName) :
            interaction.isButton() ? buttonCommands.get(customId) :
            interaction.isStringSelectMenu() ? selectMenus.get(customId) : null;

            if (command) command.run(client, interaction);
        } catch (error) {
            console.log(error);
        }
    }
}

