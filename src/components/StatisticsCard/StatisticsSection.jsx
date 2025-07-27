import React from 'react';
import StatisticsCard from './StatisticsCard';
import Carousel2 from './Carousel2';

const StatisticsSection = () => {
    return (
        <div className="h-full bg-black p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                    <StatisticsCard
                        number="16+"
                        description="Startups we've helped curate themselves."
                    />
                    <StatisticsCard
                        number="50+"
                        description={
                            <>
                                Big Brands we collaborated<br />with.
                            </>
                        }
                    />
                    <StatisticsCard
                        number="40K+"
                        description="Lives Impacted through our Initiatives."
                    />
                </div>
                <div className="w-3/4 h-[0.7px] bg-[#26a8da] mt-6 mx-auto group-hover:bg-purple-700 transition-colors duration-300"></div>
                <p className="text-white mt-9 max-w-72 md:max-w-5xl mx-auto tracking-wider text-center">
                    KIIT E-CELL is dedicated to nurturing entrepreneurship culture among young and enthusiastic minds and helping them develop the perseverance muscle to walk the extra mile.
                </p>
            </div>
            <div>
                <Carousel2 />
            </div>
        </div>
    );
};

export default StatisticsSection;