Using IRC {#using_irc}
=========

[IRC](https://en.wikipedia.org/wiki/Internet_Relay_Chat) is used as the
project\'s main tool for direct communication. Many users connect and
let themselves idle in a channel like `#terasology` on the [Freenode IRC
Network](https://freenode.net/). So please do not feel people ignoring
you if you do not get an immediate response. Some patience may be
needed, as not everyone will watch for new messages every moment. For a
guaranteed response or topics with long-term discussions, the
[forum](http://forum.terasology.org/) will be a better.

You can join via webchat in a browser at the community page via
<http://forum.terasology.org/chat/> or directly at
<https://webchat.freenode.net/>. Just enter your desired nickname and in
the second case `#terasology` for the channel to join.

IRC User Setup
--------------

For a more serious setup with IRC, you need a dedicated client and to
properly register and account at freenode.

-   Pick a client - many are available, even as browser plugins for
    Firefox and Chrome.
-   Connect to `chat.freenode.net`, see
    <http://freenode.net/kb/answer/chat> for more details.
-   IRC generally dumps you in a system channel and expects you to use
    slash commands or menus for interaction.
    -   Make sure any options in your client are set with your right
        name, nick, desired starting channel (`#terasology`), etc.
    -   You can change your nickname via `/nick [nickname]`.
    -   If you want to safeguard your nickname / account, register it
        via `/msg nickserv register [password] [email]`. This will send
        you an email with a verification command you have to enter in
        order to verify your account.
    -   To re-identify yourself to the server on each login, you may
        have to enter a command like
        `/msg nickserv identify [password]` - most clients will allow
        you to automatically issue that on startup.
    -   For additional help, enter `/msg nickserv help`.

Gooey
-----

Gooey is our friendly local IRC bot and is waiting for orders in the
`#terasology` channels, at least most of the time :) It is based on
[Hubot](https://hubot.github.com/) and it\'s sources lives at
<https://github.com/MovingBlocks/Gooey>.

For help with Gooey simply enter `.help` in `#terasology` on Freenode,
or even open a private message with the bot and use plain `help` to
interact more quietly.
