import './SpinnerComponent.scss';

const SpinnerComponent = () => {
    return (
        <div>
            <svg className='spinner' height="80" width="80">
                <circle className="path" cx="40" cy="40" r="30" fill="none" strokeWidth="5"></circle>
            </svg>
        </div>

    )
        ;
};

export default SpinnerComponent;