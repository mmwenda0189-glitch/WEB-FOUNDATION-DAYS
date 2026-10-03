// Starting Array Data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

/* ==========================================================================
   1. searchNotes(word)
   Returns array of notes whose text contains 'word' (case-insensitive).
   ========================================================================== */
function searchNotes(word) {
  const searchTerm = word.toLowerCase();
  return notes.filter(note => note.text.toLowerCase().includes(searchTerm));
}

/* ==========================================================================
   2. longestNote()
   Returns the note object with the most characters, or null if empty.
   ========================================================================== */
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];
  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }
  return longest;
}

/* ==========================================================================
   3. countByCategory()
   Returns an object counting notes per category.
   ========================================================================== */
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    const category = note.category;
    if (counts[category]) {
      counts[category]++;
    } else {
      counts[category] = 1;
    }
  }
  return counts;
}

/* ==========================================================================
   4. getSummary()
   Returns a sentence detailing note counts and categories.
   ========================================================================== */
function getSummary() {
  const total = notes.length;
  const wordNote = total === 1 ? "note" : "notes";
  const counts = countByCategory();

  const categoryParts = [];
  for (const category in counts) {
    categoryParts.push(`${counts[category]} ${category}`);
  }

  const categoryDetails = categoryParts.join(", ");
  return `${total} ${wordNote}: ${categoryDetails}.`;
}

/* ==========================================================================
   5. isDuplicate(text)
   Returns true if note with same text exists (ignoring case & extra spaces).
   ========================================================================== */
function isDuplicate(text) {
  const cleanText = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === cleanText);
}

/* ==========================================================================
   6. addNote(text, category)
   Adds a note if 1-200 chars, not duplicate, and valid category.
   ========================================================================== */
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  const trimmedText = text.trim();

  // Validate length
  if (trimmedText.length < 1 || trimmedText.length > 200) {
    console.log("Failed to add note: Text must be between 1 and 200 characters.");
    return false;
  }

  // Validate duplicate
  if (isDuplicate(trimmedText)) {
    console.log("Failed to add note: Duplicate note text already exists.");
    return false;
  }

  // Validate category
  if (!validCategories.includes(category)) {
    console.log(`Failed to add note: Category must be one of: ${validCategories.join(", ")}.`);
    return false;
  }

  // Add the note
  const newNote = {
    id: notes.length + 1,
    text: trimmedText,
    category: category
  };

  notes.push(newNote);
  console.log("Note added successfully!");
  return true;
}

/* ==========================================================================
   CONSOLE LOG TESTS (Normal & Edge Cases)
   ========================================================================== */

console.log("--- TESTING searchNotes ---");
console.log(searchNotes("report")); 
// Expected output: [{ id: 3, text: "Email the project report to Grace", category: "work" }]

console.log(searchNotes("python")); 
// Expected output: []


console.log("\n--- TESTING longestNote ---");
console.log(longestNote()); 
// Expected output: { id: 3, text: "Email the project report to Grace", category: "work" }

// Edge Case: Empty array test
const originalNotes = [...notes];
notes = [];
console.log(longestNote()); 
// Expected output: null
notes = originalNotes; // Restore original notes array


console.log("\n--- TESTING countByCategory ---");
console.log(countByCategory()); 
// Expected output: { personal: 2, study: 2, work: 1 }


console.log("\n--- TESTING getSummary ---");
console.log(getSummary()); 
// Expected output: "5 notes: personal 2, study 2, work 1."


console.log("\n--- TESTING isDuplicate ---");
console.log(isDuplicate("  Call mum  ")); 
// Expected output: true

console.log(isDuplicate("Go for a run")); 
// Expected output: false


console.log("\n--- TESTING addNote ---");
console.log(addNote("Plan weekend trip", "personal")); 
// Expected output: Note added successfully! -> true

console.log(addNote("Call mum", "personal")); 
// Expected output: Failed to add note: Duplicate note text already exists. -> false

console.log(addNote("Read chapter 1", "fitness")); 
// Expected output: Failed to add note: Category must be one of: personal, work, study. -> false
