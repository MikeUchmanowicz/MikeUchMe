document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const body = document.querySelector('body');

    // Function to show modal and handle vCard download for contact
    function showModal(modalId) {
        body.classList.add('modal-open');
        document.querySelector('.modal-overlay').style.display = 'block';
        document.getElementById(modalId).classList.add('visible');

        // Download vCard when contact modal is opened
        if (modalId === 'contact') {
            downloadContactInfo();
            const notice = document.querySelector('.download-notice');
            if (notice) {
                // Remove the notice after animation completes
                setTimeout(() => {
                    notice.style.display = 'none';
                }, 3000);
            }
        }
    }

    // Function to close modal
    function closeModal() {
        body.classList.remove('modal-open');
        document.querySelector('.modal-overlay').style.display = 'none';
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('visible');
        });
    }

    // Function to download vCard
    function downloadContactInfo() {
        const contactInfo = {
            name: "Michal Arkadiusz Uchmanowicz",
            email: "Mike.Uchmanowicz@gmail.com",
            phone: "(847) 704-0455",
            links: {
                github: "https://github.com/MikeUchmanowicz",
                linkedin: "https://www.linkedin.com/in/michal-uchmanowicz/",
                facebook: "https://www.facebook.com/MikeUchmanowicz/",
                instagram: "https://www.instagram.com/mike.uch/",
                website: "https://EndlessCustoms.co"
            }
        };

        // Create a 3-second delay before downloading
        setTimeout(() => {
            const dataStr = JSON.stringify(contactInfo, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = window.URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'contact_info.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 5000);
    }

    // Close modals on clicking outside
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Close modals with 'Esc' key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Prevent scrolling on touch devices
    document.addEventListener('touchmove', function(e) {
        if (!e.target.closest('.modal')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Assign functions to window object
    window.showModal = showModal;
    window.closeModal = closeModal;
});