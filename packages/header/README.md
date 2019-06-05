# `Wooweb Header Pug Component`

> Mixin Component container for content

## Source

```
mixin Header({modifier = '', js=false, link, logo})
	-const classComponent = setClass('header', modifier, js)
	header(class=classComponent)
		a(class=`${prefix}-header__name-link` href=link.href title=link.title)
			+Logo({title:logo.title, subtitle:logo.subtitle, img: logo.title.img, modifier:"header"})
		block

```

## Usage

### Basic

#### Code Pug

```
+Header({ link: { href:'./', title:"Retour à l'accueil" }, logo: { title:'Slash', subtitle:'Design System', img: "slash-logo.svg" } })

```

#### Code Generate

```
<header class="sg-header">
    <a class="sg-header__name-link" href="./" title="Retour à l'accueil">
        <div class="sg-logo  sg-logo--header">
            <img class="sg-logo__img" src="././assets/images/slash-logo.svg" alt="Retour à l'accueil" />
            <div class="sg-logo__title">
                <h2 class="sg-title  sg-title--logo-name">Slash</h2>
                <h3 class="sg-title  sg-title--logo-subtitle">Design System</h3>
            </div>
        </div>
    </a>
</header>

```

> You can mixed properties
