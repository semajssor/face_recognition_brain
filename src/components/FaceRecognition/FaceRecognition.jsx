import PropTypes from "prop-types";
// import { useEffect } from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
   // useEffect(() => {
   //   console.log("Updated Box:", box);
   // }, [box]); // Log whenever box updates
 
   if (!imageUrl) return null;
 
   return (
     <div className="center displayImage">
       <div className="image-container">
         <img
           src={imageUrl}
           alt="Detected Face"
           className="face-recognition-image"
           id="inputImage"
         />
         {box.topRow !== undefined && (
           <div
             className="bounding-box"
             style={{
               top: `${box.topRow}px`,
               left: `${box.leftCol}px`,
               width: `${box.rightCol - box.leftCol}px`,
               height: `${box.bottomRow - box.topRow}px`,
             }}
           ></div>
         )}
       </div>
     </div>
   );
 };

// Define default props
FaceRecognition.defaultProps = {
	imageUrl: null,
	box: {},
};

// Define prop types
FaceRecognition.propTypes = {
	imageUrl: PropTypes.string,
	box: PropTypes.shape({
		topRow: PropTypes.number,
		leftCol: PropTypes.number,
		rightCol: PropTypes.number,
		bottomRow: PropTypes.number,
	}),
};

export default FaceRecognition;
