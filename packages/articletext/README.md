# `Wooweb Article Text Pug Component`

> Component for article text

## Usage

```
mixin ArticleText({ className = 'article-text',modifier = '', js=false, title, text, id='', href=""})
    -const classComponent = setClass(className, modifier, js)
    article(class=classComponent)
        h2(class=`${prefix}-${className}__title`) !{title}
        span(class=`${prefix}-${className}__content`)
            | !{text}
        if href !== ""
            a(class=`${prefix}-${className}__content` href=href title=title)

```