import PropTypes from "prop-types";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  if (!imageUrl) return null;

  //console.log("Box data:", box); 

  return (
    <div className="center displayImage">
      <div className="image-container">
        <img
          src={imageUrl}
          alt="Detected Face"
          className="face-recognition-image"
          id="inputImage"
        />
        {box.length > 0 &&
          box.map((face, index) => {
            return (
              <div
                key={index}
                className="bounding-box"
                style={{
                  top: `${face.topRow}px`,
                  left: `${face.leftCol}px`,
                  width: `${face.rightCol - face.leftCol}px`,
                  height: `${face.bottomRow - face.topRow}px`,
                }}
              ></div>
            );
          })}
      </div>
    </div>
  );
};

// Define default props
FaceRecognition.defaultProps = {
  imageUrl: null,
  box: [],
};

// Define prop types
FaceRecognition.propTypes = {
  imageUrl: PropTypes.string,
  box: PropTypes.arrayOf(
    PropTypes.shape({
      topRow: PropTypes.number.isRequired,
      leftCol: PropTypes.number.isRequired,
      rightCol: PropTypes.number.isRequired,
      bottomRow: PropTypes.number.isRequired,
    })
  ),
};

export default FaceRecognition;