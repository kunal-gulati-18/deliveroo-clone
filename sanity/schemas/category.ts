import { defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Menu category',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string", 
      title: "Category name"
    },
    {
      name: "image",
      type: "image",
      title: "Category image"
    }
  ],
})
