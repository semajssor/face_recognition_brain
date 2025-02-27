import PropTypes from "prop-types";

const Rank = ({ fname, entries }) => {
   return (
      <div>
         <div className="white f3">
            <p>{fname}, your current entry count is...</p>
         </div>
         <div className="white f1">
            {entries}
         </div>
      </div>
   );
};

Rank.propTypes = {
   fname: PropTypes.string.isRequired,
   entries: PropTypes.number.isRequired,
};

export default Rank;