# React Query Example With Tests

## Quick Overview

### `/hooks`

Includes custom hooks that wrap around each query or mutation from React-Query that are named with functionality in mind

These hooks make each query / mutation very easily testable

### `/component/Home`

Calls a query that depending on state of request, returns error component, loading component, or component listing out fetched data

Calls mutation hook that will refetch query upon calling

### `/pages/ssr`

Fetches the query on server side using `getServerSideProps`

Once hook is called in component, data is already fetched and available

### `/tests/utils`

Sets up handlers used by msw server. This is whats used to mock api

Creates helper functions for testing with React-Query

### `/tests/components`

Tests using msw in `Home.test`

Tests using jest mocks in `HomeMock.test`

### `/tests/hooks`

If hook if complex enough and more tests can be done outside of component usage, then each custom hook can be wrapped in a test

### References

- [msw](https://mswjs.io/)
- [hook testing](https://react-hooks-testing-library.com/usage/basic-hooks)
- [testing repo](https://github.com/TkDodo/testing-react-query)
- [React-Query blog](https://tkdodo.eu/blog/practical-react-query)
