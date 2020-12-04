# Lean ui testing framework

This project is a rough outline of a lean testing framework.
The main value of this project is **explanations of design desicions**.
Look into *.md files for that.

## Main design principles

1 Tests are grouped by functionality, they are not piled up.
2 A some_test.js is the only neseccary file to read to understand what this test about.
3 A test doesn't load unnecesary modules. Modules are slim, no God Classes.
4 A test can have chained steps in it. The first fail breaks the chain.
5 BeforeAll hooks are for framework setup only.The first test_step makes an application setup.
6 AfterAll hooks do not throw. Clean up on a failed test may fail, but without throwing.
7 A test has no application's configuration. Config_provider mimics/reuses config from acutal system.
8 Helpers functions for combining functionality may be possible, but they rely on config_provider.
9 No conditional steps in tests. Write two tests or add a helper to avoid the fork completely.