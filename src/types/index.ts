// Interface: Book
export interface Book {
  id: string;
  title?: string;
  author?: string;
  subTitle?: string;
  imageLink?: string;
  audioLink?: string;
  totalRating?: number;
  averageRating?: number;
  keyIdeas?: number;
  type?: string;
  status?: string;
  subscriptionRequired?: boolean;
  summary?: string;
  tags?: string[];
  bookDescription?: string;
  authorDescription?: string;
  audioLength?: string;
}

// Interface: ActiveStatisticsProps;
export interface ActiveStatisticsProps {
  items: string[];
  intervalTime?: number;
}

// Interface: AudioPlayerProps
export interface AudioPlayerProps {
  book: {
    title: string;
    author: string;
    imageLink: string;
    audioLink: string;
  } | null;
  onClose?: () => void;
}

// Interface: BookCardProps
export interface BookCardProps {
  book: Book;
}

// Interface: Review
export interface Review {
  id: string;
  username?: string;
  comment?: string;
  rating?: number;
  order?: number;
  [key: string]: any;
}

// Interface: StatisticsItem
export interface StatisticsItem {
  id: string;
  value: string;
  description: string;
  order: number;
}

// Interface: StatisticsProp
export interface StatisticsProp {
  page?: number;
  count?: number;
}

//Interface: UserProfile
export interface UserProfile {
  uid: string;
  email: string | null;
  isAnonymous: boolean;
  isSubscribed: boolean;
  subscription?: "basic" | "premium" | "premium-plus" | null;
}

// Interface: AuthContextType
export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isModalOpen: boolean;
  modalMode: "login" | "register";
  openModal: (mode: "login" | "register") => void;
  closeModal: () => void;
  login: (email: string, pass: string) => Promise<{ error: string | null }>;
  register: (email: string, pass: string) => Promise<{ error: string | null }>;
  guestLogin: () => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

// Interface: FontContextType
export interface FontContextType {
  fontSize: string;
  setFontSize: (size: string) => void;
}

// Interface: SidebarProps
export interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export interface AuthModalProps {
  onClose?: () => void;
}
