const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;
const ExtensionUtils = imports.misc.extensionUtils;

let Adw = null;
try {
    Adw = imports.gi.Adw;
} catch (e) {
    Adw = null;
}

function init() {
}

function buildPrefsWidget() {
    let settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.messenger42');

    // ---------------------------------------------------------
    // CAS 1 : Interface Adwaita (Pour GNOME 42 à l'école)
    // ---------------------------------------------------------
    if (Adw) {
        let page = new Adw.PreferencesPage();
        let group = new Adw.PreferencesGroup({
            title: 'Paramètres de connexion',
            description: 'Identifiants pour le messenger 42'
        });
        page.add(group);

        // --- LOGIN ---
        // ASTUCE : On utilise ActionRow + GtkEntry car EntryRow n'existe pas sur les PC de 42
        let loginRow = new Adw.ActionRow({ title: 'Login' });
        
        let loginEntry = new Gtk.Entry({ 
            text: settings.get_string('login'),
            valign: Gtk.Align.CENTER,
            width_chars: 20
        });
        
        loginEntry.connect('changed', (widget) => {
            settings.set_string('login', widget.get_text());
        });
        
        loginRow.add_suffix(loginEntry);
        group.add(loginRow);


        // --- PASSWORD ---
        let passRow = new Adw.ActionRow({ title: 'Mot de passe' });
        
        let passEntry = new Gtk.Entry({ 
            text: settings.get_string('password'),
            valign: Gtk.Align.CENTER,
            visibility: false, // Masquer les caractères
            width_chars: 20
        });
        
        passEntry.connect('changed', (widget) => {
            settings.set_string('password', widget.get_text());
        });

        passRow.add_suffix(passEntry);
        group.add(passRow);


        // --- INFO ---
        let infoGroup = new Adw.PreferencesGroup();
        let infoRow = new Adw.ActionRow({
            title: '⚠️ Important',
            subtitle: 'Redémarrez l\'extension après modification.'
        });
        infoGroup.add(infoRow);
        page.add(infoGroup);

        return page;
    } 

    // ---------------------------------------------------------
    // CAS 2 : Fallback GTK Classique (Sécurité)
    // ---------------------------------------------------------
    else {
        let widget = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            margin_top: 20, margin_bottom: 20, margin_start: 20, margin_end: 20,
            spacing: 20
        });

        let loginBox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, spacing: 5 });
        loginBox.append(new Gtk.Label({ label: "Login", xalign: 0 }));
        let loginEntry = new Gtk.Entry({ text: settings.get_string('login') });
        loginEntry.connect('changed', (w) => settings.set_string('login', w.get_text()));
        loginBox.append(loginEntry);
        widget.append(loginBox);

        let passBox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, spacing: 5 });
        passBox.append(new Gtk.Label({ label: "Mot de passe", xalign: 0 }));
        let passEntry = new Gtk.Entry({ text: settings.get_string('password'), visibility: false });
        passEntry.connect('changed', (w) => settings.set_string('password', w.get_text()));
        passBox.append(passEntry);
        widget.append(passBox);

        widget.append(new Gtk.Label({ label: "⚠️ Redémarrez l'extension pour appliquer." }));

        return widget;
    }
}