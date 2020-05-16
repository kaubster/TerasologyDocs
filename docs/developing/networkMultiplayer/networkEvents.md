Network Events {#network_events}
==============

By default, system events aren\'t sent over the network. To send events
over the network, you should mark the event as
`ServerEvent <networkEvents_serverEvent>`{.interpreted-text role="ref"},
`BroadcastEvent <networkEvents_broadcastEvent>`{.interpreted-text
role="ref"} or `OwnerEvent <networkEvents_ownerEvent>`{.interpreted-text
role="ref"}

::: {.note}
::: {.title}
Note
:::

If an event is marked as a network event, its fields are all replicated
by default.
:::

ServerEvent {#networkEvents_serverEvent}
-----------

Events annotated with
:java`@ServerEvent <org.terasology.network.ServerEvent>`{.interpreted-text
role="ref"}, are sent to the server. Only systems on the server will
then be able to process it. Typically those events are requests to the
server to confirm a gameplay related change. For that reason their name
often ends with Request instead of Event.

When events marked with
:java`@ServerEvent <org.terasology.network.ServerEvent>`{.interpreted-text
role="ref"} are sent on the client, they will be replicated to the
server as well so that they can be actioned there.

This is very important for events that require action on the part of the
server, such as
:java`AbstractMoveItemRequest <org.terasology.logic.inventory.events.AbstractMoveItemRequest>`{.interpreted-text
role="ref"} and
:java`DropItemRequest <org.terasology.logic.inventory.events.DropItemRequest>`{.interpreted-text
role="ref"}.

``` {.java}
@ServerEvent
public abstract class AbstractMoveItemRequest implements Event {
```

``` {.java}
@ServerEvent(lagCompensate = true)  
public class DropItemRequest implements Event {
```

::: {.note}
::: {.title}
Note
:::

You can also specify the `lagCompensate` element when marking events
with the [\@ServerEvent]{.title-ref} annotation, as seen from
[DropItemEvent]{.title-ref} It is false by default. If set to true,
however, the positioning of all characters on the server will be rewound
to simulate the conditions on the client when the event was initially
sent before the event is processed by the server.

In the case of
:java`DropItemRequest <org.terasology.logic.inventory.events.DropItemRequest>`{.interpreted-text
role="ref"}, there is a need for `lagCompensate` to be set to true as
the item should be dropped at the position where the character was when
the request was initially sent, rather than the position where the
character is when the event is received by the server. This thus takes
into account the time taken for the request to be sent from the client
to the server.
:::

BroadcastEvent {#networkEvents_broadcastEvent}
--------------

Events annotated with
:java`@BroadcastEvent <org.terasology.network.BroadcastEvent>`{.interpreted-text
role="ref"} are sent by the server to all clients.

::: {.todo}
What happens if a client tries to send this event?
:::

OwnerEvent {#networkEvents_ownerEvent}
----------

Events annotated with
:java`@OwnerEvent <org.terasology.network.OwnerEvent>`{.interpreted-text
role="ref"} are sent by the server to the client that owns the entity.
Typically a client only owns its character and stuff related to it.

::: {.note}
::: {.title}
Note
:::

If a system on a client/server is responsible for processing an event,
it can and should also be defined via a network filter which can be
specified in the
:java`@RegisterSystem <org.terasology.entitySystem.systems.RegisterSystem>`{.interpreted-text
role="ref"} annotation of the service or within
:java`@ReceiveEvent <org.terasology.entitySystem.event.ReceiveEvent>`{.interpreted-text
role="ref"} annotation of the handling method. See more detail about
provessing an event in
`Processing events <eventsSystems_processingEvents>`{.interpreted-text
role="ref"}
:::
