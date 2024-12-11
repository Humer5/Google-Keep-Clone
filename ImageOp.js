document.addEventListener('DOMContentLoaded', () => {
    const noteTitle = document.getElementById('noteTitle');
    const noteDescription = document.getElementById('noteDescription');
    const imageInput = document.getElementById('imageInput');
    const addNoteButton = document.getElementById('addNoteButton');
    const notesGallery = document.getElementById('notesGallery');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close');

    // Add Note
    addNoteButton.addEventListener('click', () => {
        const title = noteTitle.value.trim();
        const description = noteDescription.value.trim();
        const files = imageInput.files;

        if (!title || !description) {
            alert('Please fill in both Title and Description.');
            return;
        }

        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';

        const titleElement = document.createElement('h3');
        titleElement.textContent = title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description;

        noteCard.appendChild(titleElement);
        noteCard.appendChild(descriptionElement);

        // Add Images
        if (files.length > 0) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = function () {
                    const imgElement = document.createElement('img');
                    imgElement.src = reader.result;
                    imgElement.addEventListener('click', () => {
                        modalImage.src = reader.result;
                        modal.style.display = 'flex';
                    });
                    noteCard.appendChild(imgElement);
                };
                reader.readAsDataURL(file);
            });
        }

        // Add Action Buttons
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            noteCard.remove();
        });

        actionsDiv.appendChild(deleteBtn);
        noteCard.appendChild(actionsDiv);
        notesGallery.appendChild(noteCard);

        // Reset Form
        noteTitle.value = '';
        noteDescription.value = '';
        imageInput.value = '';
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

