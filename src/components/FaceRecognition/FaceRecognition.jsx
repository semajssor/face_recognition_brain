import PropTypes from 'prop-types';
import './FaceRecognition.css'; 

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center displayImage">
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded for recognition" className="face-recognition-image" />
      ) : (
        <p className="no-image-message">No image to display.</p>
      )}
    </div>
  );
};

// Define default props
FaceRecognition.defaultProps = {
  imageUrl: '', 
};

// Define prop types
FaceRecognition.propTypes = {
  imageUrl: PropTypes.string,
};

export default FaceRecognition;