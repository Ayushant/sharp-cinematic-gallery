
"use client"

import { useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"
import { EmptyState } from "@/components/common/EmptyState"
import { useCategories, useCategoryMutations, type Category } from "@/hooks/useCategories"

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  slug: z.string().min(1, "Slug is required"),
})

type CategoryForm = z.infer<typeof categorySchema>

export function CategoryManager() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const { data: categories, isLoading } = useCategories()
  const { createCategory, updateCategory, deleteCategory } = useCategoryMutations()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
  })

  const nameValue = watch("name")

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const onSubmit = async (data: CategoryForm) => {
    try {
      const categoryData = {
        ...data,
        description: data.description || null,
      }

      if (editingCategory) {
        await updateCategory.mutateAsync({
          id: editingCategory.id,
          ...categoryData,
        })
        setEditingCategory(null)
      } else {
        await createCategory.mutateAsync({
          ...categoryData,
          display_order: 0,
          is_active: true,
        })
        setIsCreateDialogOpen(false)
      }
      reset()
    } catch (error) {
      console.error("Failed to save category:", error)
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setValue("name", category.name)
    setValue("description", category.description || "")
    setValue("slug", category.slug)
  }

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    try {
      await deleteCategory.mutateAsync(categoryId)
    } catch (error) {
      console.error("Failed to delete category:", error)
    }
  }

  const handleCreateNew = () => {
    reset()
    setEditingCategory(null)
    setIsCreateDialogOpen(true)
  }

  // Auto-generate slug when name changes
  if (nameValue && !editingCategory) {
    const slug = generateSlug(nameValue)
    setValue("slug", slug)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Category Management</h2>
          <p className="text-gray-600">Organize your content with categories</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">/{category.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(category.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Order: {category.display_order}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      category.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {category.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No categories found"
          description="Create your first category to start organizing your content."
          actionLabel="Add Category"
          onAction={handleCreateNew}
        />
      )}

      <Dialog
        open={isCreateDialogOpen || !!editingCategory}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateDialogOpen(false)
            setEditingCategory(null)
            reset()
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Create New Category"}</DialogTitle>
            <DialogDescription>
              {editingCategory ? "Update category information" : "Add a new category to organize your content"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter category name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                {...register("slug")}
                placeholder="category-slug"
                className={errors.slug ? "border-red-500" : ""}
              />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
              <p className="text-xs text-gray-500">This will be used in URLs (e.g., /category/your-slug)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Brief description of this category"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false)
                  setEditingCategory(null)
                  reset()
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || createCategory.isPending || updateCategory.isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSubmitting || createCategory.isPending || updateCategory.isPending
                  ? "Saving..."
                  : editingCategory
                    ? "Update Category"
                    : "Create Category"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
