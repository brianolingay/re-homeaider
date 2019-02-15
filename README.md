# re-homeaider

> Quick Note: Common directory should be build first specially when has changes or its not yes build.

## Common (mostly input/form validation)

```
# 1. Navigate to common directory
cd packages/common

# 2 Run build
yarn build
```

## Front End:

[Next JS](https://github.com/zeit/next.js/)
[Semantic-UI-React](https://react.semantic-ui.com/)

```
# 1. Navigate to web directory
cd packages/web

# 2 Start development
yarn dev

# 3 or Run production code.
yarn build && yarn start
```

## Backend

This is running using express + graphql([Apollo Express Server](https://www.apollographql.com/docs/apollo-server/servers/express.html)). Schema is produce using [TypeGraphQL](https://react.semantic-ui.com/)

Authentication: JWT since it hard to create cookies in web browsers.

> Note: Server needs Redis Server and MongoDB

```
# 1. Navigate to server directory
cd packages/server

# 2 Start development
yarn start

# 3 or Run production code.
yarn build && yarn serve
```
