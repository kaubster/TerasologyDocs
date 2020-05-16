Project Overview
================

Codebase-Structure {#codebase_structure}
------------------

::: {.todo}
<https://github.com/MovingBlocks/Terasology/wiki/Codebase-Structure>
:::

Sites
-----

Terasology is covered by mutliple online presences:

-   [Community Portal and Forum](http://forum.terasology.org/) - main
    site for announcements and discussion.
-   `#terasology at Freenode IRC  </developerIntro/usingIrc>`{.interpreted-text
    role="doc"} - live chat and support when somebody is available (be
    patient!).
-   [Meta Server](http://meta.terasology.org/) - shows a list of game
    servers, modules, and so on. Can be used via API and is used as such
    by the game and launcher.
-   The [Splash Site](http://terasology.org/) - a small GitHub Page to
    intro the game, play via applet, or even run the soundtrack (top
    left - Flash).
-   Social Networks: [Reddit](https://www.reddit.com/r/Terasology) \|
    [Facebook](https://www.facebook.com/Terasology) \|
    [Twitter](https://twitter.com/Terasology) \|
    [YouTube](https://www.youtube.com/user/blockmaniaTV) \|
    [G+](https://plus.google.com/b/103835217961917018533/103835217961917018533/posts).

GitHub Organizations
--------------------

The projects sources are organized in two [GitHub](https://github.com/)
organizations. Central components of the project live under the
[MovingBlocks](https://github.com/MovingBlocks) organization. It\'s main
contents are:

-   The [Engine](https://github.com/MovingBlocks/Terasology), which is
    the heart of the game. It includes the PC Facade (the standard
    application) and the Core module with some basic gameplay elements -
    this is all you need to run the game.
-   The [Launcher](https://github.com/MovingBlocks/TerasologyLauncher),
    is the best way to run the game. It allows easy updating and
    maintaining different versions of the game.
-   The [Splash Site
    Sources](https://github.com/MovingBlocks/movingblocks.github.com),
    of <http://terasology.org/>.
-   [TeraBullet](https://github.com/MovingBlocks/TeraBullet) offers some
    voxel-world integrations with [JBullet](http://jbullet.advel.cz/).
-   [Tera OVR](https://github.com/MovingBlocks/TeraOVR), a wrapper for
    the [Oculus Rift](http://www.oculusvr.com/) SDK.
-   [Gooey](https://github.com/MovingBlocks/Gooey), our handy little
    [Hubot](http://hubot.github.com/)-based IRC bot offering witty
    banter and useful functionality like auto-creating GitHub repos.
    When he feels like it, anyway!
-   The [gestalt](https://github.com/MovingBlocks/gestalt) library
    bundle, which contains the logic for our
    `Asset System <concepts/assetSystem>`{.interpreted-text role="doc"},
    `Module System <concepts/modules>`{.interpreted-text role="doc"} and
    `Entity System <concepts/entitySystem>`{.interpreted-text
    role="doc"}
-   And some more, like our [repository
    configuration](https://github.com/MovingBlocks/TeraConfig), [math
    libraries](https://github.com/MovingBlocks/TeraMath), a [crash
    reporter](https://github.com/MovingBlocks/CrashReporter), or
    [miscellaneous stuff](https://github.com/MovingBlocks/TeraMisc).

Content modules and extensions to the actual game are bundled at the
[Terasology](https://github.com/terasology) organization. It contains a
large set of different modules which may extend the gameplay or provide
further functions to other modules. A small (and by far not complete)
list of examples:

-   [NeoTTA](https://github.com/Terasology/NeoTTA), an experimental
    gameplay module with various features.
-   [JoshariasSurvival](https://github.com/Terasology/JoshariasSurvival),
    a gameplay module which bundles different modules with the focus on
    surviving and advancing technology.
-   [LightAndShadow](https://github.com/Terasology/LightAndShadow), an
    experimental game type in an Alice in Wonderland inspired setting.
-   [MasterOfOreon](https://github.com/Terasology/MasterOfOreon), a
    manager interface for minions.
-   [DynamicCities](https://github.com/Terasology/DynamicCities), city
    generation and population simulation.
-   \...

External Projects
-----------------

Some noteworthy external projects which are used in Terasology:

-   [LWJGL](http://lwjgl.org/), as foundation for graphics, sound, and
    input.
-   [Gradle-Git](https://github.com/ajoberstar/gradle-git), which makes
    Gradle even more magical by adding Git tasks.
-   [Jenkins CI](http://jenkins-ci.org/), for continuous integration.
    Builds our stuff at <http://jenkins.movingblocks.net>.
-   [Artifactory](http://www.jfrog.com/home/v_artifactory_opensource_overview),
    repository manager, holds our builds and assorted library files, at
    <http://artifactory.movingblocks.net>.
-   [XenForo](http://xenforo.com/) - our portal/forum site at
    <http://forum.movingblocks.net>.

History and more
----------------

If you are interested in the project\'s history, the goals and the
origin of the name, have a look at [What is
Terasology](https://github.com/MovingBlocks/Terasology/wiki/What-is-Terasology).
