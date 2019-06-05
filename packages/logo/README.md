# `Wooweb Header Pug Component`

> Mixin Component container for content

## Source

```
mixin Logo({title='', subtitle='', modifier="", js=false, basedir='./', pathImg='', img='axa.svg', alt=''})
  -const classComponent = setClass('logo', modifier, js)
  div(class=classComponent)
    +Img({img:`${basedir}${pathImg}${img}`, alt, modifier:'logo'})
    div(class=`${prefix}-logo__title`)
      +Title({level: "h2", modifier:'logo-name'})
        | #{title}
      +Title({level: "h3", modifier:'logo-subtitle'})
        | #{subtitle}

```

## Usage

### Basic

#### Code Pug

```
+Logo({title:'title', subtitle:'subtitle', img: 'logo.svg', baseurl:'./', pathImg:'assets/images/', alt:'Retour à l'accueil' })

```

#### Code Generate

```
<div class="sg-logo">
    <img class="sg-img sg-img--logo" src="./assets/images/logo.svg" alt="Retour à l'accueil">
    <div class="sg-logo__title">
        <h2 class="sg-title sg-title--logo-name">title</h2>
        <h3 class="sg-title sg-title--logo-subtitle">subtitle</h3>
    </div>
</div>

```

> You can mixed properties
