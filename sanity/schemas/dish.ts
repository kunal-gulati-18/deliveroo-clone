import { defineType } from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Menu Dishes',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string", 
      title: "Dish name",
      validation: (Rule) => Rule.required()
    },
    {
      name: "description",
      type: "string", 
      title: "Short description",
      validation: (Rule) => Rule.max(200)
    },
    {
      name: "price",
      type: "number",
      title: "Price of dish"
    },
    {
      name: "image",
      type: "image",
      title: "Dish image"
    }
  ],
})
