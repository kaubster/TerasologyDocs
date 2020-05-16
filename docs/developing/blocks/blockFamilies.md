Block Families {#block_families}
==============

A block family is a group of multiple instances of one block. The main
purpose of a block family is to allow the user to collect multiple
instances of one block to the same stack. For example a wall-torch and a
ground-torch will both be collected to the same stack of torches.
However, there is a separate block for the wall torch (in fact, there
are 4 of them, one for each rotation) and a separate block for the
ground torch.

A block family for a block is defined in the `.block` file via the
`rotation section <shapes_and_rotation>`{.interpreted-text role="ref"}.

When a family is generated from a block, it will create multiple
instances for the block, all referenced by different
:java`BlockUri <org.terasology.world.block.BlockUri>`{.interpreted-text
role="ref"}. See `Accessing Blocks <block_access>`{.interpreted-text
role="ref"} for how to create a block instance from an uri.
