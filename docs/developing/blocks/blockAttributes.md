Block Attributes {#block_attributes}
================

Block attributes are used in `.block` files, as described in
`Block Definition <block_definition>`{.interpreted-text role="ref"}.

Inheritance
-----------

Block definitions can extend from other block definitions, specifying
just the features by which they differ. This simplifies creating classes
of block (like plants).

  --------------------------------------------------------------------------------
  Option     Value(s)                 Default   Description
  ---------- ------------------------ --------- ----------------------------------
  basedOn    A block definition uri             Specifies the block to base this
             like `engine:plant`                block on.

  template   `true`, `false`          `false`   If true, this block cannot be
                                                created and exists only to be
                                                based on.
  --------------------------------------------------------------------------------

Informational
-------------

  ----------------------------------------------------------------------------------------
  Option        Value(s)   Default                Description
  ------------- ---------- ---------------------- ----------------------------------------
  displayName              The file name of the   The name of the block that is shown to
                           block, with the first  players - particularly when the block is
                           letter capitalised     picked up and in their inventory.

  ----------------------------------------------------------------------------------------

Core behavioural
----------------

  -----------------------------------------------------------------------------------------------
  Option               Value(s)   Default   Description
  -------------------- ---------- --------- -----------------------------------------------------
  attachmentAllowed    `true`,    `true`    Determines whether other blocks can be attached to
                       `false`              this block.

  hardness             `<int>`    3         Specifies the hardness of the block - effectively its
                                            health.

  liquid               `true`,    `false`   Determines if the block is liquid.
                       `false`              

  replacementAllowed   `true`,    `false`   Specifies whether the block can be replaced freely by
                       `false`              other blocks - that you can place another block over
                                            it. **In order to make a block replaceable, it
                                            requires the block not to be targetable!**

  supportRequired      `true`,    `false`   Specify whether the block should be destroyed when no
                       `false`              longer attached to any other block. **Only works for
                                            vertically adjacent blocks - e.g. grass is removed if
                                            the ground under it is destroyed**
  -----------------------------------------------------------------------------------------------

Tiles
-----

Tiles define the appearance of a block. They can be defined as `tile`
(one global texture for all sides of the block) or `tiles` (separate
definition for different sides of the block).

  ---------------------------------------------------------------------------------
  Option   Value(s)   Default                                     Description
  -------- ---------- ------------------------------------------- -----------------
  tile     A tile uri By default, a block will try to use a tile  Specifies what
                      texture with a matching filename. For       tile to use to
                      example, the block for `Grass.block` will   texture this
                      use the block tile `Grass.png` from the     block.
                      same module.                                

  tiles    A list of                                              Alternative to
           tiles for                                              the `tile`
           each side.                                             property for
                                                                  blocks with
                                                                  different sides.
  ---------------------------------------------------------------------------------

The definition of `tile` is straightforward. One example for the more
complicated `tiles` attribute:

``` {.none}
"tiles" : {
 "sides"     : "core:ChestSides",
 "front"     : "core:ChestFront",
 "topBottom" : "core:ChestTopBottom"
}
```

Valid block parts for `tiles` are:

-   **all** to change every tile. This has the same effect as using
    `tile`.
-   **topBottom** to change the top and bottom tile.
-   **sides** to change the four horizontal sides (excluding top and
    bottom) and can itself be overridden.
-   **front, left, right, back, top, bottom, center** refer to the
    specific side.

All these mappings refer to parts of a block shape. Have a look at
`Block Shape Basics <block_shape_basics>`{.interpreted-text role="ref"}
for a full overview over all parts.

Rendering Options
-----------------

  -----------------------------------------------------------------------------------------------
  Option          Value(s)   Default   Description
  --------------- ---------- --------- ----------------------------------------------------------
  doubleSided     `true`,    `false`   Whether this block should be rendered double sided. This
                  `false`              done for billboard plants to render both sides of
                                       polygons.

  invisible       `true`,    `false`   If set to `true` the block is excluded from rendering.
                  `false`              

  translucent     `true`,    `false`   Determine whether the block is translucent or not. Blocks
                  `false`              with this option enabled can use textures with
                                       transparency. Moreover, translucent blocks do not prevent
                                       occluded blocks behind them from beeing rendered (blocks
                                       behind a translucent glass block are still displayed).

  shadowCasting   `true`,    `true`    Determines if the block may cast shadows around it.
                  `false`              

  waving          `true`,    `false`   Whether the block waves in the wind. May be used for grass
                  `false`              or leaves.

  luminance       `<int>`    0         The light level of the block. The default torches have a
                                       light value of 15, for reference.
  -----------------------------------------------------------------------------------------------

Color Lookup Tables
-------------------

Color gradients can be used to change the color of specific blocks, e.g.
grass or fooliage. This can be used for advanced block tinting, e.g.
different grass colors in different biomes.

  ------------------------------------------------------------------------------------------------------------------------------------------------------------------
  Option         Value(s)                                                                                      Default   Description
  -------------- --------------------------------------------------------------------------------------------- --------- -------------------------------------------
  colorSource    One entry of                                                                                            The color source to use.
                 :java`DefaultColorSource <org.terasology.world.block.DefaultColorSource>`{.interpreted-text             
                 role="ref"}, e.g. `color_lut`                                                                           

  colorSources   Enumeration of color sources                                                                            Multiple color sources to use.

  colorOffset    `[R, G, B, A]`                                                                                          Specifies a color offset. For example for
                                                                                                                         red leaves based on default leaves, one
                                                                                                                         could use
                                                                                                                         `"colorOffset" : '[2.0, 0.0, 0.5, 1.0']`.
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------

Shapes and Rotation {#shapes_and_rotation}
-------------------

Block shapes are specialised meshes that give a block its shape. If no
shape is specialised then a block is a cube.

Generally for a non-cubic block you would define the shape with the
shape property.

When using a block shape, it is often desirable to allow the block to
rotate based on how it is being placed, or even to have different shapes
depending on how it is being placed. This can be enabled using the
\"rotation\" property. The following settings for `rotation` are
available:

-   **none**, the block will not be rotated (default).
-   **horizontal** for a block that will rotate on the horizontal place.
    For example, stairs will face towards the placer when placed.
-   **alignToSurface** Similar to horizontal but with support for
    different blocks when placed against the ground or ceiling.

When using the alignToSurface rotation mode, you can specify a `sides`,
`top` and/or `bottom` section to provide override properties for those
placements.

``` {.none}
"rotation" : "alignToSurface",
"sides" : {
    "shape" : "engine:stair",
},
"bottom": {
    "shape" : "engine:cube"
}
```

This block would be shaped like a cube when placed on the ground, and
shaped like stairs when placed against a side. It cannot be placed
against a ceiling (as no shape is defined for that case). Many
properties can be overridden in this manner.

  -----------------------------------------------------------------------------------
  Option     Value(s)              Default         Description
  ---------- --------------------- --------------- ----------------------------------
  shape      A shape uri           `engine:cube`   The shape of the block.

  shapes     A list of shape uris                  A list of valid shapes for this
                                                   block.

  rotation   `none`, `horizontal`, `none`          The rotation mode for the block.
             `alignToSurface`                      

  top,                                             In `alignToSurface` rotation mode,
  bottom,                                          this allows settings for specific
  sides                                            surface placements.
  -----------------------------------------------------------------------------------

See `Block Shapes <block_shapes>`{.interpreted-text role="ref"} fore
more information about the shape architecture.

Collisions
----------

  -----------------------------------------------------------------------------------
  Option       Value(s)    Default   Description
  ------------ ----------- --------- ------------------------------------------------
  penetrable   `true`,     `false`   A block is penetrable if it does not block solid
               `false`               objects.

  targetable   `true`,     `true`    Define whether the block can be targeted for
               `false`               interactions. **Must be set to** `false` **to
                                     allow direct replacement.**
  -----------------------------------------------------------------------------------

Physics
-------

  --------------------------------------------------------------------------------------
  Option            Value(s)     Default   Description
  ----------------- ------------ --------- ---------------------------------------------
  debrisOnDestroy   `true`,      `true`    If enabled destroyed blocks will drop a
                    `false`                miniature instance of the block that can be
                                           picked up by the player.

  mass              `<int>`      10        The mass value for the physics simulation.
  --------------------------------------------------------------------------------------

Entity System Integration {#block_entities}
-------------------------

As mentioned in `Block Definition <block_definition>`{.interpreted-text
role="ref"}, blocks can be backed up by entites which are created from
prefabs. For example a chest block can link to the `core:chest` prefab
like so:

``` {.none}
"entity" : {
    "prefab" : "core:chest"
}
```

Inventory Settings
------------------

The inventory settings have to be in an inventory section as well.
Taking the chest definition as example again:

``` {.none}
"inventory" : {
    "stackable" : false,
    "directPickup" : true
}
```

  ---------------------------------------------------------------------------------
  Option         Value(s)       Default   Description
  -------------- -------------- --------- -----------------------------------------
  directPickup   `true`,        `false`   Whether this block should go directly
                 `false`                  into a character\'s inventory when
                                          harvested.

  isStackable    `true`,        `true`    Determines whether the block type is
                 `false`                  stackable in the inventory.
  ---------------------------------------------------------------------------------

Categories
----------

Blocks may be marked with different categories, which can then be used
by other systems. For example, a shovel may be more efficient when
digging in `soil` blocks. Categories are simple strings.

  ----------------------------------------------------------------------------------------
  Option       Value(s)     Default   Description
  ------------ ------------ --------- ----------------------------------------------------
  categories   list of                Give a list of categories the block belongs to. For
               categories             example new soil types might use
                                      `categories" : '["soil"']`.

  ----------------------------------------------------------------------------------------
