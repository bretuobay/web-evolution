# Data Binding in Vue's MVVM Architecture

In the Model-View-ViewModel (MVVM) pattern, the "binding" is the mechanism that synchronizes the data between the View and the ViewModel. This application uses Vue.js, which has a powerful, built-in reactivity system that serves as the data binding layer.

## Vue's Reactivity System

At the core of Vue's reactivity system is the concept of "reactive objects". When you create a Vue component, the data object is wrapped in a Proxy, which allows Vue to track changes to the data.

### One-Way Data Binding

One-way data binding is used to display data from the ViewModel in the View. In Vue, this is achieved using the `{{ }}` syntax (mustache syntax) for text interpolation, or with directives like `v-bind`.

**Example:**

```vue
<template>
  <div>{{ product.name }}</div>
</template>
```

In this example, the `div` will display the `name` property of the `product` object from the ViewModel. If the `name` property changes in the ViewModel, the `div` will automatically update to reflect the new value.

### Two-Way Data Binding

Two-way data binding is a key feature of MVVM, and it's essential for creating interactive forms. It ensures that any changes made in the View (e.g., by a user typing in an input field) are immediately reflected in the ViewModel, and any changes made in the ViewModel are immediately reflected in the View.

Vue provides the `v-model` directive for two-way data binding on form inputs.

**Example:**

```vue
<template>
  <input v-model="product.name" />
</template>
```

In this example, the `input` field is bound to the `name` property of the `product` object in the ViewModel.

-   **View to ViewModel:** When the user types in the input field, the `product.name` property in the ViewModel is updated with the new value.
-   **ViewModel to View:** If the `product.name` property is changed programmatically in the ViewModel, the input field will automatically display the new value.

This two-way synchronization is what makes the MVVM pattern so powerful and efficient for building user interfaces. It eliminates the need for manual DOM manipulation and makes the code more declarative and easier to reason about.

### Computed Properties

Computed properties are another important part of Vue's reactivity system. They allow you to define properties that are derived from other reactive properties. Vue automatically tracks the dependencies of a computed property and updates it only when its dependencies have changed.

**Example:**

```typescript
const price = ref(10);
const tax = computed(() => price.value * 0.2);
```

In this example, the `tax` computed property will automatically update whenever the `price` ref changes. This is used extensively in our ViewModels to create derived state, such as the `filteredProducts` list.
