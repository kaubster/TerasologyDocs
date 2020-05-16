Events
======

Events are sent to exactly one entity. Systems can define methods, that
get called when specific events get sent to entities with certain
components.

Defining events
---------------

An event is a class that implements the interface
:java`Event <org.terasology.entitySystem.event.Event>`{.interpreted-text
role="ref"}.

Its fields should be private and should be made accessible via public
getters. The event should have no setters but a constructor that takes
the values for all fields and sets them.

::: {.note}
::: {.title}
Note
:::

For events that are intend for
`network transfer <network_events>`{.interpreted-text role="ref"}, a
public/protected default constructor has to be provided.
:::

Sending events
--------------

The recommended way of sending events is via
:java`EntityRef.send(Event) <org.terasology.entitySystem.entity.EntityRef.send(T)>`{.interpreted-text
role="ref"}:

``` {.java}
entity.send(new MyEvent(myArg1, myArg2));
```

::: {.note}
::: {.title}
Note
:::

By default, events aren\'t sent over the network. See
`Network Events <network_events>`{.interpreted-text role="ref"} for
further options to send events over the network.
:::

Processing events {#eventsSystems_processingEvents}
-----------------

To make a class a system you annotate it with the
:java`@RegisterSystem <org.terasology.entitySystem.systems.RegisterSystem>`{.interpreted-text
role="ref"} annotation. If a system implements certain engine interfaces
like
:java`UpdateSubscriberSystem <org.terasology.entitySystem.systems.UpdateSubscriberSystem>`{.interpreted-text
role="ref"}, then the methods of that interface will automatically be
called by the engine. In addition to that, systems can declare methods
that get called when certain events occurred at certain entities.

Event processing methods must have the following method signature:

-   They must have a
    :java`@ReceiveEvent <org.terasology.entitySystem.event.ReceiveEvent>`{.interpreted-text
    role="ref"} annotation.
-   They must be public.
-   The type of the first argument must implement
    :java`Event <org.terasology.entitySystem.event.Event>`{.interpreted-text
    role="ref"}.
-   The second argument must be of type
    :java`EntityRef <org.terasology.entitySystem.entity.EntityRef>`{.interpreted-text
    role="ref"}.
-   The rest of the arguments if there are some must implement
    :java`Component <org.terasology.entitySystem.Component>`{.interpreted-text
    role="ref"}.

Example:

``` {.java}
@ReceiveEvent(components = {MyComponent.class, LocationComponent.class})
public void onMyComponentAdded(OnAddedComponent event, EntityRef entity, MyComponent myComponent) {...}
```

The method gets called, when the `OnAddedComponent` event occurs at an
entity, which has all of the following components: `MyComponent`,
`LocationComponent`.

::: {.note}
::: {.title}
Note
:::

The listing of a component in the annotation and the method seems to be
redundant, but allows direct access to the component.

**Parameter Access**

``` {.java}
@ReceiveEvent(components = {MyComponent.class, LocationComponent.class})
public void onMyComponentAdded(OnAddedComponent event, EntityRef entity, MyComponent myComponent) {
    myComponent.changeSomeValues();
    entity.saveComponent(myComponent);
}
```

**Direct Access**

``` {.java}
@ReceiveEvent(components = {MyComponent.class, LocationComponent.class})
public void onMyComponentAdded(OnAddedComponent event, EntityRef entity) {
    MyComponent myComponent = entity.getComponent(MyComponent.class);
    myComponent.changeSomeValues();
    entity.saveComponent(myComponent);
}
```

Which style to use depends on personal preference and readability. For a
large amount of components, the direct access inside the method should
be preferred.
:::

The method signature determines when the method will be called:

1.  The first argument controls the type of the event. This will also
    include sub-classes, e.g. for
    :java`NetworkEvent <org.terasology.network.NetworkEvent>`{.interpreted-text
    role="ref"}.
2.  The method will only be called if the entity has all components
    specified in the
    :java`@ReceiveEvent <org.terasology.entitySystem.event.ReceiveEvent>`{.interpreted-text
    role="ref"} annotation.
3.  The method will only be called if the entity has all components
    specified in the optional method parameters. Even if these
    components are not included in the annotation.
4.  The call order for multiple event listeners is set via a priority
    flag in the annotation:
    `@ReceiveEvent(priority=EventPriority.PRIORITY_NORMAL)`. Internally,
    this is an int value but should always be one constant of
    :java`EventPriority <org.terasology.entitySystem.event.EventPriority>`{.interpreted-text
    role="ref"}.
5.  It is possible to restrict event handlers to be processed only on
    the client, the server or both:
    `@ReceiveEvent(netFilter=RegisterMode.ALWAYS)`. The
    :java`RegisterMode <org.terasology.entitySystem.systems.RegisterMode>`{.interpreted-text
    role="ref"} determines when the handler will be registered. This is
    barely needed, as the same flag can be set globally for the entire
    class, using the same parameter in the
    :java`@RegisterSystem <org.terasology.entitySystem.systems.RegisterSystem>`{.interpreted-text
    role="ref"} annotation.

::: {.note}
::: {.title}
Note
:::

Some events like the
:java`OnAddedComponent <org.terasology.entitySystem.entity.lifecycleEvents.OnAddedComponent>`{.interpreted-text
role="ref"} event are implicitly linked to a component and will only be
offered to methods that require those arguments. In the upper case the
event fires only when `LocationComponent` got added while `MyComponent`
was present or when `MyComponent` got added while `LocationComponent`
was present. When another component gets added, while `MyComponent` and
`LocationComponent` are present, the method won\'t be called.

This is the case for the following lifecycle core events, which are
linked to to a component and require handling methods to list them
explicitely:

-   :java`OnAddedComponent <org.terasology.entitySystem.entity.lifecycleEvents.OnAddedComponent>`{.interpreted-text
    role="ref"}
-   :java`OnActivatedComponent <org.terasology.entitySystem.entity.lifecycleEvents.OnActivatedComponent>`{.interpreted-text
    role="ref"}
-   :java`OnChangedComponent <org.terasology.entitySystem.entity.lifecycleEvents.OnChangedComponent>`{.interpreted-text
    role="ref"}
-   :java`BeforeDeactivateComponent <org.terasology.entitySystem.entity.lifecycleEvents.BeforeDeactivateComponent>`{.interpreted-text
    role="ref"}
-   :java`BeforeRemoveComponent <org.terasology.entitySystem.entity.lifecycleEvents.BeforeRemoveComponent>`{.interpreted-text
    role="ref"}

All other core events and probably all module events aren\'t linked to a
component. Please read the Javadoc of any event you make a system for.
:::

Consumable events
-----------------

Normally an event is processed by the event handling methods in the
order of their priority. Events that implement
:java`ConsumableEvent <org.terasology.entitySystem.event.ConsumableEvent>`{.interpreted-text
role="ref"} can, however, be consumed. Once an event is consumed its
event handling stops and the remaining event handlers (with lower
priority) do not see the event.

One example usage is to determine what happens with user input: When the
player is in a mine cart, the input movement events may be consumed by a
high priority mine cart event handler before they reach the normal
movement handlers to avoid the player walking out of the cart.

The sender of consumable events can check if their event got consumed.
Some consumable events are sent as a test to figure out if there is a
new system that objects with the action being taken. For example the
event
:java`BeforeItemPutInInventory <org.terasology.logic.inventory.events.BeforeItemPutInInventory>`{.interpreted-text
role="ref"} can be consumed by a new system, to prevent the placement of
items in a slot that is reserved for certain other items.
