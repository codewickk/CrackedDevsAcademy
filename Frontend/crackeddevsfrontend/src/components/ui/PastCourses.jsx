import { BentoGridDemo } from "./cardcomponent";

function PastCourses() {
  return (
    <div className="bg-neutral-950 backdrop-blur-md text-white py-20">
      <div className="text-center">
        <p className="text-4xl font-medium leading-relaxed">
         Past Courses and Cohorts
        </p>
      </div>
      <div>
        <BentoGridDemo />
      </div>
    </div>
  );
}

export default PastCourses;