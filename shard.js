require("dotenv").config();
const { ShardingManager , Client} = require("discord.js")
const colors = require("colors")
const shards = new ShardingManager("./index.js" , {
  token : process.env.token,
  totalShards : "auto",
  respawn : true,
  delay : 20000,
  timeout : 60000
})
shards.on("shardCreate" , async (shard) => {
  console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched Shard #${shard.id}`.bold.green)
})

shards.on("disconnect" , async (shard) => {
  console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Disconnected Shard #${shard.id}`.bold.red)
})

shards.on("death" , async (shard) => {
  shards.spawn(shards.totalShards , 10000);
  console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Killed Shard #${shard.id}`.bold.red)
})



shards.spawn(shards.totalShards , 10000);
