/*
 * jclock plugin 1.0
 * 
 *
 * Copyright (c) 2013 SepulLupes
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
(function ($) {
    $.fn.extend({

        jclock: function (options) {

            var defaults = {
                clockImagesPath: 'img/clock/',
                weatherImagesPath: 'img/weather/',
                lang: 'en',
                am_pm: false,
                weatherLocationCode: 'ASI|MY|MY015|KUALA LUMPUR',
                weatherMetric: 'C',
                weatherUpdate: 0,
                proxyType: 'asp',
                currtime:'hh,mm,ss'

            };

            var regional = [];
            regional['en'] = {
                monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            }


            var options = $.extend(defaults, options);

            return this.each(function () {

                var $this = $(this);
                var o = options;
                $this.clockImagesPath = o.clockImagesPath;
                $this.weatherImagesPath = o.weatherImagesPath;
                $this.lang = regional[o.lang] == undefined ? regional['en'] : regional[o.lang];
                $this.am_pm = o.am_pm;
                $this.currDate = o.currtime.indexOf('hh') > -1 ? '' : ''; //addingCurrenttime
                $this.timeUpdate = '';
                
                var html = '<div id="sky_plugin_container_' + $this.attr('id') + '" class="jclock">';
                html += '<img class="infoweather" align="left" src="img/weather/2.png" /> ';
                html += '<div class="infoweatherpanel"> </div>';
                html += '<div class="clock">';
                html += '</div>';
                html += '<div class="infoalarm" >';
                html += '<div class="ampm" style="height: 19px; width: 30px; margin: 1px; display: block; text-align: center; padding-top: 2px; font-size: 15px;"></div>';
                html += '<img Style="height: 30px; width: 30px; margin: 1px; display: block; opacity: 0.2;" align="left" src="img/mail.png" /> ';
                html += '<img Style="height: 30px; width: 30px; margin: 1px; display: block; opacity: 0.2;" align="left" src="img/alert.png" /> ';
                html += '</div></div>';

                $this.html(html);
                $this.displayClock($this);
                $this.displayWeather($this);
                $('.infoweather').click(function () { 
                    msg_popup($('.infoweatherpanel').html(), 'Info Weather', function () {  });
                });
                

            });
        }
    });

