import PropTypes from "prop-types";

const Rank = ({ name, entries }) => {
	return (
      <div>
         <div className="white f3">
            {`${name}, your current entry count is...`}
         </div>
         <div className="white f1">
            {entries}
         </div>
      </div>
	);
};

Rank.propTypes = {
   name: PropTypes.string.isRequired,
   entries: PropTypes.string.isRequired,
};

export default Rank;
