import { defineType } from 'sanity'

export default defineType({
  name: 'featured_categories',
  title: 'featured new categories',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string", 
      title: "Featured category name",
      validation: (Rule) => Rule.required()
    },
    {
      name: "description",
      type: "string", 
      title: "Short description",
      validation: (Rule) => Rule.max(200)
    },
    {
      name: "restaurant",
      type: "array",
      title: "Restaurants",
      of: [{ type: "reference", to: [{ type: "restaurant" }] }]
    }
  ],
})
