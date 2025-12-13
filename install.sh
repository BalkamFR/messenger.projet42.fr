#!/bin/bash

# Script d'installation de l'extension

EXTENSION_DIR="$HOME/.local/share/gnome-shell/extensions/messenger.projet42.fr"
SOURCE_DIR="$HOME/.gemini/antigravity/scratch/messenger_fix"

echo "=== Installation de l'extension 42 Messenger ==="
echo ""

# Vérifier que les fichiers sources existent
if [ ! -f "$SOURCE_DIR/extension.js" ]; then
    echo "❌ ERREUR: extension.js introuvable dans $SOURCE_DIR"
    exit 1
fi

if [ ! -f "$SOURCE_DIR/metadata.json" ]; then
    echo "❌ ERREUR: metadata.json introuvable dans $SOURCE_DIR"
    exit 1
fi

# Créer le dossier si nécessaire
mkdir -p "$EXTENSION_DIR"

# Copier les fichiers
echo "📁 Copie des fichiers..."
cp "$SOURCE_DIR/extension.js" "$EXTENSION_DIR/extension.js"
cp "$SOURCE_DIR/metadata.json" "$EXTENSION_DIR/metadata.json"
cp "$SOURCE_DIR/stylesheet.css" "$EXTENSION_DIR/stylesheet.css" 2>/dev/null || echo "/* Empty */" > "$EXTENSION_DIR/stylesheet.css"
cp "$SOURCE_DIR/prefs.js" "$EXTENSION_DIR/prefs.js"

# Copier les schemas
mkdir -p "$EXTENSION_DIR/schemas"
cp "$SOURCE_DIR/schemas/"*.xml "$EXTENSION_DIR/schemas/" 2>/dev/null
if [ -f "$SOURCE_DIR/schemas/gschemas.compiled" ]; then
    cp "$SOURCE_DIR/schemas/gschemas.compiled" "$EXTENSION_DIR/schemas/"
fi

echo "✅ Fichiers copiés"
echo ""

# Vérifier la version de GNOME Shell
GNOME_VERSION=$(gnome-shell --version | grep -oP '\d+' | head -1)
echo "🔍 Version GNOME Shell: $GNOME_VERSION"
echo ""

# Désactiver puis réactiver l'extension
echo "🔄 Rechargement de l'extension..."
gnome-extensions disable messenger.projet42.fr 2>/dev/null
sleep 1
gnome-extensions enable messenger.projet42.fr

echo ""
echo "✅ Installation terminée!"
echo ""
echo "📋 Pour voir les logs en temps réel:"
echo "   journalctl -f -o cat | grep -i messenger"
echo ""
echo "⚠️  Si rien ne s'affiche, redémarrez GNOME Shell:"
echo "   - Sous X11: Alt+F2, tapez 'r', puis Entrée"
echo "   - Sous Wayland: Déconnexion/Reconnexion"
