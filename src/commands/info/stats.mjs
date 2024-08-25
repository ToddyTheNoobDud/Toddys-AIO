import Discord from 'discord.js'
import os from 'node:os'

export const Command = {
    name: 'stats',
    description: 'Get the stats of the bot',
    options: [],

    run: async (client, interaction) => {
        const embed = new Discord.EmbedBuilder()
            .setColor(0, 0, 0)
            .setTitle('Stats')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                { name: 'Servers', value: client.guilds.cache.size.toLocaleString(), inline: true },
                { name: 'Users', value: client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount ?? 0), 0).toLocaleString(), inline: true },
                { name: 'Channels', value: client.channels.cache.size.toLocaleString(), inline: true },
                { name: 'Commands', value: (client.slashCommands.size + client.buttonCommands.size + client.selectMenus.size).toLocaleString(), inline: true },
                { name: 'RAM', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
                { name: 'CPU', value: `${os.cpus()[0].model}`, inline: true },
                { name: 'Cores', value: `${os.cpus().length.toLocaleString()} cores`, inline: true },
                { name: 'OS', value: `${os.platform()} ${os.release()}`, inline: true },
                { name: 'Uptime', value: `${Math.floor(client.uptime / 1000 / 60 / 60 / 24)} days, ${Math.floor(client.uptime / 1000 / 60 / 60) % 24} hours, ${Math.floor(client.uptime / 1000 / 60) % 60} minutes and ${Math.floor(client.uptime / 1000) % 60} seconds`, inline: false },
                { name: 'Created at', value: `<t:${Math.floor(client.user.createdTimestamp / 1000)}:F>`, inline: true },
                { name: 'Network Status', value: `${client.ws.ping} ms`, inline: true },
                { name: 'Client Version', value: `${Discord.version}`, inline: true },
                { name: 'Node Version', value: `${process.version}`, inline: true },
                { name: 'Shard ID', value: `${client.shard?.ids[0] ?? "None"}`, inline: true },
                { name: 'Shard Count', value: `${client.shard?.count ?? "None"}`, inline: true },
            ])

        await interaction.reply({ embeds: [embed] })
    },
}

