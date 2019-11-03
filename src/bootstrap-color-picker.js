(function ($) {
    /*
     * UTILS
     */

    // Turn 3 digit hex color into 6 digit version.
    var normalizeColor = (color) => {
        if (!color) {
            return null;
        }
        return color.replace(/^#([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b);
    };

    // Check hex color brightness.
    var isColorDark = (hex) => {
        if (!hex) {
            return null;
        }

        // Parse color.
        var result = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizeColor(hex));
        if (!result) {
            return null;
        }

        // Manage foreground color based on background brightness
        // https://www.w3.org/TR/AERT/#color-contrast
        result = Math.round(((parseInt(result[1], 16) * 299) + (parseInt(result[2], 16) * 587) + (parseInt(result[3], 16) * 114)) / 1000);
        return (result <= 125);
    };

    /*
     * DEFAULT OPTIONS
     */

    // Define default configuration.
    var defaults = {
        // Colors list.
        colors: [
            {
                "#000000": "Noir",
                "#434343": "Gris foncé 4",
                "#666666": "Gris foncé 3",
                "#999999": "Gris foncé 2",
                "#b7b7b7": "Gris foncé 1",
                "#cccccc": "Gris",
                "#d9d9d9": "Gris clair 1",
                "#efefef": "Gris clair 2",
                "#f3f3f3": "Gris clair 3",
                "#ffffff": "Blanc"
            },
            {
                "#980000": "Fruits rouges",
                "#ff0000": "Rouge",
                "#ff9900": "Orange",
                "#ffff00": "Jaune",
                "#00ff00": "Vert",
                "#00ffff": "Cyan",
                "#4a86e8": "Bleu bleuet",
                "#0000ff": "Bleu",
                "#9900ff": "Violet",
                "#ff00ff": "Magenta"
            },
            {
                "#e6b8af": "Fruits rouge clair 3",
                "#f4cccc": "Rouge clair 3",
                "#fce5cd": "Orange clair 3",
                "#fff2cc": "Jaune clair 3",
                "#d9ead3": "Vert clair 3",
                "#d0e0e3": "Cyan clair 3",
                "#c9daf8": "Bleu bleuet clair 3",
                "#cfe2f3": "Bleu clair 3",
                "#d9d2e9": "Violet clair 3",
                "#ead1dc": "Magenta clair 3"
            },
            {
                "#dd7e6b": "Fruits rouge clair 2",
                "#ea9999": "Rouge clair 2",
                "#f9cb9c": "Orange clair 2",
                "#ffe599": "Jaune clair 2",
                "#b6d7a8": "Vert clair 2",
                "#a2c4c9": "Cyan clair 2",
                "#a4c2f4": "Bleu bleuet clair 2",
                "#9fc5e8": "Bleu clair 2",
                "#b4a7d6": "Violet clair 2",
                "#d5a6bd": "Magenta clair 2"
            },
            {
                "#cc4125": "Fruits rouge clair 1",
                "#e06666": "Rouge clair 1",
                "#f6b26b": "Orange clair 1",
                "#ffd966": "Jaune clair 1",
                "#93c47d": "Vert clair 1",
                "#76a5af": "Cyan clair 1",
                "#6d9eeb": "Bleu bleuet clair 1",
                "#6fa8dc": "Bleu clair 1",
                "#8e7cc3": "Violet clair 1",
                "#c27ba0": "Magenta clair 1"
            },
            {
                "#a61c00": "Fruits rouge foncé 1",
                "#cc0000": "Rouge foncé 1",
                "#e69138": "Orange foncé 1",
                "#f1c232": "Jaune foncé 1",
                "#6aa84f": "Vert foncé 1",
                "#45818e": "Cyan foncé 1",
                "#3c78d8": "Bleu bleuet foncé 1",
                "#3d85c6": "Bleu foncé 1",
                "#674ea7": "Violet foncé 1",
                "#a64d79": "Magenta foncé 1"
            },
            {
                "#85200c": "Fruits rouge foncé 2",
                "#990000": "Rouge foncé 2",
                "#b45f06": "Orange foncé 2",
                "#bf9000": "Jaune foncé 2",
                "#38761d": "Vert foncé 2",
                "#134f5c": "Cyan foncé 2",
                "#1155cc": "Bleu bleuet foncé 2",
                "#0b5394": "Bleu foncé 2",
                "#351c75": "Violet foncé 2",
                "#741b47": "Magenta foncé 2"
            },
            {
                "#5b0f00": "Fruits rouge foncé 3",
                "#660000": "Rouge foncé 3",
                "#783f04": "Orange foncé 3",
                "#7f6000": "Jaune foncé 3",
                "#274e13": "Vert foncé 3",
                "#0c343d": "Cyan foncé 3",
                "#1c4587": "Bleu bleuet foncé 3",
                "#073763": "Bleu foncé 3",
                "#20124d": "Violet foncé 3",
                "#4c1130": "Magenta foncé 3"
            }
        ],
        // Template.
        template: '<div class="popover bcp-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        // Build popover content.
        body: (colors) => {
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
    };

    // Override default configuration.
    $.bcpSetup = (options) => {
        defaults = $.extend(defaults, options);
    };

    /*
     * JQUERY PLUGIN
     */

    $.fn.bcp = function (options, value) {
        // Method "color" : get colorpicker value.
        if (options === 'color') {
            // Set.
            if (value) {
                $(this).attr('data-color', normalizeColor(value));
                $(this).trigger('pcb.selected').trigger('pcb.refresh');
                return;
            }

            // Get.
            return {
                value: $(this).first().attr('data-color') || null,
                dark: isColorDark($(this).first().attr('data-color') || null)
            };
        }

        // Prepare popover configuration.
        var settings = $.extend({}, defaults, options);

        // Override reserved popover configuration.
        settings = $.extend(settings, {
            html: true,
            sanitize: false,
            trigger: 'manual',
            content: function () {
                return settings.body(settings.colors);
            }
        });

        // Init popover.
        $(this).popover(settings).on('shown.bs.popover', function () {
            var color = $(this).attr('data-color');
            if (color && color !== '') {
                $(`[data-color="${color}"]`, $($(this).data('bs.popover').tip)).addClass('active');
            }
        });

        // Open popover on element click.
        $(this).click(function () {
            $(this).popover('toggle');
        });

        // Init default color.
        $(this).each(function () {
            if (!$(this).attr('data-color') || $(this).attr('data-color') === '') {
                $(this).attr('data-color', normalizeColor(settings.color));
            }
        }).trigger('pcb.refresh');

        // Keep chaining.
        return this;
    };

    /*
     * MANAGE CLICK EVENT GLOBALLY
     */

    $(document).on('click', function (e) {
        var $e = $(e.target);

        // Manage collor button click.
        if ($e.is('.bcp-popover .bcp-color *')) {
            $e = $e.parents('.bcp-color');
        }
        if ($e.is('.bcp-popover .bcp-color:not(.active)')) {
            let $p = $e.parents('.bcp-popover');
            $('.active', $p).removeClass('active');

            let $b = $(`[aria-describedby="${$p.attr('id')}"]`);
            $b.popover('hide').bcp('color', $e.attr('data-color'));

            return;
        }

        // Close opened popovers on outside click.
        $('.bcp-popover.show').each(function () {
            let id = $(this).attr('id');
            if (!$e.is(`[aria-describedby="${id}"], [aria-describedby="${id}"] *, #${id}, #${id} *`)) {
                $(`[aria-describedby="${id}"]`).popover('hide');
            }
        });
    });
}(jQuery));
