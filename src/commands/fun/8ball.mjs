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
            "As I see it, yes.",
            "Ask again later.",
            "Better not tell you now.",
            "Cannot predict now.",
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];
        await interaction.reply(`Question: ${question}\nAnswer: ${response}`);
    }
};