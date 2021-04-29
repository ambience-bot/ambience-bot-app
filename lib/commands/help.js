module.exports = {
  name: 'help',
  description: 'logs all commands',
  execute(indexPropertiesObject) {
    const { client, message } = indexPropertiesObject;
    
    const allCommands = Array.from(client.commands.values());

    let commandString = ``;

    message.author.send(`Here is a list of all the available commands--->`);
    for (let command of allCommands) {
      commandString += `!${command.name}: ${command.description} \n`;
    }

    message.author.send(commandString);
  },
};
