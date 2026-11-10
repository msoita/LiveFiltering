const glossary = [
  {
    "term": "HTML",
    "definition": "The markup language used to structure content on a web page."
  },
  {
    "term": "CSS",
    "definition": "A language for styling the appearance of HTML elements."
  },
  {
    "term": "JavaScript",
    "definition": "The programming language that makes web pages interactive."
  },
  {
    "term": "DOM",
    "definition": "The Document Object Model — the browser's live, editable tree of the page."
  },
  {
    "term": "Element",
    "definition": "A single node in the page, such as a heading, paragraph, or button."
  },
  {
    "term": "Event",
    "definition": "Something that happens on the page, like a click or keypress, that code can respond to."
  },
  {
    "term": "Function",
    "definition": "A reusable block of code that performs a task and can return a value."
  },
  {
    "term": "Variable",
    "definition": "A named container that stores a value for later use."
  },
  {
    "term": "Array",
    "definition": "An ordered list of values, written with square brackets."
  },
  {
    "term": "Object",
    "definition": "A collection of key/value pairs, written with curly braces."
  },
  {
    "term": "JSON",
    "definition": "A text format for storing and exchanging data, based on objects and arrays."
  },
  {
    "term": "Fetch",
    "definition": "A browser function for loading data from a file or server."
  },
  {
    "term": "Selector",
    "definition": "A pattern used to find and target elements, e.g. by class or id."
  },
  {
    "term": "Attribute",
    "definition": "Extra information on an element, such as src, href, or alt."
  },
  {
    "term": "Callback",
    "definition": "A function passed to another function to run at a later time."
  }
];

const search = document.getElementById("search");
const clear = document.getElementById("clear");

const searchCounter = document.getElementById("searchCounter");
const searchWrapper = document.getElementById("searchWrapper");

function convertString(str){
  return str.toLowerCase().replaceAll(" ", "");
}

function renderGlossary(searchResults, searchValue){
  searchWrapper.innerHTML = "";
  searchCounter.innerText = `Showing ${searchResults.length} of ${glossary.length} terms`;

  if (searchResults.length === 0){
    searchWrapper.innerHTML = "No matches";
    return;
  }

  searchResults.forEach(searchResult =>{
    const searchContainer = document.createElement("div");
    const searchTerm = document.createElement("h3");
    const searchDefinition = document.createElement("p");

    const regex = new RegExp(`${searchValue}`, "gi");
    searchTerm.innerHTML = searchResult.term.replaceAll(regex, "<mark>$&</mark>");
    searchDefinition.innerHTML = searchResult.definition.replaceAll(regex, "<mark>$&</mark>");

    searchContainer.appendChild(searchTerm);
    searchContainer.appendChild(searchDefinition);
    searchWrapper.appendChild(searchContainer);
  })
}

search.addEventListener("input", () =>{
  const searchValue = convertString(search.value);
  let searchResults = glossary.filter(word => {
    return convertString(word.term).includes(searchValue);
  })

  if (searchResults.length === 0){
    searchResults = glossary.filter(word => {
      return convertString(word.definition).includes(searchValue);
    });
  }
  renderGlossary(searchResults, searchValue);
})

clear.addEventListener("click", () =>{
  search.value = "";
  renderGlossary(glossary);
})

glossary.sort((a, b) => a.term.localeCompare(b.term));
renderGlossary(glossary);