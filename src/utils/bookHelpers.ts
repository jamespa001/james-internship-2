// Function: markBookAsFinished
export function markBookAsFinished(book: any) {
  const savedBooks = JSON.parse(localStorage.getItem("myLibraryBooks") || "[]");
  const finishedBooks = JSON.parse(
    localStorage.getItem("finishedBooks") || "[]",
  );

  // Remove from saved/library books
  const updatedSaved = savedBooks.filter((b: any) => b.id !== book.id);

  // Add to finished books if it's not already there
  if (!finishedBooks.some((b: any) => b.id === book.id)) {
    const updatedFinished = [book, ...finishedBooks];
    localStorage.setItem("finishedBooks", JSON.stringify(updatedFinished));
  }

  localStorage.setItem("myLibraryBooks", JSON.stringify(updatedSaved));
}
