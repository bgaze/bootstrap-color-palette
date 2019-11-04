# Bootstrap 4 Color Palette <!-- omit in toc -->

<p align="center">
    <img src="bcp.gif">
</p>

BCP is a simple color palette for Bootstrap 4, like in Google doc.  
It's built on the top of Bootstrap 4 Popover plugin.

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
  - [Initial color](#initial-color)
  - [BCP options](#bcp-options)
  - [Global configuration](#global-configuration)
- [Methods and events.](#methods-and-events)
- [Component styling](#component-styling)

## Installation

Several methods are available:

*   Download the latest release:  
[https://github.com/bgaze/bootstrap-color-palette/releases](https://github.com/bgaze/bootstrap-color-palette/releases)
*   Clone the repo:  
`git clone https://github.com/bgaze/bootstrap-color-palette.git`
*   Install with npm:
`npm i bootstrap-color-palette`
*   Install with yarn:
`yarn add bootstrap-color-palette`
*   Install via CDN: 
    *   Core script and styles:  
`https://cdn.jsdelivr.net/gh/bgaze/bootstrap-color-palette@1/dist/bcp.min.js`  
`https://cdn.jsdelivr.net/gh/bgaze/bootstrap-color-palette@1/dist/bcp.min.css`
    *   Default palette (english):  
`https://cdn.jsdelivr.net/gh/bgaze/bootstrap-color-palette@1/dist/bcp.en.min.js`
    *   Default palette (french):  
`https://cdn.jsdelivr.net/gh/bgaze/bootstrap-color-palette@1/dist/bcp.fr.min.js`

BCP requires jQuery v1.9.1+, Bootstrap 4 modal component, and Bootstrap's CSS.

Just make sure to import required dependencies, then library's core files.  
If you don't include the optional default palette, you'll need to define your own to make the plugin work.

## Usage

Here is an example of how to use BCP:

```javascript
    // Configure globally if needed.
    $.bcpSetup({
        placement: 'left'
    });

    // Init color palette components.
    $('[data-toggle="bcp"]')
        // On refresh, use the color for background and borders.
        // Adapt text color based on selected color brightness.
        .on('pcb.refresh', function (e) {
            let color = $(this).bcp('color');
            if (color.value) {
                $(this).css({
                    backgroundColor: color.value,
                    borderColor: color.value,
                    color: color.dark ? '#fff' : '#000'
                });
            }
        })
        // On color selection, log selected color to the console.
        .on('pcb.selected', function (e) {
            let color = $(this).bcp('color');
            console.log(color);
        })
        // Init components.
        // You can pass an options object to override global configuration.
        .bcp()
```

## Options

> As BCP uses the Bootstrap's popover component in background, you can pass any [popover option](https://getbootstrap.com/docs/4.3/components/popovers/#options) 
> via data attributes or JavaScript, except following ones that are reserved : `html`, `sanitize`, `trigger`, `content`.

### Initial color

The component color is managed through it's `data-color` attribute, which is updated each time a new color is selected.  
Use this attribute with markup or javascript to set initial color.

### BCP options

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

## Methods and events.

> As BCP uses the Bootstrap's popover component in background, you can use any popover [original method](https://getbootstrap.com/docs/4.3/components/popovers/#methods) 
> or [original event](https://getbootstrap.com/docs/4.3/components/popovers/#events) on a BCP element.

BCP provide one method and two events.

**color:**

The `color` method allow to set / get the color of a component:

```javascript
// Set the color of a component.
$('.my-bcp-element').bcp('color', '#ffff00');

// Get the color of a component.
console.log($('.my-bcp-element').bcp('color'));
/* Shows:
{
    value: '#ffff00', // The hex code of the color
    dark: false       // Wether the color is dark
}
*/
```

The `dark` information is usefull to ensure that foreground and background color combinations provide sufficient contrast when viewed by someone having color deficits or when viewed on a black and white screen.
See [https://www.w3.org/TR/AERT/#color-contrast]() for more informations.

**pcb.refresh:**

This event is fired when the BCP component is instanciated and when it's color changes.  
It's the good place to manage BCP impact on your application appearance.

Example:

```javascript
// Change the color of the component based on it's value.
$('.my-bcp-element').on('pcb.refresh', function (e) {
    let color = $(this).bcp('color');
    if (color.value) {
        $(this).css({
            backgroundColor: color.value,
            borderColor: color.value,
            color: color.dark ? '#fff' : '#000'
        });
    }
});
*/
```

**pcb.selected:**

This event is fired when a color is selected in a BCP component.  
It's the good place to manage the application logic.

Example:

```javascript
// Change the color of the component based on it's value.
$('.my-bcp-element').on('pcb.selected', function (e) {
    let color = $(this).bcp('color');
    if (color.value) {
        $.post('my-url/', color);
    }
});
*/
```

## Component styling

BCP inserts several classes prefixed with `bcp-` to ease component styling.

Please see [default stylesheet](./src/bcp.scss) for more.