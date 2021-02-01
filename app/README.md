# Description of app/ folder

**Neither `app` nor any subfolder should have index.js file, as it would blowing up memory
usage on a smal test's run.**

folder structure:

```
  |-app
     |--components
     |--config_provider
     ∟--helpers
```

## app/components

folder contains any level components, which to some degree reproduce
funcitonal/structural behavior of application elements.

There is a trade off:

- Reimplementation of all application components to follow their developers' conterpart one to one may be fragile, as tests suppose to survive refactoring. It is quite time consuming but maintenance may be faster.
- Pure hight level functional approach may fail, if new element that satisfies selector will be added to the page.
  Also it is a nightmare to support such tests.

Hight level components also stored in this folder. For example a table component can consist of multiple cell
components.

## app/config_provider

This folder contains configurations, variations that may alter work of application.
I won't rant about "Configs vs Hardcoded data" so please don't save configs in your tests/components.
Especially if you have dynamic configs intented to be often updated.
It **really, really** helps to automate if configurations of application may be easily retrieved.
JSON and anything converting in it is pretty common nowadays. Maybe you'll have to ask devs to collaborate a bit, it will pay off.

## app/helpers

This folder contains wrappers complex action lists, especially if these actions wary between configurations.

**Important part that we DO NOT TEST actions inside these wrappers**

If you want to test behavior of some intermediate function, write a test for it.
app/helpers is created for **REUSABLE** functions. We don't wan't to do some assertions each time the wrapper is callled. It's a waste of resourses.
