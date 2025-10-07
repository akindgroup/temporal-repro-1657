# Temporal TypeScript SDK 1.12.2 typing issue

Minimal reproduction of a potential typing issue introduced in Temporal
TypeScript SDK 1.12.2.

The workflow code compiles without issues in SDK 1.12.1, but fails in SDK
1.12.2.

After cloning the repo, it is in a state where compilation fails. To reset it to
a state that compiles, install version 1.21.1 of the SDK:

```bash
npm i @temporalio/{activity,client,worker,workflow}@1.12.1
```

This is likely due to the changes in typing introduced in [pull request
1657][1].

[1]: https://github.com/temporalio/sdk-typescript/pull/1657

```typescript
// Before PR 1657
export type ActivityInterfaceFor<T> = {
  [K in keyof T]: T[K] extends ActivityFunction ? T[K] : typeof NotAnActivityMethod;
};

// After PR 1657
export type ActivityInterfaceFor<T> = {
  [K in keyof T]: T[K] extends ActivityFunction ? ActivityFunctionWithOptions<T[K]> : typeof NotAnActivityMethod;
};
```

## Workaround

The issue can be worked around in a number of different ways, the simplest of
which is arguably to explicitly type the variable holding the return value of
the activity call.
