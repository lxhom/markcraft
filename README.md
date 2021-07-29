# markcraft
minecraft as a markdown file. i have lost control over my life

oh btw i might just abandon this because this is geniunely insane

oh and i didnt write the code yet so yeah

so basically this doesnt really work this well because this happens to images:

[![Grass block][grass]](https://github.com)![Steve][steve-top]![Grass block][grass]<br>
![Grass block][dirt]![Steve][steve-bottom]![Grass block][dirt]<br>

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

<p align="end">hover here to see the copy button ⬇️ .</p>

```js
x=document.createElement('style');x.innerText="article>*{line-height:0}article img{width:32px;image-rendering: pixelated}";document.head.append(x)
```

but yea if you did that just go to [mc.md](/mc.md), paste the script into the console and enjoy the more or less working result


[steve-top]: assets/steve/top.png
[steve-bottom]: assets/steve/bottom.png
[grass]: assets/grass_side.png
[dirt]: assets/dirt.png