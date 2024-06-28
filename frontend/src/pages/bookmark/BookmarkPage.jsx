import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import SavedPosts from "../../components/common/SavedPosts";

function BookmarkPage() {
   const queryClient = useQueryClient();
   const { data: authUser } = useQuery({ queryKey: ["authUser"] });

   const userId = authUser?._id;
   const {
      data: savePosts,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["savePosts"],
      queryFn: async () => {
         try {
            const res = await fetch(`/api/posts/saves/${userId}`); // Adjust the endpoint as per your backend route
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");
            return data;
         } catch (error) {
            throw new Error(error.message);
         }
      },
   });

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>Error: {error.message}</div>;
   }

   return (
      <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
         <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <p className="font-bold">Bookmark</p>
         </div>
         <div>
            {savePosts.length > 0 ? (
               savePosts.map((post) => (
                  <SavedPosts key={post._id} post={post} />
               ))
            ) : (
               <div className="p-4">No saved posts</div>
            )}
         </div>
      </div>
   );
}

export default BookmarkPage;
