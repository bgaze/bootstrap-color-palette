# Bootstrap 4 Color Palette

<p align="center">
    <img src="bcp.gif">
</p>

BCP is a simple color palette for Bootstrap 4, like in Google doc.  
It's built on the top of Bootstrap 4 Popover plugin.

## Quick start

BSD requires jQuery v1.9.1+, Bootstrap 4 modal component, and Bootstrap's CSS.

Several quick start options are available:

*   Download the latest release: [https://github.com/bgaze/bootstrap-color-palette/releases](https://github.com/bgaze/bootstrap-color-palette/releases)
*   Clone the repo: `git clone https://github.com/bgaze/bootstrap-color-palette.git`
*   Install via CDN: 

```
// Core script and styles:
https://cdn.jsdelivr.net/gh/bgaze/bootstrap-color-palettes@1/dist/bcp.min.js
https://cdn.jsdelivr.net/gh/bgaze/bootstrap-color-palettes@1/dist/bcp.min.css
// Default palette (english):
https://cdn.jsdelivr.net/gh/bgaze/bootstrap-color-palettes@1/dist/bcp.min.js
// Default palette (french):
https://cdn.jsdelivr.net/gh/bgaze/bootstrap-color-palettes@1/dist/bcp.min.js
```

Just make sure to include required dependencies into your app, then library's core files.  
If you don't include the optional default palette, you'll need to define your own to make the plugin work.

Finally, use the `bcp` jQuery plugin:

```javascript
$('[data-toggle="bcp"]')
    .on('pcb.refresh', function (e) {
        var color = $(this).bcp('color');
        if (color.value) {
            $(this).css({
                backgroundColor: color.value,
                borderColor: color.value,
                color: color.dark ? '#fff' : '#000'
            });
        }
    })
    .on('pcb.selected', function (e) {
        var color = $(this).bcp('color');
        console.log(color);
    })
    .bcp();
```

## Options

> As BCP uses in background the Bootstrap's popover component.  
> You can pass any [popover option](https://getbootstrap.com/docs/4.3/components/popovers/#options) except following ones that are reserved : `html`, `sanitize`, `trigger`, `content`.

### Plugin options

The plugin offers several options:

**colors:**

The list of colors available in the palette. It's an array of objects: 

+ Each object represent a row in the palette.
+ Each key-value couple of a row represent a color: hex code as key and label as value.

See [default palette](./src/bcp.en.js) for an example.

**template:**

The template for the popover element.  
The default value is:

```javascript
'<div class="popover bcp-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
```

> The `bcp-popover` class is used for the palette styling.

**body:**

A function used to generate the popover body. It receive the palette colors as argument and returns a HTML string.  
The default value is:

```javascript
(colors) => {
    var content = colors.map(row => {
        let tmp = '';

        for (var color in row) {
            let cl = isColorDark(color) ? 'dark' : 'light';
            tmp += `<div class="bcp-color ${cl}" style="background-color: ${color};" data-color="${color}" title="${row[color]}"></div>`;
        }

        return `<div class="bcp-row">${tmp}</div>`;
    }).join('');

    return `<div class="bcp-content">${content}</div>`;
}
```

### Global configuration

BCP can be configured globally using the `$.bcpSetup` function.  
You can use also pass any [popover option](https://getbootstrap.com/docs/4.3/components/popovers/#options) except reserved ones.

Example:

```javascript
$.bcpSetup({
    placement: 'left',
    colors: [
        // ...
    ]
});
```

