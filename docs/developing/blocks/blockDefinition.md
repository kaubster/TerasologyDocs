Block Definition {#block_definition}
================

Block data can be defined on four locations, all inside the `assets`
folder:

1.  `blocks` contains the block definitions. All files in this folder
    should have a `.block` extension. Block definitions are limited to a
    number of properties. See `block_attributes`{.interpreted-text
    role="ref"} for a complete list.
2.  `blockTiles` contains the block tile textures. The textures should
    be in the `.png` format with a size of `16x16`.
3.  `shapes` contains special shapes for blocks with a unique model.
    Files in this folder should have a `.shape` extension. See
    `Block Shapes <block_shapes>`{.interpreted-text role="ref"} for a
    full reference on how to generate these files from blender.
4.  `prefabs` can be used to define extra behavior for blocks via
    `prefabs <prefabs>`{.interpreted-text role="ref"}. Files in this
    folder should have a `.prefab` extension. Everything which can not
    be defined in the `.block` file should be defined here. In most of
    the cases, this will be Components and their initial values. Think
    about a spike component on a cactus block, which defines how many
    damage you will take if you touch the block.
