require("dotenv").config(); //to start process from .env file
const { Client, GatewayIntentBits }=require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once("ready", () =>{
    console.log("BOT IS ONLINE"); //message when bot is online
})
client.login(process.env.TOKEN);