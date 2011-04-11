/*
---
description: A tab system for MooTools.

license: MIT-style

authors:
    - DE BONA Vivien (DjLeChuck)

requires:
    - core/1.3.1: '*'
    - more/Fx.Slide

provides:
    - MooNav
...
*/

var MooNav = new Class({
	Implements: [Options],
	options: {
		tabsId:			'tabs',
		partsClass:		'.part',
		activeClass:	'active',
		current:		0,
		transition:		'none',
		speed:			'normal'
	},

	initialize: function(options) {
		var self = this;

		// Redéfinition des options si nécessaire
		self.setOptions(options);

		// Initialisation de l'onglet et de la partie courante
		self.current	= self.options.current;
		self.index		= self.options.current;

		// Fonction qui prépare le système d'onglets
		self._prepareEngine();
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

	_activeTab: function() {
		var self = this;

		// Affichage de l'onglet actif
		self.tabs[self.current].addClass(self.options.activeClass);

		switch(self.options.transition)
		{
			case 'slide':
				new Fx.Slide(self.parts[self.current]).show();
			break;
			case 'fade':
				self.parts[self.current].setStyle('display', 'block');
				new Fx.Tween(self.parts[self.current]).set('opacity', 1);
			break;
			case 'none':
				self.parts[self.current].setStyle('display', 'block');
			break;
		}
	},

	_addClickEvents: function() {
		var self = this;

		// On ajoute un événement "click" aux onglets selon le type de transition
		self.tabs.each(function(item){
			item.addEvent('click', function(){
				// Indice de l'onglet cliqué
				self.index = self.tabs.indexOf(item);

				// Si la partie correspondante existe et que ce n'est pas la même...
				if (self.parts[self.index] != null && self.index != self.current)
				{
					// On cache l'ancienne partie...
					self._doTransition();

					// On applique la class actif au bon onglet
					self.tabs.removeClass(self.options.activeClass);
					self.tabs[self.index].addClass(self.options.activeClass);
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
				new Fx.Slide(self.parts[self.current], {
					duration: self.options.speed
				}).slideOut().chain(function(){
					self.parts[self.index].set('slide', {
						duration: self.options.speed
					});

					self.parts[self.index].slide('hide').slide('in');
				});
			break;
			case 'fade':
				var el = self.parts[self.current];

				var myFx = new Fx.Tween(el, {
					duration: self.options.speed,
					link: 'chain',
					property: 'opacity',
					onComplete: function() {
						el.setStyle('display', 'none');
					}
				});

				myFx.start(0).start(function() {
					self.parts[self.index].setStyle('display', 'block');
					self.parts[self.index].fade('in');
				});
			break;
			case 'none':
				self.parts[self.current].setStyle('display', 'none');
				self.parts[self.index].setStyle('display', 'block');
			break;
		}
	},

	_prepareEngine: function() {
		var self = this;

		// Récupération des onglets et des parties correspondantes
		self.tabs	=  $(self.options.tabsId).getElements('li');
		self.parts	=  $$(self.options.partsClass);

		// Fonction qui va cacher les différentes parties
		self._hideParts();

		// Fonction qui va ajouter les événements "click" aux onglets
		self._addClickEvents();

		// Fonction qui va afficher l'onglet actif courant
		self._activeTab();
	},

	addTab: function(li_content, div_content) {
		var self = this;

		var new_li = new Element('li', {
			html: li_content
		});
		new_li.inject($(self.options.tabsId), 'bottom');

		var new_part = new Element('div' + self.options.partsClass, {
			html: div_content
		});
		new_part.inject(self.parts.getLast(), 'after');

		// Fonction qui prépare le système d'onglets
		self._prepareEngine();
	},

	removeTab: function(index_or_label) {
		var self = this;
		var index;

		// Si on a passé le label de l'onglet
		if (isNaN(index_or_label))
		{
			self.tabs.each(function(el) {
				if (el.get('html') == index_or_label)
				{
					index = self.tabs.indexOf(el);
				}
			});
		}
		// Si on a passé l'id de l'onglet
		else
		{
			index = index_or_label;
		}

		self.parts[index].destroy();
		self.tabs[index].destroy();

		// Fonction qui prépare le système d'onglets
		self._prepareEngine();
	}
});