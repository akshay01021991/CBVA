
export interface Video {
  id: string;
  title: string;
  duration: string;
  url: string; // In a real app, this would be more secure
}

export interface Chapter {
  id: string;
  title:string;
  videos: Video[];
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number; // 1 to 5
  comment: string;
}

export interface Course {
  id: string;
  title: string;
  mrp: number;
  price: number;
  description: string;
  thumbnail: string;
  chapters: Chapter[];
  reviews: Review[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  purchasedCourses: string[]; // array of course ids
  wishlist: string[]; // array of course ids
  progress: {
    [courseId: string]: string[]; // key: courseId, value: array of completed videoIds
  };
}

export interface Banner {
  id: string;
  imageUrl: string;
  link: string;
}
