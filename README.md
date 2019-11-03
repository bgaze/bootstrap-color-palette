# Bootstrap 4 Color Palette

<p align="center">
    <img src="bcp.gif">
</p>

BCP is a simple color palette for Bootstrap 4, like in Google doc.  
It's built on the top of Bootstrap 4 Popover plugin.

# Quick start

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

> If you don't include the optional default palette, you'll need to define your own to make the plugin work.

Finally, use the `bcp` jQuery plugin:

```javascript
$('[data-toggle="bcp"]')
    .on('pcb.refresh', (e) => {
        let color = $(this).bcp('color');
        if (color.value) {
            $(this).css({
                backgroundColor: color.value,
                borderColor: color.value,
                color: color.dark ? '#fff' : '#000'
            });
        }
    })
    .on('pcb.selected', function (e) {
        alert($(this).bcp('color'));
    })
    .bcp();
```

