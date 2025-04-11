document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const body = document.querySelector('body');

    // Function to show modal
    window.showModal = function(id) {
        modals.forEach(modal => {
            modal.classList.remove('visible');
        });
        document.getElementById(id).classList.add('visible');
        body.classList.add('modal-open');
    };

    // Function to close modal
    window.closeModal = function() {
        modals.forEach(modal => modal.classList.remove('visible'));
        body.classList.remove('modal-open');
    };

    // Close modals on clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });

    // Close modals with 'Esc' key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Prevent scrolling on touch devices
    document.addEventListener('touchmove', function(e) {
        if (!e.target.closest('.modal')) {
            e.preventDefault();
        }
    }, { passive: false });
});

