# `Wooweb Content Pug Component`

> Mixin Component container for content

## Source

```
mixin Title({ level = 'h1', modifier = '', js=false })
	-const classComponent = setClass('title', modifier, js)
	#{level}(class=classComponent)
		block

```

## Usage

### Basic

#### Code Pug

```
+Title({})
    p Hello world

```

#### Code Generate

```
<h1 class="af-title">
    <p>Hello world</p>
</h1>

```

### With modifier

#### Code Pug

```
+Title({ modifier:'red' })
    p Hello world

```

#### Code Generate

```
<h1 class="af-title af-title--red">
    <p>Hello world</p>
</h1>

```

### With Javascript Class

#### Code Pug

```
+Title({ js:true  })
    p Hello world

```

#### Code Generate

```
<h1 class="af-title js-title">
    <p>Hello world</p>
</h1>

```

### With Other level

#### Code Pug

```
+Title({ level: 'h2' })
    p Hello world

```

#### Code Generate

```
<h2 class="af-title">
    <p>Hello world</p>
</h2>

```

> You can mixed properties
