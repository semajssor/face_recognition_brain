import PropTypes from 'prop-types'; 
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, inputValue }) => {
	return (
		<div>
			<p className="f3">{"This Magic Brain will detect faces in your pictures. Give it a try!"}</p>
			<div className="center">
				<div className="form center pa4 br3 shadow-5">
					<input
						className="f4 pa2 w-70 center br--left"
						type="text"
						name="findFace"
						onChange={onInputChange}
						value={inputValue}
						placeholder="Enter image URL"
						aria-label="Enter image URL"
					/>
					<button
						className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple br--right"
						type="button"
						onClick={onButtonSubmit}
					>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
};


ImageLinkForm.propTypes = {
	onInputChange: PropTypes.func.isRequired, 
	onButtonSubmit: PropTypes.func.isRequired, 
	inputValue: PropTypes.string.isRequired, 
};

ImageLinkForm.defaultProps = {
	onInputChange: () => {},
	onButtonSubmit: () => {},
	inputValue: '',
};

export default ImageLinkForm;