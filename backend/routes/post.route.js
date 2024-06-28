import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
   commentOnPost,
   createPost,
   deletePost,
   getAllPosts,
   getFollowingPosts,
   getLikedPosts,
   getAllSavePosts,
   getUserPosts,
   likeUnlikePost,
   saveUnsavePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/saves/:id", protectRoute, getAllSavePosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/save/:id", protectRoute, saveUnsavePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

export default router;
