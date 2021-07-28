# markcraft
minecraft as a markdown file. i have lost control over my life

oh btw i might just abandon this because this is geniunely insane

oh and i didnt write the code yet so yeah

so basically this doesnt really work this well because this happens to images:

[![Grass block][gr]](https://github.com)![Steve](/top.png)![Grass block][gr]<br>
![Grass block][gr]![Steve](/bottom.png)![Grass block][gr]<br>

fuckers cut steve in halves, cant have shit in detroit. but yeah theres a fix (you gotta inject some css tho):

```css
article > * {
  line-height: 0;
}
article img {
  width: 32px;
  image-rendering: pixelated;
}

```

or with an js injector:

<p align="end">hover here to see the copy button ⬇️ . . </p>

```js
x=document.createElement('style');x.innerText="article>*{line-height:0}article img{width:32px;image-rendering: pixelated}";document.head.append(x)
```

[gr]: https://github.com/PrismarineJS/minecraft-assets/raw/master/data/1.8.8/blocks/grass_side.png
