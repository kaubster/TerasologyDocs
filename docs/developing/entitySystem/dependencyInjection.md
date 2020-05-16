Dependency Injection
====================

A
:java`ComponentSystem <org.terasology.entitySystem.systems.ComponentSystem>`{.interpreted-text
role="ref"} is not able to do much on its own except
`sending an receiving events <events>`{.interpreted-text role="ref"}. If
it needs access to further logic, for example to modify blocks, has to
use additional services from the engine.

Inject an Instance
------------------

The engine provides a mechanism for field injection to component
systems. One example to obtain an instance of a
:java`BlockManager <org.terasology.world.block.BlockManager>`{.interpreted-text
role="ref"} could look like this:

``` {.java}
@RegisterSystem(RegisterMode.ALWAYS)
public class MySystem extends BaseComponentSystem {

  @In
  private BlockManager blockManager;
}
```

When a component system is created, all fields marked with the
:java`@In <org.terasology.registry.In>`{.interpreted-text role="ref"}
annotation will be injected. The fields do not have to be public, it is
even recommended to mark them as **private**.

::: {.warning}
::: {.title}
Warning
:::

1.  Injected fields are `null` when the class is created, so don\'t
    access them in the constructor.
2.  Other systems may not be initialized before
    :java`ComponentSystem.initialise() <org.terasology.entitySystem.systems.ComponentSystem.initialise()>`{.interpreted-text
    role="ref"} is called. It is not guaranteed, that other systems are
    already initialized when they are accessed in the `initialize()`
    method.
:::

Share a Class
-------------

It is also possible to make own implementations available for dependency
injection. A system marked with the
:java`@Share <org.terasology.registry.Share>`{.interpreted-text
role="ref"} annotation is registered to be injected in other classes.

::: {.note}
::: {.title}
Note
:::

It is highly recommended to share an interface instead of the exact
class.
:::

One example to provide a new service:

``` {.java}
public interface MyService {

    void doSomething();
}
```

A component system implements this interface and is marked with the
`@Share` annotation, using the interface type as value:

``` {.java}
@Share(MyService.class)
@RegisterSystem(RegisterMode.ALWAYS)
public class MyServiceSystem extends BaseComponentSystem implements MyService {

    @Override
    public void doSomething() {
        //...
    }

}
```

When another system wants to access `MyService`, it can add a field for
it:

``` {.java}
@In
private MyService myService;
```

When the systems are initialized, this field will have the instance of
our `MyServiceSystem` as value.

How it works
------------

There are two systems to register classes for dependency injection. The
:java`CoreRegistry <org.terasology.registry.CoreRegistry>`{.interpreted-text
role="ref"} is the older system and provides a static mapping from
classes to instances, comparable to a singleton pattern.

The :java`Context <org.terasology.context.Context>`{.interpreted-text
role="ref"} does pretty much the same in a non-static way and should be
used for every new implementation in the dependency injection layer.

Logic for the actual dependency injection is available in the
:java`InjectionHelper <org.terasology.registry.InjectionHelper>`{.interpreted-text
role="ref"}. It provides methods to inject fields in a class from a
given context or the core registry.

::: {.note}
::: {.title}
Note
:::

Dependency injection is also available in other parts of Terasology than
only component systems. Other examples may be NUI widgets, World
Generators and some more.
:::
