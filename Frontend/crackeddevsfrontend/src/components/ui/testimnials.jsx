import { AnimatedTestimonials } from "./animated-testimonials";
import user1 from '../../assets/user1.jpg';
import user2 from '../../assets/user2.jpg';
import user3 from '../../assets/user3.jpg';
import user4 from '../../assets/user4.jpg';
import user5 from '../../assets/user5.jpg';

const testimonials = [
  {
    quote:
      "Before this course, I couldn't even spell 'chemistry,' let alone use it to build empires. Now, I'm the 'Walter White' of my neighborhood—but, you know, legally.",
    name: "Chuck McFlask",
    designation: "Amateur Scientist at Backyard Labs",
    src: user1,
  },
  {
    quote:
      "I may not have mastered the Avada Kedavra spell, but I can now cast an Expelliarmus so powerful it disarmed my cat! Thanks, Harry!",
    name: "Gwendolyn Broomsbane",
    designation: "Aspiring Witch at Kitchen Wizardry Co.",
    src: user2,
  },
  {
    quote:
      "After taking 'The Heisenberg Effect,' I’ve got people knocking on my door just to borrow sugar. Talk about influence!",
    name: "Johnny Crystal",
    designation: "Neighborhood Influencer",
    src: user3,
  },
  {
    quote:
      "Dream Builders taught me how to architect my dreams—literally! Last night, I dreamed of a sandwich so good I woke up hungry. Thanks, Dom!",
    name: "Samantha Sandwich",
    designation: "Freelance Dreamer",
    src: user4,
  },
  {
    quote:
      "The Dude’s Doctrine was life-changing. Now I abide through all life’s chaos with my rug intact. And yes, I finally nailed the perfect White Russian recipe.",
    name: "Leonard Bigsby",
    designation: "Zen Enthusiast at RugWorld",
    src: user5,
  },
];

export function AnimatedTestimonialsDemo() {
  return (
    <div className="bg-neutral-950 py-20">
      <p className="text-white text-4xl text-center font-medium leading-relaxed">
        Testimonials
      </p>
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}

