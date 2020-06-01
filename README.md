# Bootstrap 4 Color Palette

[![GitHub license](https://img.shields.io/github/license/bgaze/bootstrap-color-palette)](https://github.com/bgaze/bootstrap-color-palette/blob/master/LICENSE) 
![Maintenance](https://img.shields.io/maintenance/yes/2020)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/bgaze/bootstrap-color-palette)](https://github.com/bgaze/bootstrap-color-palette/releases) 
[![npm](https://img.shields.io/npm/dt/bootstrap-color-palette)](https://www.npmjs.com/package/bootstrap-color-palette)

<p align="center">
    <img src="./bcp.gif">
</p>

BCP is a simple color palette for Bootstrap 4, like in Google doc,
built on the top of Bootstrap 4 Popover plugin.

## Documentation

Full documentation and examples are available at [https://packages.bgaze.fr/bootstrap-color-palette](https://packages.bgaze.fr/bootstrap-color-palette)

## Installation

BCP requires jQuery v1.9.1+, Bootstrap 4 popover component, and Bootstrap's CSS.

Just make sure to import required dependencies, then library's core files.
If you don't include the optional default palette, you'll need to define your own to make the plugin work.

Several installation methods are available:

**With npm or yarn:**

```
npm i bootstrap-color-palette
yarn add bootstrap-color-palette
```

Then require the plugin and a palette:

```javascript
require('bootstrap-color-palette/dist/bcp');
require('bootstrap-color-palette/dist/bcp.en');
```

**Via CDN:**

Core script: `https://cdn.jsdelivr.net/gh/bgaze/bootstrap-color-palette@1/dist/bcp.min.js`  
Core CSS: `https://cdn.jsdelivr.net/gh/bgaze/bootstrap-color-palette@1/dist/bcp.min.css`  
Default palette (english): `https://cdn.jsdelivr.net/gh/bgaze/bootstrap-color-palette@1/dist/bcp.en.min.js`  
Default palette (french): `https://cdn.jsdelivr.net/gh/bgaze/bootstrap-color-palette@1/dist/bcp.fr.min.js`

**From Github:**

Download the latest release: `https://github.com/bgaze/bootstrap-color-palette/releases`  
Or clone the repo: `git clone https://github.com/bgaze/bootstrap-color-palette.git`

## Usage

* Use `data-color` attribute via Javascript or HTML to define component initial color.
* Use `pcb.refresh` event to manage impact on your application appearance.  
You should define this callback before instantiating the component to make sure it is called on page load.
* Use `pcb.selected` event to define your callback on color change.  
It's the good place to manage BCP impact on your application appearance.
* Use `bcp` jQuery plugin to instantiate your component(s).  
You can pass a set of options to override global configuration.
* The `color` method allows to set/get programmatically a component color.

```javascript
$('[data-toggle="bcp"]')
    .attr('data-color', '#000')
    .on('pcb.refresh', function () {
        let color = $(this).bcp('color');

        if (color) {
            $(this)
                .text(color.label)
                .css({
                    backgroundColor: color.value,
                    color: color.dark ? '#fff' : '#000'
                });
        }
    })
    .on('pcb.selected', function () {
        $.post('my/endpoint/url', {data: $(this).bcp('color')});
    })
    .bcp({
        placement: 'right'
    });
```
