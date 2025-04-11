document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const body = document.querySelector('body');

    // Function to show modal and handle vCard download for contact
    window.showModal = function(id) {
        modals.forEach(modal => {
            modal.classList.remove('visible');
        });
        document.getElementById(id).classList.add('visible');
        body.classList.add('modal-open');

        // Download vCard when contact modal is opened
        if (id === 'contact') {
            downloadVCard();
            const notice = document.querySelector('.download-notice');
            if (notice) {
                // Remove the notice after animation completes
                setTimeout(() => {
                    notice.style.display = 'none';
                }, 3000);
            }
        }
    };

    // Function to close modal
    window.closeModal = function() {
        modals.forEach(modal => modal.classList.remove('visible'));
        body.classList.remove('modal-open');
    };

    // Function to download vCard
    function downloadVCard() {
        const link = document.createElement('a');
        link.href = 'Michal_Uchmanowicz.vcf';
        link.download = 'Michal_Uchmanowicz.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

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

