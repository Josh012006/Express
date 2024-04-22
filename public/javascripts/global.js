window.addEventListener('pageshow', function(event) {
    // Vérifier si l'événement est causé par le bouton de retour
    if (event.persisted) {
        // Recharger la page
        window.location.reload();
    }
});