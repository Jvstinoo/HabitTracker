# HabitTracker

## Project structure

Using atomic folder structure, components are separated as such:

- atoms: This folder contains the smallest and most basic building blocks of the application such as buttons, inputs. Atoms should be highly reusable and not contain any business logic.
- molecules: Molecules are composed of one or more atoms and represent more complex UI elements such as password input and search bar.
- organisms: Organisms are groups of molecules and atoms that form a complete functional section of your application. For instance, a login form with input fields, a button, and error messages.
- templates: Templates define the layout and structure of a specific page or view. They assemble organisms and molecules into a cohesive user interface.
- pages: Pages represent the final screens or views that users interact with. They utilize templates and contain minimal logic, serving as the entry point for data retrieval and manipulation.
