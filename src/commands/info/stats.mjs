import Discord from 'discord.js'
import os  from 'node:os'
import { cpus } from 'node:os'

export const Command = {
    name: 'stats',
    description: 'Get the stats of the bot',
    options: [],

    run: async (client, interaction) => {
        const embed = new Discord.EmbedBuilder()
            .setColor(0,0,0)
            .setAuthor({ name: 'Stats', iconURL: client.user.displayAvatarURL() })
            .addFields(
                { name: '🏢 Servers', value: `${client.guilds.cache.size.toLocaleString()} servers`, inline: true },
                { name: '👥 Users', value: `${client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount ?? 0), 0).toLocaleString()} users`, inline: true },
                { name: '💬 Channels', value: `${client.channels.cache.size.toLocaleString()} channels`, inline: true },
                { name: '🔨 Commands', value: `${(client.slashCommands.size + client.buttonCommands.size + client.selectMenus.size).toLocaleString()} commands`, inline: true },
                { name: '💻 RAM', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
                { name: '💻 CPU', value: `${cpus()[0].model}`, inline: true },
                { name: '💻 Cores', value: `${cpus().length.toLocaleString()} cores`, inline: true },
                { name: '📊 OS', value: `${os.platform()} ${os.release()}`, inline: true },
                { name: '🕰️ Uptime', value: `${Math.floor(client.uptime / 1000 / 60 / 60 / 24)} days, ${Math.floor(client.uptime / 1000 / 60 / 60) % 24} hours, ${Math.floor(client.uptime / 1000 / 60) % 60} minutes and ${Math.floor(client.uptime / 1000) % 60} seconds`, inline: true },
                { name: '📆 Created at', value: `<t:${Math.floor(client.user.createdTimestamp / 1000)}:F>`, inline: true },
                { name: '💻 Network Status', value: `${client.ws.ping} ms`, inline: true },
                { name: '💻 Client Version', value: `${Discord.version}`, inline: true },
                { name: '💻 Node Version', value: `${process.version}`, inline: true },
                { name: '📊 Shard ID', value: `${client.shard?.ids[0] ?? "None"}`, inline: true },
                { name: '📊 Shard Count', value: `${client.shard?.count ?? "None"}`, inline: true },
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
        await interaction.reply({ embeds: [embed] });
    },
}


