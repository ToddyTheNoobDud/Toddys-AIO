import { EmbedBuilder } from "discord.js";

export const Command = {
    name: "8ball",
    description: "Ask the 8ball a question!",
    options: [
        {
            name: "question",
            description: "The question you want to ask the 8ball",
            type: 3,
            required: true
        }
    ],

    run: async (client, interaction) => {
        const question = interaction.options.getString("question");

        const responses = [
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes - definitely.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Yes.",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Very doubtful.",
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];
        const embed = new EmbedBuilder()
            .setColor(0,0,0)
            .setAuthor({ name: "8ball", iconURL: client.user.displayAvatarURL() })
            .setDescription(`Q: **${question}**\n\nR: ${response}`)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
};


