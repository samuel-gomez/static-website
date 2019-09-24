# `Wooweb Article Text Pug Component`

> Component for article text

> Note : 'prefix', 'basedir', 'pathImg' values should be overrided in global layout

## Source

```
mixin ArticleText({ className = 'article-text',modifier = '', js=false, title, text, id='', link= {}, image= {} })
    -const classComponent = setClass(className, modifier, js)
    article(class=classComponent)
        if image.name !== undefined
            +Img({src:`${basedir}${pathImg}${image.name}`, alt: image.alt, modifier, className: `${prefix}-${className}__img` })
        div(class=`${prefix}-${className}__content`)
            h2(class=`${prefix}-${className}__title`) !{title}
            span(class=`${prefix}-${className}__intro`)
                | !{text}
            if link.href !== undefined
                a(class=`${prefix}-${className}__link` href=link.href title=link.title)
                    | #{link.label}

```

## Usage

### Basic

#### Code Pug

```
+ArticleText({ title:"Title", text: 'Lorem' })

```

#### Code Generate

```
<article class="sg-article-text">
  <div class="sg-article-text__content">
    <h2 class="sg-article-text__title">Title</h2>
    <span class="sg-article-text__intro">Lorem</span>
  </div>
</article>

```

### With Link

#### Code Pug

```
+ArticleText({ title:"Title", text: 'Lorem', link: { href="https://www.samuelgomez.fr", title: "Go to my personal Website", label: "WebSite" } })

```

#### Code Generate

```
<article class="sg-article-text sg-article-text--home-react">
  <div class="sg-article-text__content">
    <h2 class="sg-article-text__title">Title</h2>
    <span class="sg-article-text__intro">Lorem</span>
    <a class="sg-article-text__link" href="https://www.samuelgomez.fr" title="Go to my personal Website">WebSite</a>
  </div>
</article>

```

### With Image

#### Code Pug

```
+ArticleText({ title:"Title", text: 'Lorem', image: { url: 'relativepath/image.jpg', alt: 'alternate text' } })

```

#### Code Generate

```
<article class="sg-article-text sg-article-text--home-react">
    <img class="sg-img sg-img--home-react" src="baseurl/pathImg/images/relativepath/image.jpg" alt="alternate text" />
    <div class="sg-article-text__content">
        <h2 class="sg-article-text__title">Title</h2>
        <span class="sg-article-text__intro">Lorem</span>
    </div>
</article>

```
