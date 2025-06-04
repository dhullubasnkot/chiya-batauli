"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ShareGuff() {
  const router = useRouter();
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleCreateGuff = async () => {
    if (!author || !content || !image) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("author", author);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const response = await fetch(`http://localhost:4000/guffadi/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to upload Guff");
      }

      const data = await response.json();
      alert(`✅ Guff created successfully: ${data.content}`);
      router.push("/");
    } catch (error) {
      console.error("❌ Error creating Guff:", error);
      alert(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="border p-2 w-full"
      />
      <button
        onClick={handleCreateGuff}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Create Guff
      </button>
    </div>
  );
}
