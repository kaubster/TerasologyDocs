Entities, Components on the Network {#network_entities}
===================================

Unlike in single player, the client and the server reside on different
instances in multiplayer. Therefore, components and entities have to be
correctly configured to ensure that they work as intended in a
multiplayer setting. Often, this means annotating the relevant fields
with
:java`@Replicate <org.terasology.network.Replicate>`{.interpreted-text
role="ref"}.

Replicate annotation
--------------------

:java`@Replicate <org.terasology.network.Replicate>`{.interpreted-text
role="ref"} is an annotation used to mark types or fields to indicate
that these types or fields should be replicated between the server and
the client. In other words, when changes are made to these types or
fields on the server, these changes will be reflected in the clients as
well.

::: {.note}
::: {.title}
Note
:::

This page will focus on component fields and how they can be replicated
by the network. However, take note that
:java`@Replicate <org.terasology.network.Replicate>`{.interpreted-text
role="ref"} can be applied on `component classes` as well. This is
especially important for ensuring that empty components are correctly
replicated.
:::

To illustrate how
:java`@Replicate <org.terasology.network.Replicate>`{.interpreted-text
role="ref"} can be used, let\'s take a look at a field in
`ItemComponent`:

``` {.java}
/**
* How many of said item are there in this stack
*/
@Replicate(FieldReplicateType.SERVER_TO_CLIENT)
public byte stackCount = 1;
```

The `stackCount` field in `ItemComponent` specifies the amount of items
in the current stack.

### FieldReplicateType

As you can see, under the
:java`@Replicate <org.terasology.network.Replicate>`{.interpreted-text
role="ref"} annotation, the
:java`FieldReplicateType <org.terasology.network.FieldReplicateType>`{.interpreted-text
role="ref"} element is set to `SERVER_TO_CLIENT`. This annotation
ensures that this when the value of the `stackCount` field of
`ItemComponent` is updated on the server (i.e. when the stack size of
the item changes), its value on all connected clients will be updated as
well. Obviously very important as the number of items in a stack should
be always be updated on all clients!

Apart from `SERVER_TO_CLIENT`, there are also a few other values for
`FieldReplicateType` that determine the circumstances under which the
field will be replicated.

::: {#network_FieldReplicateType}
  FieldReplicateType                  Description
  ----------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------
  **SERVER\_TO\_CLIENT** (default)    The field will be replicated by the server to all clients connected to the server.
  **SERVER\_TO\_OWNER**               The field will be replicated by the server to the client only if the client is the owner (i.e. the client belongs to the entity containing the component).
  **OWNER\_TO\_SERVER**               Functionally the same as **OWNER\_TO\_SERVER\_TO\_CLIENT**
  **OWNER\_TO\_SERVER\_TO\_CLIENT**   The field will be replicated from the owner to the server. It will be then be replicated by the server to all connected clients that are not the owner.
:::

### initialOnly

You can also specify the value of the `initialOnly` element, which is
false by default. When set to true, the field will only be replicated
once when the entity containing the component first becomes relevant to
the client.

For instance in `ItemComponent`, it is used in `maxStackSize`:

``` {.java}
@Replicate(value = FieldReplicateType.SERVER_TO_CLIENT, initialOnly = true)
public byte maxStackSize = 99;
```

Unlike `stackSize`, which might change over the course of a game as the
player receives or uses the item, the `maxStackSize` of an item does not
change. Therefore, the `initialOnly` element is set to true as the value
of `maxStackSize` only needs to be replicated by the server to the
client once when the `ItemComponent` first becomes relevant.

To summarise, the server will send replicated fields only when:

1.  It is the initial send of the component field
2.  The field is replicated from Server to Client
3.  The field is replicated from Server to Owner and the client owns the
    entity
4.  The field is replicated from owner and the client doesn\'t own the
    entity

The exception to this is when `initialOnly` is set to true and it isn\'t
the inital send of the component field.

::: {.note}
::: {.title}
Note
:::

There is also the
:java`@NoReplicate <org.terasology.network.NoReplicate>`{.interpreted-text
role="ref"} annotation, which is the opposite of
:java`@Replicate <org.terasology.network.Replicate>`{.interpreted-text
role="ref"} annotation. It specifies that a component field should
**not** be replicated. By default, all fields except Event fields are
not replicated.
:::

::: {.note}
::: {.title}
Note
:::

Don\'t forget to use `entityRef.saveComponent(component)` to save change
of value in the component, or the change will not replicate.
:::

Network Component
-----------------

However, for updates to `component fields` of an entity to be replicated
in a server, the entity needs to be registered on the network, which is
where
:java`NetworkComponent <org.terasology.network.NetworkComponent>`{.interpreted-text
role="ref"} comes into the picture.

When
:java`NetworkSystem <org.terasology.network.NetworkSystem>`{.interpreted-text
role="ref"} is first initialised, all entities containing a
:java`NetworkComponent <org.terasology.network.NetworkComponent>`{.interpreted-text
role="ref"} are registered on the network as network entities and given
a network ID. While entities might have different IDs each time, network
entities are linked to their respective entities through the network
IDs, allowing these entities to survive dropping in and out of
relevance.

Similar to
:java`FieldReplicateType <org.terasology.network.FieldReplicateType>`{.interpreted-text
role="ref"}, the `ReplicateMode` enum determines which clients the
entity should be replicated to (i.e. which clients the entity is
registered on).

::: {#network_replicateMode}
  ReplicateMode            Description
  ------------------------ --------------------------------------------------------------------------------------------------
  **ALWAYS**               The entity will always replicated to all clients connected to the server.
  **RELEVANT** (default)   The entity will only be replicated to clients where it was relevant (within a certain distance).
  **OWNER**                The entity will always be replicated to its owner.
:::

An example whereby both the
:java`@Replicate <org.terasology.network.Replicate>`{.interpreted-text
role="ref"} annotation and
:java`NetworkComponent <org.terasology.network.NetworkComponent>`{.interpreted-text
role="ref"} are used is in the chest.

Chests store their items in
:java`InventoryComponent <org.terasology.logic.inventory.InventoryComponent>`{.interpreted-text
role="ref"}, in the following List:

``` {.java}
@Replicate
@Owns
public List<EntityRef> itemSlots = Lists.newArrayList();
```

Again, the
:java`@Replicate <org.terasology.network.Replicate>`{.interpreted-text
role="ref"} annotation ensures that whenever the value of the component
field is updated on the server, this change will be reflected in all
clients as well (recall that the default value of
:java`FieldReplicateType <org.terasology.network.FieldReplicateType>`{.interpreted-text
role="ref"} is
`SERVER_TO_CLIENT <network_FieldReplicateType>`{.interpreted-text
role="ref"}). In other words, whenever a player modifies the items in
the chest, others in the same server will be able to see this change.

However, if the chest entity is not registered on the network, not all
clients connected to the server might recognise the chest entity,
preventing them from interacting with it. This is why
:java`NetworkComponent <org.terasology.network.NetworkComponent>`{.interpreted-text
role="ref"} is specified in `chest.prefab` as well:

``` {.javascript}
...
"Network": {
}
...
```

Recall that the default `ReplicateMode` is
`RELEVANT <network_replicateMode>`{.interpreted-text role="ref"}. This
:java`NetworkComponent <org.terasology.network.NetworkComponent>`{.interpreted-text
role="ref"} thus ensures that the chest entity will always be replicated
by the server to a client whenever it is relevant to the client,
ensuring that all interactions with the chest work as intended.

In order to register an existing entity on the network a
:java`NetworkComponent <org.terasology.network.NetworkComponent>`{.interpreted-text
role="ref"} can be added to it by simply using the `addComponent` method
for an entity. The `ReplicateMode` for the
:java`NetworkComponent <org.terasology.network.NetworkComponent>`{.interpreted-text
role="ref"} can also be set as required before adding the component to
the entity. For example,

``` {.java}
NetworkComponent netComp = new NetworkComponent();
netComp.replicateMode = NetworkComponent.ReplicateMode.ALWAYS;
entityRef.addComponent(netComp);
```
