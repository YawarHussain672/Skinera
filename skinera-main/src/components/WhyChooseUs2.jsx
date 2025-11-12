import React from "react";
import clinicImage from "../../Images/WhyChooseUs/1.png";

/*
  WhyChooseUs2
  Replicates the provided layout: Left textual rationale with heading + intro + feature list, right large rounded image.
  Designed to be placed after <StorySection />.
*/
export default function WhyChooseUs2() {
  return (
    <section className="bg-[#fdf6f4] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Content */}
        <div className="lg:col-span-6">
          <p className="text-3xl font-medium tracking-wide text-gray-600 mb-4">
            Why Choose DSkinova Clinic for
          </p>
          <h2 className="font-domine font-medium text-[#4d1f1a] text-4xl sm:text-5xl leading-tight mb-6">
              Skin, Hair, and Cosmetic{" "}
            <br className="hidden sm:block" /> Treatments?
          </h2>

          <p className="text-gray-600 leading-relaxed max-w-xl mb-8">
            At <span className="font-semibold">DSkinova</span>, we are committed
            to helping you achieve and maintain healthy, radiant skin. Trust us
            for exceptional care tailored to your unique needs.
          </p>
          <div className="space-y-10">
            {/* Item 1 */}
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-lg bg-[#f0e3db] flex items-center justify-center text-xl text-[#a05f3d]">
                <i
                  className="fa-solid fa-hand-holding-heart"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-semibold text-[#4d1f1a] mb-2">
                  Personalized & Compassionate Care
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                  We understand that every individual is different. Our expert
                  cosmetologists create customized treatment plans to address
                  your specific concerns.
                </p>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-lg bg-[#f0e3db] flex items-center justify-center text-2xl text-[#a05f3d]">
                <i className="fa-solid fa-gears" aria-hidden="true"></i>
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-semibold text-[#4d1f1a] mb-2">
                  Comprehensive Skin & Hair Solutions
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                  From corrective skin science to cosmetic enhancements, we
                  offer a full range of advanced treatments to enhance your
                  beauty and confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Image */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-xl h-72 sm:h-80 md:h-96 lg:h-[520px] overflow-hidden rounded-3xl shadow-lg border border-[#e9d5cc]">
            <img
              src={clinicImage}
              alt="Clinic consultation"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
