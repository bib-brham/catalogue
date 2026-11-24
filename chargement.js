let allBooks = [];
let filteredBooks = [];
// --- VARIABLES POUR LA PAGINATION ---
let currentPage = 1;
const itemsPerPage = 24; // Ex: 24 livres par page (divisible par 4 colonnes = 6 lignes)
// --- CHARGEMENT AUTOMATIQUE DEPUIS GITHUB ---
window.addEventListener('DOMContentLoaded', function() {
    const statusEl = document.getElementById('status');

    if (statusEl) {
        statusEl.style.color = 'black';
        statusEl.textContent = "Chargement du catalogue...";
    }

    fetch('livres.csv')
        .then(response => {
            if (!response.ok) throw new Error("Fichier introuvable");
            return response.text();
        })
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: function(res) {
                    if (res.data && res.data.length > 0) {
                        allBooks = res.data;
                        if (statusEl) {
                            statusEl.style.color = '#16a34a';
                            statusEl.textContent = `✅ ${allBooks.length} livres disponibles`;
                        }
                        applyFilters();
                    } else {
                        if (statusEl) {
                            statusEl.style.color = '#dc2626';
                            statusEl.textContent = "❌ Le catalogue est vide.";
                        }
                    }
                }
            });
        })
        .catch(err => {
            console.error(err);
            if (statusEl) {
                statusEl.style.color = '#dc2626';
                statusEl.textContent = "❌ Impossible de charger le catalogue.";
            }
        });
});
