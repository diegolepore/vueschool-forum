export const findById = (resources, id) => {
  return resources.find((r) => r.id === id)
}

export const upser = (resources, item) => {
  const index = resources.findIndex((p) => p.id === item.id)

  if (item.id && index !== -1) {
    resources[index] = item
  } else {
    resources.push(item)
  }
}
