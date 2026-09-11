// Firebase Related
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// Html Related
import DOMPurify from "isomorphic-dompurify";

// Interface Imports
import { StatisticsItem, StatisticsProp } from "@/types";

// Function: Statistics
export default async function Statistics({
  page = 1,
  count = 3,
}: StatisticsProp) {
  let statsList: StatisticsItem[] = [];

  try {
    const q = query(collection(db, "stats"), orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);

    const allStats = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as StatisticsItem[];

    // Calculate slice boundaries based on page and count
    const startIndex = (page - 1) * count;
    const endIndex = startIndex + count;
    statsList = allStats.slice(startIndex, endIndex);
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }

  return (
    <div className="flex flex-col gap-6 bg-[#f1f6f8] p-8">
      {statsList.map((stat) => (
        <div key={stat.id} className="flex items-center gap-4">
          <div className="min-w-[60px] text-[20px] font-bold text-[#0365f2]">
            {stat.value}
          </div>
          <div
            className="text-[20px] font-light text-[#394149]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(stat.description || ""),
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}
