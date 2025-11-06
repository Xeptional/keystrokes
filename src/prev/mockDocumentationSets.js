export const mockDocumentationSets = {
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    version: 'ES2023',
    icon: '🟨',
    enabled: true,
    entries: [
      {
        id: 'array',
        name: 'Array',
        type: 'object',
        path: 'array',
        content: `# Array

Arrays are list-like objects whose prototype has methods to perform traversal and mutation operations.

## Syntax
\`\`\`javascript
const arr = [1, 2, 3, 4, 5];
const arr2 = new Array(1, 2, 3);
\`\`\`

## Methods

### Array.prototype.map()
Creates a new array with the results of calling a function for every array element.

\`\`\`javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8]
\`\`\`

### Array.prototype.filter()
Creates a new array with all elements that pass the test implemented by the provided function.

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(x => x % 2 === 0);
console.log(evens); // [2, 4]
\`\`\`

### Array.prototype.reduce()
Executes a reducer function on each element, resulting in a single output value.

\`\`\`javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
\`\`\``
      },
      {
        id: 'string',
        name: 'String',
        type: 'object',
        path: 'string',
        content: `# String

The String object is used to represent and manipulate a sequence of characters.

## Syntax
\`\`\`javascript
const str = "Hello, World!";
const str2 = new String("Hello");
\`\`\`

## Methods

### String.prototype.charAt()
Returns the character at the specified index.

\`\`\`javascript
const str = "Hello";
console.log(str.charAt(1)); // "e"
\`\`\`

### String.prototype.includes()
Determines whether one string may be found within another string.

\`\`\`javascript
const str = "Hello World";
console.log(str.includes("World")); // true
\`\`\`

### String.prototype.split()
Divides a string into an ordered list of substrings.

\`\`\`javascript
const str = "apple,banana,orange";
const fruits = str.split(",");
console.log(fruits); // ["apple", "banana", "orange"]
\`\`\``
      },
      {
        id: 'promise',
        name: 'Promise',
        type: 'object',
        path: 'promise',
        content: `# Promise

The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

## Syntax
\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  // Async operation
});
\`\`\`

## Methods

### Promise.prototype.then()
Returns a Promise. Takes up to two arguments: callback functions for the success and failure cases.

\`\`\`javascript
promise
  .then(result => console.log(result))
  .catch(error => console.error(error));
\`\`\`

### Promise.all()
Returns a single Promise that resolves when all promises resolve.

\`\`\`javascript
Promise.all([promise1, promise2, promise3])
  .then(values => console.log(values));
\`\`\`

### Promise.race()
Returns a promise that fulfills or rejects as soon as one of the promises fulfills or rejects.

\`\`\`javascript
Promise.race([promise1, promise2])
  .then(value => console.log(value));
\`\`\``
      }
    ]
  },
  react: {
    id: 'react',
    name: 'React',
    version: '18.2',
    icon: '⚛️',
    enabled: true,
    entries: [
      {
        id: 'usestate',
        name: 'useState',
        type: 'hook',
        path: 'hooks/use-state',
        content: `# useState

useState is a React Hook that lets you add state to functional components.

## Syntax
\`\`\`javascript
const [state, setState] = useState(initialState);
\`\`\`

## Parameters
- **initialState**: The value you want the state to be initially.

## Returns
Returns an array with two values:
1. The current state value
2. A setter function to update the state

## Example
\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## Common Patterns

### Updating state based on previous state
\`\`\`javascript
setCount(prevCount => prevCount + 1);
\`\`\`

### State with objects
\`\`\`javascript
const [user, setUser] = useState({ name: '', age: 0 });
setUser(prev => ({ ...prev, name: 'John' }));
\`\`\``
      },
      {
        id: 'useeffect',
        name: 'useEffect',
        type: 'hook',
        path: 'hooks/use-effect',
        content: `# useEffect

useEffect is a React Hook that lets you perform side effects in functional components.

## Syntax
\`\`\`javascript
useEffect(() => {
  // Effect logic
  return () => {
    // Cleanup logic
  };
}, [dependencies]);
\`\`\`

## Parameters
- **effect**: A function that contains the side-effect logic
- **dependencies**: An optional array of dependencies

## Example
\`\`\`javascript
import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Seconds: {seconds}</div>;
}
\`\`\`

## Dependency Array
- **No array**: Runs after every render
- **Empty array []**: Runs only once after initial render
- **[dep1, dep2]**: Runs when dependencies change`
      },
      {
        id: 'usecontext',
        name: 'useContext',
        type: 'hook',
        path: 'hooks/use-context',
        content: `# useContext

useContext is a React Hook that lets you read and subscribe to context from your component.

## Syntax
\`\`\`javascript
const value = useContext(SomeContext);
\`\`\`

## Example
\`\`\`javascript
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Button />
    </ThemeContext.Provider>
  );
}
\`\`\``
      }
    ]
  },
  css: {
    id: 'css',
    name: 'CSS',
    version: 'CSS3',
    icon: '🎨',
    enabled: true,
    entries: [
      {
        id: 'flexbox',
        name: 'Flexbox',
        type: 'property',
        path: 'flexbox',
        content: `# Flexbox

The Flexible Box Layout Module makes it easier to design flexible responsive layout structure.

## Container Properties

### display: flex
Defines a flex container and enables flex context for its children.

\`\`\`css
.container {
  display: flex;
}
\`\`\`

### justify-content
Defines how items are aligned along the main axis.

\`\`\`css
.container {
  justify-content: center; /* flex-start | flex-end | center | space-between | space-around | space-evenly */
}
\`\`\`

### align-items
Defines how items are aligned along the cross axis.

\`\`\`css
.container {
  align-items: center; /* stretch | flex-start | flex-end | center | baseline */
}
\`\`\`

### flex-direction
Defines the direction flex items are placed in the container.

\`\`\`css
.container {
  flex-direction: row; /* row | row-reverse | column | column-reverse */
}
\`\`\``
      },
      {
        id: 'grid',
        name: 'Grid',
        type: 'property',
        path: 'grid',
        content: `# CSS Grid

CSS Grid Layout is a two-dimensional layout system for the web.

## Container Properties

### display: grid
Defines the element as a grid container.

\`\`\`css
.container {
  display: grid;
}
\`\`\`

### grid-template-columns
Defines the columns of the grid with a space-separated list of values.

\`\`\`css
.container {
  grid-template-columns: 200px 200px 200px;
  /* or */
  grid-template-columns: repeat(3, 1fr);
}
\`\`\`

### grid-gap
Shorthand for row-gap and column-gap.

\`\`\`css
.container {
  grid-gap: 10px 15px; /* row-gap column-gap */
}
\`\`\`

### grid-template-areas
Defines a grid template by referencing names of grid areas.

\`\`\`css
.container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
\`\`\``
      },
      {
        id: 'animations',
        name: 'Animations',
        type: 'property',
        path: 'animations',
        content: `# CSS Animations

CSS animations make it possible to animate transitions from one CSS style configuration to another.

## Keyframes
Define the animation sequence.

\`\`\`css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
\`\`\`

## Animation Properties

### animation-name
Specifies the name of the @keyframes animation.

\`\`\`css
.element {
  animation-name: slideIn;
}
\`\`\`

### animation-duration
Specifies how long the animation takes to complete.

\`\`\`css
.element {
  animation-duration: 2s;
}
\`\`\`

### animation-timing-function
Specifies the speed curve of the animation.

\`\`\`css
.element {
  animation-timing-function: ease-in-out;
}
\`\`\``
      }
    ]
  }
};