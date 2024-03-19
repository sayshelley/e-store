function Grading(props){
    const { grade, peopleReviews } = props;
    return (
        <div className="costumergrade">
          <span>
            <i
              className={
                grade >= 1
                  ? 'fas fa-star'
                  : grade >= 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                grade >= 2
                  ? 'fas fa-star'
                  : grade >= 1.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                grade >= 3
                  ? 'fas fa-star'
                  : grade >= 2.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                grade >= 4
                  ? 'fas fa-star'
                  : grade >= 3.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              className={
                grade >= 5
                  ? 'fas fa-star'
                  : grade >= 4.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span> {peopleReviews} Visits</span>
        </div>
      );
}
export default Grading;