import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv'

dotenv.config()

const TOKEN = process.env.DISCORD_TOKEN

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

//Show user message - from discord
client.on('messageCreate', (message) => {
    console.log(`Message is ${message.content}`);
});

//Reply to the user message - from server [BOT]
client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith("create")) {
        const URLs = message.content.split("create")[1]
        return message.reply(
            {
                content: `Generating Short URL for ${URLs} `
            }
        )
    }
    message.reply(
        {
            content: "Ji Han!!"
        }
    )
});

//Reply to the user interaction - from server [BOT]
client.on("interactionCreate", interaction => {
    console.log(interaction);
    interaction.reply("tinga nig nig niga tingni tag tiga")

})

client.login(TOKEN);