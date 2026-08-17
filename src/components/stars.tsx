
import "./stars.css";

function Stars() {
  return (
    <div className="constellation">

      <svg viewBox="0 0 400 500">


        <line className="star-line line-1" x1="80" y1="130" x2="150" y2="170" />
        <line className="star-line line-2" x1="150" y1="170" x2="210" y2="120" />
        <line className="star-line line-3" x1="210" y1="120" x2="280" y2="150" />
        <line className="star-line line-4" x1="280" y1="150" x2="320" y2="210" />

        <line className="star-line line-5" x1="80" y1="130" x2="100" y2="230" />
        <line className="star-line line-6" x1="100" y1="230" x2="170" y2="270" />
        <line className="star-line line-7" x1="170" y1="270" x2="230" y2="240" />
        <line className="star-line line-8" x1="230" y1="240" x2="300" y2="300" />

        <line className="star-line line-9" x1="300" y1="300" x2="270" y2="370" />
        <line className="star-line line-10" x1="270" y1="370" x2="210" y2="410" />


   
        <circle className="star star-1" cx="80" cy="130" r="4" />
        <circle className="star star-2" cx="150" cy="170" r="3" />
        <circle className="star star-3" cx="210" cy="120" r="4" />
        <circle className="star star-4" cx="280" cy="150" r="3" />
        <circle className="star star-5" cx="320" cy="210" r="4" />

        <circle className="star star-6" cx="100" cy="230" r="3" />
        <circle className="star star-7" cx="170" cy="270" r="4" />
        <circle className="star star-8" cx="230" cy="240" r="3" />
        <circle className="star star-9" cx="300" cy="300" r="4" />

        <circle className="star star-10" cx="270" cy="370" r="3" />
        <circle className="star star-11" cx="210" cy="410" r="4" />

      </svg>
         <div className="constellation-note">
  <span className="question">
    what is this constellation about?
  </span>

  <span className="answer">
    just a little piece of the sky from the day I was born ✦
  </span>
</div>
    </div>
  );
}

export default Stars;

