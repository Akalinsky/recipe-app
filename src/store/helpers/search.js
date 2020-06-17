export function filterCookbook (cookbook, search) {
  const filteredCookbook = []
  if (search !== '') {
    const searchTerm = search.toLowerCase()
    cookbook.forEach((recipe) => {
      if (JSON.stringify(recipe).toLowerCase().includes(searchTerm)) {
        filteredCookbook.push(recipe)
      }
    })
  }

  return filteredCookbook
}
