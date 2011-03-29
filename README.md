MooNav
===========

A tab system for MooTools with transition or not (slide, fade, none).

How to use
----------

MooTab can be easily use, with just one line! But we also have possibility to customize some points.

There are three ways to do the transition:
    - none (default)
    - slide (up/down for the moment)
    - fade

There are some examples:
    - Basic, without transition effect and the default class
    new MooNav();

    - Custom with slide effect and redefinition of tabs, parts and active class
    new MooNav({
        tabs: '.onglet_slide',
        parts: '.partie_slide',
        transition: 'slide',
        classActive: 'actif_bis'
    });

    - Custom with fade effect, redefinition of tabs and parts class and custom first active tab
    new MooNav({
        tabs: '.onglet_fade',
        parts: '.partie_fade',
        transition: 'fade',
        firstActiveTab: 2
    });

There isn't any other methods to call, all is done!

Screenshots
-----------

![Screenshot 1](http://www.djlechuck.fr/MooNav/Screens/screen1.png)
![Screenshot 2](http://www.djlechuck.fr/MooNav/Screens/screen2.png)
![Screenshot 3](http://www.djlechuck.fr/MooNav/Screens/screen3.png)
