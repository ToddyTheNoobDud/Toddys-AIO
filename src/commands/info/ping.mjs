export const Command = {
    name: "ping",
    description: "Ping!",
    run: async (client, interaction) => {
        await interaction.reply("Pong!");
    },
}