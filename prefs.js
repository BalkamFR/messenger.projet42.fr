import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class MessengerPreferences extends ExtensionPreferences {
	fillPreferencesWindow(window) {
		const settings = this.getSettings();

		const page = new Adw.PreferencesPage();
		const group = new Adw.PreferencesGroup({
			title: 'Paramètres de connexion',
			description: 'Configurez vos identifiants pour le messenger 42'
		});
		page.add(group);

		// Login field
		const loginRow = new Adw.EntryRow({
			title: 'Login',
		});
		loginRow.set_text(settings.get_string('login'));
		loginRow.connect('changed', (widget) => {
			settings.set_string('login', widget.get_text());
		});
		group.add(loginRow);

		// Password field
		const passwordRow = new Adw.PasswordEntryRow({
			title: 'Mot de passe',
		});
		passwordRow.set_text(settings.get_string('password'));
		passwordRow.connect('changed', (widget) => {
			settings.set_string('password', widget.get_text());
		});
		group.add(passwordRow);

		// Info label
		const infoGroup = new Adw.PreferencesGroup();
		const infoLabel = new Gtk.Label({
			label: '⚠️ Après modification, redémarrez l\'extension pour appliquer les changements.',
			wrap: true,
			xalign: 0,
			margin_top: 12,
			margin_bottom: 12,
			margin_start: 12,
			margin_end: 12,
		});
		infoLabel.add_css_class('dim-label');
		infoGroup.add(infoLabel);
		page.add(infoGroup);

		window.add(page);
	}
}
