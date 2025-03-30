# English4Kids Test (Vite + React)

This project contains a microApp that renders a card with information about a teacher and a button to initiate a chat session.

## Explanation

This test aims to asses UI design and so an explanation of the design process is needed. Here is a breakdown of all the steps involved in the planning and execution of UI changes:

1. I conducted an investigation about e-learning platforms, specifically language related ones. The investigation lead to the creation of a mood-board. You can find the moodboard here [Mood-board](https://www.figma.com/design/oOVIizIr7tphGKZKn4ZplO/English4Kids?node-id=0-1&t=KZs6X3l0QkksIbYi-1)
2. The investigation lead to a design trend in modern e-learning apps which was (apparently) started by [Babbel](https://www.babbel.com/) and can be summarized as a mobile-first approach with bigger UI elements and stylized rounded-corners + vibrant colors.
3. Locking into a design pattern, I added a basic design system to the project, you can find it [here](https://questival.atlassian.net/browse/SYM-196?atlOrigin=eyJpIjoiM2ZhOTZlYTQzYzM0NDhjOGJmNWQxYTQ5YmRjZWVhZTUiLCJwIjoiaiJ9)
4. Wireframes for the main components were created afterwards; for the [initial card](https://questival.atlassian.net/browse/SYM-198?atlOrigin=eyJpIjoiODYzYjZlNjVlODZmNDQ1OWIwN2M0MWYzNDczMWJhNzEiLCJwIjoiaiJ9) and for the [chat](https://questival.atlassian.net/browse/SYM-199?atlOrigin=eyJpIjoiYjcxNDVhYjM4NjRhNDA2OTgwMTU5ZjY3YzM1MzllZGEiLCJwIjoiaiJ9)
5. After that, development of the components followed, you can find details of the development in the [project's sprint](https://questival.atlassian.net/jira/software/projects/SYM/boards/3?atlOrigin=eyJpIjoiODdkNGUwZDEwYWNlNGNjZWJhNzA0YTEzMjhiODU2ZjUiLCJwIjoiaiJ9&sprints=172).

**Important:**
Access to [Jira](https://questival.atlassian.net/jira/software/projects/SYM/boards/3?atlOrigin=eyJpIjoiODdkNGUwZDEwYWNlNGNjZWJhNzA0YTEzMjhiODU2ZjUiLCJwIjoiaiJ9&sprints=172):
username: invitee@ctlst.cc
password: Invitee1234.

## Instructions to run the project

### Clone this repository to your local machine

1. `git clone https://github.com/MauLight/English4Kids-test.git`

### Install dependencies

1. Navigate to folder `cd English4Kids-test`
2. Then run `npm install`

### Run the program

1. Run `npm start` (default port= 3000)
   (\*) To change port go to vite.config.ts and specify a new port under server/port.

### Run the tests

1. Run `npm run test`

**Optional:**
Formatting should be handled by eslint, please add this settings to your VS Code settings JSON file:

> "eslint.format.enable": true,
> "editor.codeActionsOnSave": {
> "source.addMissingImports.ts": "explicit",
> "source.fixAll.eslint": "always"
> },
> "eslint.validate": ["javascript"],
