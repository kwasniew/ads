# JS coding style

Date: 2020-08-17

## Context

JS allows for different coding styles. We want to have consistent coding style in this project.

## Options

* Class based OO style (familiar, but full of this binding traps)
```js
class A {
    constructor() {
        this.state = {};
    }

    static factory() {
        return new A();
    }

    method() {
        return this.state;
    }
};
```

* Thisless OO style (less memory optimized, but more predictable)
```js
const A = () => {
    const state = {};

    return {
        method() {
            return state;
        }
    }
};

A.factory = () => {
    return A();
}; 
```

* Monadic FP style (strong math foundations, but not vary familiar to most JS devs and hard to combine
with most Node.js libs)


## Decision

I decided to go for OO programming with objects and closures instead of classes/this/new.
I find mental models of how this/new/classes work in JS overly complicated.
You can find very detailed mental model explanation here: https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch6.md#mental-models-compared

Watch this talk on thisless style: https://www.youtube.com/watch?v=n9qzwI4Krmo

