import { EmbedBuilder } from "discord.js";

export const Command = {
    name: "ping",
    description: "Get the ping of the bot",
    options: [],
    run: async (client, interaction) => {
        const startTime = Date.now();
        const initialMessage = await interaction.reply({ content: "Pinging...", fetchReply: true });

        const embed = new EmbedBuilder()
            .setColor(0,0,0)
            .setTitle("Pong!")
            .addFields(
                { name: "API Ping", value: `${client.ws.ping}ms`, inline: true },
                { name: "Latency", value: `${Date.now() - startTime}ms`, inline: true },
                { name: "Shard ID", value: `${client.shard?.ids[0] ?? "None"}`, inline: true },
                { name: "Shard Count", value: `${client.shard?.count ?? "None"}`, inline: true },
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await initialMessage.edit({ content: " ", embeds: [embed] });
    }
}
