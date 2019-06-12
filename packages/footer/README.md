# `Wooweb Footer Pug Component`

> Mixin Component Footer

## Source

```
mixin Footer({modifier = '', js=false})
	-const classComponent = setClass('footer', modifier, js)
	-const year = new Date().getFullYear();
	footer(class=classComponent)
		span(class=`${prefix}-footer__privacy`)
			| Privacy Policy © #{year} AXA All Rights Reserved
		block

```

## Usage

### Basic

#### Code Pug

```
+Footer({})

```

#### Code Generate

```
<footer class="sg-footer js-footer">
    <span class="sg-footer__privacy">Privacy Policy © 2020 AXA All Rights Reserved</span>
</footer>

```

> You can mixed properties
