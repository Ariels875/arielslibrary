export function initializeAuthorFunctions(authorForm, displayForm) {
  // Authors
  document.getElementById("add-author").addEventListener("click", () => {
    authorForm.reset();
    document.getElementById("author-id").value = "";
    displayForm("author-form");
  });

  document.getElementById("edit-author").addEventListener("click", async () => {
    const authorId = prompt("Ingrese el ID del autor a editar:");
    if (authorId) {
      try {
        const response = await fetch(`/authors/${authorId}`);
        const author = await response.json();
        document.getElementById("author-id").value = author.id;
        document.getElementById("author-name").value = author.name;
        document.getElementById("author-country").value = author.country;
        displayForm("author-form");
      } catch (error) {
        console.error("Error fetching author:", error);
        alert("Error al obtener el autor");
      }
    }
  });

  document
    .getElementById("delete-author")
    .addEventListener("click", async () => {
      const authorId = prompt("Ingrese el ID del autor a eliminar:");
      if (authorId) {
        try {
          const response = await fetch(`/authors/${authorId}`, {
            method: "DELETE",
          });
          if (response.ok) {
            alert("Autor eliminado con éxito");
          } else {
            alert("Error al eliminar el autor");
          }
        } catch (error) {
          console.error("Error deleting author:", error);
          alert("Error al eliminar el autor");
        }
      }
    });

  authorForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const authorId = document.getElementById("author-id").value;
    const authorData = {
      name: document.getElementById("author-name").value,
      country: document.getElementById("author-country").value,
    };
    try {
      const method = authorId ? "PUT" : "POST";
      const url = authorId ? `/authors/${authorId}` : "/authors";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authorData),
      });
      if (response.ok) {
        alert(
          authorId ? "Autor actualizado con éxito" : "Autor agregado con éxito"
        );
        authorForm.reset();
        displayForm("");
      } else {
        alert("Error al guardar el autor");
      }
    } catch (error) {
      console.error("Error saving author:", error);
      alert("Error al guardar el autor");
    }
  });
}
