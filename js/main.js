document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const body = document.querySelector('body');
    const overlay = document.querySelector('.modal-overlay');
    const notice = document.querySelector('.download-notice');

    // Hide download notice initially
    if (notice) {
        notice.style.display = 'none';
    }

    // Function to show modal and handle vCard download for contact
    function showModal(modalId) {
        // Close any open modals first
        document.querySelectorAll('.modal').forEach(modal => {
            if(modal.classList.contains('visible')) {
                modal.classList.remove('visible');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 350);
            }
        });
        
        // First show overlay and trigger blur/scale
        overlay.style.display = 'block';
        overlay.offsetHeight; // Force reflow
        overlay.style.opacity = '1';
        body.classList.add('modal-open');
        
        // After background effect, show modal
        setTimeout(() => {
            const modal = document.getElementById(modalId);
            modal.style.display = 'flex';
            modal.offsetHeight; // Force reflow
            modal.classList.add('visible');

            // Show download notice when contact modal is opened
            if (modalId === 'contact' && notice) {
                // Reset notice position
                notice.classList.remove('slide-out');
                notice.style.display = 'block';
                
                // Trigger slide down
                setTimeout(() => {
                    notice.classList.add('slide-in');
                    
                    // After 3 seconds, slide up and trigger download
                    setTimeout(() => {
                        notice.classList.remove('slide-in');
                        notice.classList.add('slide-out');
                        downloadContactInfo();
                        
                        // Hide notice after slide up animation
                        setTimeout(() => {
                            notice.style.display = 'none';
                        }, 750);
                    }, 3000);
                }, 100);
            }
        }, 350); // Wait for background effect to complete
    }

    // Function to close modal
    function closeModal() {
        const modals = document.querySelectorAll('.modal');
        
        // First fade out the modal
        modals.forEach(modal => {
            if(modal.classList.contains('visible')) {
                modal.classList.remove('visible');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 350);
            }
        });
        
        // After modal fades out, remove blur and scale
        setTimeout(() => {
            body.classList.remove('modal-open');
            overlay.style.opacity = '0';
            
            // Hide overlay after fade
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 350);
        }, 350);
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
    overlay.addEventListener('click', closeModal);

    // Close modals with 'Esc' key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Make functions globally available
    window.showModal = showModal;
    window.closeModal = closeModal;
    window.downloadContactInfo = downloadContactInfo;
});