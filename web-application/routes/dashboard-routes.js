const bot = require('../../main');
const express = require('express');
const { validateGuild } = require('../modules/middleware');
const prefixSchema = require('../../models/prefix');

const router = express.Router();

router.get('/dashboard', (req, res) => res.render('../views/dashboard/index'));

router.get('/servers/:id', validateGuild,
  async (req, res) => res.render('dashboard/show', {
    savedGuild: await prefixSchema.findOne({ Guild: req.params.id }) 
    || await new prefixSchema({ Guild: req.params.id, Prefix: '-' })
  }));

router.put('/servers/:id/general-prefix', validateGuild, async (req, res) => {
  try {
    const { id } = req.params;
    const savedGuild = await prefixSchema.findOne({ Guild: id }) 
    || await new prefixSchema({ Guild: id, Prefix: '-' });
    // console.log(req.body);
    savedGuild.Prefix = req.body.prefix;
    await savedGuild.save();

    res.redirect(`/servers/${id}`);
  } catch (err) {
    console.log(err);
    res.render('errors/400');
  }
});
router.put('/servers/:id/general-message', validateGuild, async (req, res) => {
  try {
    let guildId = req.params.id; // или res.locals.guild.id
    let targetChannels = req.body.textChannels;
    if(!(targetChannels instanceof Array)) targetChannels = Array(targetChannels);
    let message = req.body.messageTextarea;
    // console.log(res.locals.guild.id);
    // console.log(req.params.id);
    // console.log(targetChannels);
    // console.log(message);
    for await (const channelId of targetChannels) {
      bot.guilds.fetch(guildId)
      .then(guild => guild.channels.fetch(channelId)
      .then(channel => channel.send(message)));
    }
    res.redirect(`/servers/${guildId}`);
  } catch (err) {
    console.log(err);
    res.render('errors/400');
  }
});

module.exports = router;