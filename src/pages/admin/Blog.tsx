
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, User } from "lucide-react";
import ImageUploader from '@/components/admin/ImageUploader';

const BlogAdminPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Sample Blog Post 1",
      content: "This is the first sample blog post.",
      imageUrl: "https://via.placeholder.com/300",
      isDraft: false,
    },
    {
      id: "2",
      title: "Sample Blog Post 2",
      content: "This is the second sample blog post.",
      imageUrl: "https://via.placeholder.com/300",
      isDraft: true,
    },
  ]);

  const { toast } = useToast();

  const handleCreatePost = () => {
    if (!title || !content || !imageUrl) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newPost = {
      id: String(Date.now()),
      title,
      content,
      imageUrl,
      isDraft,
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
    setImageUrl("");
    setIsDraft(false);

    toast({
      title: "Success",
      description: "Blog post created successfully.",
    });
  };

  // This is our handler for the ImageUploader component
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (sortOrder === "asc") {
      return titleA.localeCompare(titleB);
    } else {
      return titleB.localeCompare(titleA);
    }
  });

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Blog Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="create" className="space-y-4">
            <TabsList>
              <TabsTrigger value="create">Create Post</TabsTrigger>
              <TabsTrigger value="manage">Manage Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="create" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label>Image Upload</Label>
                  <ImageUploader onImageSelected={handleImageUpload} />
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="mt-2 rounded-md"
                    />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    id="draft"
                    checked={isDraft}
                    onChange={(e) => setIsDraft(e.target.checked)}
                  />
                  <Label htmlFor="draft">Save as Draft</Label>
                </div>
                <Button onClick={handleCreatePost}>Create Post</Button>
              </div>
            </TabsContent>
            <TabsContent value="manage" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    placeholder="Search posts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
                </Button>
              </div>
              <div className="grid gap-4">
                {sortedPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="mb-2 rounded-md"
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {post.content.substring(0, 50)}...
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Admin</span>
                        </div>
                        {post.isDraft ? (
                          <Badge variant="secondary">Draft</Badge>
                        ) : (
                          <Badge>Published</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogAdminPage;
