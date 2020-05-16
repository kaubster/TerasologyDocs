Modules {#concept_modules}
=======

Modules are extensions/modifications to the engine. A Terasology module
is a java project on it\'s own, which is resolved similar to a library
an lives in it\'s own sandboxed environment. The module system is
implemented the [gestalt
module](https://github.com/MovingBlocks/gestalt) library.

Structure of Modules
--------------------

-   `/src` - actual source code for custom functionality goes here.
    Usually this will be custom components and systems which extend the
    `entity_System`{.interpreted-text role="ref"}.
-   `/assets` - Resources related to the module can be placed here and
    will be located by the `asset_system`{.interpreted-text role="ref"}.
    Sub-categories for assets like prefabs or block definitions are
    structured in sub-directories.
-   `/deltas` and `/overrides` - Modification directories for existing
    assets. These mechanics are described at
    [TutorialAssetSystem/Deltas-and-Overrides](https://github.com/Terasology/TutorialAssetSystem/wiki/Deltas-and-Overrides).
-   `build.gradle` - internal build file, should not be edited.
-   `module.txt` - Configuration file for the module, similar to a maven
    `pom.xml` or gradle build file. Have a look at the
    `module_txt`{.interpreted-text role="ref"} section for details.

module.txt {#module_txt}
----------

Definition file for a module, using JSON syntax. The following
properties are supported:

-   `id` - the internal identifier of the module.
-   `version` - the version of the module, versions are stored in the
    format `MAJOR.minor.patch(-SNAPSHOT)` (see
    `versions`{.interpreted-text role="ref"} for details).
-   `author` - the author(s) of the module, could be any string. Default
    are single names or comma-separated lists.
-   `displayName` - the name of the module which is shown ingame to the
    user.
-   `description` - a textual description, what the module contains and
    how it affects the game.
-   `dependencies` - a list of *dependencies*, which are mappings to
    other modules with a given version. Each dependency has the
    following properties:
    -   `id` - The id of the dependent module.
    -   `minVersion` - The minimum version of the dependent module
        (inclusive).
    -   `maxVersion` - The maximum version of the dependent module
        (exclusive).
    -   `optional` - If the dependency is optional. A module with
        optional dependencies should work, even if the optional
        dependencies are not available when the user starts a game.
    -   `serverSideOnly` - A boolean, indicates if the module should
        only be available on the server and not on the client. Such
        modules are not downloaded by a client when he connects to a
        server.
    -   `isGameplay` - A boolean, indicates if the module should appear
        in the list of gameplay modules. Typically, such modules contain
        little logic or assets themselves but bundle other modules
        together.
    -   `defaultWorldGenerator` - The id of the default world
        generator[^1] which should be activated with the module.

Have a look at the
[NeoTTA/module.txt](https://raw.githubusercontent.com/Terasology/NeoTTA/master/module.txt)
or other modules in the [Terasology](https://github.com/Terasology)
organization as examples.

Namespace
---------

The common namespace for a module is
`org.terasology.<nameOfTheModule>.*`. It is recommended to name source
packages accordingly, otherwise modules may not be built or loaded as
expected.[^2]

Guides
------

The `Modules Guide <developing_modules>`{.interpreted-text role="ref"}
delivers further information about fetching and creating modules,
dependencies and the sandbox environment.

[^1]: See
    :java`@RegisterWorldGenerator <org.terasology.world.generator.RegisterWorldGenerator>`{.interpreted-text
    role="ref"} for details.

[^2]: See
    [\#2445](https://github.com/MovingBlocks/Terasology/issues/2445) for
    more details.
