Block World
===========

The most basic concept of Terasology is the block world. The entire
world is made up of blocks, each with one x-y-z-coordinate and a
side-length of 1 unit.

Blocks are organized in chunks, which contain a larger area of blocks.
In Terasology, each chunk has a size of 32x32 blocks and a height of 64
blocks.[^1] A chunk has it\'s own x-y-z coordinates, similar to a block
but in a larger space.

The world size is not hard-limited by the engine. Instead the maximum
height/width/depth of a world is restricted by the coordinate value
ranges (Java integer values) or memory/disk limitations to store the
world.

Blocks have a limited number of
`attributes <block_attributes>`{.interpreted-text role="ref"}. This
makes them an efficient data format for storage on disk or serialization
over the network. If additional properties or behavior for blocks are
required (e.g. a chest which has it\'s own inventory), then blocks can
be `backed up to entities <block_entities>`{.interpreted-text
role="ref"} (see the `Entity System <entity_System>`{.interpreted-text
role="ref"} for details).

Have a look at the `blocks developer guides <blocks>`{.interpreted-text
role="ref"} for further topics like the
`block attributes <block_attributes>`{.interpreted-text role="ref"},
`shapes <block_shapes>`{.interpreted-text role="ref"}, or
`entity-based properties <block_entities>`{.interpreted-text
role="ref"}.

[^1]: Chunk size definition is contained in
    :java`ChunkConstants <org.terasology.world.chunks.ChunkConstants>`{.interpreted-text
    role="ref"}.
