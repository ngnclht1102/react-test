# React assessment by Brian Nguyen Giang Nam

The 1st, 2nd, and 3rd exercise's source code is in this repo. And I have deployed it into netlify here. The 4th exercise will be in [EX4](#ex4)

I have some issues with configure this project to work with codepen so I place it here.
### Demo

App:

https://verdant-melba-07b4ea.netlify.app

Running End to end test:

https://youtu.be/QK05v68uUbI

Running unit test:

https://youtu.be/Nsg6XwLioK0

### Instalation steps

1. Install dependencies.

`yarn install`

2. Run local environment.

`yarn start`

### Run test

`yarn test`: run the Jest test for unit test and also run the cypress test for E2E testing.

### Available scripts

`yarn start` - run development server with hot reload mode,

`yarn test:jest` - run Jest tests,

`yarn test:cypress` - run Cypress tests in terminal,

`yarn test:cypress:open` - open Cypress application.

### Ex4

##### General
From my perspective, when I write the code, the code must be testable and should have unit test to make sure the input and output of a block of code is correct. So we need:

* Write the code that testable
* Have unit test 

For me, in React there are 2 kinds of test that quite important:
* Component testing
* End to end testing

##### Component testing
Let's dive into testing the component, when do testing with component, I devide it to two parts:
* UI
* Logic

Reason I devided to 2 parts because I often try to isolate the component to two layers, layer 1 is for logic (wrap in reac-hook or redux-saga, etc). The 2nd layer is for UI, just received props, and render the UI.

For the UI layer,  I often use `jest` and `react-testing-library` to test. There is 2 kinds of test I wanted to do:

* Snapshot test
* Render testing: make sure that the UI works for every cases when the props are changing.

For the logic layer, I oftent use the `react-hooks-testing-library` (an utilities of `react-testing-library` ) to test.

For component testing, mostly, I am trying to mock everything, for example: mocking the `fetch`, replace it with a mock promise with a mock response, and there are still manythings that we need to mock as well so it doesn't action like the actual browser/simulator does. 

And also the way we mock also can affect our test.

There is also just a small gap between unit test and logic test, sometime I write the test twice and it makes me think that the unitest is useless (it means some of the unit test logic is covered by the full logic testing).

##### E2E testing

I use `Cypress` to do it (in React Native, I use `Wix Detox`), it quite helpful that can run in a terminal so we can integrate it easily for running it in any CI services.

It also actions like a real browser/simulator.

Soem Edge cases I found, for example, when we want to test a screen which load the API, we want to test it in some cases:

* screen when it failed to load
* screen when it doesn't have any data

With the E2E test, we actually can test only 1 case unless we do some thing to override the API's status/response. 

Another example is, our test can be affected by the server as well, because it is an E2E test so when some services go down, our test is affected, also sometime it also depend on the network status as well. Depend on the network, sometime my test failed, and need to re-run.
