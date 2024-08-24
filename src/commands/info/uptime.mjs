import { EmbedBuilder } from "discord.js";

export const Command = {
    name: 'uptime',
    description: 'Get the uptime of the bot',
    options: [],
    run: async (client, interaction) => {
        const days = Math.floor(client.uptime / 1000 / 60 / 60 / 24);
        const hours = Math.floor(client.uptime / 1000 / 60 / 60) % 24;
        const minutes = Math.floor(client.uptime / 1000 / 60) % 60;
        const seconds = Math.floor(client.uptime / 1000) % 60;

        const embed = new EmbedBuilder()
            .setColor(0,0,0)
            .setTitle("Uptime")
            .addFields(
                { name: "Uptime", value: `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`, inline: true },
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed] });
    },
};
