## Authors

- [Glevinzon Dapal](https://app.identifi.com/profile/00a0128bdc38887a855480f7c38ffe84)

## Goal Statements

At the end of this experiment, we should be able to;

- learn if Svelte has support for testing
- know if Jest + testing library for svelte works in a SvelteKit setup
- know how to use libraries for API mocking, i.e. MSW, nock
- confirm if TDD can be done in Svelte development

## Abstract

Weeks ago, the experiment to explore Svelte was concluded, and we saw a potential use of it in the projects to come. But what's missing and is considered necessary as the technology itself was testing. Svelte sure is mature enough to support testing in development, using existing and proven libraries like Jest and testing library. Although, I must say that setting it up required a bit of digging into articles and tutorials to get the correct config and make things work as smoothly as possible.

The Jamclout svelte-clone project has this behavior to fire API requests to BE, and so to test that behavior, we have to implement HTTP interceptions and do API mocking. The problem that I had was that I followed the Apollo Client documentation where it suggested using its MockedProvider. It didn't work as expected; luckily, Roger saw my blocker and told me to use nock or MSW. I chose the latter to explore this on API mocking. Setting it up was a bit complicated, but it worked as expected after an hour or two. And by the way, for the record, I have zero ideas on what API mocking is all about and how it behaves before even beginning exploring it.

During the last days of this experiment, I was worried that I may not do things the right way. Just seeing tutorials and articles online might not be the recommended way to do testing. And so, what I did was I looked for courses online about Svelte with TDD and found one that suited my needs. I've downloaded the whole course from the internet resources and then started watching. As I watched the course, I've confirmed then that Svelte can be done with TDD. I've also applied the testing techniques shown by the speaker to this experiment.

## Conclusion

In the company, testing on Frontend was starting to shape up and is yet to be holistically used in every software product we are to develop. I am still a work in progress learning the discipline myself. And so, this experiment did help me boost my desire to learn more about testing. Testing in Svelte is not that far in testing React. This is good since there is no need to learn different sets of techs to achieve the desired output in testing Svelte and React.
In conclusion, Svelte testing is so much possible with the use of existing libraries used in Reactjs. TDD is also practiced, evidently because of the courses online that I was able to search. The discipline to practice testing can be achieved and refined if we start as early as the development begins. Personally, this experiment allowed me to explore testing and made me realize that there is still so much room for improvements and learning things slowly but surely.

## Resources

- [](https://el3um4s.medium.com/how-to-test-sveltekit-app-with-jest-848afa8edbc7)[https://el3um4s.medium.com/how-to-test-sveltekit-app-with-jest-848afa8edbc7](https://el3um4s.medium.com/how-to-test-sveltekit-app-with-jest-848afa8edbc7)
- [](https://koenvg.medium.com/setting-up-jest-with-sveltekit-4f0a0e379668)[https://koenvg.medium.com/setting-up-jest-with-sveltekit-4f0a0e379668](https://koenvg.medium.com/setting-up-jest-with-sveltekit-4f0a0e379668)
- [](https://www.apollographql.com/blog/frontend/introduction-to-testing/)[https://www.apollographql.com/blog/frontend/introduction-to-testing/](https://www.apollographql.com/blog/frontend/introduction-to-testing/)
- [](https://mswjs.io/)[https://mswjs.io/](https://mswjs.io/)
- [](https://dev.to/taneba/using-msw-to-test-react-with-graphql-effectively-24h4)[https://dev.to/taneba/using-msw-to-test-react-with-graphql-effectively-24h4](https://dev.to/taneba/using-msw-to-test-react-with-graphql-effectively-24h4)
- [](https://www.youtube.com/watch?v=Ys4xmx1PIK8)[https://www.youtube.com/watch?v=Ys4xmx1PIK8](https://www.youtube.com/watch?v=Ys4xmx1PIK8)
- [](https://www.udemy.com/course/svelte-with-test-driven-development/?couponCode=FEB22DXT)[https://www.udemy.com/course/svelte-with-test-driven-development/?couponCode=FEB22DXT](https://www.udemy.com/course/svelte-with-test-driven-development/?couponCode=FEB22DXT)
- [](https://mswjs.io/docs/getting-started/mocks/graphql-api)[https://mswjs.io/docs/getting-started/mocks/graphql-api](https://mswjs.io/docs/getting-started/mocks/graphql-api)
- [](https://www.youtube.com/watch?v=RjZGLMsx6b4)[https://www.youtube.com/watch?v=RjZGLMsx6b4](https://www.youtube.com/watch?v=RjZGLMsx6b4)
- [](https://mswjs.io/docs/getting-started/integrate/node)[https://mswjs.io/docs/getting-started/integrate/node](https://mswjs.io/docs/getting-started/integrate/node)
- [](https://jestjs.io/docs/webpack)[https://jestjs.io/docs/webpack](https://jestjs.io/docs/webpack)
- [](https://stackoverflow.com/questions/54627028/jest-unexpected-token-when-importing-css)[https://stackoverflow.com/questions/54627028/jest-unexpected-token-when-importing-css](https://stackoverflow.com/questions/54627028/jest-unexpected-token-when-importing-css)
- [](https://www.infoq.com/news/2020/11/msw-mocking-graphql-rest-api/)[https://www.infoq.com/news/2020/11/msw-mocking-graphql-rest-api/](https://www.infoq.com/news/2020/11/msw-mocking-graphql-rest-api/)
- [](https://testing-library.com/docs/react-testing-library/cheatsheet/)[https://testing-library.com/docs/react-testing-library/cheatsheet/](https://testing-library.com/docs/react-testing-library/cheatsheet/)
- [](https://mswjs.io/docs/recipes/request-assertions)[https://mswjs.io/docs/recipes/request-assertions](https://mswjs.io/docs/recipes/request-assertions)
- [](https://www.youtube.com/watch?v=R265FKnzswI)[https://www.youtube.com/watch?v=R265FKnzswI](https://www.youtube.com/watch?v=R265FKnzswI)
- [](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles)[https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles)
  - To use in testing library - screen.getByRole()
  - [](https://testing-library.com/docs/queries/about)[https://testing-library.com/docs/queries/about](https://testing-library.com/docs/queries/about)
- [](https://testing-library.com/docs/ecosystem-user-event/)[https://testing-library.com/docs/ecosystem-user-event/](https://testing-library.com/docs/ecosystem-user-event/)
- [](https://testing-library.com/docs/queries/about#debugging)[https://testing-library.com/docs/queries/about#debugging](https://testing-library.com/docs/queries/about#debugging)
  - use screen.debug()
- [](https://testing-playground.com/)[https://testing-playground.com/](https://testing-playground.com/)
- Initial readings on Svelte TDD
  - [](https://blog.logrocket.com/intro-testing-sveltekit-applications/)[https://blog.logrocket.com/intro-testing-sveltekit-applications/](https://blog.logrocket.com/intro-testing-sveltekit-applications/)
  - [](https://timdeschryver.dev/blog/how-to-test-svelte-components)[https://timdeschryver.dev/blog/how-to-test-svelte-components](https://timdeschryver.dev/blog/how-to-test-svelte-components)
  - [](https://www.thisdot.co/blog/svelte-component-testing-with-cypress-vite)[https://www.thisdot.co/blog/svelte-component-testing-with-cypress-vite](https://www.thisdot.co/blog/svelte-component-testing-with-cypress-vite)
  - [](https://el3um4s.medium.com/how-to-test-sveltekit-app-with-jest-848afa8edbc7)[https://el3um4s.medium.com/how-to-test-sveltekit-app-with-jest-848afa8edbc7](https://el3um4s.medium.com/how-to-test-sveltekit-app-with-jest-848afa8edbc7)
  - [](https://dev.to/robole/testing-svelte-components-with-jest-and-vite-219d)[https://dev.to/robole/testing-svelte-components-with-jest-and-vite-219d](https://dev.to/robole/testing-svelte-components-with-jest-and-vite-219d)
  - [](https://www.youtube.com/watch?v=ZBS-ldGLCRw)[https://www.youtube.com/watch?v=ZBS-ldGLCRw](https://www.youtube.com/watch?v=ZBS-ldGLCRw)
- [](https://jestjs.io/docs/getting-started)[https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)
- [](https://testing-library.com/docs/svelte-testing-library/intro)[https://testing-library.com/docs/svelte-testing-library/intro](https://testing-library.com/docs/svelte-testing-library/intro)
- [](https://jestjs.io/docs/snapshot-testing)[https://jestjs.io/docs/snapshot-testing](https://jestjs.io/docs/snapshot-testing)
- [](https://www.apollographql.com/docs/react/development-testing/testing/)[https://www.apollographql.com/docs/react/development-testing/testing/](https://www.apollographql.com/docs/react/development-testing/testing/)
- [](https://circleci.com/blog/how-to-test-software-part-i-mocking-stubbing-and-contract-testing/)[https://circleci.com/blog/how-to-test-software-part-i-mocking-stubbing-and-contract-testing/](https://circleci.com/blog/how-to-test-software-part-i-mocking-stubbing-and-contract-testing/)
- [](https://martinfowler.com/articles/mocksArentStubs.html#TheDifferenceBetweenMocksAndStubs)[https://martinfowler.com/articles/mocksArentStubs.html#TheDifferenceBetweenMocksAndStubs](https://martinfowler.com/articles/mocksArentStubs.html#TheDifferenceBetweenMocksAndStubs)
- [](https://stackoverflow.com/questions/62442797/jest-folder-structure)[https://stackoverflow.com/questions/62442797/jest-folder-structure](https://stackoverflow.com/questions/62442797/jest-folder-structure)
- [](https://timdeschryver.dev/blog/how-to-test-svelte-components#writing-a-test)[https://timdeschryver.dev/blog/how-to-test-svelte-components#writing-a-test](https://timdeschryver.dev/blog/how-to-test-svelte-components#writing-a-test)

## Documentation

Snapshots

```jsx
it("sends username, email and password to backend after clicking the button",
	async () = {
	  render(SignUpPage);
	  const usernameInput = screen.getByLabelText("Username");
	  const emailInput = screen.getByLabelText("E-mail");
	  const passwordInput = screen.getByLabelText("Password");
	  const passwordRepeatInput = screen.getByLabelText("Password Repeat");
	  await userEvent.type(usernameInput, "user1");
	  await userEvent.type(emailInput, "user1@mail.com");
	  await userEvent.type(passwordInput, "P4ssword");
	  await userEvent.type(passwordRepeatInput, "P4ssword");
	  const button = screen.getByRole("button", { name: "Sign Up" });
	  const mockFn jest.fn();
		// axios.post = mockFn;
		window.fetch = mockFn;
	  await userEvent.click(button);
	  const firstCall = mockFn.mock.calls[ø];
	  const body = JSON.parse(firstCall[1].body);
	  expect(body).toEqual(
	    username: "user1",
	    email: "user1@mail.com",
	    password: "P4ssword",
	 );
});

```

**Don't mock your client**

When you search how to test React Component with GraphQL, you'll might see the articles or guides that shows how to mock graphql client or it's Provider.

```
import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import { GET_DOG_QUERY, Dog } from './dog';

const mocks = [];

it('renders without error', () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children).toContain('Loading...');
});


```

This is how [apollo client instructs](https://www.apollographql.com/docs/react/development-testing/testing/).

And for urql, it also instructs the way to mock client.

```
import { mount } from 'enzyme';
import { Provider } from 'urql';
import { never } from 'wonka';
import { MyComponent } from './MyComponent';

it('renders', () => {
  const mockClient = {
    executeQuery: jest.fn(() => never),
    executeMutation: jest.fn(() => never),
    executeSubscription: jest.fn(() => never),
  };

  const wrapper = mount(
    <Provider value={mockClient}>
      <MyComponent />
    </Provider>
  );
});


```

Well, what's wrong with mocking?

1.  It's tied to particular GraphQL Client. Tests will be broken if you change the client library one to another.
2.  Mocked Provider possibly works different from real Provider running on production. What if your Provider includes complex logic that would affect your app's behavior?

Initial Goal Statements

- We would want to see Test Driven Development in action
- How Jest + testing library works
- How stubs and mocks works in Svelte
- Assess how convenient TDD works with Svelte

PROBLEM

- MSW were setup but no way to test because I’m not sure if it works on SSR rendered components

I might look into this Course in udemy; [](https://www.udemy.com/course/svelte-with-test-driven-development/?referralCode=80F40345902091FD9B5B)[https://www.udemy.com/course/svelte-with-test-driven-development/?referralCode=80F40345902091FD9B5B](https://www.udemy.com/course/svelte-with-test-driven-development/?referralCode=80F40345902091FD9B5B) or some other courses.

For the reason that most of the articles I have initially search upon, talks only about Basic TDD and Unit Testing. I might find more useful things in the courses.

**Unit** = fully isolated (testing in isolation) / A single unit of work

**Integration** = testing that are not in full isolation, by definition it is integration (company, module class) (but this is ambiguous)

RULE OF THUMB #1 Integrating with anything non-deterministic means your test must be considered an integration test.

RULE OF THUMB #2 Integrating with deterministic parts of your language does not necessarily make your test an integration test.

RULE OF THUMB #3 Integrating with any 3rd party code makes your test an integration test.

RULE OF THUMB #4 Integrating with any other class/module that you own makes your test an integration test.

Excerpt; [](https://circleci.com/blog/how-to-test-software-part-i-mocking-stubbing-and-contract-testing/)[https://circleci.com/blog/how-to-test-software-part-i-mocking-stubbing-and-contract-testing/](https://circleci.com/blog/how-to-test-software-part-i-mocking-stubbing-and-contract-testing/)

### **Using mocking and stubbing in unit + component tests**

I recommend mocking or stubbing when your code uses external dependencies like system calls, or accessing a database. For example, whenever you run a test, you’re exercising the implementation. So when a **`delete`** or **`create`** function happens, you’re letting it create a file, or delete a file. This work is not efficient, and the data it creates and deletes is not actually useful. Furthermore, it’s expensive to clean up, because now you have to manually delete something every time. This is a case where mocking/stubbing can help a lot.

Using mocks and stubs to fake the external functionality help you create tests that are independent. For instance, say that the test writes a file to /tmp/test_file.txt and then the system under the test deletes it. The problem then is not that the test is not independent; it is that the system calls take a lot of time. In this instance, you can stub the file system call’s response, which will take a lot less time because it immediately returns.

Another benefit is that you can reproduce complex scenarios more easily. For instance, it is much easier to test the many error responses you might get from the filesystem then to actually create the condition. Say that you only wanted to delete corrupt files. Writing a corrupt file can be difficult programmatically, but returning the error code associated with a corrupt file is a matter of just changing what a stub returns.

We’ve taken a look at examples of different layers of testing using mocks and stubs. Now let’s recap why they are useful:

1.  Tests with mocks and stubs go faster because you don’t have to connect with external services. There’s no delay waiting for them to respond.
2.  You have the flexibility to scope the test to cover just the parts you can control and change. With external services, you are powerless in the case that they’re wrong or the test fails. Mocking ensures you are scoping tests to work that you can do – and not giving yourself problems you can’t fix.
3.  Mocking external API calls helps your test to be more reliable
4.  Contract testing empowers service teams to be more autonomous in development

## Developing

Once cloned the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
