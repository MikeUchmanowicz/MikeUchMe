
document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const body = document.querySelector('body');

    function showModal(id) {
        modals.forEach(modal => {
            modal.classList.remove('visible');
        });
        document.getElementById(id).classList.add('visible');
        body.classList.add('modal-open');
    }

    function closeModal() {
        modals.forEach(modal => modal.classList.remove('visible'));
        body.classList.remove('modal-open');
    }

    function downloadVCF() {
        const link = document.createElement("a");
        link.href = "me.vcf";
        link.download = "me.vcf";
        link.style.display = "none";
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

    window.showModal = showModal;
    window.closeModal = closeModal;
});

