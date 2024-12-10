document.getElementById('imageForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const image = document.getElementById('noteImage').files[0];

    if (!image) {
        alert('Please upload an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const notesContainer = document.getElementById('notesContainer');
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
            <img src="${reader.result}" alt="${title}">
        `;
        notesContainer.appendChild(noteDiv);

        document.getElementById('imageForm').reset();
    };
    reader.readAsDataURL(image);
});
