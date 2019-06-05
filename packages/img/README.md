# `Wooweb Image Pug Component`

> Mixin Image container for content

## Source

```
mixin Img({src, alt='image', modifier = '', js=false})
	-const classComponent = setClass('img', modifier, js)
	img(class=classComponent src=src alt=alt)

```

## Usage

### Basic

#### Code Pug

```
+Img({src:'path/to/your/image.jpg', alt:'myimage'})

```

#### Code Generate

```
<img class="sg-img" src="path/to/your/image.jpg" alt="myimage" />

```

> You can mixed properties
