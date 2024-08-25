import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";

export const Command = {
    name: 'avatar',
    description: 'Get the avatar of a user',
    options: [
        {
            name: 'user',
            description: 'The user you want to get the avatar of',
            type: 6,
            required: false
        }
    ],

    run: async (client, interaction) => {
        const user = interaction.options.getUser('user') ?? interaction.user;
        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('PNG')
                    .setURL(user.displayAvatarURL({ dynamic: true, size: 4096, extension: 'png' })),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('JPG')
                    .setURL(user.displayAvatarURL({ dynamic: true, size: 4096, extension: 'jpg' })),
            )
        const embed = new EmbedBuilder()
            .setColor(0,0,0)
            .setAuthor({ name: 'Avatar', iconURL: client.user.displayAvatarURL() })
            .setImage(user.displayAvatarURL({ dynamic: true, size: 4096, extension: 'png' }))
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed], components: [buttons] });
    }
}