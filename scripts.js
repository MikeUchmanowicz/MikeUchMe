document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const body = document.querySelector('body');

    // Function to show modal and handle vCard download for contact
    function showModal(modalId) {
        body.classList.add('modal-open');
        document.querySelector('.modal-overlay').style.display = 'block';
        document.getElementById(modalId).classList.add('visible');

        // Show download notice when contact modal is opened
        if (modalId === 'contact') {
            const notice = document.querySelector('.download-notice');
            if (notice) {
                // Show the notice
                notice.style.display = 'block';
                notice.style.opacity = '1';
                
                // After 3 seconds, fade out the notice and then start download
                setTimeout(() => {
                    // Fade out the notice
                    notice.style.opacity = '0';
                    
                    // After fade out animation completes (0.5s), hide the notice and start download
                    setTimeout(() => {
                        notice.style.display = 'none';
                        // Start download after notice is hidden
                        downloadContactInfo();
                    }, 500);
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
        const link = document.createElement('a');
        link.href = 'Michal_Uchmanowicz.vcf';
        link.download = 'Michal_Uchmanowicz.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
    window.downloadContactInfo = downloadContactInfo;
});