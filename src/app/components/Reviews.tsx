// Firebase Related
import { db } from "../../lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

// Icons Related
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

// Html Related
import DOMPurify from "isomorphic-dompurify";

// Interface Import Related
import { Review } from "@/types";

// Function: Reviews
export default async function Reviews() {
  let reviewList: Review[] = [];

  try {
    const q = query(collection(db, "reviews"), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);

    reviewList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Review[];
  } catch (error) {
    console.error("Error fetching reviews: ", error);
  }

  // Render stars dynamically based on rating number
  const renderStars = (rating: number = 5) => {
    const stars: React.ReactNode[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<BsStarFill key={i} />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<BsStarHalf key={i} />);
      } else {
        stars.push(<BsStar key={i} />);
      }
    }
    return stars;
  };

  return (
    <div className="reviews-container">
      {reviewList.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviewList.map((review, index) => (
          <div
            className="mb-8 flex flex-col justify-between rounded-[4px] bg-[#fff3d7] px-6 py-3"
            key={review.id || index}
          >
            <div className="flex items-center gap-2">
              <div className="text-base font-light text-[#032b41]">
                {review?.username || "Anonymous"}
              </div>
              <div className="flex gap-1 text-[#0365f2]">
                {renderStars(review?.rating ?? 0)}
              </div>
            </div>
            <div
              className="font-light text-[#394149]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(review?.comment || ""),
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}
