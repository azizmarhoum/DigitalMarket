import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Game Development",
  "DevOps",
  "Cloud Computing",
  "Cybersecurity",
  "Blockchain",
  "UI/UX Design",
  "Digital Marketing",
  "Business",
  "Finance",
  "Other"
];

const UploadProduct = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null as File | null,
    googleDriveLink: "",
  });

  const uploadMutation = useMutation({
    mutationFn: (data: FormData) => {
      console.log('Sending request to:', '/products');
      console.log('FormData contents:', {
        name: data.get('name'),
        description: data.get('description'),
        price: data.get('price'),
        category: data.get('category'),
        googleDriveLink: data.get('googleDriveLink'),
        hasImage: data.has('image')
      });
      return api.productsAPI.create(data);
    },
    onSuccess: (response) => {
      console.log('Upload successful:', response);
      toast.success("Product uploaded successfully!");
      navigate("/account");
    },
    onError: (error: any) => {
      console.error('Upload error:', error);
      console.error('Error response:', error.response);
      toast.error(error.response?.data?.message || "Failed to upload product");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to upload a product");
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.googleDriveLink || !formData.image) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("googleDriveLink", formData.googleDriveLink);
    formDataToSend.append("image", formData.image);

    // Log the form data for debugging
    console.log('Sending form data:', {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      googleDriveLink: formData.googleDriveLink,
      hasImage: !!formData.image
    });

    uploadMutation.mutate(formDataToSend);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  if (!user) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You must be logged in to upload products</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/login")} className="w-full">
              Go to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Upload New Product</CardTitle>
          <CardDescription>Fill in the details of your product</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Title</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Thumbnail Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="googleDriveLink">Google Drive Link</Label>
              <Input
                id="googleDriveLink"
                name="googleDriveLink"
                type="url"
                value={formData.googleDriveLink}
                onChange={handleChange}
                placeholder="Enter Google Drive link to your product"
                required
              />
              <p className="text-sm text-gray-500">
                Make sure your Google Drive link is publicly accessible
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={uploadMutation.isPending}
            >
              {uploadMutation.isPending ? "Uploading..." : "Upload Product"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UploadProduct; 