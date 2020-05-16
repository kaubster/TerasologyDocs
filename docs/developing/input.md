User Input
==========

Terasology handles the input over events, which will be send by the
engine when an input condition is met. User input can be used for any
kind of action, like movement, opening chests or rotating the player.
Most of the input system is available through annotations which require
little programming effort.

A quick example is the event for forward movement:

``` {.java}
@RegisterBindButton(id = "forwards", description = "${engine:menu#binding-forwards}")
@DefaultBinding(type = InputType.KEY, id = Keyboard.KeyId.W)
public class ForwardsButton extends BindButtonEvent {
}
```

The
:java`@RegisterBindButton <org.terasology.input.RegisterBindButton>`{.interpreted-text
role="ref"} annotation marks this class as a button event for a key
binding. A default binding can be defined via the
:java`@DefaultBinding <org.terasology.input.DefaultBinding>`{.interpreted-text
role="ref"} annotation. In this case, this would be the `W` key. And as
the class is used for a button binding, it has to extend
:java`BindButtonEvent <org.terasology.input.BindButtonEvent>`{.interpreted-text
role="ref"}.

Define Bindings
---------------

To define an own binding, one needs to create a subclass of:

-   :java`BindButtonEvent <org.terasology.input.BindButtonEvent>`{.interpreted-text
    role="ref"}, annotated with
    :java`@RegisterBindButton <org.terasology.input.RegisterBindButton>`{.interpreted-text
    role="ref"} for keyboard input.
-   :java`BindAxisEvent <org.terasology.input.BindAxisEvent>`{.interpreted-text
    role="ref"}, annotated with
    :java`@RegisterBindAxis <org.terasology.input.RegisterBindAxis>`{.interpreted-text
    role="ref"} or
    :java`@RegisterRealBindAxis <org.terasology.input.RegisterRealBindAxis>`{.interpreted-text
    role="ref"} for controller input.

:java`@DefaultBinding <org.terasology.input.DefaultBinding>`{.interpreted-text
role="ref"} can and should be used in both cases, it is also possible to
define multiple defaults for the same binding by using the annotation
multiple time.

A full example for a key binding that logs a greeting message when the
user presses `G` could look like this:

``` {.java}
package org.terasology.examplemodule.binds;

import org.terasology.input.ActivateMode;
import org.terasology.input.BindButtonEvent;
import org.terasology.input.DefaultBinding;
import org.terasology.input.InputType;
import org.terasology.input.Keyboard.KeyId;
import org.terasology.input.RegisterBindButton;

@RegisterBindButton(id = "greet", category = "greeting", description = "${ExampleModule:input#binding-greet}", mode = ActivateMode.PRESS)
@DefaultBinding(type = InputType.KEY, id = KeyId.G)
public class GreeterButton extends BindButtonEvent {

}
```

This binding is defined in the module `ExampleModule`. The button is
registered with the id `greet` and in the `greeting` category. Both of
these values are required for the input category, as shown in the next
snippet.

The description is a `Translation <translation>`{.interpreted-text
role="ref"} identifier and the mode restricts the event to a button
`PRESS` instead of triggering for press and release. The default binding
maps to the key `G` and as the class is a button binding, it extends
:java`BindButtonEvent <org.terasology.input.BindButtonEvent>`{.interpreted-text
role="ref"}.

Input Categories
----------------

The binding from the previous example would work on its own but is not
shown in the input settings. To register binds to the input
configuration, input categories are used.

They can be registered via the
:java`@InputCategory <org.terasology.input.InputCategory>`{.interpreted-text
role="ref"} annotation, which is used to annotate a package, therefore
in the `package-info.java` file. The event is contained in the package
`org.terasology.examplemodule.binds`, therefore a `package-info.java` is
required in the same package.

``` {.java}
@InputCategory(id = "exampleBindings", 
               displayName = "${ExampleModule#category-exampleBindings}", 
               ordering = {
               "ExampleModule:greet"
}) package org.terasology.examplemodule.binds;

import org.terasology.input.InputCategory;
```

The category itself requires an id, `exampleBindings` in this case. The
display name is again a `Translation <translation>`{.interpreted-text
role="ref"} identifier. The ordering is an array of identifieres
`<moduleName>:<BindingId>` and determines the order of the bindings in
the setting screen.

::: {.note}
::: {.title}
Note
:::

All bindings should be in a package with an input category.
:::

::: {.note}
::: {.title}
Note
:::

Binding description and the display name of the input category should be
translation identifiers instead of plain strings.
:::

Handling Input Events
---------------------

Input is handled by the
`Event System <eventsSystems_processingEvents>`{.interpreted-text
role="ref"}. If a binding is triggered, the input system will send the
registered event to the player and the client. For the previous example,
the following system can handle the event and will greet the player on
the console when he triggers the input.

``` {.java}
package org.terasology.examplemodule;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.terasology.entitySystem.entity.EntityRef;
import org.terasology.entitySystem.event.ReceiveEvent;
import org.terasology.entitySystem.systems.BaseComponentSystem;
import org.terasology.entitySystem.systems.RegisterSystem;
import org.terasology.examplemodule.binds.GreeterButton;

@RegisterSystem
public class GreeterSystem extends BaseComponentSystem {

    private static final Logger logger = LoggerFactory.getLogger(GreeterSystem.class);

    @ReceiveEvent
    public void onGreet(GreeterButton greetButton, EntityRef entity) {
        logger.info("Greeting {}", entity);
    }
}
```

Example output:

``` {.none}
[main] INFO  o.t.examplemodule.GreeterSystem - Greeting EntityRef{id = 47, netId = 0, prefab = 'engine:client'}
[main] INFO  o.t.examplemodule.GreeterSystem - Greeting EntityRef{id = 55, netId = 0, prefab = 'engine:player'}
```

::: {.note}
::: {.title}
Note
:::

If the event is consumed for the client entity, it will not be sent
again to the player entity.
:::

::: {.todo}
client-player difference
:::
