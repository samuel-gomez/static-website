# `Wooweb Content Pug Component`

> Mixin Component container for content

## Source

```
mixin Content({modifier='', js=false})
    -const classComponent = `${setClass('content', modifier, js)}`
    main(class=classComponent)
        block content

```

## Usage

### Basic

#### Code Pug

```
+Content({})
    p Hello world

```

#### Code Generate

```
<main class="af-content">
    <p>Hello world</p>
</main>

```

### With modifier

#### Code Pug

```
+Content({modifier:'red'})
    p Hello world

```

#### Code Generate

```
<main class="af-content af-content--red">
    <p>Hello world</p>
</main>

```

### With Javascript Class

#### Code Pug

```
+Content({js:true})
    p Hello world

```

#### Code Generate

```
<main class="af-content js-content">
    <p>Hello world</p>
</main>

```

> You can mixed properties
