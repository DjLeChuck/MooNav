/*
---
description: A tab system for MooTools.

license: MIT-style

authors:
    - DE BONA Vivien (DjLeChuck)

requires:
    - core/1.3.1: '*'
    - more/Fx.Slide

provide:
    - MooNav
...
*/

var MooNav = new Class({
	Implements: [Options],
	options: {
		tabs:           '.onglet',
		parts:          '.partie',
		classActive:	'actif',
		firstActiveTab: 0,
		transition:		'none'
	},

	initialize: function(options) {
		var self = this;

		// Redéfinition des options si nécessaire
		self.setOptions(options);

		// Récupération des onglets et des parties correspondantes
		self.tabs	=  $$(self.options.tabs);
		self.parts	=  $$(self.options.parts);

		// Initialisation de l'onglet et de la partie courante
		self.current	= self.options.firstActiveTab;
		self.index		= self.options.firstActiveTab;

		// Fonction qui va cacher les différentes parties
		self._hideParts();

		// Fonction qui va ajouter les événements "click" aux onglets
		self._addClickEvents();

		// Fonction qui va afficher l'onglet actif courant
        self._firstActiveTab();
	},

    _hideParts: function() {
        var self = this;

        // On cache les différentes parties selon le type de transition
        switch(self.options.transition)
        {
            case 'slide':
                self.parts.each(function(el){
                    new Fx.Slide(el).hide();
                });
            break;
            case 'fade':
                self.parts.each(function(el){
                    new Fx.Tween(el).set('opacity', 0);
                    el.setStyle('display', 'none');
                });
            break;
            case 'none':
                self.parts.each(function(el){
                    el.setStyle('display', 'none');
                });
            break;
        }
    },

    _firstActiveTab: function() {
        var self = this;

        // Affichage de l'onglet actif
        self.tabs[self.options.firstActiveTab].addClass(self.options.classActive);

		switch(self.options.transition)
		{
            case 'slide':
                new Fx.Slide(self.parts[self.options.firstActiveTab]).show();
            break;
            case 'fade':
                self.parts[self.options.firstActiveTab].setStyle('display', 'block');
                new Fx.Tween(self.parts[self.options.firstActiveTab]).set('opacity', 1);
            break;
            case 'none':
                self.parts[self.options.firstActiveTab].setStyle('display', 'block');
            break;
        }
    },

	_addClickEvents: function() {
		var self = this;

		// On ajoute un événement "click" aux onglets selon le type de transition
		self.tabs.each(function(item, index){
			item.addEvent('click', function(){
				// Indice de l'onglet cliqué
				self.index = index;

				// Si la partie correspondante existe et que ce n'est pas la même...
				if (self.parts[self.index] != null && self.index != self.current)
				{
					// On cache l'ancienne partie...
					self._doTransition();

					// On applique la class actif au bon onglet
					self.tabs.removeClass(self.options.classActive);
					self.tabs[self.index].addClass(self.options.classActive);
				}

				self.current = self.index;
			});
		});
	},

	_doTransition: function() {
		var self = this;

        // On affiche la bonne partie selon le type de transition
		switch(self.options.transition)
		{
            case 'slide':
                new Fx.Slide(self.parts[self.current]).slideOut().chain(function(){
                    self.parts[self.index].slide('hide').slide('in');
                });
            break;
            case 'fade':
                new Fx.Tween(self.parts[self.current]).start('opacity', 0).chain(function(){
                    this.start('display', 'none')
                }).chain(function() {
                    self.parts[self.index].setStyle('display', 'block');
                    self.parts[self.index].fade('in');
                });
            break;
            case 'none':
                self.parts[self.current].setStyle('display', 'none');
                self.parts[self.index].setStyle('display', 'block');
            break;
        }
	}
});