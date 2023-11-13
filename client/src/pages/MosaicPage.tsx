import axios from "axios";
import { useEffect, useState } from "react";
import SketchCanvas from "../components/Sketches/SketchCanvas";

export interface Review {
  _id: string;
  review: string;
  albumId: string;
  imageUrl: string;
}

export const MosaicPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(reviews);

  const handleGetAllReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/review/all`);
      setReviews(response.data.reviews);
      setIsLoading(false);
    } catch (error) {
      console.error("API request error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllReviews();
  }, []);

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        {isLoading
          ? ""
          : reviews.length > 0 && <SketchCanvas reviews={reviews} />}
      </div>
    </>
  );
};

export default MosaicPage;
