import { EmbedBuilder } from "discord.js";

export const Command = {
    name: "gay",
    description: "Get the gay of a user",
    options: [
        {
            name: "user",
            description: "The user you want to get the gay of",
            type: 6,
            required: false
        }
    ],

    run: async (client, interaction) => {
        const user = interaction.options.getUser('user') ?? interaction.user;
        const percentage = Math.floor(Math.random() * 101);
        
        const embed = new EmbedBuilder()
            .setColor(0,0,0)
            .setAuthor({ name: 'Gay Detector', iconURL: client.user.displayAvatarURL() })
            .setThumbnail(percentage > 50 ? `https://some-random-api.com/canvas/gay?avatar=${user.displayAvatarURL({ size: 4096, extension: 'png' })}`: user.displayAvatarURL({ size: 4096, extension: 'png' }))
            .setDescription(`${user.toString()} is **${percentage}%** gay! ${percentage > 50 ? " 🤨" : " 😎"}`)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        await interaction.reply({ embeds: [embed] });
    }
}

