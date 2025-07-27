import React from 'react';

const CohortCard3 = ({ imgURL, name, role, description }) => { // Destructure props for cleaner code
    return (
        <div className="flex flex-col items-center p-4 bg-slate-800/40 border border-slate-600/50 backdrop-blur-md rounded-lg shadow-md text-white h-full justify-start">
            <div className="mb-4"> {/* Container for the image */}
                <img
                    src={imgURL}
                    alt={name}
                    // Tailwind classes for circular image, increased size, and border
                    className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full object-cover ring-2 ring-blue-400 ring-offset-2 ring-offset-[#050527]"
                />
            </div>
            <div className="text-center"> {/* Container for text content */}
                {/* Tailwind classes for name and role font sizes */}
                <p className='text-lg sm:text-xl font-bold mb-1 text-blue-300'>{name}</p>
                <p className="text-sm sm:text-base text-gray-300 font-medium">{role}</p>
                {/* The description prop was passed to createCard4 in Cohort.jsx but not used here. */}
                {/* If you want to display the description, add it here: */}
                {/* <p className="text-xs sm:text-sm text-gray-400 mt-2 flex-grow">{description}</p> */}
            </div>
        </div>
    );
};

export default CohortCard3;