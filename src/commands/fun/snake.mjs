import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";

export const Command = {
    name: "snake",
    description: "Play snake with me!",
    run: async (client, interaction) => {

        const board = Array.from({ length: 10 }, () => Array(10).fill(" "));
        let snakeX = 4;
        let snakeY = 4;
        let foodX = Math.floor(Math.random() * 9);
        let foodY = Math.floor(Math.random() * 9);
        let score = 0;
        let direction = "right";
        let tail = [[snakeX, snakeY]];

        const drawBoard = () => {
            let boardString = "";
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    if (tail.some(t => t[0] === j && t[1] === i)) {
                        boardString += "🐍";
                    } else if (i === foodY && j === foodX) {
                        boardString += "🍎";
                    } else {
                        boardString += board[i][j];
                    }
                }
                boardString += "\n";
            }
            return boardString;
        };

        const updateBoard = () => {
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    if (tail.some(t => t[0] === j && t[1] === i)) {
                        board[i][j] = "🐍";
                    } else if (i === foodY && j === foodX) {
                        board[i][j] = "🍎";
                    } else {
                        board[i][j] = " ";
                    }
                }
            }
        };

        const checkCollision = () => {
            if (
                snakeX < 0 ||
                snakeX > 9 ||
                snakeY < 0 ||
                snakeY > 9 ||
                tail.some((t, i) => i !== tail.length - 1 && t[0] === snakeX && t[1] === snakeY)
            ) {
                return true;
            }
            return false;
        };

        const checkFood = () => {
            if (snakeX === foodX && snakeY === foodY) {
                score++;
                foodX = Math.floor(Math.random() * 9);
                foodY = Math.floor(Math.random() * 9);
                return true;
            }
            return false;
        };

        const embed = new EmbedBuilder()
            .setColor(0,0,0)
            .setTitle("Snake")
            .setDescription(`Score: ${score}\n${drawBoard()}`)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("up")
                    .setLabel("⬆️")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("down")
                    .setLabel("⬇️")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("left")
                    .setLabel("⬅️")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("right")
                    .setLabel("➡️")
                    .setStyle(ButtonStyle.Primary),
            );

        const gameLoop = async (i) => {
            if (checkCollision()) {
                await interaction.editReply({ embeds: [embed.setDescription(`Game Over! Your final score was ${score}.`)], components: [] });
                return;
            }

            if (checkFood()) {
                tail.push([snakeX, snakeY]);
                updateBoard();
            } else {
                tail.push([snakeX, snakeY]);
                tail.shift();
                updateBoard();
            }

            switch (direction) {
                case "up":
                    snakeY--;
                    break;
                case "down":
                    snakeY++;
                    break;
                case "left":
                    snakeX--;
                    break;
                case "right":
                    snakeX++;
                    break;
            }

            embed.setDescription(`Score: ${score}\n${drawBoard()}`);

            await interaction.editReply({ embeds: [embed], components: [row] });

            setTimeout(() => {
                gameLoop(i);
            }, 200);
        };

        await interaction.reply({ embeds: [embed], components: [row] });

        setTimeout(() => {
            gameLoop(0);
        }, 500);

        const collector = interaction.channel.createMessageComponentCollector({
            filter: ({ interaction }) => ["up", "down", "left", "right"].includes(interaction?.customId),
            time: 60000,
        });
        collector.on("collect", (i) => {
            switch (i.customId) {
                case "up":
                    direction = "up";
                    break;
                case "down":
                    direction = "down";
                    break;
                case "left":
                    direction = "left";
                    break;
                case "right":
                    direction = "right";
                    break;
            }
            gameLoop(i);
        });
        collector.on("end", () => {
            interaction.editReply({ embeds: [embed.setDescription(`Game Over! Your final score was ${score}.`)], components: [] });
        });
    }
}


