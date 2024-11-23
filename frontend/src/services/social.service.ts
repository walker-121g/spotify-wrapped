import SafeError from "@/lib/safe-error";
import { http } from "./http.service";
import { logErr } from "@/lib/utils";
import { Following, Post, PostDetail } from "./types/social";

export const getFollowing = async (): Promise<Following[]> => {
  try {
    return await http<Following[]>("GET", "/following");
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to fetch following");
    }
  }
};

export const follow = async (email: string): Promise<void> => {
  try {
    await http<{ success: boolean }>("POST", "/following/edit", {
      body: JSON.stringify({ following: email }),
    });
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to follow user");
    }
  }
};

export const unfollow = async (email: string): Promise<void> => {
  try {
    await http<{ success: boolean }>("DELETE", "/following/edit", {
      body: JSON.stringify({ following: email }),
    });
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to unfollow user");
    }
  }
};

export const getPost = async (id: number): Promise<PostDetail> => {
  try {
    return await http<PostDetail>("GET", "/posts/post?id=" + id);
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to fetch post");
    }
  }
};

export const getPosts = async (page: number = 0): Promise<Post[]> => {
  try {
    return await http<Post[]>("GET", "/posts?page=" + page);
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to fetch posts");
    }
  }
};

export const getFollowingPosts = async (page: number = 0): Promise<Post[]> => {
  try {
    return await http<Post[]>("GET", "/posts/following?page=" + page);
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to fetch following posts");
    }
  }
};

export const getLikedPosts = async (page: number = 0): Promise<Post[]> => {
  try {
    return await http<Post[]>("GET", "/posts/likes?page=" + page);
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to fetch following posts");
    }
  }
};

export const post = async (post: {
  wrap_id: number;
  title: string;
  content: string;
}): Promise<void> => {
  try {
    await http<{ success: boolean }>("POST", "/posts/create", {
      body: JSON.stringify(post),
    });
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to post");
    }
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await http<{ success: boolean }>("POST", "/posts/delete", {
      body: JSON.stringify({ id }),
    });
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to delete post");
    }
  }
};

export const postIsLiked = async (id: number): Promise<boolean> => {
  try {
    const { success } = await http<{ success: boolean }>(
      "GET",
      "/posts/like?id=" + id,
    );
    return success;
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to check if post is liked");
    }
  }
};

export const likePost = async (id: number): Promise<void> => {
  try {
    await http<{ success: boolean }>("POST", "/posts/like", {
      body: JSON.stringify({ id }),
    });
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to like post");
    }
  }
};

export const unlikePost = async (id: number): Promise<void> => {
  try {
    await http<{ success: boolean }>("DELETE", "/posts/like", {
      body: JSON.stringify({ id }),
    });
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to unlike post");
    }
  }
};

export const comment = async (input: {
  id: number;
  content: string;
}): Promise<void> => {
  try {
    await http<{ success: boolean }>("POST", "/posts/comment", {
      body: JSON.stringify(input),
    });
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to comment");
    }
  }
};

export const deleteComment = async (id: number): Promise<void> => {
  try {
    await http<{ success: boolean }>("DELETE", "/posts/comment", {
      body: JSON.stringify({ id }),
    });
  } catch (error) {
    logErr(error);
    if (error instanceof SafeError) {
      throw error;
    } else {
      throw new SafeError("Failed to delete comment");
    }
  }
};
