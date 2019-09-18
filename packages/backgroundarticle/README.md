# `Wooweb Background Article Pug Component`

> Component for svg diplay

## Usage

```
mixin BackgroundArticle({ modifier='', js=false, img="", title="title", text="lorem" })
    -const classComponent = `${setClass('background-article', modifier, js)}`
    article(class=classComponent style=`background-image:${img}`)
        +Title({})
            | #{title}
        p(class=`${classComponent}__text`)

```
