import { forumPosts, ForumPost } from '../data/forum';

export function getAllPosts(): ForumPost[] {
  return forumPosts;
}

export function getPostById(id: string): ForumPost | undefined {
  // Recherche récursive dans les sujets et réponses
  function search(posts: ForumPost[]): ForumPost | undefined {
    for (const post of posts) {
      if (post.id === id) return post;
      const found = search(post.replies);
      if (found) return found;
    }
    return undefined;
  }
  return search(forumPosts);
}

export function addPost(newPost: ForumPost) {
  forumPosts.unshift(newPost);
}

export function addReply(parentId: string, reply: ForumPost) {
  function searchAndAdd(posts: ForumPost[]): boolean {
    for (const post of posts) {
      if (post.id === parentId) {
        post.replies.push(reply);
        return true;
      }
      if (searchAndAdd(post.replies)) return true;
    }
    return false;
  }
  searchAndAdd(forumPosts);
} 