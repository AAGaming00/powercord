# Powercord
Powercord is a lightweight client mod focused on simplicity and performance.  
As of right now, Powercord is in *very* early stages of development, so feel free to join [this server](https://discord.gg/nFRHhDk) for any questions.

# Installation
See the [installation page of the Powercord Wiki](https://github.com/powercord-org/powercord/wiki/Installation).

# Switching to this branch
- Enable the option to show hidden folders on your favorite file explorer
- Go to your powercord folder, then go to the `.git` folder
- Open the file `config` on a text editor (for ex. Notepad)
- Change this line

![](https://media.discordapp.net/attachments/539180316447997974/778703903315329034/unknown.png)

To this:

![](https://media.discordapp.net/attachments/539180316447997974/778704191597182987/unknown.png)

- Go to discord > settings > Updater
- Click "Check for updates"

Voalà, now you're using this fork


# How can I install Powercord on Stable or PTB?
You can't. We internally discussed about supporting all Discord channels and even ran an experiment about it, but that didn't give great results.
Powercord was not able to run in some scenarios due to the huge internal differences and made the whole client unusable (crash on start).

# Is this against the ToS?
Long story short... __yes__. Powercord is against the Discord Terms of Service — but, you should keep reading:  

As of right now, __Discord is not going out of their way to detect client mods or ban client mod users__. On top of that, Powercord does not make any manual HTTP requests unlike certain client mods / plugins, so your client's user agent is the same as a legitimate client. Meaning, Discord doesn't detect a client mod like Powercord. They can go out of their way to start detecting it, but they don't.  

Hypothetically speaking - even if they somehow did detect Powercord, users are very unlikely to be banned on sight. It doesn't make sense for Discord to start banning a substantial part of it's userbase (client mod users) without any kind of warning. Not to mention it is mandatory for Powercord plugins to be fully API-compliant and ethical, implying Powercord users can't be banned for indirect ToS violations (e.g. selfbotting).
